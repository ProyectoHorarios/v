/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ProfesorService } from '../services/empleado.service';
import { ProfesoresComponent } from './profesores/profesores.component';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit  {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  emailY:string | null = ''
  ultimos:string | null = ''
  pantall:number = 0

  constructor(private observer: BreakpointObserver,
              private afAuth: AngularFireAuth,
              private router:Router,
              private profesorService:ProfesorService) { }


              ngOnInit(){
                this.pantall = window.innerWidth;
                const email:string | null = localStorage.getItem('email');
                const ultimo:string | null = localStorage.getItem('ultimo');
                  this.emailY = email;
                  this.ultimos = ultimo;
              }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  cerrar(){
    this.profesorService.logout()
  }

}

