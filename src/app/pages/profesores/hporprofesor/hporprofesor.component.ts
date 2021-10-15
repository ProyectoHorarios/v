import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfesorService } from 'src/app/services/empleado.service';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-hporprofesor',
  templateUrl: './hporprofesor.component.html',
  styleUrls: ['./hporprofesor.component.css']
})
export class HporprofesorComponent implements OnInit {


  infoProfe:any

  constructor(public dialogRef: MatDialogRef<HporprofesorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private profesorService:ProfesorService) { }

  ngOnInit(): void {
    const id = this.data.name
    console.log(id);

    this.infoProfe = []
    this.profesorService.traesIdProfesor(id).subscribe(res=>{
      this.infoProfe = res.payload.data()
      console.log(this.infoProfe);
    })

  }



  onNoClick(): void {
    this.dialogRef.close();
  }

}
