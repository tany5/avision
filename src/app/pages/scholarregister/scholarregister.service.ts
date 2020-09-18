import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { WebserviceService } from 'src/app/webservice.service';

@Injectable({
  providedIn: 'root'
})
export class ScholarregisterService {

  get windowRef() {
    return window
  }

  constructor(private webService: WebserviceService) { }

  signup(email, name, phone) {    
    let headers = new HttpHeaders({'Content-Type':'text/plain'})
    return this.webService.post(`add_user_data_by_phone/`,{email,name,phone},headers)
  }

  signupWithPassword(email, name, password, phone) {
    let headers = new HttpHeaders({'Content-Type':'text/plain'})
    return this.webService.post(`signup_wiith_password/`,{email,name,password,phone},headers)
  }

  login(email,pwd){
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.post('login_data_scholarship',{email,pwd},headers)
  }
}
