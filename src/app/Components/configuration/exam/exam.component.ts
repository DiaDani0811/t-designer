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
  }
  mainJson: any;
  stp: string | null = null;
  sel: boolean = false;
  listofExam: any[] = [];
  selectedExamsList: any[] = [];
  maxExamAllow: number | null = null;
  items: any[] = [];
  eachExamSelected: any[] = [];

  getApi(): void {
    let examKeys;
    this.userservice.getConfigData().subscribe({
      next: (resp) => {
        examKeys = Object.keys(resp.exm)
        examKeys.forEach(item => {
          this.listofExam.push({ "id": item, "name": resp.exm[item] });
        })

        this.userservice.currJson.subscribe(data => {
          this.mainJson = data
          if (this.mainJson.tconf.EXM.SRC.length != 0) {
            this.sel = this.mainJson.tconf.EXM.SEL
            this.stp = this.mainJson.tconf.EXM.STP
            this.selectedExamsList = this.mainJson.tconf.EXM.SRC.map(item => { return { "id": item, "name": resp.exm[item] } })
            if (this.mainJson.tconf.EXM.MAL) {
                this.maxExamAllow = this.mainJson.tconf.EXM.MAL
              }
              this.items = this.mainJson.tconf.EXM.MAP.mid.map(item => {
              return {"id":this.mainJson.tconf.EXM.MAP.rid[item], "name" : this.mainJson.tconf.EXM.MAP.nam[item] }
              })
              this.mainJson.tconf.EXM.MAP.mid.map((item,index) => {
              this.eachExamSelected[index] = this.mainJson.tconf.EXM.MAP.rid[item]
              })
          }
        })

      }
    })
  }

  examTypeChange(stp) {
    this.mainJson.tconf.EXM.SRC = [];
    if (stp != null) {
      if (stp === 'A') {
        this.selectedExamsList = this.listofExam.map(city => city);
        this.selectedExamsList.forEach(ele => {
          this.mainJson.tconf.EXM.SRC.push(ele.id)
        })
      }
      else if (stp === 'S') {
        this.selectedExamsList = [];
        this.maxExamAllow = null;
        this.items = []
      }
    }
  }

  selectSpecificExams(even) {
    this.mainJson.tconf.EXM.SRC = [];
    if (even.value.length == 0) {
      this.selectedExamsList = [];
      this.stp = 'S';
    }
    else {
      this.selectedExamsList = even.value;
      this.selectedExamsList.forEach(ele => {
        this.mainJson.tconf.EXM.SRC.push(ele.id)
      })
    }
  }
  maximumExamLength(maxExam) {
    console.log('>>>>>>>maxExam>>>>>>>>>>',maxExam);
    let examData = this.mainJson.tconf.EXM;
    this.mainJson.tconf.EXM.SEL = this.sel;
    this.mainJson.tconf.EXM.MAP.mid = [];
    this.mainJson.tconf.EXM.MAP.rid = {};
    this.mainJson.tconf.EXM.MAP.nam = {};


    if (maxExam != null) {
      this.mainJson.tconf.EXM.MAL = maxExam
      if (maxExam <= this.selectedExamsList.length) {
        for (let i = 0; i < maxExam; i++) {
          this.items.push(this.selectedExamsList[i])
          let riddat = examData.MAP['rid'];
          if (!Object.hasOwnProperty(riddat['E' + (i + 1)])) {
            this.mainJson.tconf.EXM.MAP.mid.push('E' + (i + 1));
            this.mainJson.tconf.EXM.MAP.rid['E' + (i + 1)] = "";
            this.mainJson.tconf.EXM.MAP.nam['E' + (i + 1)] = "";
          }
        }
      }
    } else {
      this.items = [];
    }
  }
  eachExamSelection(value, index) {
    let examName = ''
    this.listofExam.forEach((item, i) => {
      if (String(value[index]) === item.id) {
        this.mainJson.tconf.EXM.MAP.nam[this.mainJson.tconf.EXM.MAP.mid[index]] = item.name
        this.mainJson.tconf.EXM.MAP.rid[this.mainJson.tconf.EXM.MAP.mid[index]] = item.id
      }
    })
  }

  save() {
    console.log('>>>>>>>>>>>>>>>>>', this.mainJson);
    // this.userservice.updateCurrentJson(this.mainJson)
    // this.userservice.postMainJson(this.mainJson).subscribe({
    //   next: (res) => {
    //     console.log('>>>>>>>>>>>>>>>>>',res);
    //   }
    // })
  }
  selectableChange() {
    console.log('>>>>>>>>>>>>>>>>>', this.sel);
  }

}
