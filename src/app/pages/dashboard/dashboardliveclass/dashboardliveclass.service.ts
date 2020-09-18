import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardliveclassService {

  constructor(private webservice: WebserviceService) { }

  getLiveClassData() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get("live_class_fetch", headers)
  }

  gettestimonialDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`testimonialDetails`, headers)
  }
}
