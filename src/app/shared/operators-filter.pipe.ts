import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Phone } from '../shared/phone';


@Pipe({
  name: 'operatorsFilter'
})
export class OperatorsFilterPipe implements PipeTransform {
  transform(operatorsPhone: string[], search: string) : string[] {
    if(!search.trim()) {
      return operatorsPhone
    }
    return operatorsPhone.filter(oper => {
      return oper.toLowerCase().indexOf(search.toLowerCase()) !==-1
    });
  }
}
