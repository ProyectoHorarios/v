import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfesorService } from 'src/app/services/empleado.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  infoProfe:any
  nombre:any | undefined = ''
  constructor(public dialogRef: MatDialogRef<EliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private profesorService:ProfesorService,
    private toastr: ToastrService,
    private router:Router,) { }

  ngOnInit() {

    const id = this.data.name
    console.log(id);
    this.infoProfe = []
    this.nombre = ''

      this.profesorService.traesIdProfesor(id).subscribe(res=>{
          this.infoProfe = res.payload.data()
          //this.nombre = this.infoProfe.nombre
      })

  }

  eliminarProofesor(){

    const  idp = this.data.name
    console.log(idp);

      this.profesorService.eliminarProfesor(idp).then(()=>{
        this.router.navigate(['/profesores']);
        this.toastr.success('Se elimino al profesor con exito!', 'Exito', {
          timeOut: 4000,
        });
        this.onNoClick()
      }).catch(error =>{
        this.toastr.error('Error al eliminar al profesor', 'Error', {
          timeOut: 4000,
        });
        this.onNoClick()

      })




  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
