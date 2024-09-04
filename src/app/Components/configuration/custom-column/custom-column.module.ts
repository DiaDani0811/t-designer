import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomColumnComponent } from './custom-column.component';
import { PrimeImportsModule } from '../../../GlobalModules/primeng-import';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgZorroAntdModule } from '../../../GlobalModules/ngzorromodule';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


const routes : Routes = [
  {path : '', component : CustomColumnComponent}
]
@NgModule({
  declarations: [CustomColumnComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrimeImportsModule,
    NgZorroAntdModule,
    NgbModalModule,
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class CustomColumnModule { }
