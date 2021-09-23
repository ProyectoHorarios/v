import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogoComponent } from './dialogo/dialogo.component';
import { ProfesorService } from '../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';


export interface PeriodicElement {
  profesor: string;
  position: number;
  asignatura: number;
  horas: string;
}



@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent  implements AfterViewInit,OnInit  {
  loaading=false;

  dialogoComponent!: MatDialogRef<DialogoComponent> ;
  profesores:any[]=[];


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: any;

  constructor(private dialog: MatDialog,
              private profesorService:ProfesorService,
              private toastr: ToastrService,) {

   }
   ngOnInit(){
     this.getProfesores()
   }
   onClick(){
    console.log("onClick");

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
      });
    })
  }

  eliminarProofesor(id:string){
    this.profesorService.eliminarProfesor(id).then(()=>{
      this.toastr.success('Se elimino al profesor con exito!', 'Exito', {
        timeOut: 4000,
      });
    }).catch(error =>{
      this.toastr.error('Error al eliminar al profesor', 'Error', {
        timeOut: 4000,
      });

    })
  }


}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, profesor: 'Hydrogen', asignatura: 1.0079, horas: 'H'},
  {position: 2, profesor: 'Helium', asignatura: 4.0026, horas: 'He'},
  {position: 3, profesor: 'Lithium', asignatura: 6.941, horas: 'Li'},
  {position: 4, profesor: 'Beryllium', asignatura: 9.0122, horas: 'Be'},
  {position: 5, profesor: 'Boron', asignatura: 10.811, horas: 'B'},
  {position: 6, profesor: 'Carbon', asignatura: 12.0107, horas: 'C'},
  {position: 7, profesor: 'Nitrogen', asignatura: 14.0067, horas: 'N'},
  {position: 8, profesor: 'Oxygen', asignatura: 15.9994, horas: 'O'},
  {position: 9, profesor: 'Fluorine', asignatura: 18.9984, horas: 'F'},
  {position: 10, profesor: 'Neon', asignatura: 20.1797, horas: 'Ne'},
  {position: 11, profesor: 'Sodium', asignatura: 22.9897, horas: 'Na'},
  {position: 12, profesor: 'Magnesium', asignatura: 24.305, horas: 'Mg'},
  {position: 13, profesor: 'Aluminum', asignatura: 26.9815, horas: 'Al'},
  {position: 14, profesor: 'Silicon', asignatura: 28.0855, horas: 'Si'},
  {position: 15, profesor: 'Phosphorus', asignatura: 30.9738, horas: 'P'},
  {position: 16, profesor: 'Sulfur', asignatura: 32.065, horas: 'S'},
  {position: 17, profesor: 'Chlorine', asignatura: 35.453, horas: 'Cl'},
  {position: 18, profesor: 'Argon', asignatura: 39.948, horas: 'Ar'},
  {position: 19, profesor: 'Potassium', asignatura: 39.0983, horas: 'K'},
  {position: 20, profesor: 'Calcium', asignatura: 40.078, horas: 'Ca'},
];
