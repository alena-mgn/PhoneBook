import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { FormControl, FormGroup, Validators} from '@angular/forms';


import { Phone, DataService } from '../shared/data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private dataService: DataService) { }

  private addTel = '+7';
  private rooms: string[] = this.dataService.listRooms();
  private searchRoom: string = this.rooms[0];
  private operatorsPhone: string[] = [];
  private phoneShow: string;
  private roomShow: string = '';
  private addOper: string;
  private isEdit: boolean = false;
  private isShow: boolean = false;
  private isOut: boolean = false;
  private searchName: string;
  private person: Phone = new Phone('', '', []);
  private searchOperator: string = '';
  private searchPhone: string = '';
  private isEditOper: boolean = false;
  private newName: string;

  show(){
    this.isShow = !this.isShow;
    this.searchName = '';
    if(this.isOut) {
      this.isOut = false;
    };
    if (this.isShow) {
        this.isOut = !this.isOut;
        this.person = new Phone('','',[]);
    }
  }

  search(){
    this.person = this.dataService.search(this.searchName);
    console.log(this.person);
    if (this.person.phone == '') {
        this.isOut = false;
    }
  }

  addPhone() {
    const tel = this.addTel;
    const box = this.searchRoom;
    const telefon: Phone = new Phone(box, tel, []);
    this.dataService.addPhone(telefon);
    this.addTel ='+7';
    this.searchRoom = 'Все телефоны';
  }

  removePhone(tel: string){
    this.dataService.removePhone(tel)
  }

  showOperators(tel: Phone) {
    this.searchOperator = '';
    this.operatorsPhone = this.dataService.showOperators(tel);
    this.phoneShow = tel.phone;
    if (this.searchRoom !== 'Все телефоны') {
      this.roomShow = this.searchRoom }
  }

  editShow(id: number) {
    this.isEditOper = !this.isEditOper;
     this.newName = this.operatorsPhone[id]
  }

  editOperator(id: number) {
    this.dataService.editOperator(this.phoneShow, id, this.newName);
    this.isEditOper = !this.isEditOper;
  }

  addOperator() {
    this.dataService.addOperator(this.phoneShow, this.addOper);
    this.addOper = '';
  }

  removeOperator(oper:string){
    this.operatorsPhone = this.operatorsPhone.filter(op => op !== oper)
    this.dataService.removeOperator(this.phoneShow, oper)
  }

  ngOnInit() {
  }

}
