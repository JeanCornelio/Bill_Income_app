import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinerService {

  constructor( private spinerService: NgxSpinnerService) { }

  public callSpiner(){
    this.spinerService.show();
  }

  public stopSpiner(){
    this.spinerService.hide();
  }
}
