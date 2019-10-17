import { Pipe, PipeTransform } from '@angular/core';
import { Phone, DataService } from '../shared/data.service';

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
