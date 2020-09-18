import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreequizsolutionService {

  constructor(private webService: WebserviceService) { }

  getQuizQuestionAnswer(quizId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_free_quiz_question_answer/${quizId}`, headers)
  }
  getUserTestTakenId(quizId, studentId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_user_test_taken_id/${quizId}/${studentId}`, headers)
  }

  getFreeQuizSolution(quizId, testTakenId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_free_quiz_solution/${quizId}/${testTakenId}`, headers)
  }

  
}
