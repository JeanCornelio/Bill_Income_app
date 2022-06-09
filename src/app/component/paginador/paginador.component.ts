import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Data } from '@angular/router';
@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit, OnChanges {

  constructor() { }
  @Input()data:Data[]=[]
  dataPaginator:Data[]=[]
  endIndex: number = 5;
  @Output() dataPaginada = new EventEmitter()

  ngOnInit(): void {
    
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']){
      this.data = changes['data'].currentValue;
      this.dataPaginator =  this.data.slice(0,this.endIndex)
     
    }
   
   }

  OnPageChange(e: PageEvent){
    
    const startIndex = e.pageIndex * e.pageSize;
    this.endIndex = startIndex + e.pageSize;
    if(this.endIndex > this.data.length){
      this.endIndex = this.data.length;
    }
    this.dataPaginator = this.data.slice(startIndex, this.endIndex)

  }

  setDataPaginada(dataPaginada:any){
  this.dataPaginada.emit(dataPaginada)
  return console.log(dataPaginada)
  }



}
