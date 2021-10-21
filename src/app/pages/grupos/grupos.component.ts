import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfesorService } from 'src/app/services/empleado.service';
import { ApiInfoService } from '../../services/api-info.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {


  @ViewChild('quantity') quantity?: ElementRef;

  grupos = []
  tablaGrupos=[]
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  control:any;

  constructor(
    private apiInfoService:ApiInfoService,
    private profesorService:ProfesorService,
         ) { }

  callType(value:any){
    this.control = value

  }

  ngOnInit() {
    localStorage.removeItem('ruta');
    localStorage.setItem('ruta', '/grupos');
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
       this.tablaGrupos = maestro
       console.log(maestro,"mostrarProfesores");

      })
    this.apiInfoService.getGrupos().subscribe(res =>{
      console.log(res);
      this.grupos = res
    })

  }

  CloseDialog() {
    //this._mdr.close(false)
  }
}
