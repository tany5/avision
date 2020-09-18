import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseinfoService {

  constructor(private webService: WebserviceService) { }
  getCourseName(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`getcoursename/${prodId}`, headers)
  }

  getCourseContent(prodId){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`getCourseContent/${prodId}`, headers)
  }
  getTestSeriesById(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`testSeriesById/${prodId}`, headers)
  }

  getVideoCourseById(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`video_courseById/${prodId}`, headers)
  }
  getCourseId(slug){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`getCourseId/${slug}`, headers)
  }

  
}