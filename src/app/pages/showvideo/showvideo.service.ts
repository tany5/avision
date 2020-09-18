import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowvideoService {

  constructor(private webservice: WebserviceService) { }

  getVieoCourseSubject(id: any) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`fetch_video_course_subject/${id}`, headers)
  }
  getVideoCourseChapter(prodId, chapterId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`fetch_video_course_menu_chapter/${chapterId}/${prodId}`, headers)
  }
  getCourseDetails(id:any) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`fetch_course_detals/${id}`, headers)    
  }

  getbuystat(prod_id,user_id){

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`checkVdoCourseBuyStat/${user_id}/${prod_id}`, headers)   
  }
}
