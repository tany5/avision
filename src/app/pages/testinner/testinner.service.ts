import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestinnerService {

  constructor(private webService: WebserviceService) { }

  getFullTest(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_full_test/${id}`, headers)
  }

  getSectionTest(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sectional_test/${id}`, headers)
  }

  getPrevTest(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_prev_yr_test/${id}`, headers)
  }

  getTestCount(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_test_count/${id}`, headers)
  }

  getProductId(slug){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_product_id/${slug}`, headers)
  }
  gettestBuyStat(user_id){

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`testSeriesBuyStat/${user_id}`, headers)      
  }

}
