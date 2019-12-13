import { Component, OnInit } from '@angular/core'
import { FormsModule }   from '@angular/forms'
import { FormControl, FormGroup, Validators} from '@angular/forms'


import { DataService } from '../shared/data.service'
import { Phone } from '../shared/phone'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [DataService]
})
export class BookComponent implements OnInit {

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.dataInit()
  }

  private persons: Phone[] = []
  private rooms: string[]
  private operatorsPhone: string[] = []
  private addTel = ''
  private addOper: string
  private searchRoom: string = 'Все телефоны'
  private searchPhone: string = ''
  private searchOperator: string = ''
  private searchName: string
  private newName: string
  private Name: string
  private phoneShow: string
  private roomShow: string = ''
  private operRoom: string
  private operPhone: string
  private isEdit: boolean = false
  private isShow: boolean = false
  private isOut: boolean = false
  private isSearch: boolean = false
  private isOperators: boolean = false
  private isEditOper: boolean = false
  private isChangePhone: boolean = false
  private notPhone: boolean = true
  private notOper: boolean = true


  listRooms(){
    this.rooms = this.dataService.listRooms()
    this.isOperators = false
    this.searchOperator = ''
    this.searchPhone = ''
    this.addTel = ''
    this.notPhone = true

  }

  show(){
    this.isShow = !this.isShow
    this.searchName = ''
    if(this.isOut)  this.isOut = false
    if(this.isSearch)  this.isSearch = false
  }

  search(){
    this.isSearch = !this.isSearch
    const name = this.searchName
    this.persons = this.dataService.search(name)
    if (this.persons.length == 0) {
      this.isOut = false
    }else this.isOut = true
  }

  clikInput(){
    this.isOut = false
    this.searchName = ''
    if(this.isSearch)  this.isSearch = false
  }

  addPhone() {
    const tel = '+7 '+ this.addTel
    const box = this.searchRoom
    const telefon: Phone = new Phone(box, tel, [])
    this.notPhone = this.dataService.addPhone(telefon)
    if (this.notPhone){
      this.addTel =''
      this.searchRoom = 'Все телефоны'
    }
  }

  removePhone(tel: string){
    this.dataService.removePhone(tel)
    this.isOperators = false
    this.clean()
  }

  showOperators(tel: Phone) {
    this.isOperators = true
    this.searchOperator = ''
    this.operatorsPhone = tel.operators
    this.phoneShow = tel.phone
    this.roomShow = tel.room
    this.clean()
  }

  editShow(id: number) {
    this.clean()
    this.isEditOper = true
    this.Name = this.operatorsPhone[id]
     this.newName = this.operatorsPhone[id]
  }

  editOperator() {
    this.notOper = !this.dataService.findOperator(this.newName)
    if (this.notOper) {
      this.operatorsPhone = this.dataService.editOperator(this.phoneShow, this.Name, this.newName)
      this.isEditOper = !this.isEditOper
    }
  }

  changePhoneShow(id: number){
    this.clean()
    this.isChangePhone = !this.isChangePhone
    this.Name = this.operatorsPhone[id]
    this.operRoom = this.roomShow
    this.operPhone = this.phoneShow
  }

  changePhoneOperator(newTel: Phone) {
    //this.clean()
    this.isChangePhone = !this.isChangePhone
    if (this.operPhone != newTel[0].phone) {
      this.operatorsPhone = this.dataService.changePhoneOperator(this.Name, this.operPhone, newTel[0].phone)
      this.roomShow = newTel[0].room
      this.phoneShow = newTel[0].phone
      this.isChangePhone = false
    }
  }

  addOperator() {
    this.notOper = this.dataService.addOperator(this.phoneShow, this.addOper)
    if (this.notOper) {
      this.addOper = ''
    }
  }

  clean(){
    this.notOper = true
    this.addOper = ''
    this.notPhone = true
    this.addTel = ''
    this.isChangePhone = false
    this.isEditOper = false
  }

  removeOperator(oper:string){
    this.clean()
    this.operatorsPhone = this.dataService.removeOperator(this.phoneShow, oper)
  }

}
