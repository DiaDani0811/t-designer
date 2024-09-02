import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../../../GlobalModules/ngzorromodule';
import { PrimeImportsModule } from '../../../GlobalModules/primeng-import';


const routes : Routes = [
  {path : '', component : ExamComponent}
]
@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    PrimeImportsModule,
    RouterModule.forChild(routes)
  ]
})
export class ExamModule { }
