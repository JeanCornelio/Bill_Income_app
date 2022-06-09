import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BillIncomeComponent } from './page/bill-income/bill-income.component';
import { BillComponent } from './page/bill/bill.component';
import { IncomeComponent } from './page/income/income.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "bill",
    component: BillComponent
  },
  {
    path: "income",
    component: IncomeComponent
  },
  {
    path: "bill-income",
    component: BillIncomeComponent
  },
  {
    path: '**',
    redirectTo: '/home',pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
