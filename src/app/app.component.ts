import { Component } from '@angular/core';

import { HttpService } from './shared/http.service'
import { DataService } from './shared/data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService, HttpService]
})
export class AppComponent {
  title = 'PhoneBook';
}
