import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClassAndSectionComponent } from './class-and-section.component';


const routes : Routes = [
  {path : '', component : ClassAndSectionComponent}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClassAndSectionModule { }
