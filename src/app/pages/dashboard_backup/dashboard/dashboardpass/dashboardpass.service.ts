import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardpassService {

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
}
