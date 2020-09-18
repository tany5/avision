import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private webservice: WebserviceService) { }

  getAllPopularCourses() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get('fetchall_VideoCourse', headers)
  }

  
  getBankingVideoCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get('fetchbanking_VideoCourse', headers)
  }

  getSscVideoCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get('fetchssc_VideoCourse', headers)
  }

  getRailwayVideoCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get('fetchrailway_VideoCourse', headers)
  }

  getTeachingVideoCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get('fetchteaching_VideoCourse', headers)
  }

  getStateVideoCourse() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get('fetchstateexam_VideoCourse', headers)
  }
}
