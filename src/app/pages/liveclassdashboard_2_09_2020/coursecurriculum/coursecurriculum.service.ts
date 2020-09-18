import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CoursecurriculumService {

  constructor(private webService: WebserviceService) { }
  getLiveClassVideoSubject(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`liveclass_videos_subject/${prodId}`, headers)
  }

  getLiveClassDetails(prodId, id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetchLiveclassBysubject/${id}/${prodId}`, headers)
  }
}
