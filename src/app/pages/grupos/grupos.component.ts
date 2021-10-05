import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfesorService } from 'src/app/services/empleado.service';
import { ApiInfoService } from '../../services/api-info.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupos = []

  constructor(private apiInfoService:ApiInfoService,
              private profesorService:ProfesorService,
         ) { }

  datos = [
    {0:"1", 1:"E", 2:"EF", 3:"M", 4:"C", 5:"M"},
    {0:"2", 1:"I", 2:"EF", 3:"M", 4:"C", 5:"M"},
  ]



  ngOnInit() {

    this.profesorService.mostrarHorarios().subscribe(res=>{

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


    this.apiInfoService.getGrupos().subscribe(res =>{
      console.log(res);
      this.grupos = res
    })
    console.log(this.datos);

  }

}
