import { Component, OnChanges, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import * as AOS from 'aos';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/component/form/form.component';
import { BudgetService } from 'src/app/service/budget.service';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  constructor(
    private budget: BudgetService,
    public dialog: MatDialog
  ) { }
  bill: Data[] = [];
  dataFilter: Data[] = [];
  total: number = 0;
  dataNull: Data[] = [];


  ngOnInit(): void {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
    this.getData();
  }

  getData() {
    this.budget.getBudget().subscribe(
      (data) => {
        this.bill = data.filter(el => el.type !== 2);
        this.getTotalMont();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteData(bill: Data) {
    Swal.fire({
      title: 'Eliminar Gasto',
      icon: 'warning',
      text: 'Esta eliminando este gasto, esta Seguro?',
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

  openModalBill(data: Data) {
    this.dialog
      .open(FormComponent, {
        width: '500px',
        data: {
          finance: data,
          type: 1,
        },
      })
      .afterClosed()
      .subscribe(() => {
      this.getData()
      });
  }


  getFilter(value: any[]) {
    this.dataFilter = value;
  }


  getTotalMont() {
    this.total = this.bill.reduce(
      (previousValue, currentValue) => previousValue + currentValue.monto,
      0
    );
  }
}
