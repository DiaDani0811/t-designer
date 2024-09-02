import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgZorroAntdModule } from "../GlobalModules/ngzorromodule"; 
import { LayoutComponent } from "./layout.component";

const routes  : Routes = [
    {path : '', component : LayoutComponent,
        children:[
            {path: '', redirectTo: 'templateinfo', pathMatch:"full"},
            {path: 'templateinfo', loadChildren : () => import('../Components/template-info/template-info.module').then(mod => mod.TemplateInfoModule)},
            {path: 'config', loadChildren : () => import('../Components/configuration/configuration.module').then(mod => mod.ConfigurationModule)}
        ]
    },
]

@NgModule({
    declarations: [LayoutComponent],
    imports:[NgZorroAntdModule,RouterModule.forChild(routes)]
})

export class LayoutModule { }