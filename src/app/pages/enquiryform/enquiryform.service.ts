import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnquiryformService {

  constructor(private webService: WebserviceService) { }

  submitEnquiry(firstName,lastName,email,phoneNo,examName,message) {
    let headers = new  HttpHeaders ({'Content-Type':  'text/plain'})
    return this.webService.post('submit_enquiry',{firstName,lastName,email,phoneNo,examName,message}, headers)
  }

  getCoursesName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get('get_courses_name', headers)
  }
}
