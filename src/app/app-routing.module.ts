import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo : '', pathMatch :'full'},
  {path:'', loadChildren :() => import('./layout/layout.module').then((module)=> module.LayoutModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
