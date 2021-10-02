import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { User } from "../services/user";
//import { auth } from 'firebase/app';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private firestore:AngularFirestore) { }

  agregarProfesor(profe:any):Promise<any>{
    return this.firestore.collection('profesores').add(profe);
  }
  mostrarProfesores():Observable<any>{
    return this.firestore.collection('profesores', order => order.orderBy('nombre','asc')).snapshotChanges();
  }
  eliminarProfesor(id:string): Promise<any>{
    return this.firestore.collection('profesores').doc(id).delete();
  }
  traesIdProfesor(id:string):Observable<any>{
    return this.firestore.collection('profesores').doc(id).snapshotChanges();
  }
  actualizarProfesor(id:any, resp:any):Promise<any>{
    return this.firestore.collection('profesores').doc(id).update(resp);
  }

  mostrarAsignatiras():Observable<any>{
    return this.firestore.collection('materiasLectivas').snapshotChanges();
  }



  login(){

  }
  logout(){

  }
  validarToken(){

  }

}
