import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LiveclassdetailsService {

  constructor(private webService: WebserviceService) { }
  geLiveClassDetails(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`live_class_details/${id}`, headers)  
  }

  geLiveClassTeacherDetails(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_course_teacher/${id}`, headers)  
  }

  gettestimonialDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`testimonialDetails`, headers)      
  }
  getProductId(slug) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_product_id/${slug}`, headers)      
  }
}
