import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LiveclassdashboardService {

  constructor(private webService: WebserviceService) { }
  getLiveClassDetails(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`live_class_details/${prodId}`, headers)
  }

  checkCuponCode(code,id,user_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.post('check_cupon_code',{code,id,user_id},headers)
  }
  checkBuystatus(user_id,prod_id){
    console.log(user_id,prod_id);
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`live_class_check_buystat/${prod_id}/${user_id}`,headers)
  }
}
