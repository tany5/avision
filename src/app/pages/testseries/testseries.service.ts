import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestseriesService {

  constructor(private webService: WebserviceService) { }

  getTestSeriesData() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`testSeriesData`, headers)       
  }

  gettestimonialDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`testimonialDetails`, headers)      
  }

  courseDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`courseDetails`, headers)      
  }

  getTestSeriesSubData(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`testSeriesSingleData/${id}`, headers)  
  }

  getSectional_banner(page_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`page_sectional_banner/${page_id}`, headers)  
  }

  gettestBuyStat(user_id){

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`testSeriesBuyStat/${user_id}`, headers)      
  }

  getschollarExamStat(test_taken_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`getschollarExamStat/${test_taken_id}`, headers)      
  }



}
