import { Component, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-custom-column',
  templateUrl: './custom-column.component.html',
  styleUrl: './custom-column.component.css'
})
export class CustomColumnComponent {
  private modalservice = inject(NgbModal)
  constructor(private formbuild: FormBuilder, private userservice: UserService) { }

  // form Properties 
  columnName: string = '';
  formula: any[] = [];
  roundType: number | null = null;
  source: any[] = [];
  max: string = '';



  formularArr = [
    { id: 1, name: 'SUM' },
    { id: 2, name: 'COV' }
    // Add more items as needed
  ];
  sourceArr = [
    { id: 1, name: 'E1' },
    { id: 2, name: 'E2' },
    { id: 3, name: 'E3' },
    { id: 4, name: 'E4' },
    // Add more items as needed
  ];

  roundTypeArr = [0, 1, 2, 3, 4, 5]; // Round type options

  isDropdown: boolean = false;
  formulaDropdownSetting = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  roundTypeDropdownSetting = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  sourceDropdownSetting = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  ngOnInit(): void {
    this.getSubjectData();
  }

  mainJson: any;
  tableData: any = []
  getSubjectData() {
    this.userservice.currJson.subscribe(item => {
      this.mainJson = item;
      if (this.mainJson != undefined || this.mainJson != null || Object.hasOwnProperty(this.mainJson.tconf)) {
        let tableDataMap = this.mainJson.tconf?.CCL.MAP.mid.map(obj => {
          return {
            "columnName": this.mainJson.tconf.CCL.MAP.nam[obj],
            "formula": this.mainJson.tconf.CCL.MAP.str[obj]?.for || [],
            "round": this.mainJson.tconf.CCL.MAP.str[obj]?.RND || 0,
            "source": this.mainJson.tconf.CCL.MAP.str[obj]?.FSR || 0,
            "maximumValue": this.mainJson.tconf.CCL.MAP.str[obj]?.MXV || '',
          }
        })
        this.tableData = tableDataMap
      }
    })
  }

  modaref: any;
  OpenModal(templateref: TemplateRef<any>) {
    this.modaref = this.modalservice.open(templateref, {centered: true,})
    this.isDropdown = true
  }
  // select option multiple dropdown 
  onSelectFormula(event: any) {
    console.log('Selected formula:', event);
  }

  onSelectAllFormula(event: any) {
    console.log('Selected all formulas:', event);
  }

  onSelectRoundType(event: any) {
    console.log('Selected round type:', event);
  }

  onSelectSource(event: any) {
    console.log('Selected source:', event);
  }

  onSelectAllSource(event: any) {
    console.log('Selected all sources:', event);
  }

  onSubmit(form: any) {
    console.log('>>>>>>>>>>>>>>>>>',form.value);
    let frmlaArr = [];
    let src = [];
    frmlaArr = form.value?.frmla.map(element => {
      return element.name
    });
    src = form.value?.src.map(element => {
      return element.name
    });
    let obj = {
      "columnName": form.value.colname ? form.value.colname : '',
      "formula": frmlaArr ? frmlaArr : [],
      "round": form.value.roundType ? form.value.roundType : '',
      "source": src ? src : '',
      "maximumValue": form.value.max ? form.value.max : '',
    }
    this.tableData.push(obj);
    this.modaref.close();

    console.log('>>>>>>this.tableData>>>>>>>>>>>',this.tableData);
  }

  editRow(item, content : TemplateRef<any>){
    console.log('>>>>>>>>>edit>>>>>>>>',item);
    this.isDropdown = true
    this.modaref = this.modalservice.open(content, {centered: true})

    if(item){
      this.columnName = item.columnName;
      this.formula = item.formula;
      this.roundType = item.round;
      this.source = item.source;
      this.max = item.maximumValue;
    }
  }


  

  // colArr={"C1":"Cuscol 20","C2":"Term 20","C3":"Total","C4":"TERM"};
  // exmArr={"E1":"Fa 1","E2":"FA 2","E3":"Term","E4":"TERM"};

  //  var fromarr={};
  // let s = Object.entries(colArr).length;
  // console.log(s); // Output: 4

  // let vardat=getcustFormArr("C2",exmArr,colArr);
  // console.log(vardat);

  // function getcustFormArr(col: any, exmarr: { [key: string]: string }, colarr: any): { [key: string]: string } {
  //     let retformArr: { [key: string]: string } = {};
  //     let secondChar: string = col.charAt(1);
  //     for (let key in exmarr) {
  //         if (exmarr.hasOwnProperty(key)) {
  //             let exsecchar: string = key.charAt(1);
  //             //if(secondChar>exsecchar)
  //             retformArr[key] = exmarr[key];
  //         }
  //     }

  //      for (let key in colarr) {
  //         if (colarr.hasOwnProperty(key)) {
  //             let exsecchar: string = key.charAt(1);
  //             if(secondChar>exsecchar)
  //             retformArr[key] = colarr[key];
  //         }
  //     }

  //     return retformArr;
  // }

}
