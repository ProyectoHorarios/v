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

  constructor(private dialog: MatDialog,
    private profesorService:ProfesorService,
    private toastr: ToastrService,
    private matDialog: MatDialog,
    private apiInfoService:ApiInfoService) {

      this.apiInfoService.getGrupos().subscribe(res=>{
        console.log(res);
        this.gupotTotales = res

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

     this.apiInfoService.getAgignaturas().subscribe(res=>{
     this.listaAsignatura = res


    })

    this.profesorService.mostrarAsignatiras().subscribe(res=>{

      let asig:any = []
      let totalasig:any = []
       res.forEach((element:any) => {
         asig.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
        totalasig = asig
       });
       console.log(totalasig,"mostrarAsignatiras");
       let totalasigH = totalasig.hEspanol
       for (let i = 0; i < totalasig.length; i++) {

         if(totalasig[i].id === "CyE"){
           let contador = totalasig[i].htCyE
           let CyE = 0
           for (let i = 0; i < contador.length; i++) {
             CyE += contador[i]
           }
           this.CyEBase = CyE;
         }else if(totalasig[i].id === "artes"){
           let cont = totalasig[i].htArtes
           let artes = 0
           for (let i = 0; i < cont.length; i++) {
             artes += cont[i]
           }
           this.artesBase = artes;
         }else if (totalasig[i].id === "ciencias") {
           let cont = totalasig[i].htCiencias
           let ciencias = 0
           for (let i = 0; i < cont.length; i++) {
             ciencias += cont[i]
           }
           this.cienciasBase = ciencias;
         }else if (totalasig[i].id === "educacionF") {
           let cont = totalasig[i].htEducacionF
           let educacionF = 0
           for (let i = 0; i < cont.length; i++) {
             educacionF += cont[i]
           }
           this.educacionFBase = educacionF;
         }else if (totalasig[i].id === "espanol") {
           let cont = totalasig[i].htEspanol
           let espanol = 0
           for (let i = 0; i < cont.length; i++) {
             espanol += cont[i]
           }
           this.espanolBase = espanol;
         }else if (totalasig[i].id === "geografia") {
           let cont = totalasig[i].htGeografia
           let geografia = 0
           for (let i = 0; i < cont.length; i++) {
             geografia += cont[i]
           }
           this.geografiaBase = geografia;
         }else if (totalasig[i].id === "historia") {
           let cont = totalasig[i].htHistoria
           let historia = 0
           for (let i = 0; i < cont.length; i++) {
             historia += cont[i]
           }
           this.historiaBase = historia;
         }else if (totalasig[i].id === "ingles") {
           let cont = totalasig[i].htIngles
           let ingles = 0
           for (let i = 0; i < cont.length; i++) {
             ingles += cont[i]
           }
           this.inglesBase = ingles;
         }else if (totalasig[i].id === "matematicas") {
           let cont = totalasig[i].htMatematicas
           let matematicas = 0
           for (let i = 0; i < cont.length; i++) {
             matematicas += cont[i]
           }
           this.matematicasBase = matematicas;
         }else if (totalasig[i].id === "tecnologia") {
           let cont = totalasig[i].htTecnologia
           let tecnologia = 0
           for (let i = 0; i < cont.length; i++) {
             tecnologia += cont[i]
           }
           this.tecnologiaBase = tecnologia;
         }else if (totalasig[i].id === "vidaSaludable") {
           let cont = totalasig[i].htVidaSaludable
           let vidaSaludable = 0
           for (let i = 0; i < cont.length; i++) {
             vidaSaludable += cont[i]
           }
           this.vidaSaludableBase = vidaSaludable;
         }




         //console.log(totalasig[i], "----");



       }
       console.log(
         this.CyEBase,
         this.artesBase,
         this.cienciasBase,
         this.educacionFBase,
         this.espanolBase,
         this.geografiaBase,
         this.historiaBase,
         this.inglesBase,
         this.matematicasBase,
         this.tecnologiaBase,
         this.vidaSaludableBase);
         this.totalasigy = totalasigH

         this.profesorService.mostrarProfesores().subscribe(res=>{

          let profes:any = []
          let maestro:any = []
           res.forEach((element:any) => {
            profes.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            })
            maestro = profes


           });

           console.log(this.listaAsignatura);
           console.log(maestro,"mostrarProfesores");

           let espanol = [];
           let matematicas = [];
           let ciencias = [];
           let historia = [];
           let geografia = [];
           let formciveti = [];
           let ingles = [];
           let musica = [];
           let eficica = [];
           let vidasaluda = [];
           let tegnologia = [];
           let titoria = [];

           for (let i = 0; i < maestro.length; i++) {
             if (maestro[i].asignatura === 'ESPAÑOL' || maestro[i].asignaturaDos === 'ESPAÑOL') {
               espanol.push(maestro[i])
             }else if (maestro[i].asignatura === 'MATEMATICAS' || maestro[i].asignaturaDos === 'MATEMATICAS') {
              matematicas.push(maestro[i])
            }else if (maestro[i].asignatura === 'CIENCIAS' || maestro[i].asignaturaDos === 'CIENCIAS') {
              ciencias.push(maestro[i])
            }else if (maestro[i].asignatura === 'HISTORIA' || maestro[i].asignaturaDos === 'HISTORIA') {
              historia.push(maestro[i])
            }else if (maestro[i].asignatura === 'GEOGRAFIA' || maestro[i].asignaturaDos === 'GEOGRAFIA') {
              geografia.push(maestro[i])
            }else if (maestro[i].asignatura === 'FORMACION CIVICA Y ETICA' || maestro[i].asignaturaDos === 'FORMACION CIVICA Y ETICA') {
              formciveti.push(maestro[i])
            }else if (maestro[i].asignatura === 'INGLES' || maestro[i].asignaturaDos === 'INGLES') {
              ingles.push(maestro[i])
            }else if (maestro[i].asignatura === 'MUSICA' || maestro[i].asignaturaDos === 'MUSICA') {
              musica.push(maestro[i])
            }else if (maestro[i].asignatura === 'EDUCACION FISICA' || maestro[i].asignaturaDos === 'EDUCACION FISICA') {
              eficica.push(maestro[i])
            }else if (maestro[i].asignatura === 'VIDA SALUDABLE' || maestro[i].asignaturaDos === 'VIDA SALUDABLE') {
              vidasaluda.push(maestro[i])
            }else if (maestro[i].asignatura === 'TECNOLOGIA' || maestro[i].asignaturaDos === 'TECNOLOGIA') {
              tegnologia.push(maestro[i])
            }else if (maestro[i].asignatura === 'TUTORIA' || maestro[i].asignaturaDos === 'TUTORIA') {
              titoria.push(maestro[i])
            }

           }


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
            console.log(totaolGrupos);

           })


           console.log(espanol);
           //console.log(this.espanolBase);
           console.log(totalasig);
           console.log(this.gupotTotales);

           let contador = 0
           for (let i = 0; i < totalasig.length; i++) {
            if (totalasig[i].id === 'espanol') {
              console.log(totalasig[i]);
              for (let t = 0; t < totalasig[i].htEspanol.length; t++) {
                contador += totalasig[i].htEspanol[t]
              }
            }
           }

           let primero:any = [];
           let segundo:any = [];
           let tercero:any = [];
           for (let i = 0; i < totalasig.length; i++) {
             if (totalasig[i].id === 'espanol'){
              for (let t = 0; t < totalasig[i].hEspanol.length; t++) {

                primero = {
                  1: totalasig[i].hEspanol[0]
                }
                segundo = {
                  1: totalasig[i].hEspanol[1]
                };
                tercero = {
                  1: totalasig[i].hEspanol[2]
                };

              }
             }

           }

           //console.log(primero,"primero");
           //console.log(segundo,"segundo");
           //console.log(tercero,"tercero");







           //console.log(contador,"contador");
           let gp:any = []
           let gp1:any = []
           let gp2:any = []

           for (let i = 0; i < this.gupotTotales.length; i++) {
              //console.log(this.gupotTotales[i].substring(0, this.gupotTotales[i].length - 1));
              if (this.gupotTotales[i].substring(0, this.gupotTotales[i].length - 1) === "1") {
                //console.log("1");

                gp = [
                  {
                    1:this.gupotTotales[0],
                    2:primero[1],
                    3:'1'
                  },
                  {
                    1:this.gupotTotales[1],
                    2:primero[1],
                    3:'2'
                  },
                  {
                    1:this.gupotTotales[2],
                    2:primero[1],
                    3:'3'
                  },
                  {
                    1:this.gupotTotales[3],
                    2:primero[1],
                    3:'4'
                  },
                  {
                    1:this.gupotTotales[4],
                    2:primero[1],
                    3:'5'
                  }
                ]
                //console.log(this.gupotTotales[i]);
              }else if (this.gupotTotales[i].substring(0, this.gupotTotales[i].length - 1) === "2") {
                gp1  = [
                  {
                    1:this.gupotTotales[5],
                    2:primero[1],
                    3:'6'
                  },
                  {
                    1:this.gupotTotales[6],
                    2:primero[1],
                    3:'7'
                  },
                  {
                    1:this.gupotTotales[7],
                    2:primero[1],
                    3:'8'
                  },
                  {
                    1:this.gupotTotales[8],
                    2:primero[1],
                    3:'9'
                  },
                  {
                    1:this.gupotTotales[9],
                    2:primero[1],
                    3:'10'
                  }
                ]
                //console.log("2");
               // console.log(this.gupotTotales[i]);
              }else {
                gp2  = [
                  {
                    1:this.gupotTotales[10],
                    2:primero[1],
                    3:'11'
                  },
                  {
                    1:this.gupotTotales[11],
                    2:primero[1],
                    3:'12'
                  },
                  {
                    1:this.gupotTotales[12],
                    2:primero[1],
                    3:'13'
                  },
                  {
                    1:this.gupotTotales[13],
                    2:primero[1],
                    3:'14'
                  },
                  {
                    1:this.gupotTotales[14],
                    2:primero[1],
                    3:'15'
                  }
                ]
                //console.log("3");
                //console.log(this.gupotTotales[i]);
              }
           }


           //console.log(gp1);
           //console.log(gp2);

           let gpt = {
             1:gp,
             2:primero[1]
           }

           //console.log(gpt[2]);

           let lodood = []
           for (let i = 0; i < espanol.length; i++) {

            let num1 =  espanol[i].horas/gpt[2]
            let num2 = Math.trunc(espanol[i].horas/gpt[2])
            let num3 = num1-num2
            if ( parseFloat(num3.toFixed(2)) *  gpt[2] ===0) {
              lodood.push({
                id: espanol[i].id,
                horas:espanol[i].horas/gpt[2],
                trunc: Math.trunc(espanol[i].horas/gpt[2]),
                deci: parseFloat(num3.toFixed(2)) *  gpt[2],
                horasServicio: 0,
                tutoria: 0

               })

            }else{
              lodood.push({
                id: espanol[i].id,
                horas:espanol[i].horas/gpt[2],
                trunc: Math.trunc(espanol[i].horas/gpt[2]),
                deci: parseFloat(num3.toFixed(2)) *  gpt[2],
                horasServicio: (parseFloat(num3.toFixed(2)) *  gpt[2])-1,
                tutoria: ((parseFloat(num3.toFixed(2)) *  gpt[2])+1)-(parseFloat(num3.toFixed(2)) *  gpt[2])

               })

            }

           }



           let arr = []
           for (let i = 0; i < lodood.length; i++) {
             //console.log("ffff");
             let num = 0

             //espanol[i].id
             if (lodood[i].id == espanol[i].id) {
              num = lodood[i].trunc
               //console.log(num);

               for (let t = 0; t < num; t++) {

                arr.push({
                  a: t+1,
                  id: espanol[i].id
                })

               }


             }

           }
           //console.log(arr);

           let ton = []
           for (let i = 0; i < arr.length; i++) {

            ton.push({
                ab : arr[i].a,
                abc : arr[i].id,
                abcd : i + 1

            })

           }

           let conpon = gp.concat(gp1,gp2)
           console.log(conpon);
           this.tutoriaDes = lodood
           console.log(lodood);
           console.log(ton);


           let arrayHo = []
           for (let i = 0; i < conpon.length; i++) {

            for (let y = 0; y < lodood.length; y++) {
              if (lodood[y].id === ton[i].abc) {
                arrayHo.push({
                  id:ton[i].abc,
                  grupo:conpon[i][1],
                  horas:conpon[i][2],
                  numero:ton[i].ab,
                  horasgrupo:conpon[i][3],
                  horasinter:ton[i].abcd,
                  deci:lodood[y].deci,
                  horasg:lodood[y].horas,
                  trunc:lodood[y].trunc,
                })
              }

            }


           }


           console.log(arrayHo);






           console.log(espanol);










           console.log(matematicas);
           console.log(ciencias);
           console.log(historia);
           console.log(geografia);
           console.log(formciveti);
           console.log(ingles);
           console.log(musica);
           console.log(eficica);
           console.log(vidasaluda);
           console.log(tegnologia);
           console.log(titoria);




         })



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
