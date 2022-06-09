import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Data } from '@angular/router';
import { BillService } from 'src/app/service/bill.service';
import * as AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit{

  constructor( private data: BillService,
               private toast: ToastrService) { }
  bill: Data[]=[];
  billCopy: Data[]=[];
  amount: number =0;
  description: string = "";
  date: string = "";
  datePipe = new DatePipe("en-Us");
  inpFilter:string = "";
  dataFilter: Data[]=[];
  dataPaginada: Data[]=[];
  titleButton:string="Gasto";
  total:number=0;
  ngOnInit(): void {
    AOS.init();
    window.addEventListener('load',AOS.refresh)
    this.getData() 
  }

  getData(){
    this.data.getBills().subscribe(data =>{
      this.bill = data  
      this.getTotalMont()
    }, err =>{
      console.log(err)
    })
  }

  setData(value:any){
    if(value.amount <= 0 || !value.date || !value.description ){
      this.toast.error("Valide todos los Campos");
      return
    }

    let bill= {
      id: Date.now(),
      type: "Gasto",
      descripcion: value.description,
      fecha: this.datePipe.transform(value.date,"dd/MM/yyyy"),
      monto: value.amount * -1 
    }
    this.data.setBills(bill).subscribe(data =>{
      this.toast.success("Gasto Agregado");
      this.getData()
    })

  }

  deleteData(bill: Data){
    Swal.fire({
      title: "Eliminar Gasto",
      icon: "warning",
      text: "Esta eliminando este gasto, esta Seguro?",
      background: '#191c29',
      color:"white",
      confirmButtonText: "Aceptar",
      confirmButtonColor:"red",
      showDenyButton:true,
      denyButtonText: `Cancelar`,
      denyButtonColor:"#3085d6"
    }).then(res =>{
     if(res.isConfirmed){
      this.data.deleteBills(bill.id).subscribe( data =>{
        this.getData()
      })
    }else{
      return
    }
  })
  }

  getFilter(value: any[]){
  this.dataFilter = value
  }

  getDataPaginada(value: any[]){
    this.dataPaginada = value
    console.log(value)
  }

  getTotalMont(){
    this.total= this.bill.reduce(
      (previousValue, currentValue) => previousValue + currentValue.monto,
      0);
  }

}
