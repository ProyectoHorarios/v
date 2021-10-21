import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { User } from "../services/user";
//import { auth } from 'firebase/app';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private firestore:AngularFirestore,
              private afAuth: AngularFireAuth,
              private router: Router) { }

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

  mostrarHorarios():Observable<any>{
    return this.firestore.collection('grupos').snapshotChanges();
  }



  login(email: string, password: string) {
   return this.afAuth.signInWithEmailAndPassword(email, password)
    .then(value => {

      const tbd:any = value.user!['multiFactor']
      console.log('Nice, it worked!', tbd.user);
      localStorage.setItem('token', tbd.user.accessToken);
      this.router.navigateByUrl('/inicio');
    })
    .catch(error => {
      console.log('Something went wrong: ', error.message);
    });
  }

  logout(){
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
  validarToken(){

  }


}
