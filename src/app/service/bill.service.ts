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
    let url = 'https://json-serve-api.herokuapp.com/gastos';
     return this.http.get<Data[]>(url)
  }

  setBills(bill:any): Observable<any>{
    let url = 'https://json-serve-api.herokuapp.com';
    return this.http.post(`${url}/gastos`, bill)
   
  }

  deleteBills(id:number){
    let url = 'https://json-serve-api.herokuapp.com';
    return this.http.delete(`${url}/gastos/${id}`)
  }
}
