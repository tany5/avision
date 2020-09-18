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

  getBanner() {      
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get("bannerDetails", headers)
  }

  get_free_quiz_list_all(limit){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_free_quiz_list_all/${limit}`, headers)
  }

  addTopicTests(quizId,studentId) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`add_topic_tests/${quizId}/${studentId}`, headers)    
  }
}
