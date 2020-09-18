import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreviousyearService {

  constructor(private webService: WebserviceService) { }
  getCourseName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_parent_course_name`, headers)
  }
  getSubCourseName(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_courses_name/${id}`, headers)
  }

  getQuizBySubCategoryId(id) {    
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_quiz_by_sub_category_id/${id}`, headers)    
  }

  startQuiz(quiz_id, user_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`start_quiz/`,{quiz_id, user_id},headers)
  }
  getPreviousYearQuizGivenTest(user_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`get_previous_year_quiz_given_test/${user_id}`,headers)
  }

}  
