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
import {MatTableModule, _MatTableDataSource} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { DialogoComponent } from './profesores/dialogo/dialogo.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent,
    ReadexcelDirective,
    ProfesoresComponent,
    GruposComponent,
    DialogoComponent
  ],
  exports:[
    InicioComponent,
    PagesComponent,
    ProfesoresComponent,
    DialogoComponent
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
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule


  ],
  providers:[
    ExportService
  ]

})
export class PagesModule { }
