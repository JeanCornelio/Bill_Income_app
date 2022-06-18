import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnChanges{

  constructor() { }
  @Input() data:any[]=[];
  inpFilter: string =""
  dataFilter:any[]=[]
  @Output() dataFiltrada = new EventEmitter()

  ngOnInit(): void {
    this.dataFilter = [...this.data]
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']){
      this.data = changes['data'].currentValue;
      this.filter()
    }
    
  }

  filter(){
    if(!this.inpFilter){

      this.dataFilter = this.data
      this.setDataFiltrada(this.dataFilter) 
    }else{
       this.dataFilter = this.data.filter( data => data.fecha.toString().includes(this.inpFilter.toLocaleLowerCase()) || data.descripcion.toLocaleLowerCase().includes(this.inpFilter.toLocaleLowerCase()) || data.monto.toString().includes(this.inpFilter.toString())) 
      this.setDataFiltrada(this.dataFilter) 
    }
  }

  setDataFiltrada(dataFilter:any){
    this.dataFiltrada.emit(dataFilter)
   
  }

}
