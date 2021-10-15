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

  constructor(private dialog: MatDialog,
    private profesorService:ProfesorService,
    private toastr: ToastrService,
    private matDialog: MatDialog) {

}

  OpenModal(nam:any) {

    this.matDialogRef = this.matDialog.open(HporprofesorComponent, {
      data: {name: nam, animal: this.animal},
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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any;


   ngOnInit(){
     this.getProfesores()

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
       console.log(maestro,"mostrarProfesores");

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




          console.log(totalasig[i], "----");



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
