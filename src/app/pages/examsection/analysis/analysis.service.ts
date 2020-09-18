import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private webService: WebserviceService) { }

  rankScore(user_id, quiz_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`rank_n_score/${user_id}/${quiz_id}`,headers)
  }

  sectionalAnalysisMaark(user_id, quiz_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`sectional_analysis_mark/${user_id}/${quiz_id}`,headers)
  }

  compareWithTopper(user_id, quiz_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`compare_with_topper/${user_id}/${quiz_id}`,headers)
  }

  compareWithTopperBySection(user_id, quiz_id, section_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`compare_with_section_section/${user_id}/${quiz_id}/${section_id}`,headers)
  }

}
