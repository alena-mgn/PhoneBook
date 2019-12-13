import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Phone } from '../shared/phone';


@Pipe({
  name: 'telephoneFilter'
})
export class TelephoneFilterPipe implements PipeTransform {
  transform(phones: Phone[], search: string) : Phone[] {
    if(!search.trim()) {
      return phones
    }
    return phones.filter(phone => {
      return phone.phone.toLowerCase().indexOf(search.toLowerCase()) !==-1
    });

  }
}
