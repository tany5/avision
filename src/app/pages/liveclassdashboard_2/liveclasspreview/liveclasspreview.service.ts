import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiveclasspreviewService {

  constructor(private webService:WebserviceService) { }
  getLiveClassDetails(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`live_class_details/${prodId}`, headers)
  }

  getDemoVideo(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_demo_video/${prodId}`, headers)
  }
  fetchLiveclassCurrentVideo(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_live_class_current_vdo/${prodId}`, headers)
  }
}
