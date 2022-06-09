import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  description: string ="";
  amount: number = 0;
  date: string ="";
  @Input() titleButton:string = ""
  @Output()dataPass = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  setData(){
    let dataObject={
      description:this.description,
      amount: this.amount,
      date: this.date
    }
   
    this.fullDate(dataObject)

    this.description = ""
    this.amount =0
    this.date ="dd/mm/aaa"

  }

  fullDate(fullDate:any){
   this.dataPass.emit(fullDate)

  }
}
