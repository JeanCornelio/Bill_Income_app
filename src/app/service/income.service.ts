import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../model/data-model';
@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor( private http: HttpClient) { }

  url:string ="https://json-serve-api.herokuapp.com/Ingresos"



  getIncomes(){
     return this.http.get<Data[]>(this.url)
  }

  setIncomes(income:any): Observable<any>{
    return this.http.post(this.url, income)
   
  }

  deleteIncomes(id:number){
   
    return this.http.delete(`${this.url}/${id}`)
  }


  updateIncomes(income:any):Observable<Data>{
    let body={
      type:"Ingreso",
      descripcion: income.description,
      monto: income.amount,
      fecha: income.date
    }
    return this.http.put<Data>(`${this.url}/${income.id}`,body )
  }
}
