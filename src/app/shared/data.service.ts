import { Injectable } from '@angular/core';

export class Phone {
    constructor(public  room: string,
                  public phone: string,
                  public operators: string[]) {}
}

@Injectable ({
  providedIn: 'root'
})

export class DataService {

      public phones: Phone[] = [
        new Phone('Box_1', '+7 8001000123', ['Абрамов К.Б.', 'Василенко А.Д.','Родимов В.Е.']),
        new Phone('Box_1', '+7 8001000234', ['Родчикова Е.П.', 'Васина О.Р.']),
        new Phone('Box_1', '+7 8001000345', ['Абрамович Р.К.']),
        new Phone('Box_2', '+7 8002000456', ['Разин Р.Т.', 'Давыдов Д.П.']),
        new Phone('Box_3', '+7 8003000567', ['Иванова И.А.', 'Шигина Е.А.','Петров И.И.']),
        new Phone('Box_3', '+7 8003000678', ['Калашников Т.М.']),
        new Phone('Box_4', '+7 8001001123', ['Петров К.Б.', 'Кузнецов А.Д.','Исаев В.Е.']),
        new Phone('Box_4', '+7 8001221123', ['Федоров К.Б.', 'Денисова А.Д.','Ушаков В.Е.']),
        new Phone('Box_2', '+7 8002078526', ['Разумовский Р.Т.', 'Швецов Л.П.']),
        new Phone('Box_2', '+7 8002111456', ['Темин Д.Т.', 'Анин П.П.', 'Дымов П.П.','Шульгин А.Ж.','Цапов В.П.'])

    ];

     public listRooms(){
      let arr: string[] = ['Все телефоны'];
      for (let i = 0; i < this.phones.length; i++) {
        let r: string = this.phones[i].room;
        if (arr.indexOf(r) == -1 ) {
            arr.push(r);
        }
      }
      return arr;
    } ;

    search(searchName: string) {
      let user: Phone = new Phone('', '', []);
        for (let i = 0; i < this.phones.length; i++) {
            for (let j = 0; j < this.phones[i].operators.length; j++) {
                if (this.phones[i].operators[j] == searchName) {
                      user = this.phones[i];
                }
            };
        };
      return user;

    };

    addPhone(telefon: Phone) {
       this.phones.push(telefon);
    }

    removePhone(tel: string){
      this.phones = this.phones.filter(t => t.phone !== tel)
    }

    showOperators(tel: Phone) {
      return tel.operators;
      }

    addOperator(phoneShow: string, addOper: string){
      let idx: number;
      for (let i = 0; i < this.phones.length; i++) {
          if (this.phones[i].phone == phoneShow) {
                idx = i;
          };
      };
      this.phones[idx].operators.push(addOper);
    }

    editOperator(phoneShow: string, id: number, newName: string) {
      let idx: number;
      for (let i = 0; i < this.phones.length; i++) {
          if (this.phones[i].phone == phoneShow) {
                idx = i; };
      };
      //let newName: string = 'OPERATOR'
      //prompt("Введите новые данные");
      this.phones[idx].operators.splice(id,1, newName);
    }

    removeOperator(phoneShow: string, oper: string) {
        let idx: number;
        for (let i = 0; i < this.phones.length; i++) {
            if (this.phones[i].phone == phoneShow) {
                  idx = i;
            };
        };
        this.phones[idx].operators = this.phones[idx].operators.filter(op => op !== oper);
    }


}
