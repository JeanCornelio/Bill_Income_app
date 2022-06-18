import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Data } from '@angular/router';
import { BudgetService } from 'src/app/service/budget.service';

@Component({
  selector: 'app-bill-income',
  templateUrl: './bill-income.component.html',
  styleUrls: ['./bill-income.component.css'],
})
export class BillIncomeComponent implements OnInit, OnChanges {
  constructor(private budget: BudgetService) {}

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
    this.budget.getBudget().subscribe((data) => {
      this.data = data;
      this.getTotalMont()
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
