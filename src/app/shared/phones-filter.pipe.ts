import { Pipe, PipeTransform } from '@angular/core';
import { Phone, DataService } from '../shared/data.service';

@Pipe({
  name: 'phonesFilter'
})
export class PhonesFilterPipe implements PipeTransform {
  transform(phones: Phone[], search: string) : Phone[] {
    if (search == 'Все телефоны') {
        search = '';
    };
    if(!search.trim()) {
      return phones
    }
    return phones.filter(phone => {
      return phone.room.toLowerCase().indexOf(search.toLowerCase()) !==-1
    });

  }
}
