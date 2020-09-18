import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PracticetestService {

  constructor(private webService: WebserviceService) { }
  get_practice_subject(user_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_practice_subject/${user_id}`, headers)
  }

  get_practice_chapter(subject_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_practice_chapter/${subject_id}`, headers)
  }

  getPracticeQuesion(subject_id,chapter_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_practice_question/${subject_id}/${chapter_id}`, headers)
  }

  getPracticeQuestionCount(subject_id,chapter_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_practice_question_count/${subject_id}/${chapter_id}`, headers)
  }

  getPracticeQuestionAnswer(question_id){

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_practice_question_answer/${question_id}`, headers)    
  }
  getPracticeQuestionSolution(question_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_practice_question_answer_sol/${question_id}`, headers)  
  }
  PracticeQuestionSave(test_taken_id,question_id,answer_id,anser_status){
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`savePraciceQuestion`,{test_taken_id,question_id,answer_id,anser_status}, headers)  
  }
  savePracticeTest(user_id,subject_id,chapter_id){
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`savePraciceTest`,{user_id,subject_id,chapter_id}, headers)
  }
  checkPracticetestState(user_id,subject_id,chapter_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`check_practice_test/${user_id}/${subject_id}/${chapter_id}`, headers)  
  }
  checkTestComplete(user_id,subject_id,chapter_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`check_practice_test_complete/${user_id}/${subject_id}/${chapter_id}`, headers)  
  }
  fetchPracticetesttakenId(user_id,subject_id,chapter_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_practice_test_taken_id/${user_id}/${subject_id}/${chapter_id}`, headers) 
  }
  countAppliedQuestion(user_id,subject_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`count_applied_question/${user_id}/${subject_id}`, headers) 
  }

}
