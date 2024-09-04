import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { ClassModule } from './class/class.module';
import { ClassAndSectionModule } from './class-and-section/class-and-section.module';
import { CustomColumnModule } from './custom-column/custom-column.module';
import { ExamModule } from './exam/exam.module';
import { RegisterModule } from './register/register.module';
import { SubjectModule } from './subject/subject.module';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './class/class.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
  { path: '', component: ConfigurationComponent,
    children: [
      { path: 'Class', loadChildren: () => import('./class/class.module').then(mod => mod.ClassModule) },
      { path: 'Exam', loadChildren: () => import('./exam/exam.module').then(mod => mod.ExamModule) },
      { path: 'Subject', loadChildren: () => import('./subject/subject.module').then(mod => mod.SubjectModule) },
      { path: 'Register', loadChildren: () => import('./register/register.module').then(mod => mod.RegisterModule)},
      { path: 'Custom Column', loadChildren: () => import('./custom-column/custom-column.module').then(mod => mod.CustomColumnModule) },
      // { path: 'Class', loadChildren: () => import('./class/class.module').then(mod => mod.ClassModule) },
    ]
   }
]

@NgModule({
  declarations: [
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    ClassModule,
    ClassAndSectionModule,
    CustomColumnModule,
    ExamModule,
    RegisterModule,
    SubjectModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ConfigurationModule { }
