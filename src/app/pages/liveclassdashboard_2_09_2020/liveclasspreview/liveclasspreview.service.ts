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
  fetchUserName(user_id: number){

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`fetch_user_name/${user_id}`, headers)
 
    }

    checkBuystatus(user_id,prod_id){
      console.log(user_id,prod_id);
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`live_class_check_buystat/${prod_id}/${user_id}`,headers)
    }
}
