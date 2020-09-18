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

  get_free_quiz_list_all(limit, id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_free_quiz_list_all/${limit}/${id}`, headers)
  }

  addTopicTests(quizId,studentId) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`add_topic_tests/${quizId}/${studentId}`, headers)    
  }

  getCompleteQuizStatus(studentId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_complete_quiz_status/${studentId}`, headers)    
  }

  getPracticeSubject(user_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_practice_subject/${user_id}`, headers) 
  }

  getLiveClassData() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get("live_class_fetch", headers)
  }
}
