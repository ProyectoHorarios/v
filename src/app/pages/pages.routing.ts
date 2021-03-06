import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio/inicio.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { PagesComponent } from './pages.component';
import { GruposComponent } from './grupos/grupos.component';
import { DialogoComponent } from './profesores/dialogo/dialogo.component';
import { MuroGuard } from '../muro.guard';

const routes: Routes = [

  {
    path:'',component:PagesComponent,
    canActivate:[MuroGuard],
    children:[
      {
        path:'inicio',component:InicioComponent
      },
      {
        path:'profesores',component:ProfesoresComponent
      },
      {
        path:'grupos', component:GruposComponent
      },
      {
        path:'dialogo', component:DialogoComponent
      },
      {
        path:'editar/:id', component:DialogoComponent
      },
      ]
  },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
