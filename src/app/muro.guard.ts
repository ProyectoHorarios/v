import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfesorService } from './services/empleado.service';

@Injectable({
  providedIn: 'root'
})
export class MuroGuard implements CanActivate {

  constructor(private servicioUsuario: ProfesorService, private router: Router){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      const uid = await this.servicioUsuario.validarToken()
      const email:any = localStorage.getItem('email')
      const pas:any = localStorage.getItem('pan')
      console.log(email, pas, uid);
      let ptu:any

      if (uid === false) {
        if(email === null || pas === null){
          console.log("no");
          ptu = false
          this.router.navigate(['/login']);
        }else{
        let decicion:any
        this.servicioUsuario.login(email, pas).then((res)=>{
          decicion = res
          ptu = decicion
        }).catch(err=>{
          ptu = false
          console.log(err);
        })
        }

      }else{
        ptu = uid
      }

    return ptu;
  }


}
