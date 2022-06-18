import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillComponent } from './page/bill/bill.component';
import { IncomeComponent } from './page/income/income.component';
import { BillIncomeComponent } from './page/bill-income/bill-income.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './component/filter/filter.component';
import { PaginadorComponent } from './component/paginador/paginador.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from './service/interceptor.service';
import { FormComponent } from './component/form/form.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog'; 
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    BillComponent,
    IncomeComponent,
    BillIncomeComponent,
    HomeComponent,
    FilterComponent,
    PaginadorComponent,
    FormComponent,
  ],
  entryComponents:[
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    SweetAlert2Module,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(options),
    CurrencyMaskModule,
    MatDialogModule

   
  ],
  providers: [

  {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
