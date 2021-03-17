import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'comp',
    loadChildren: () => import('./componentes/componentes.module').then(m => m.ComponentesModule)
  },
  {
    path: '**',
    redirectTo: 'comp'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
