import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../model/data-model';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url:string ="https://json-serve-api.herokuapp.com/gastos"
  constructor( private http: HttpClient) { }

  getBills(){
     return this.http.get<Data[]>(this.url)
  }

  setBills(bill:any): Observable<any>{
    return this.http.post(this.url, bill)
  }

  deleteBills(id:number){;
    return this.http.delete(`${this.url}/${id}`)
  }

  updateBills(bill:any):Observable<Data>{
    let body={
      type:"Gasto",
      descripcion: bill.description,
      monto: bill.amount,
      fecha: bill.date
    }
    return this.http.put<Data>(`${this.url}/${bill.id}`,body )
  }
}
