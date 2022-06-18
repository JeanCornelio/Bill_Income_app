import { Component, Inject, Input,  OnInit, Output } from '@angular/core';
import { MatDialogRef,  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from 'src/app/service/budget.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  description: string ="";
  amount: number;
  date: Date;
  title = "Actualizar"
  type = "";
  
  constructor(@Inject(MAT_DIALOG_DATA) public dato: any, 
    public dialogRef : MatDialogRef <FormComponent>,
    private toast: ToastrService,
    private budget: BudgetService,
 ) { }

  ngOnInit(): void {
    this.description = this.dato.finance.descripcion
    this.amount = this.dato.finance.monto 
    this.date = this.dato.finance.fecha
    this.titleChange()
  }

  titleChange(){
    if(this.dato.finance.id == undefined){
      this.title = "Agregar"
    }
  }


  setData(){
    if(this.amount == undefined || !this.date || !this.description ){
      this.toast.error("Valide todos los Campos");
      return
    }
    if(this.dato.finance.hasOwnProperty("id")){

      let data = {
        id: this.dato.finance.id,
        type: this.dato.type,
        description: this.description,
        amount: this.amount,
        date: this.date
      }

      this.budget.updateBudget(data).subscribe(()=>{
        this.toast.success("Actualizado");
        this.closeDialog()
      })

    }else{
      if(this.dato.type == 1 ){
        let bill= {
          id: Date.now(),
          type: this.dato.type,
          descripcion: this.description,
          fecha: this.date,
          monto: this.amount * -1 
        }
        this.budget.setBudget(bill).subscribe(() =>{
          this.toast.success("Gasto Agregado");
          this.closeDialog()
          })
      }
      
      if(this.dato.type == 2){
        let income= {
          id: Date.now(),
          type: this.dato.type,
          descripcion: this.description,
          fecha: this.date,
          monto: this.amount
        }
        this.budget.setBudget(income).subscribe(data =>{
          this.toast.success("Ingreso Agregado");
          this.closeDialog()
          })

      }
    }
  }

  closeDialog() {
    this.dialogRef.close('');
  }
}
