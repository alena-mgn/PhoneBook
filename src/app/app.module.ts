import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';

import { PhonesFilterPipe } from './shared/phones-filter.pipe';
import { OperatorsFilterPipe } from './shared/operators-filter.pipe';
import { TelephoneFilterPipe } from './shared/telephone-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    PhonesFilterPipe,
    OperatorsFilterPipe,
    TelephoneFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
