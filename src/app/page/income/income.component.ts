import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Data } from '@angular/router';
import * as AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from 'src/app/component/form/form.component';
import { BudgetService } from 'src/app/service/budget.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit {
  constructor(private budget: BudgetService,
              private toast: ToastrService,
              public dialog: MatDialog) {}

  income: Data[] = [];
  incomeCopy: Data[] = [];
  amount: number = 0;
  inpFilter: string = '';
  dataFilter: Data[] = [];
  titleButton: string = 'Ingreso';
  total: number = 0;
  dataNull = []

  ngOnInit(): void {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
    this.getData();
  }

  getData() {
    this.budget.getBudget().subscribe((data) => {
      this.income = data.filter(el => el.type !== 1);
      this.getTotalMont();
    });
  }

  deleteData(bill: Data) {
    Swal.fire({
      title: 'Eliminar ' + this.titleButton,
      icon: 'warning',
      text: 'Esta eliminando este ' + this.titleButton + ', esta Seguro?',
      background: '#191c29',
      color: 'white',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'red',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#3085d6',
    }).then((res) => {
      if (res.isConfirmed) {
        this.budget.deleteBudget(bill.id).subscribe((data) => {
          this.getData();
        });
      } else {
        return;
      }
    });
  }


  getFilter(value: any[]) {
    this.dataFilter = value;
  }

  getTotalMont() {
    this.total = this.income.reduce(
      (previousValue, currentValue) => previousValue + currentValue.monto,
      0
    );
  }


  openModalIncome(data:Data){
    this.dialog.open(FormComponent,{
      width: '500px',
        data: {
          finance: data,
          type: 2,
        },
    }).afterClosed().subscribe(()=>{
      this.getData()
    })
  }

}
