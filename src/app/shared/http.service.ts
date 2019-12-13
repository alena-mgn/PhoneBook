import {Injectable} from '@angular/core'
import { HttpClient} from '@angular/common/http'
import {Phone} from '../shared/phone'
import {Observable} from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class HttpService{
  constructor(private http:HttpClient){}

  getPhones(): Observable<Phone[]>{
      return this.http.get('assets/phones.json').pipe(map(data=>{
        let phonesList = data["phoneList"];
        return phonesList.map(function(tel:any) {
          return {room: tel.phoneRoom, phone: tel.phonePhone, operators: tel.phoneOperators};
        });
      }));
  }
}
