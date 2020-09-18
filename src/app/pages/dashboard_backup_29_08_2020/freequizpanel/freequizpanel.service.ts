import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreequizpanelService {

  constructor(private webService: WebserviceService) { }

  getQuizQuestionAnswer(quizId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_free_quiz_question_answer/${quizId}`, headers)
  }

  addFreeQuizStudentQuestion(testQuestionId, testTakenId, questionStatus) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`add_free_quiz_student_question/${testQuestionId}/${testTakenId}/${questionStatus}`, headers) 
  }

  addFreeQuizStudentAnswer(testQuestionId, testTakenId, answer_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`add_free_quiz_student_answer/${testQuestionId}/${testTakenId}/${answer_id}`, headers) 
  }

  submitFreeQuiz(testTakenId) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`submit_free_quiz/${testTakenId}`, headers)
  }

}
