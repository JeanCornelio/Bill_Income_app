import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Data } from '@angular/router';
import * as AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
import { IncomeService } from 'src/app/service/income.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit {
  constructor(private data: IncomeService, private toast: ToastrService) {}

  income: Data[] = [];
  incomeCopy: Data[] = [];
  amount: number = 0;
  description: string = '';
  date: string = '';
  datePipe = new DatePipe('en-Us');
  inpFilter: string = '';
  dataFilter: Data[] = [];
  dataPaginada: Data[] = [];
  titleButton:string="Ingreso"
  total:number=0
  dataEdit: object={};
  ngOnInit(): void {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
    this.getData();
  }

  getData() {
    this.data.getIncomes().subscribe((data) => {
      this.income = data;
      this.getTotalMont();
    });
  }

  setData(value:any) {
    if (value.amount <= 0 || !value.date || !value.description) {
      this.toast.error('Valide todos los Campos');
      return;
    }

     if(value.hasOwnProperty("id")){
      this.data.updateIncomes(value).subscribe(income =>{
        this.toast.success("Ingreso Modificado");
        this.getData()
      })

    } else{

    let income = {
      id: Date.now(),
      type: 'Ingreso',
      descripcion: value.description,
      fecha: this.datePipe.transform(value.date, 'dd/MM/yyyy'),
      monto: value.amount,
    };
    this.data.setIncomes(income).subscribe((data) => {
      this.toast.success('Gasto Agregado');
      this.getData();
    });
  }
  }

  deleteData(bill: Data) {
    Swal.fire({
      title: 'Eliminar '+ this.titleButton,
      icon: 'warning',
      text: 'Esta eliminando este ' + this.titleButton + ', esta Seguro?',
      background: '#191c29',
      color:"white",
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'red',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#3085d6',
    }).then((res) => {
      if (res.isConfirmed) {
        this.data.deleteIncomes(bill.id).subscribe((data) => {
          this.getData();
        });
      } else {
        return;
      }
    });
  }

  updateData(income:Data){
    this.dataEdit = income
 
   }

  getFilter(value: any[]) {
    this.dataFilter = value;
  }

  getDataPaginada(value: any[]) {
    this.dataPaginada = value;
    console.log(value);
  }
  getTotalMont(){
    this.total= this.income.reduce(
      (previousValue, currentValue) => previousValue + currentValue.monto,
      0);
  }
}
