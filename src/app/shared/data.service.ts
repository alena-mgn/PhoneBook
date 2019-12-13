import { Injectable } from '@angular/core'

import { HttpService } from './http.service'

import { Phone } from './phone';

@Injectable ()

export class DataService {

    constructor(private httpService: HttpService){}

    public phones: Phone[] = []

    dataInit() {
      this.httpService.getPhones().subscribe(data => this.phones = data)
    }

    listRooms() {
      let arr: string[] = []
        for (let i = 0; i < this.phones.length; i++) {
          let r: string = this.phones[i].room
          if (arr.indexOf(r) == -1 )   arr.push(r)
        }
      arr.sort()
      return arr
    }

    search(searchName: string) {
      let users: Phone[] = []
      searchName = searchName.trim().toLowerCase() + ' '
        for (let i = 0; i < this.phones.length; i++) {
            for (let j = 0; j < this.phones[i].operators.length; j++) {
              let oper = this.phones[i].operators[j].trim().toLowerCase() + ' '
              if ( oper.includes(searchName) ) {
                  let user: Phone = new Phone('', '', [])
                      user.phone = this.phones[i].phone
                      user.room = this.phones[i].room
                      user.operators = [this.phones[i].operators[j]]
                    users.push(user)
                }
            }
        }
      return users
    }

    indexPhone(tel: string) {
     let telId: number = -1
       for (let i = 0; i < this.phones.length; i++)
           if (this.phones[i].phone == tel)  telId = i
     return telId
    }

    addPhone(telefon: Phone) {
      let noPhone:boolean = this.indexPhone(telefon.phone) == -1
       if (noPhone) this.phones.unshift(telefon)
      let tel =  'Телефонов нет'
        for (let i = 0; i < this.phones.length; i++) {
          if ((this.phones[i].phone == tel) && (this.phones[i].room == telefon.room)) {
            this.phones.splice(i, 1)
          }
        }
      return noPhone
    }

    countPhoneRoom(roomPhone: string) {
      let count = 0
        for (let i = 0; i < this.phones.length; i++)
            if (this.phones[i].room == roomPhone) count++
      return count
    }

    removePhone(tel: string){
      let idx: number = this.indexPhone(tel)
      let phoneRoom = this.phones[idx].room
      let roomNotPhone: boolean = this.countPhoneRoom(phoneRoom) == 1
        if (roomNotPhone) {
          let user: Phone = new Phone('', '', [])
              user.room = phoneRoom
              user.phone = 'Телефонов нет'
            this.phones.push(user)
        }
        this.phones = this.phones.filter(t => t.phone !== tel)
    }

     findOperator(operator: string) {
      let flag = false
      let searchName = operator.trim().toLowerCase() + ' '
        for (let i = 0; i < this.phones.length; i++) {
            for (let j = 0; j < this.phones[i].operators.length; j++) {
              let oper = this.phones[i].operators[j].trim().toLowerCase() + ' '
              if ( oper.includes(searchName) ) flag = true
            }
        }
      return flag
    }

    addOperator(phoneShow: string, addOper: string){
      let notOper = !this.findOperator(addOper)
        if (notOper) {
          let idx: number = this.indexPhone(phoneShow)
          this.phones[idx].operators.push(addOper)
        }
      return notOper
    }

    editOperator(phoneShow: string, oldName: string, newName: string) {
      let idx: number = this.indexPhone(phoneShow)
      let id: number = this.phones[idx].operators.indexOf(oldName)
        this.phones[idx].operators.splice(id,1, newName)
      return this.phones[idx].operators
    }

    removeOperator(phoneShow: string, oper: string) {
        let idx: number = this.indexPhone(phoneShow)
          this.phones[idx].operators = this.phones[idx].operators.filter(op => op !== oper)
        return this.phones[idx].operators
    }

    changePhoneOperator(nameOper:string, phoneShow:string, newTel:string) {
      let idx: number = this.indexPhone(newTel)
        this.phones[idx].operators.push(nameOper)
        this.removeOperator(phoneShow, nameOper)
      return this.phones[idx].operators
    }

}
