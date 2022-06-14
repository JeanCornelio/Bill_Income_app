import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Data } from 'src/app/model/data-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnChanges {
  description: string = '';
  amount: number;
  date: string = '';
  @Input() titleButton: string = '';
  @Output() dataPass = new EventEmitter();
  @Input() dataEdit: any;
  @Input() btnDisable: boolean = true;
  testEditin: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.description = this.dataEdit.descripcion;
    this.amount = this.dataEdit.monto;
    this.date = this.dataEdit.fecha;
    console.log(this.dataEdit.fecha);
  }

  setData() {
    let dataObject = {
      description: this.description,
      amount: this.amount,
      date: this.date,
    };
    this.fullDate(dataObject);
    this.description = '';
    this.amount = 0;
    this.date = '';
  }

  setDataUpdate() {
    if (this.dataEdit !== {}) {
      let description = this.description;
      let amount = this.amount;
      let date = this.date;

      let objectEdit = {
        id: this.dataEdit.id,
        description,
        amount,
        date,
      };
      this.fullDate(objectEdit);
      this.description = '';
      this.amount = 0;
      this.date = '';
    } else {
    }

    this.btnDisable = true;
  }

  fullDate(fullDate: any) {
    this.dataPass.emit(fullDate);
  }
}
