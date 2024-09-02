import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateInfoComponent } from './template-info.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{ path: '', component: TemplateInfoComponent }];

@NgModule({
  declarations: [
    TemplateInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TemplateInfoModule { }
