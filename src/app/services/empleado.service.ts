import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { User } from "../services/user";
//import { auth } from 'firebase/app';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private firestore:AngularFirestore,
              private afAuth: AngularFireAuth,
              private router: Router,
              private toastr: ToastrService,
              private activateRoute:ActivatedRoute) {
                console.log(this.activateRoute);
              }

  agregarProfesor(profe:any):Promise<any>{
    return this.firestore.collection('profesores').add(profe);
  }
  agregarProfesors(profe:any):Promise<any>{
    return this.firestore.collection('profesoresdos').add(profe);
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
      const ultimo = tbd.user.metadata.lastSignInTime.substring(4)
      const ulti = tbd.user.metadata.creationTime.substring(18)
      const str2 = ultimo.substr(0, ultimo.length - 13);
      const str1 = ulti.substr(0, ulti.length - 4);

      localStorage.setItem('creacion', str1);
      localStorage.setItem('ultimo', str2);
      localStorage.setItem('email', email);
      localStorage.setItem('pan', password);

/*
      const obj = {
        valueT:tbd.user.uid,
        contrasenia: tbd.user.email
      }

      console.log(obj.valueT,"ffff");

      this.traesIdPersonal(obj.valueT).subscribe(res=>{
        const uidf = res.payload._delegate._firestore._credentials.currentUser.uid
        if (uidf === obj.valueT) {

          console.log(res.payload._delegate._firestore._credentials.currentUser.uid);
          this.agregarPersonal(obj).then(()=>{
            console.log("bien");
            })

        }else{
          console.log("no");
        }
      })*/

      localStorage.setItem('token', tbd.user.uid);
      let rutasT = localStorage.getItem('ruta')
      const rut = '/'+rutasT
      if (rutasT === null) {
        rutasT = '/inicio'
      }
      console.log(rutasT);

      this.router.navigateByUrl(`${rutasT}`);
      return true
    })
    .catch(error => {
      this.toastr.info('La contraseña o el correo no coinciden, intenta de nuevo', 'Error', {
        timeOut: 4000,
      });
      this.router.navigate(['/login']);
      console.log('Something went wrong: ', error.message);
      return false
    });
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('pan');
    localStorage.removeItem('ruta');
    localStorage.removeItem('creacion');
    localStorage.removeItem('ultimo');
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
  async validarToken(){
    const user:any = await this.afAuth.currentUser;
    if (user === null) {
      return false
    }else{
      return true;
    }

  }


  traesIdPersonal(id:string):Observable<any>{
    return this.firestore.collection('personal').doc(id).snapshotChanges();
  }

  agregarPersonal(personal:any):Promise<any>{
    return this.firestore.collection('personal').add(personal);
  }

   eliminar(){
    return this.firestore.collection("pb").get().subscribe(res=>{
      res.forEach(element => {
      element.ref.delete();
    });})

  }



}
