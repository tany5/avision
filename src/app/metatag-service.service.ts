import { Injectable } from '@angular/core';
import { WebserviceService } from './webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetatagServiceService {

  constructor(private webservice: WebserviceService) { }

  fetchMetaPage(page_slug){

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`fetch_meta_data/${page_slug}`, headers)
  }

  fetchInnerMetaPage(page_slug,id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`fetch_meta_inner_data/${page_slug}/${id}`, headers)
  }
}
