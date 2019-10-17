import { Pipe, PipeTransform } from '@angular/core';
import { Phone, DataService } from '../shared/data.service';

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
