import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { ProfesorService } from '../../../services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiInfoService } from '../../../services/api-info.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})


export class DialogoComponent implements OnInit {
  //items: Observable<any[]>;
  loaading=false;
  id:string|null;
  titulo='Agregar Profesor'

  listaAsignatura = [];

  selectedValue: any;
  preferencias = ['Temprano', 'Tarde', 'No Importa'];


  public registro = this.formB.group({
    nombre: ['', [Validators.required,]],
    horas: ['', [Validators.required,Validators.max(40), Validators.min(0)]],
    cedula: [''],
    asignatura: ['',Validators.required],
    asignaturaDos: [''],
    preferencia:['', [Validators.required]],
    materias:[{
      lunes: ["","","","","","",""],
      martes:["","","","","","",""],
      miercoles:["","","","","","",""],
      jueves:["","","","","","",""],
      viernes:["","","","","","",""]
    }]
  });

  constructor(private formB: FormBuilder,
              private profesorService:ProfesorService,
              private router:Router,
              private toastr: ToastrService,
              private activateRoute:ActivatedRoute,
              private apiInfoService:ApiInfoService,
              //firestore: AngularFirestore
              public dialogRef: MatDialogRef<DialogoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData

              ) {
                //this.items = firestore.collection('items').valueChanges();
                this.id = this.activateRoute.snapshot.paramMap.get('id')
              }

  ngOnInit(): void {
    this.editarProfesor();

console.log(this.data, "dddd");





    this.apiInfoService.getAgignaturas().subscribe(res=>{
      console.log(res);
      this.listaAsignatura = res

    })
  }
  reg(){
    this.loaading = true;
    if(this.id ===null){
      this.agregarProfesorNuevo();
    }else{
      this.editarProfesorDos()
    }
  }

  editarProfesorDos(){
    this.loaading = true;

    console.log(this.registro.value);

    this.profesorService.actualizarProfesor(this.id, this.registro.value).then(()=>{
      this.loaading = false;
      this.toastr.info(' Se edito con exito al profesor con sus horas y asignaturas!', 'Exito', {
        timeOut: 4000,
      });
      this.router.navigateByUrl('/profesores')

    }).catch(err=>{
      this.toastr.error(' Error al editar al Profesor!', 'Error', {
        timeOut: 4000,
      });
      this.loaading = false
    })
  }

  agregarProfesorNuevo(){
    this.loaading = true;

    this.profesorService.agregarProfesor(this.registro.value).then(()=>{
      this.toastr.success(' Se registro con exito al profesor con sus horas y asignaturas!', 'Exito', {
        timeOut: 4000,
      });
      this.loaading = false
      this.router.navigateByUrl('/profesores')
    }).catch(err=>{
      this.toastr.error(' Error al registrar al Profesor!', 'Error', {
        timeOut: 4000,
      });
      this.loaading = false
    })
    this.registro.reset()
  }


  editarProfesor(){
    if(this.id !== null){
      this.loaading = true
      this.titulo = 'Editar Profesor'
      console.log(this.id);

      this.profesorService.traesIdProfesor(this.id).subscribe(res=>{

        console.log(res.payload.data());

        this.loaading =false;
        this.registro.setValue({
          nombre: res.payload.data()['nombre'],
          horas: res.payload.data()['horas'],
          cedula: res.payload.data()['cedula'],
          asignatura: res.payload.data()['asignatura'],
          asignaturaDos: res.payload.data()['asignaturaDos'],
          preferencia: res.payload.data()['preferencia'],
          materias: this.registro.value.materias

        })
        console.log(this.registro.value);

        this.registro.value.nombre = res.payload.data()['nombre']

      })
    }
  }


}
