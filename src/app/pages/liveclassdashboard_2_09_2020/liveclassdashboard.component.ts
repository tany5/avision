import { Component, OnInit } from '@angular/core';
import { LiveclassdashboardService } from './liveclassdashboard.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import * as $ from 'jquery'
import { FormGroup,FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
declare var jQuery: any;

@Component({
  selector: 'app-liveclassdashboard',
  templateUrl: './liveclassdashboard.component.html',
  styleUrls: ['./liveclassdashboard.component.scss']
})
export class LiveclassdashboardComponent implements OnInit {
  [x: string]: any;
  product_name: any
  product_price: any
  product_offer_price: any
  liveDetails: any
  prodId: any
  urlEncryptId: any
  cupon_form: FormGroup;
  buy_now_stat : any
  after_price: any
  cupon_stat:any
  cupon_code: any
  constructor(private formbuilder: FormBuilder,private liveclassDashboardService: LiveclassdashboardService, private route: ActivatedRoute,private router: Router, private EncrDecr: EncrDecrServiceService,private location: Location) {

    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']         
        this.urlEncryptId = this.prodId
        var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.prodId)
        this.prodId = decrypted       
      })

      if(this.prodId == undefined) {
        this.route.params.subscribe(
          (params: Params) => {
            this.prodId = params['prodId']         
            this.urlEncryptId = this.prodId
            var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.prodId)
            this.prodId = decrypted        
          })

          
      }

     
      

    this.liveclassDashboardService.getLiveClassDetails(this.prodId).subscribe(
      (res)=> {  
        console.log(res)     
        this.liveDetails = res['live_cls_dtls_data']       
        this.product_name = this.liveDetails['product_name']
        this.product_price = this.liveDetails['product_price']
        this.product_offer_price = this.liveDetails['product_offer_price']
     
      },
      (error)=> {
        console.log(error)
      })

      this.cupon_form = this.formbuilder.group({
        cupon: ['']
      });

      
  }

  ngOnInit(): void {

    this.liveclassDashboardService.checkBuystatus(localStorage.getItem('currentUserId'),this.prodId).subscribe(

      (res) => {
        console.log(res);
        if(res['buy_stat'] == "1"){
          localStorage.setItem('buyNowStat','1');
          this.buy_now_stat = 1;
        }else{
          localStorage.setItem('buyNowStat','0');
          this.buy_now_stat =0;
        }
      }
    )
  }
  onCuponSubmit(cupon_form1){
    this.cupon_code = cupon_form1.value.cupon
    this.liveclassDashboardService.checkCuponCode(cupon_form1.value.cupon,this.prodId,localStorage.getItem('currentUserId')).subscribe(

      (res) => {
        console.log(res);
        if(res['status'] == 200){
          localStorage.setItem('buyNowStat','1');
          this.after_price = res['product_price'];
          jQuery('#after_apply').show();
          jQuery('#unmatch').hide()
          this.cupon_stat = 200;
          //location.reload();
        }else if(res['status'] == 202){
          this.after_price = res['product_price'];
          jQuery('#after_apply').show();
          jQuery('#unmatch').hide()
          this.cupon_stat = 202;
         // var user_id = localStorage.getItem('currentUserId');
  	      //location.href = "http://estore.avision24x7.com/index.php/front/	front_ctr/pay_for_liveClass/"+user_id+"/"+this.prodId+'/1';
        }else{
          jQuery('#unmatch').show()
          localStorage.setItem('buyNowStat','0');
          this.cupon_stat=203;
        }
      }
    );
  }

  onLogout(){

    localStorage.clear();
    //this.location.back();
    //this.router.navigate(['../']);
    
    location.href="liveclass";
  }

  gotoPay(){

    var user_id = localStorage.getItem('currentUserId');
    
  	location.href = "https://estore.avision24x7.com/index.php/front/front_ctr/pay_for_liveClass/"+user_id+"/"+this.prodId+'/0/'+this.cupon_code;
  }

  onProcced(){
    var user_id = localStorage.getItem('currentUserId');
    if(this.cupon_stat == 200){
      location.reload();
    }else if(this.cupon_stat == 202){
      location.href = "https://estore.avision24x7.com/index.php/front/front_ctr/pay_for_liveClass/"+user_id+"/"+this.prodId+'/1/'+this.cupon_code;
    }else{
      location.reload()
    }
  }

}
