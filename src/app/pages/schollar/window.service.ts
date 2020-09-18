import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor(private webService: WebserviceService) { }

  login(email,pwd){
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.post('login_data',{email,pwd},headers)
  }

  getUserDataByPhone(phoneNo) {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get(`get_user_data_by_phone/${phoneNo}`,headers)
  }

  signup(email, name, phone) {    
    let headers = new HttpHeaders({'Content-Type':'text/plain'})
    return this.webService.post(`add_user_data_by_phone/`,{email,name,phone},headers)
  }

  signupWithPassword(email, name, password, phone) {
    let headers = new HttpHeaders({'Content-Type':'text/plain'})
    return this.webService.post(`signup_wiith_password/`,{email,name,password,phone},headers)
  }
}
