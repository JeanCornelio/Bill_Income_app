import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../model/data-model';
@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor( private http: HttpClient) { }


  getIncomes(){
    let url = 'https://json-serve-api.herokuapp.com/Ingresos';
     return this.http.get<Data[]>(url)
  }

  setIncomes(income:any): Observable<any>{
    let url = 'https://json-serve-api.herokuapp.com';
    return this.http.post(`${url}/Ingresos`, income)
   
  }

  deleteIncomes(id:number){
    let url = 'https://json-serve-api.herokuapp.com';
    return this.http.delete(`${url}/Ingresos/${id}`)
  }
}
