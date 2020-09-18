import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  constructor(private webService: WebserviceService) { }
    getPassData() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`passData`,headers)
    }

    getCourseDetails() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get("courseDetails", headers)
    }

    getSubCategoryAllData() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get("subCategoryAllData", headers)

    }

    getSubCategoryName(id:any) {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`subCategoryName/${id}`, headers)

    }
    payForPlan(plan_id,user_id){
      //alert(plan_id)
      let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
      return this.webService.post('pay_for_plan',{plan_id,user_id},headers)
    }

    
}
