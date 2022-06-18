import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  url:string= "https://json-serve-api.herokuapp.com/data"
  constructor(private http: HttpClient) { }


  getBudget(){
    return this.http.get<Data[]>(this.url);
  }

  setBudget(budget:Data){
    return this.http.post<Data[]>(this.url, budget)
  }

  deleteBudget(id:number){
    return this.http.delete<Data[]>(`${this.url}/${id}`)
  }

  updateBudget(budget:Data){
    if(budget.type == 1){
      let body={
        type:1,
        descripcion: budget.description,
        monto:budget.amount,
        fecha: budget.date
      }
      return this.http.put<Data[]>(`${this.url}/${budget.id}`, body)
    }else{
      let body={
        type:2,
        descripcion: budget.description,
        monto:budget.amount,
        fecha: budget.date
      }
      return this.http.put<Data[]>(`${this.url}/${budget.id}`, body)
    }
  }
}
