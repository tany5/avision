import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CentersService {

  constructor(private webService: WebserviceService) { }

  centerList() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`centerList`, headers)
  }
}
