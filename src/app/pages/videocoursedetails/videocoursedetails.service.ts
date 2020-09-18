import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideocoursedetailsService {

  constructor(private webService: WebserviceService) { }

  
  getCourseDetails(id:any) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_course_detals/${id}`, headers)    
  }

  getVieoCourseSubject(id: any) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_video_course_subject/${id}`, headers)
  }

  getVideoCourseChapter(prodId, chapterId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_video_course_chapter/${chapterId}/${prodId}`, headers)
  }

  geVideoCourseTeacherDetails(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_Video_Course_teacher/${id}`, headers)  
  }
  gettestimonialDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`testimonialDetails`, headers)      
  }

  getbuystat(user_id,prod_id){

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`checkVdoCourseBuyStat/${user_id}/${prod_id}`, headers)   
  }

  getDemoChapterVideo(prod_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_demo_chapter/${prod_id}`, headers)  
  }

}
