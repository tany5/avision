import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders,HttpClient, HttpHandler  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  

  constructor(private webService: WebserviceService,private http: HttpClient) {  }

  signup(name,email,phone,pwd){

      let headers = new HttpHeaders({'Content-Type':'application/json'})
      return this.webService.post('register',{name,email,phone,pwd},headers)
  }

  login(email,pwd){
    let headers = new HttpHeaders({'Content-Type':'application/json'})
      return this.webService.post('login_data',{email,pwd},headers)
  }
  
  pay_now(user_id,prod_id){
    let headers = new HttpHeaders({'Content-Type':'application/json'})
      // return this.webService.get(`pay_now/${user_id}/${prod_id}`,headers)
      return  this.http.get(`https://avision.co.in/adminpanel/index.php/api/pay_now/${user_id}/${prod_id}`, {headers})
  }

  getbuystat(user_id,prod_id){

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`checkVdoCourseBuyStat/${user_id}/${prod_id}`, headers)   
  }
   /***************************************Menu Section********************************************************/
   

  getbankPOData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_bank_po',headers)
  } 

  getbankSOData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_bank_so',headers)
  }
  getbankClerkData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_bank_clerk',headers)
  }
  getbankRrbData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_bank_rrb',headers)
  }
  getbankSscData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_ssc',headers)
  }
  getbankRailwaysData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_railways',headers)
  }
  getbankInsurancesData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_insurance',headers)
  }
  getbankTetData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_tet',headers)
  }
  getbankDefenceData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_bank_defence',headers)
  }
  getbankWbData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_wb',headers)
  }
  getbankFciData() {
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_fci',headers)
  }
  getBankrrb(){
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_rrb',headers)
  }
  getBankothers(){
    let headers = new HttpHeaders({'Content-Type':'application/json'})
    return this.webService.get('data_bank_others',headers)
  }
}
