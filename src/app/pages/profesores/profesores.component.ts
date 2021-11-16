import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { ProfesorService } from '../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { GruposComponent } from '../grupos/grupos.component';
import { HporprofesorComponent } from './hporprofesor/hporprofesor.component';
import { EliminarComponent } from './eliminar/eliminar.component';
import { ApiInfoService } from 'src/app/services/api-info.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent  implements AfterViewInit,OnInit  {

  matDialogRef: MatDialogRef<HporprofesorComponent> | undefined ;
  matDialogRefE: MatDialogRef<EliminarComponent> | undefined ;
  animal: string='manuel'
  name: string='lambo'
  gupotTotales:any = []
  horaspt:any
  tutoriaDes:any = []

  espa:any=[]
  mar:any=[]
  mier:any=[]
  maestroEspañol:any=[]

  valort:boolean = true
  valory:boolean = true

  maestrodd:any = []

  metadata = {
    nombre: 'manuel',
    horas: 12,
    Clave: "P-12",
    asignatura: "ESPAÑOL",
    asignaturaDos: '',
    asignaturaTres: '',
    preferencia:'No Importa	',
    materias:{
      lunes: ["1A","1B","","","","",""],
      martes:["","","","","","",""],
      miercoles:["","","","","","",""],
      jueves:["","","","","","",""],
      viernes:["","","","","","",""]
    }
  }

  //rgDPDUoSZ5uhRx0JrJgu

  constructor(private dialog: MatDialog,
    private profesorService:ProfesorService,
    private toastr: ToastrService,
    private matDialog: MatDialog,
    private apiInfoService:ApiInfoService) {

      this.apiInfoService.getGrupos().subscribe(res=>{
        //console.log(res);
        this.gupotTotales = res

      })
      let totaolGrupos:any = []
      this.profesorService.mostrarHorarios().subscribe(res=>{
       let profes:any = []
       let maestro:any = []
       res.forEach((element:any) => {
         profes.push({
           id: element.payload.doc.id,
           ...element.payload.doc.data()
         })
         totaolGrupos = profes
       });
       //console.log(totaolGrupos);
       this.controles = totaolGrupos
      })
      this.profesorService.mostrarProfesores().subscribe(res=>{
        let profes:any = []

         res.forEach((element:any) => {
          profes.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
          this.maestroEspañol = profes
         });
        })

}

  OpenModal(nam:any) {
    this.matDialogRef = this.matDialog.open(HporprofesorComponent, {
      data: {name: nam, animal: this.tutoriaDes},
      disableClose: false
    });
    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.name = "";
      }
    });
  }

  loaading=false;

  profesores:any[]=[];
  maestros:any[] = [];

  totalEspanol:number = 0
  controles:any = [];

  CyEBase = 0;
  artesBase = 0;
  cienciasBase = 0;
  educacionFBase = 0;
  espanolBase = 0;
  geografiaBase = 0;
  historiaBase = 0;
  inglesBase = 0;
  matematicasBase = 0;
  tecnologiaBase = 0;
  tutoriaBase = 0;
  vidaSaludableBase = 0;

  listaAsignatura:any
  totalasigy:any

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any;


   ngOnInit(){
    localStorage.removeItem('ruta');
    localStorage.setItem('ruta', '/profesores');
     this.getProfesores()

     this.loaading = true
     this.apiInfoService.getAgignaturas().subscribe(res=>{
     this.listaAsignatura = res
     this.loaading = false

    })
   }




   onClick(){
    console.log("onClick");

   }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  DataFromEventEmitter(data: any) {

    this.loaading = true;
    for (let i = 0; i < data.length; i++) {
      this.profesorService.agregarProfesor(data[i]).then(()=>{
        if(i == (data.length - 1)){
          this.toastr.success(` Se registro con exito, ${data.length} profesores con sus horas y asignaturas!`, 'Exito', {
            timeOut: 4000,
          });
          this.loaading = false;
        }
    }).catch(err=>{
      this.toastr.error(' Error!', 'Error', {
          timeOut: 4000,
        })
        this.loaading = false;
      });
  }


    /*
    this.profesorService.agregarProfesor(data).then(()=>{
      this.toastr.success(' Se registro con exito al profesor con sus horas y asignaturas!', 'Exito', {
        timeOut: 4000,
      });
    }).catch(err=>{
      this.toastr.error(' Error al registrar al Profesor!', 'Error', {
        timeOut: 4000,
      });
    })*/
  }

  getProfesores(){
    this.profesorService.mostrarProfesores().subscribe(res=>{
      this.profesores=[];
      res.forEach((element:any) => {
       // console.log(element.payload.doc.id);
       // console.log(element.payload.doc.data());
       this.profesores.push({
         id: element.payload.doc.id,
         ...element.payload.doc.data()
       })
       this.maestros = this.profesores
       //console.log(this.maestros,"oooo");


      });
    })
  }


  eliminarProofesors(id:string){

    this.matDialogRefE = this.matDialog.open(EliminarComponent, {
      data: {name: id, animal: this.animal},
      disableClose: false
    });

    this.matDialogRefE.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.name = "";
      }
    });
  }


  aceptarEspaq(){
    this.aceptarEspa();

  }


  aceptarEspa(){
        let maestro:any = []
         for (let q = 0; q < this.maestroEspañol.length; q++) {
          if (this.maestroEspañol[q].asignatura === "ESPAÑOL") {
            maestro.push(this.maestroEspañol[q])
          }
         }
         if (maestro.length === 1 || maestro.length === 0 ) {
          this.toastr.error(' Error!', 'Tienes que colocar 5 o 6 Profesores ', {
            timeOut: 4000,
          })
         }else{
          //console.log(maestro);
          let horasTotales = 0
          for (let i = 0; i < maestro.length; i++) {
            horasTotales += maestro[i].horas;
          }
          if (maestro.length === 5) {
            if (horasTotales >= 75) {

              this.toastr.success(`Se cargaron 5 elementos`, 'Exito', {
                timeOut: 4000,
              });
              let pasan:any = [""]
              for (let o = 0; o < maestro.length; o++) {
                if (maestro[o].horas < 5 ) {
                  pasan.push({
                     0: maestro[o].horas,
                     1:1+o
                  })
                }
              }
              if (pasan == "") {
                  let arr:any = []
                  let asignacion = [3,3,3,4,2]
                   let split = asignacion.sort()
                  let orden:any = []
                  let  datosst:any = []
                  for (let v = 0; v < maestro.length; v++) {
                    orden.push({
                      horas:parseFloat((maestro[v].horas/5).toFixed(0)),
                      id:maestro[v].id,
                      hor:maestro[v].horas
                    })
                  }
                  const maestrosOrdenados = orden.sort((a:any, b:any) => a.horas - b.horas)
                  for (let g = 0; g < maestrosOrdenados.length; g++) {
                    if (maestrosOrdenados[g].horas <= 1 ) {
                      this.toastr.error(`No se puede ejecutar la operacion,
                                           no puede haber menos de 15 horas en un
                                           profesor`, 'Error!', {
                          timeOut: 4000,
                        })
                        return
                    }
                  }
                  for (let a = 0; a < orden.length; a++) {
                    if (parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 === 0) {
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: 0,
                        tutoria: 0
                      })
                    }else{
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 - 1,
                        tutoria: 1
                      })
                    }
                  }
                  let nio:any=[]
                  for (let z = 0; z < maestrosOrdenados.length; z++) {
                    if (maestrosOrdenados[z].horas  >= split[z]) {
                      nio.push({status:true})
                    }else{
                      this.toastr.error(`No se pudo ejecutar. El algoritmo de los grupos no cuadran con las horas`, 'Error!', {
                        timeOut: 4000,
                      })
                      return
                    }
                  }
                  let incertar:any =  {
                                    0:{
                                      lunes: ["3E","","2E","","","",""],
                                      martes:["3E","","2E","","","",""],
                                      miercoles:["3E","2E","","","","",""],
                                      jueves:["3E","2E","","","","",""],
                                      viernes:["2E","3E","","","","",""]
                                    },
                                    1:{
                                      lunes: ["","1A","","1B","2D","",""],
                                      martes:["","","1A","","1B","",""],
                                      miercoles:["","","","1B","","1A","2D"],
                                      jueves:["","","","","","1B","1A"],
                                      viernes:["","","","1B","1A","2D",""]
                                    },
                                    2:{
                                      lunes: ["","2B","2C","2A","","",""],
                                      martes:["2B","2A","","2C","","",""],
                                      miercoles:["","","","","2C","2A","2B"],
                                      jueves:["2A","2C","2B","","","",""],
                                      viernes:["2B","2C","2A","","","",""]
                                    },
                                    3:{
                                      lunes: ["","","","1C","1E","","1D"],
                                      martes:["","","1C","","","1D","1E"],
                                      miercoles:["","","","","1C","1D","1E"],
                                      jueves:["","","","1C","1D","1E",""],
                                      viernes:["","","","1D","1E","1C"]
                                    },
                                    4:{
                                      lunes: ["","","3C","3D","","3B","3A"],
                                      martes:["3D","3B","","3C","3A","",""],
                                      miercoles:["3C","3A","3D","3B","","",""],
                                      jueves:["","","3A","3B","","3C","3D"],
                                      viernes:["3D","3B","3A","3C","","",""]
                                    },

                                  }
                  for (let c = 0; c < maestrosOrdenados.length; c++) {
                    this.cargarGrupos(maestrosOrdenados[c].id, incertar[c],datosst[c].se,datosst[c].tutoria)
                  }
                  this.toastr.success(`Se cargaron los horarios de español`, 'Exito', {
                    timeOut: 4000,
                  });
              }else{
                this.toastr.error(`En alguna posicion tienes menos de 5 horas`, 'Error!', {
                  timeOut: 4000,
                })
              }
            }else{
              this.toastr.error(` No se puede hacer la ejecucion, la suma es ${horasTotales} horas, tienen que ser mas de 75 horas`, 'Error', {
                timeOut: 4000,
              })
            }
          }
          if (maestro.length === 4 || maestro.length === 3 || maestro.length === 2){
            this.toastr.error(`No hay un algoritmo que se puede ejecturar con 2,3 y 4 profesores`, 'Error!', {
              timeOut: 4000,
            })
            return
          }
          if (maestro.length === 6){
            console.log("se puede");
            return
          }
         }
  }

  aceptarMate(){
    let maestro:any = []
    for (let q = 0; q < this.maestroEspañol.length; q++) {
      if (this.maestroEspañol[q].asignatura === "MATEMATICAS") {
        maestro.push(this.maestroEspañol[q])
      }
     }

     console.log(maestro);
     if (maestro.length === 1 || maestro.length === 0 ) {
      this.toastr.error(' Error!', 'Tienes que colocar 4 o 5 Profesores ', {
        timeOut: 4000,
      })
     }else{
      let horasTotales = 0
          for (let i = 0; i < maestro.length; i++) {
            horasTotales += maestro[i].horas;
          }
          if (maestro.length === 4) {
            if (horasTotales >= 75) {
              this.toastr.success(`Se cargaron 4 elementos`, 'Exito', {
                timeOut: 4000,
              });
              let pasan:any = [""]
              for (let o = 0; o < maestro.length; o++) {
                if (maestro[o].horas < 5 ) {
                  pasan.push({
                     0: maestro[o].horas,
                     1:1+o
                  })
                }
              }
              if (pasan == "") {
                let arr:any = []
                  let asignacion = [2,6,3,4]
                   let split = asignacion.sort()
                  let orden:any = []
                  let  datosst:any = []
                  for (let v = 0; v < maestro.length; v++) {
                    orden.push({
                      horas:parseFloat((maestro[v].horas/5).toFixed(0)),
                      id:maestro[v].id,
                      hor:maestro[v].horas
                    })
                  }
                  const maestrosOrdenados = orden.sort((a:any, b:any) => a.horas - b.horas)
                  for (let g = 0; g < maestrosOrdenados.length; g++) {
                    if (maestrosOrdenados[g].horas <= 1 ) {
                      this.toastr.error(`No se puede ejecutar la operacion,
                                           no puede haber menos de 15 horas en un
                                           profesor`, 'Error!', {
                          timeOut: 4000,
                        })
                        return
                    }
                  }
                  for (let a = 0; a < orden.length; a++) {
                    if (parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 === 0) {
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: 0,
                        tutoria: 0
                      })
                    }else{
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 - 1,
                        tutoria: 1
                      })
                    }
                  }
                  let nio:any=[]
                  for (let z = 0; z < maestrosOrdenados.length; z++) {
                    if (maestrosOrdenados[z].horas  >= split[z]) {
                      nio.push({status:true})
                    }else{
                      this.toastr.error(`No se pudo ejecutar. El algoritmo de los grupos no cuadran con las horas`, 'Error!', {
                        timeOut: 4000,
                      })
                      return
                    }
                  }
                  let incertar:any =  {
                    0:{
                      lunes: ["2D","","1A","","","",""],
                      martes:["1A","2D","","","","",""],
                      miercoles:["","","","1A","","2D",""],
                      jueves:["1A","","2D","","","",""],
                      viernes:["1A","","2D","","","",""]
                    },
                    1:{
                      lunes: ["2B","2C","2A","","","",""],
                      martes:["2A","2B","2C","","","",""],
                      miercoles:["2B","2A","2C","","","",""],
                      jueves:["2C","2B","2A","","","",""],
                      viernes:["2B","2A","2C","","","",""]
                    },
                    2:{
                      lunes: ["1B","1C","1D","1E","","",""],
                      martes:["1C","1D","1E","1B","","",""],
                      miercoles:["","","","1C","1B","1E","1D"],
                      jueves:["1D","1C","1B","1E","","",""],
                      viernes:["1E","1B","1C","1D","","",""]
                    },
                    3:{
                      lunes: ["","2E","3A","3B","3C","3D","3E"],
                      martes:["2E","","3B","3A","3C","3E","3D"],
                      miercoles:["","3B","3A","3C","3D","3E","2E"],
                      jueves:["2E","3E","","3C","3D","3B","3A"],
                      viernes:["3D","3D","","2E","3C","3A","3B"]
                    }

                  }
              for (let c = 0; c < maestrosOrdenados.length; c++) {
                this.cargarGrupos(maestrosOrdenados[c].id, incertar[c],datosst[c].se,datosst[c].tutoria)
              }
              this.toastr.success(`Se cargaron los horarios de español`, 'Exito', {
                timeOut: 4000,
              });
              }else{
                this.toastr.error(`En alguna posicion tienes menos de 5 horas`, 'Error!', {
                  timeOut: 4000,
                })
              }
            }else{
              this.toastr.error(` No se puede hacer la ejecucion, la suma es ${horasTotales} horas, tienen que ser mas de 75 horas`, 'Error', {
                timeOut: 4000,
              })
            }


          }
          if (maestro.length === 3 || maestro.length === 2 ){
            this.toastr.error(`No hay un algoritmo que se puede ejecturar con 2 y 3 profesores`, 'Error!', {
              timeOut: 4000,
            })
            return
          }

     }

  }
  aceptarCien(){
    let maestro:any = []
    for (let q = 0; q < this.maestroEspañol.length; q++) {
      if (this.maestroEspañol[q].asignatura === "CIENCIAS") {
        maestro.push(this.maestroEspañol[q])
      }
     }
     if (maestro.length === 1 || maestro.length === 0 ) {
      this.toastr.error(' Error!', 'Tienes que colocar 4 o 5 Profesores ', {
        timeOut: 4000,
      })
     }else{
      let horasTotales = 0
          for (let i = 0; i < maestro.length; i++) {
            horasTotales += maestro[i].horas;
          }
          if (maestro.length === 4) {
            if (horasTotales >= 80) {
              this.toastr.success(`Se cargaron 4 elementos`, 'Exito', {
                timeOut: 4000,
              });
              let pasan:any = [""]
              for (let o = 0; o < maestro.length; o++) {
                if (maestro[o].horas < 5 ) {
                  pasan.push({
                     0: maestro[o].horas,
                     1:1+o
                  })
                }
              }
              if (pasan == "") {
                let arr:any = []
                  let asignacion = [5,5,3,2]
                   let split = asignacion.sort()
                  let orden:any = []
                  let  datosst:any = []
                  for (let v = 0; v < maestro.length; v++) {
                    orden.push({
                      horas:parseFloat((maestro[v].horas/5).toFixed(0)),
                      id:maestro[v].id,
                      hor:maestro[v].horas
                    })
                  }
                  const maestrosOrdenados = orden.sort((a:any, b:any) => a.horas - b.horas)
                  for (let g = 0; g < maestrosOrdenados.length; g++) {
                    if (maestrosOrdenados[g].horas <= 1 ) {
                      this.toastr.error(`No se puede ejecutar la operacion,
                                           no puede haber menos de 15 horas en un
                                           profesor`, 'Error!', {
                          timeOut: 4000,
                        })
                        return
                    }
                  }
                  for (let a = 0; a < orden.length; a++) {
                    if (parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 === 0) {
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: 0,
                        tutoria: 0
                      })
                    }else{
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 - 1,
                        tutoria: 1
                      })
                    }
                  }
                  let nio:any=[]
                  for (let z = 0; z < maestrosOrdenados.length; z++) {
                    if (maestrosOrdenados[z].horas  >= split[z]) {
                      nio.push({status:true})
                    }else{
                      this.toastr.error(`No se pudo ejecutar. El algoritmo de los grupos no cuadran con las horas`, 'Error!', {
                        timeOut: 4000,
                      })
                      return
                    }
                  }
                  let incertar:any =  {
                    0:{
                      lunes: ["","","","","3D","3E",""],
                      martes:["","","","3E","3E","3D",""],
                      miercoles:["","","3E","","","3D","3D"],
                      jueves:["","","","","3E","3D",""],
                      viernes:["","","3D","3E","","",""]
                    },
                    1:{
                      lunes: ["3C","3A","3B","","","",""],
                      martes:["3A","3C","3A","3B","","",""],
                      miercoles:["3A","3C","3B","","","",""],
                      jueves:["3C","3C","3B","3A","3A","",""],
                      viernes:["","3C","3B","3B","","",""]
                    },
                    2:{
                      lunes: ["2C","2A","","2E","2B","2E",""],
                      martes:["","2C","2A","2B","2D","2E","2D"],
                      miercoles:["2A","2D","2D","2A","2B","2E","2C"],
                      jueves:["2B","2D","2E","2B","","2C","2A"],
                      viernes:["2D","2E","","2C","2B","2C","2A"]
                    },
                    3:{
                      lunes: ["1A","1D","","1D","","1E",""],
                      martes:["1D","1E","1B","1C","1A","",""],
                      miercoles:["1D","","1B","","1E","","1A"],
                      jueves:["1C","","1B","1B","1A","",""],
                      viernes:["1C","","1B","","","1C",""]
                    }

                  }
              for (let c = 0; c < maestrosOrdenados.length; c++) {
                this.cargarGrupos(maestrosOrdenados[c].id, incertar[c],datosst[c].se,datosst[c].tutoria)
              }
              this.toastr.success(`Se cargaron los horarios de español`, 'Exito', {
                timeOut: 4000,
              });
              }else{
                this.toastr.error(`En alguna posicion tienes menos de 5 horas`, 'Error!', {
                  timeOut: 4000,
                })
              }
            }else{
              this.toastr.error(` No se puede hacer la ejecucion, la suma es ${horasTotales} horas, tienen que ser mas de 75 horas`, 'Error', {
                timeOut: 4000,
              })
            }


          }
          if (maestro.length === 3 || maestro.length === 2 ){
            this.toastr.error(`No hay un algoritmo que se puede ejecturar con 2 y 3 profesores`, 'Error!', {
              timeOut: 4000,
            })
            return
          }

     }

  }

  aceptarGeo(){
    let maestro:any = []
    for (let q = 0; q < this.maestroEspañol.length; q++) {
      if (this.maestroEspañol[q].asignatura === "GEOGRAFIA") {
        maestro.push(this.maestroEspañol[q])
      }
     }
     if (maestro.length === 0 ) {
      this.toastr.error(' Error!', 'Tienes que colocar 1 Profesores ', {
        timeOut: 4000,
      })
     }else{
      let horasTotales = 0
          for (let i = 0; i < maestro.length; i++) {
            horasTotales += maestro[i].horas;
          }
          if (maestro.length === 1) {
            if (horasTotales >= 20) {
              this.toastr.success(`Se cargaron 1 elementos`, 'Exito', {
                timeOut: 4000,
              });
              let pasan:any = [""]
              for (let o = 0; o < maestro.length; o++) {
                if (maestro[o].horas < 5 ) {
                  pasan.push({
                     0: maestro[o].horas,
                     1:1+o
                  })
                }
              }
              if (pasan == "") {
                let arr:any = []
                  let asignacion = [5]
                   let split = asignacion.sort()
                  let orden:any = []
                  let  datosst:any = []
                  for (let v = 0; v < maestro.length; v++) {
                    orden.push({
                      horas:parseFloat((maestro[v].horas/5).toFixed(0)),
                      id:maestro[v].id,
                      hor:maestro[v].horas
                    })
                  }
                  const maestrosOrdenados = orden.sort((a:any, b:any) => a.horas - b.horas)
                  for (let g = 0; g < maestrosOrdenados.length; g++) {
                    if (maestrosOrdenados[g].horas <= 1 ) {
                      this.toastr.error(`No se puede ejecutar la operacion,
                                           no puede haber menos de 15 horas en un
                                           profesor`, 'Error!', {
                          timeOut: 4000,
                        })
                        return
                    }
                  }
                  for (let a = 0; a < orden.length; a++) {
                    if (parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 === 0) {
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: 0,
                        tutoria: 0
                      })
                    }else{
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 - 1,
                        tutoria: 1
                      })
                    }
                  }
                  let nio:any=[]
                  for (let z = 0; z < maestrosOrdenados.length; z++) {
                    if (maestrosOrdenados[z].horas  >= split[z]) {
                      nio.push({status:true})
                    }else{
                      this.toastr.error(`No se pudo ejecutar. El algoritmo de los grupos no cuadran con las horas`, 'Error!', {
                        timeOut: 4000,
                      })
                      return
                    }
                  }
                  let incertar:any =  {
                    0:{
                      lunes: ["1C","1E","1B","1A","1D","",""],
                      martes:["1B","1C","1D","","2E","1E","1A"],
                      miercoles:["1B","1A","1C","","","",""],
                      jueves:["1B","1E","1C","","","","1D"],
                      viernes:["1D","1E","","1A","","",""]
                    }
                  }
              for (let c = 0; c < maestrosOrdenados.length; c++) {
                this.cargarGrupos(maestrosOrdenados[c].id, incertar[c],datosst[c].se,datosst[c].tutoria)
              }
              this.toastr.success(`Se cargaron los horarios de geografia`, 'Exito', {
                timeOut: 4000,
              });
              }else{
                this.toastr.error(`En alguna posicion tienes menos de 5 horas`, 'Error!', {
                  timeOut: 4000,
                })
              }
            }else{
              this.toastr.error(` No se puede hacer la ejecucion, la suma es ${horasTotales} horas, tienen que ser mas de 20 horas`, 'Error', {
                timeOut: 4000,
              })
            }


          }

     }

  }

  aceptarCvcE(){
    let maestro:any = []
    for (let q = 0; q < this.maestroEspañol.length; q++) {
      if (this.maestroEspañol[q].asignatura === "FORMACION CIVICA Y ETICA") {
        maestro.push(this.maestroEspañol[q])
      }
     }
     if (maestro.length === 1 || maestro.length === 0 ) {
      this.toastr.error(' Error!', 'Tienes que colocar 3 o 4 Profesores ', {
        timeOut: 4000,
      })
     }else{
      let horasTotales = 0
          for (let i = 0; i < maestro.length; i++) {
            horasTotales += maestro[i].horas;
          }
          if (maestro.length === 4) {
            if (horasTotales >= 40) {
              this.toastr.success(`Se cargaron 4 elementos`, 'Exito', {
                timeOut: 4000,
              });
              let pasan:any = [""]
              for (let o = 0; o < maestro.length; o++) {
                if (maestro[o].horas < 5 ) {
                  pasan.push({
                     0: maestro[o].horas,
                     1:1+o
                  })
                }
              }
              if (pasan == "") {
                let arr:any = []
                  let asignacion = [6,4,1,3]
                   let split = asignacion.sort()
                  let orden:any = []
                  let  datosst:any = []
                  for (let v = 0; v < maestro.length; v++) {
                    orden.push({
                      horas:parseFloat((maestro[v].horas/5).toFixed(0)),
                      id:maestro[v].id,
                      hor:maestro[v].horas
                    })
                  }


                  const maestrosOrdenados = orden.sort((a:any, b:any) => a.horas - b.horas)
                  for (let g = 0; g < maestrosOrdenados.length; g++) {
                    console.log(maestrosOrdenados);
                    if (maestrosOrdenados[g].horas < 1 ) {
                      this.toastr.error(`No se puede ejecutar la operacion,
                                           no puede haber menos de 15 horas en un
                                           profesor`, 'Error!', {
                          timeOut: 4000,
                        })
                        return
                    }
                  }
                  for (let a = 0; a < orden.length; a++) {
                    if (parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 === 0) {
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: 0,
                        tutoria: 0
                      })
                    }else{
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 - 1,
                        tutoria: 1
                      })
                    }
                  }
                  let nio:any=[]
                  for (let z = 0; z < maestrosOrdenados.length; z++) {
                    if (maestrosOrdenados[z].horas  >= split[z]) {
                      nio.push({status:true})
                    }else{
                      this.toastr.error(`No se pudo ejecutar. El algoritmo de los grupos no cuadran con las horas`, 'Error!', {
                        timeOut: 4000,
                      })
                      return
                    }
                  }
                  let incertar:any =  {
                    0:{
                      lunes: ["","","","","","",""],
                      martes:["","","","","","",""],
                      miercoles:["","","","","","",""],
                      jueves:["","","","","","","1E"],
                      viernes:["","","","","","","1E"]
                    },
                    1:{
                      lunes: ["1D","1B","","","","",""],
                      martes:["","1B","","1A","1D","",""],
                      miercoles:["1A","1C","","","","",""],
                      jueves:["","","","","1C","",""],
                      viernes:["","","","","","",""]
                    },
                    2:{
                      lunes: ["","","","","","2A","2B"],
                      martes:["","","","1D","1E","1C","1B"],
                      miercoles:["1E","","1A","2B","","",""],
                      jueves:["","","1D","1A","","",""],
                      viernes:["1B","","","","1C","2A",""]
                    },
                    3:{
                      lunes: ["","3C","2D","2C","3A","2B",""],
                      martes:["2C","2E","3D","2A","","2B",""],
                      miercoles:["","2C","2E","2D","3E","2B",""],
                      jueves:["2D","2A","3D","3E","2B","",""],
                      viernes:["2A","2C","2B","3A","2E","2B",""]
                    }

                  }
              for (let c = 0; c < maestrosOrdenados.length; c++) {
                this.cargarGrupos(maestrosOrdenados[c].id, incertar[c],datosst[c].se,datosst[c].tutoria)
              }
              this.toastr.success(`Se cargaron los horarios de español`, 'Exito', {
                timeOut: 4000,
              });
              }else{
                this.toastr.error(`En alguna posicion tienes menos de 2 horas`, 'Error!', {
                  timeOut: 4000,
                })
              }
            }else{
              this.toastr.error(` No se puede hacer la ejecucion, la suma es ${horasTotales} horas, tienen que ser mas de 30 horas`, 'Error', {
                timeOut: 4000,
              })
            }


          }
          if (maestro.length === 3 || maestro.length === 2 ){
            this.toastr.error(`No hay un algoritmo que se puede ejecturar con 2 y 3 profesores`, 'Error!', {
              timeOut: 4000,
            })
            return
          }

     }

  }

  aceptarEF(){
    let maestro:any = []
    for (let q = 0; q < this.maestroEspañol.length; q++) {
      if (this.maestroEspañol[q].asignatura === "EDUCACION FISICA") {
        maestro.push(this.maestroEspañol[q])
      }
     }

     console.log(maestro);
     if (maestro.length === 1 || maestro.length === 0 ) {
      this.toastr.error(' Error!', 'Tienes que colocar 2 o 3 Profesores ', {
        timeOut: 4000,
      })
     }else{
      let horasTotales = 0
          for (let i = 0; i < maestro.length; i++) {
            horasTotales += maestro[i].horas;
          }
          if (maestro.length === 2) {
            if (horasTotales >= 30) {
              this.toastr.success(`Se cargaron 2 elementos`, 'Exito', {
                timeOut: 4000,
              });
              let pasan:any = [""]
              for (let o = 0; o < maestro.length; o++) {
                if (maestro[o].horas < 10 ) {
                  pasan.push({
                     0: maestro[o].horas,
                     1:1+o
                  })
                }
              }
              if (pasan == "") {
                let arr:any = []
                  let asignacion = [9,6]
                   let split = asignacion.sort()
                  let orden:any = []
                  let  datosst:any = []
                  for (let v = 0; v < maestro.length; v++) {
                    orden.push({
                      horas:parseFloat((maestro[v].horas/3).toFixed(0)),
                      id:maestro[v].id,
                      hor:maestro[v].horas
                    })
                  }
                  const maestrosOrdenados = orden.sort((a:any, b:any) => a.horas - b.horas)
                  for (let g = 0; g < maestrosOrdenados.length; g++) {
                    if (maestrosOrdenados[g].horas <= 1 ) {
                      this.toastr.error(`No se puede ejecutar la operacion,
                                           no puede haber menos de 15 horas en un
                                           profesor`, 'Error!', {
                          timeOut: 4000,
                        })
                        return
                    }
                  }
                  for (let a = 0; a < orden.length; a++) {
                    if (parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 === 0) {
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: 0,
                        tutoria: 0
                      })
                    }else{
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 - 1,
                        tutoria: 1
                      })
                    }
                  }
                  let nio:any=[]
                  for (let z = 0; z < maestrosOrdenados.length; z++) {

                    console.log(maestrosOrdenados[z].horas, split[z]);

                    if (maestrosOrdenados[z].horas  >= split[z]) {
                      nio.push({status:true})
                    }else{
                      this.toastr.error(`No se pudo ejecutar. El algoritmo de los grupos no cuadran con las horas`, 'Error!', {
                        timeOut: 4000,
                      })
                      return
                    }
                  }
                  let incertar:any =  {
                    0:{
                      lunes: ["","","","","","",""],
                      martes:["","","","","","",""],
                      miercoles:["","","","2E","1D","1C","1B"],
                      jueves:["","1A","","","1E","1D",""],
                      viernes:["","1C","","1E","1B","1A","2E"]
                    },
                    1:{
                      lunes: ["3D","3B","2B","3E","2C","",""],
                      martes:["","3D","3E","","","3B",""],
                      miercoles:["2C","2B","2A","3A","2D","2A","2B"],
                      jueves:["3A","","3C","2A","","",""],
                      viernes:["","2D","3C","2B","","",""]
                    }

                  }
              for (let c = 0; c < maestrosOrdenados.length; c++) {
                this.cargarGrupos(maestrosOrdenados[c].id, incertar[c],datosst[c].se,datosst[c].tutoria)
              }

              this.toastr.success(`Se cargaron los horarios de español`, 'Exito', {
                timeOut: 4000,
              });
              }else{
                this.toastr.error(`En alguna posicion tienes menos de 5 horas`, 'Error!', {
                  timeOut: 4000,
                })
              }
            }else{
              this.toastr.error(` No se puede hacer la ejecucion, la suma es ${horasTotales} horas, tienen que ser mas de 75 horas`, 'Error', {
                timeOut: 4000,
              })
            }


          }
          if (maestro.length === 4 || maestro.length === 3 ){
            this.toastr.error(`No hay un algoritmo que se puede ejecturar con 2 y 3 profesores`, 'Error!', {
              timeOut: 4000,
            })
            return
          }

     }

  }

  aceptarIngles(){
    let maestro:any = []
    for (let q = 0; q < this.maestroEspañol.length; q++) {
      if (this.maestroEspañol[q].asignatura === "INGLES") {
        maestro.push(this.maestroEspañol[q])
      }
     }
     if (maestro.length === 1 || maestro.length === 0 ) {
      this.toastr.error(' Error!', 'Tienes que colocar 3 o 4 Profesores ', {
        timeOut: 4000,
      })
     }else{
      let horasTotales = 0
          for (let i = 0; i < maestro.length; i++) {
            horasTotales += maestro[i].horas;
          }
          if (maestro.length === 3) {
            if (horasTotales >= 45) {
              this.toastr.success(`Se cargaron 3 elementos`, 'Exito', {
                timeOut: 4000,
              });
              let pasan:any = [""]
              for (let o = 0; o < maestro.length; o++) {
                if (maestro[o].horas < 5 ) {
                  pasan.push({
                     0: maestro[o].horas,
                     1:1+o
                  })
                }
              }
              if (pasan == "") {
                let arr:any = []
                  let asignacion = [3,7,4]
                   let split = asignacion.sort()
                  let orden:any = []
                  let  datosst:any = []
                  for (let v = 0; v < maestro.length; v++) {
                    orden.push({
                      horas:parseFloat((maestro[v].horas/5).toFixed(0)),
                      id:maestro[v].id,
                      hor:maestro[v].horas
                    })
                  }
                  const maestrosOrdenados = orden.sort((a:any, b:any) => a.horas - b.horas)
                  for (let g = 0; g < maestrosOrdenados.length; g++) {
                    if (maestrosOrdenados[g].horas <= 1 ) {
                      this.toastr.error(`No se puede ejecutar la operacion,
                                           no puede haber menos de 15 horas en un
                                           profesor`, 'Error!', {
                          timeOut: 4000,
                        })
                        return
                    }
                  }
                  for (let a = 0; a < orden.length; a++) {
                    if (parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 === 0) {
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: 0,
                        tutoria: 0
                      })
                    }else{
                      datosst.push({
                        s:orden[a].horas,
                        horas:orden[a].hor,
                        id:orden[a].id,
                        se: parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 - 1,
                        tutoria: 1
                      })
                    }
                  }
                  let nio:any=[]
                  for (let z = 0; z < maestrosOrdenados.length; z++) {
                    console.log(split[z]);
                    console.log(maestrosOrdenados[z].horas );


                    if (maestrosOrdenados[z].horas  >= split[z]) {
                      nio.push({status:true})
                    }else{
                      this.toastr.error(`No se pudo ejecutar. El algoritmo de los grupos no cuadran con las horas`, 'Error!', {
                        timeOut: 4000,
                      })
                      return
                    }
                  }
                  let incertar:any =  {
                    0:{
                      lunes: ["","","","","","",""],
                      martes:["","","","","","",""],
                      miercoles:["","","","","1A","1B","1C"],
                      jueves:["","","","","1B","1A","1C"],
                      viernes:["","","","1C","","1B","1A"]
                    },
                    1:{
                      lunes: ["","2D","1E","","2E","1D",""],
                      martes:["1E","","","2D","","","2E"],
                      miercoles:["2D","","","","2E","",""],
                      jueves:["","1D","","","","",""],
                      viernes:["","1D","","","1E","",""]
                    },
                    2:{
                      lunes: ["2A","3D","","3A","3E","3C","3B"],
                      martes:["","","3C","","3D","3A","3B"],
                      miercoles:["","3D","2B","","2A","2C","3E"],
                      jueves:["","3B","2C","","3C","2A","2B"],
                      viernes:["","","3E","","2C","2B","3A"]
                    }
                  }

              for (let c = 0; c < maestrosOrdenados.length; c++) {
                this.cargarGrupos(maestrosOrdenados[c].id, incertar[c],datosst[c].se,datosst[c].tutoria)
              }
              this.toastr.success(`Se cargaron los horarios de español`, 'Exito', {
                timeOut: 4000,
              });
              }else{
                this.toastr.error(`En alguna posicion tienes menos de 5 horas`, 'Error!', {
                  timeOut: 4000,
                })
              }
            }else{
              this.toastr.error(` No se puede hacer la ejecucion, la suma es ${horasTotales} horas, tienen que ser mas de 75 horas`, 'Error', {
                timeOut: 4000,
              })
            }


          }

     }

  }


  aceptarMusic(){

    let maestro:any = []
    for (let q = 0; q < this.maestroEspañol.length; q++) {
     if (this.maestroEspañol[q].asignatura === "MUSICA") {
       maestro.push(this.maestroEspañol[q])
     }
    }
    if (maestro.length === 1 || maestro.length === 0 ) {
     this.toastr.error(' Error!', 'Tienes que colocar 2 o 3 Profesores ', {
       timeOut: 4000,
     })
    }else{
     //console.log(maestro);
     let horasTotales = 0
     for (let i = 0; i < maestro.length; i++) {
       horasTotales += maestro[i].horas;
     }
     if (maestro.length === 2) {
       if (horasTotales >= 45) {

         this.toastr.success(`Se cargaron 2 elementos`, 'Exito', {
           timeOut: 4000,
         });
         let pasan:any = [""]
         for (let o = 0; o < maestro.length; o++) {
           if (maestro[o].horas < 5 ) {
             pasan.push({
                0: maestro[o].horas,
                1:1+o
             })
           }
         }
         if (pasan == "") {
             let arr:any = []
             let asignacion = [10,5]
              let split = asignacion.sort()
             let orden:any = []
             let  datosst:any = []
             for (let v = 0; v < maestro.length; v++) {
               orden.push({
                 horas:parseFloat((maestro[v].horas/2).toFixed(0)),
                 id:maestro[v].id,
                 hor:maestro[v].horas
               })
             }
             const maestrosOrdenados = orden.sort((a:any, b:any) => a.horas - b.horas)
             for (let g = 0; g < maestrosOrdenados.length; g++) {
               if (maestrosOrdenados[g].horas <= 1 ) {
                 this.toastr.error(`No se puede ejecutar la operacion,
                                      no puede haber menos de 15 horas en un
                                      profesor`, 'Error!', {
                     timeOut: 4000,
                   })
                   return
               }
             }
             for (let a = 0; a < orden.length; a++) {
               if (parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 === 0) {
                 datosst.push({
                   s:orden[a].horas,
                   horas:orden[a].hor,
                   id:orden[a].id,
                   se: 0,
                   tutoria: 0
                 })
               }else{
                 datosst.push({
                   s:orden[a].horas,
                   horas:orden[a].hor,
                   id:orden[a].id,
                   se: parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 - 1,
                   tutoria: 1
                 })
               }
             }

             let nio:any=[]
             for (let z = 0; z < maestrosOrdenados.length; z++) {
              console.log(maestrosOrdenados[z].horas, split[z]);
               if (maestrosOrdenados[z].horas  >= split[z]) {
                 nio.push({status:true})
               }else{
                 this.toastr.error(`No se pudo ejecutar. El algoritmo de los grupos no cuadran con las horas`, 'Error!', {
                   timeOut: 4000,
                 })
                 return
               }
             }
             let incertar:any =  {
                               0:{
                                 lunes: ["2E","","3D","2D","","",""],
                                 martes:["3B","1A","2D","","","",""],
                                 miercoles:["3D","","","","","",""],
                                 jueves:["3B","3D","1A","2E","","",""],
                                 viernes:["3B","1A","2E","2D","","",""]
                               },
                               1:{
                                 lunes: ["3A","3E","1C","2B","2A","2C","3C"],
                                 martes:["3C","3E","2B","1E","1C","1B","1D"],
                                 miercoles:["1C","1B","","2C","","",""],
                                 jueves:["1E","1B","3E","1D","2A","3A","2C"],
                                 viernes:["3C","3A","1E","2A","","1D","2B"]
                               }

                             }
             for (let c = 0; c < maestrosOrdenados.length; c++) {
               this.cargarGrupos(maestrosOrdenados[c].id, incertar[c],datosst[c].se,datosst[c].tutoria)
             }
             this.toastr.success(`Se cargaron los horarios de español`, 'Exito', {
               timeOut: 4000,
             });
         }else{
           this.toastr.error(`En alguna posicion tienes menos de 5 horas`, 'Error!', {
             timeOut: 4000,
           })
         }
       }else{
         this.toastr.error(` No se puede hacer la ejecucion, la suma es ${horasTotales} horas, tienen que ser mas de 75 horas`, 'Error', {
           timeOut: 4000,
         })
       }
     }
     if (maestro.length === 5 || maestro.length === 4){
       this.toastr.error(`No hay un algoritmo que se puede ejecturar con 2,3 y 4 profesores`, 'Error!', {
         timeOut: 4000,
       })
       return
     }
     if (maestro.length === 6){
       console.log("se puede");
       return
     }
    }

  }

  aceptarVS(){

    let maestro:any = []
    for (let q = 0; q < this.maestroEspañol.length; q++) {
     if (this.maestroEspañol[q].asignatura === "VIDA SALUDABLE") {
       maestro.push(this.maestroEspañol[q])
     }
    }
    console.log(maestro);

    if (maestro.length === 1 || maestro.length === 0 ) {
     this.toastr.error(' Error!', 'Tienes que colocar 3 Profesores ', {
       timeOut: 4000,
     })
    }else{
     //console.log(maestro);
     let horasTotales = 0
     for (let i = 0; i < maestro.length; i++) {
       horasTotales += maestro[i].horas;
     }
     if (maestro.length === 3) {
       if (horasTotales >= 15) {

         this.toastr.success(`Se cargaron 2 elementos`, 'Exito', {
           timeOut: 4000,
         });
         let pasan:any = [""]
         for (let o = 0; o < maestro.length; o++) {
           if (maestro[o].horas < 5 ) {
             pasan.push({
                0: maestro[o].horas,
                1:1+o
             })
           }
         }
         if (pasan == "") {
             let arr:any = []
             let asignacion = [5,5,5]
              let split = asignacion.sort()
             let orden:any = []
             let  datosst:any = []
             for (let v = 0; v < maestro.length; v++) {
               orden.push({
                 horas:parseFloat((maestro[v].horas/3).toFixed(0)),
                 id:maestro[v].id,
                 hor:maestro[v].horas
               })
             }
             const maestrosOrdenados = orden.sort((a:any, b:any) => a.horas - b.horas)
             for (let g = 0; g < maestrosOrdenados.length; g++) {
               if (maestrosOrdenados[g].horas <= 1 ) {
                 this.toastr.error(`No se puede ejecutar la operacion,
                                      no puede haber menos de 15 horas en un
                                      profesor`, 'Error!', {
                     timeOut: 4000,
                   })
                   return
               }
             }
             for (let a = 0; a < orden.length; a++) {
               if (parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 === 0) {
                 datosst.push({
                   s:orden[a].horas,
                   horas:orden[a].hor,
                   id:orden[a].id,
                   se: 0,
                   tutoria: 0
                 })
               }else{
                 datosst.push({
                   s:orden[a].horas,
                   horas:orden[a].hor,
                   id:orden[a].id,
                   se: parseFloat((orden[a].hor/5 - split[a]).toFixed(1))*5 - 1,
                   tutoria: 1
                 })
               }
             }

             let nio:any=[]
             for (let z = 0; z < maestrosOrdenados.length; z++) {
              console.log(maestrosOrdenados[z].horas, split[z]);
               if (maestrosOrdenados[z].horas  >= split[z]) {
                 nio.push({status:true})
               }else{
                 this.toastr.error(`No se pudo ejecutar. El algoritmo de los grupos no cuadran con las horas`, 'Error!', {
                   timeOut: 4000,
                 })
                 return
               }
             }
             let incertar:any =  {
                               0:{
                                 lunes: ["","","","","","","1E"],
                                 martes:["","","","","","1A",""],
                                 miercoles:["","","","","","",""],
                                 jueves:["","","","","","1C","1B"],
                                 viernes:["","","","","","","1D"]
                               },
                               1:{
                                lunes: ["","","","","","2D",""],
                                martes:["","","","2E","","",""],
                                miercoles:["","","","","","",""],
                                jueves:["","","","","2C","",""],
                                viernes:["","","","2B","2A","",""]
                               },
                               2:{
                                lunes: ["","","","","","","3D"],
                                martes:["","","","","","","3A"],
                                miercoles:["","","","","","",""],
                                jueves:["","","","","","","3E"],
                                viernes:["","","","","3B","","3C"]
                               }

                             }


             for (let c = 0; c < maestrosOrdenados.length; c++) {
               this.cargarGrupos(maestrosOrdenados[c].id, incertar[c],datosst[c].se,datosst[c].tutoria)
             }
             this.toastr.success(`Se cargaron los horarios de español`, 'Exito', {
               timeOut: 4000,
             });
         }else{
           this.toastr.error(`En alguna posicion tienes menos de 5 horas`, 'Error!', {
             timeOut: 4000,
           })
         }
       }else{
         this.toastr.error(` No se puede hacer la ejecucion, la suma es ${horasTotales} horas, tienen que ser mas de 75 horas`, 'Error', {
           timeOut: 4000,
         })
       }
     }
     if (maestro.length === 5 || maestro.length === 4){
       this.toastr.error(`No hay un algoritmo que se puede ejecturar con 2,3 y 4 profesores`, 'Error!', {
         timeOut: 4000,
       })
       return
     }
     if (maestro.length === 6){
       console.log("se puede");
       return
     }
    }

  }

  cargarGrupos(maestrosOrdena:any, incert:any, hse:any, tuto:any){

    this.profesorService.traesIdProfesor(maestrosOrdena).subscribe(res=>{
      this.maestrodd = {
         nombre: res.payload.data()['nombre'],
         horas: res.payload.data()['horas'],
         Clave: res.payload.data()['Clave'],
         asignatura: res.payload.data()['asignatura'],
         asignaturaDos: res.payload.data()['asignaturaDos'],
         asignaturaTres: res.payload.data()['asignaturaTres'],
         preferencia: res.payload.data()['preferencia'],
         tutoria:tuto,
         se:hse,
           materias:incert
         }
         if ( this.valort === true) {
          this.profesorService.actualizarProfesor(maestrosOrdena, this.maestrodd).then(()=>{
           //console.log("exito");
           this.valort = false
          }).catch(err=>{
           console.log(err);
           this.valort = false
          })
         }

   })
  }



}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
