import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private webService: WebserviceService) {}
  getFooterMenuDetils() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`data_footer_menu`, headers)
  }
}
