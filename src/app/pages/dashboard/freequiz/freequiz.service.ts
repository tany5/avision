import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreequizService {

  constructor(private webService: WebserviceService) { }
  get_free_quiz_list_all(limit, id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_free_quiz_list_all/${limit}/${id}`, headers)
  }

  get_free_quiz_question_type(){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_small_quiz_question_type`, headers)
  }

  get_free_quiz_list_by_id(id, limit){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_free_quiz_list_by_id/${id}/${limit}`, headers)
  }

  addTopicTests(quizId,studentId) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`add_topic_tests/${quizId}/${studentId}`, headers)    
  }
}
