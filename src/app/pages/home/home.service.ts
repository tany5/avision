import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private webService: WebserviceService) { }

    getBanner() {      
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get("bannerDetails", headers)
    }

    getCourseDetails() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get("courseDetails", headers)
    }

    getCourseDetailsbyId(id:string) {     
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`subCategoryName/${id}`, headers) 
    }

    examPreprationDetails() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`examPreprationDetails`, headers)       
    }

    getTestSeriesData() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`testSeriesData`, headers)       
    }

    getResultData(){
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`resultTab`, headers)
    }

    getStudentImage(term_id) {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`getStudentImage/${term_id}`, headers)
    }

    getSingleStudentImage(term_id) {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`getSingleStudentImage/${term_id}`, headers)
    }

    gettestimonialDetails() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`testimonialDetails`, headers)      
    }

    getAllPopularCourses() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get('fetchall_VideoCourse', headers)
    }

    gethomePopupBanner(){

      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get('homePopupBanner', headers)
    }

    
}
