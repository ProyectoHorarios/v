import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NoFuncionaComponent } from './no-funciona/no-funciona.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  {
    path:'',redirectTo:'/login', pathMatch: 'full'
  },
  {
    path: 'login', component:AuthComponent
  },
  {
    path: '**', component:NoFuncionaComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
