import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Data } from '@angular/router';
import { BillService } from 'src/app/service/bill.service';
import { IncomeService } from 'src/app/service/income.service';

@Component({
  selector: 'app-bill-income',
  templateUrl: './bill-income.component.html',
  styleUrls: ['./bill-income.component.css'],
})
export class BillIncomeComponent implements OnInit, OnChanges {
  constructor(private income: IncomeService, private bill: BillService) {}

  dataBill: Data[] = [];
  dataIncome: Data[] = [];
  data: Data[] = [];
  dataFilter: Data[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.getData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getTotalMont();
  }

  getData() {
    this.income.getIncomes().subscribe((data) => {
      this.dataIncome = data;
      this.bill.getBills().subscribe((data) => {
        this.dataBill = data;
        this.data = [...this.dataBill, ...this.dataIncome];
        this.data.sort((a: any, b: any) => a.id - b.id);
        this.getTotalMont();
      });
    });
  }

  getFilter(value: []) {
    this.dataFilter = value;
  }

  getTotalMont() {
    this.total = this.data.reduce(
      (previousValue, currentValue) => previousValue + currentValue.monto,
      0
    );
  }
}
