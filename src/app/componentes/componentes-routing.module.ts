import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthGuard } from '../guards/guards.service';

const routes: Routes = [

      {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent , canActivate: [AuthGuard]},
      { path: 'registro', component: RegistroComponent},
      { path: '**', pathMatch: 'full', redirectTo: 'login' }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentesRoutingModule { }
