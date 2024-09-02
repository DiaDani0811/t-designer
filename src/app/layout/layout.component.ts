import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; 

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isCollapsed : boolean = false;
  pagesMenu : any = [];
  configMenu : any = [];
  addpg = {
    "pid": "",
    "pgn": "",
    "pgs": "",
    "bdr": "",
    "mgn": "",
    "ivl": "",
    "bop": "",
    "pox": "",
    "poy": "",
    "biw": "",
    "bih": "",
    "olt": []
}
  constructor(private userservice : UserService){
  }
  ngOnInit(){
    this.getApi();
  }

  cardLoading : boolean = false
  getApi() : void {
    this.userservice.getJson().subscribe({
      next: (resp) => {
        let data = resp
        let pgky = Object.keys(data.tstuc.body)
        let config = Object.keys(data.tconf)
        for(let i=0; i<pgky.length; i++){
          this.pagesMenu.push(data.tstuc.body[pgky[i]])
        }
        
        for(let item of config){
          if(item == 'CLS')
          data.tconf[item]['name'] = 'Class'
          else if(item == 'EXM')
            data.tconf[item]['name'] = 'Exam'
          else if(item == 'SUB')
            data.tconf[item]['name'] = 'Subject'
          else if(item == 'REG')
            data.tconf[item]['name'] = 'Register'
          else if(item == 'CCL')
            data.tconf[item]['name'] = 'Custom Column'
          else
            data.tconf[item]['name'] = 'Class And Section'
          this.configMenu.push(data.tconf[item])
        }
      }
    })
  }

  menuClick(event){
    console.log('>>>>>>>>>>>>>>>>>',event);
  }

  
}
