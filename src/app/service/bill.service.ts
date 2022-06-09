import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../model/data-model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor( private http: HttpClient) { }

  getBills(){
    let url = 'http://localhost:3000/gastos';
     return this.http.get<Data[]>(url)
  }

  setBills(bill:any): Observable<any>{
    let url = 'http://localhost:3000';
    return this.http.post(`${url}/gastos`, bill)
   
  }

  deleteBills(id:number){
    let url = 'http://localhost:3000';
    return this.http.delete(`${url}/gastos/${id}`)
  }
}
