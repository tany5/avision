import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class DashboardhomeService {

  constructor(private webService: WebserviceService) { }
  getTestSeriesData() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`testSeriesData`, headers)       
  }

  getAllPopularCourses() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get('fetchall_VideoCourse', headers)
  }
}
