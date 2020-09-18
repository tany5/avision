import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MocktestService {

  constructor(private webService: WebserviceService) { }
  getLiveCLassDashboardTest(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`live_class_dashboard_test/${prodId}`, headers)
  }

  getLiveClassDetails(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`live_class_details/${prodId}`, headers)
  }


}
