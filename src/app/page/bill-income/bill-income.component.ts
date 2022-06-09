import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { BillService } from 'src/app/service/bill.service';
import { IncomeService } from 'src/app/service/income.service';

@Component({
  selector: 'app-bill-income',
  templateUrl: './bill-income.component.html',
  styleUrls: ['./bill-income.component.css']
})
export class BillIncomeComponent implements OnInit {

  constructor( private income: IncomeService,
               private bill: BillService) { }

  dataBill:Data[]=[]
  dataIncome:Data[]=[]
  data:Data[]=[]
  dataFilter:Data[]=[]
  total:number=0

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.income.getIncomes().subscribe(data=>{
      this.dataIncome = data
      
    })
      this.bill.getBills().subscribe(data=>{
      this.dataBill = data
      this.data = [...this.dataBill, ...this.dataIncome]
      this.getTotalMont()
    })
  }

  getFilter(value:[]){
    this.dataFilter = value

  }


  getTotalMont(){
    this.total = this.data.reduce(
      (previousValue, currentValue) => previousValue + currentValue.monto,
    0);

    console.log(this.dataBill)
  }

}
