import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent {

  constructor(private userservice: UserService) {

  }

  ngOnInit() {
    this.getApi();
    this.userservice.currJson.subscribe(data => { })
  }
  stp: string | null = null;
  sel: boolean = false;
  listofExam: any[] = [];
  selectedExamsList: any[] = [];
  maxExam: number | null = null;
  items: any[] = []
  selectedValue: any[] = []

  getApi(): void {
    let examKeys;
    this.userservice.getConfigData().subscribe({
      next: (resp) => {
        resp.forEach(element => {
          examKeys = Object.keys(element.exm)
          examKeys.forEach(item => {
            this.listofExam.push({ id: item, name: element.exm[item] });
          })
        });
      }
    })
  }

  radioGroupChange(stp) {
    if (stp != null) {
      if (stp === 'A') {
        this.selectedExamsList = this.listofExam.map(city => city);
      }
      else if (stp === 'S') {
        this.selectedExamsList = []
      }
    }
  }

  onSelectAllCondition(even) {
    if(even.value.length == 0){
      this.selectedExamsList =[];
      this.stp = 'S';
    }
    else{
      this.selectedExamsList = even.value
    }
  }
  maximumExamLength(maxExam){
    if(maxExam != null){
      if(maxExam <= this.selectedExamsList.length){
        for(let i=0; i< maxExam; i++){
          this.items.push(this.selectedExamsList[i])
        }
      }
    }else{
      this.items =[]
    }
  }
  eachExamSelection(ngmodal, index){
    console.log('>>>>>>>>>ngmodal>>>>>>>>',ngmodal,index);
  }
}
