import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private webService: WebserviceService) { }

  getOrder(id:any) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`order_history/${id}`, headers)    
  }
}
