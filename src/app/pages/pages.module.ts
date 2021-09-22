import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ReadexcelDirective } from './inicio/directives/readexcel.directive';
import { AppRoutingModule } from '../app-routing.module';
import { PagesComponent } from './pages.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { GruposComponent } from './grupos/grupos.component';
import { ExportService } from '../services/export.service';


@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent,
    ReadexcelDirective,
    ProfesoresComponent,
    GruposComponent
  ],
  exports:[
    InicioComponent,
    PagesComponent,
    ProfesoresComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule
  ],
  providers:[
    ExportService
  ]

})
export class PagesModule { }
