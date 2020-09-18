import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamformatService { 
  constructor(private webService: WebserviceService) {}

   getQuizInformation(quiz_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_quiz_information/${quiz_id}`,headers)
   }

   startQuiz(quiz_id, user_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`start_quiz/`,{quiz_id, user_id},headers)
   }
}
