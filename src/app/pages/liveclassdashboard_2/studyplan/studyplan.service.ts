import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudyplanService {

  constructor(private webService:WebserviceService) { }

  getLiveCLassDetails(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`live_class_details/${prodId}`, headers)
  }

  getLiveClassVideo(prodId, id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_live_class_video/${prodId}-${id}`, headers)
  }
}
