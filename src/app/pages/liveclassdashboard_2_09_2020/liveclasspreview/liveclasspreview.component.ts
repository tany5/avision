import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LiveclasspreviewService } from './liveclasspreview.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-liveclasspreview',
  templateUrl: './liveclasspreview.component.html',
  styleUrls: ['./liveclasspreview.component.scss']
})
export class LiveclasspreviewComponent implements OnInit {
 prodId: any
 urlEncryptId: any
 productDetails: any
 product_offer_price: any
 currentVideo: any
 product_price: any
 product_name: any
 description: any
 feature: any
 demoVideo: any
 id: any
 detailsLoader: boolean = false
 videoLoader: boolean= false
 user_id: any
 user_name: any
 buy_now_stat:any

 
  constructor(private route: ActivatedRoute, private previewService: LiveclasspreviewService, private EncrDecr: EncrDecrServiceService, private router: Router,public dialog: MatDialog) {
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']        
      })
      
    this.user_id = localStorage.getItem('currentUserId');
    console.log(this.user_id);
    this.route.parent.params.subscribe(
    (params: Params) => {
      this.prodId = params['prodId']         
      this.urlEncryptId = this.prodId
      var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.prodId)
      this.prodId = decrypted       
    })

    this.previewService.getLiveClassDetails(this.prodId).subscribe(
      (res)=> {       
        this.productDetails = res['live_cls_dtls_data']
       
        this.product_name = this.productDetails['product_name']
        this.product_offer_price = this.productDetails['product_offer_price']
        this.product_price = this.productDetails['product_price']
        this.description = this.productDetails['description']
        this.feature = this.productDetails['feature']
        this.detailsLoader = true
      },
      (error)=> {
        console.log(error)
      })

      this.previewService.getDemoVideo(this.prodId).subscribe(
        (res)=> {                    
          this.demoVideo = res['live_cls_vdo_demo']
          this.videoLoader = true
          console.log(this.demoVideo)
        },
        (error) =>{
          console.log(error)
        })

        this.previewService.fetchLiveclassCurrentVideo(this.prodId).subscribe(
          (res)=> {
                     
            this.currentVideo = res['live_cls_current_vdo']
          },
          (error)=> {
            console.log(error)
          }
        )

        this.previewService.fetchUserName(this.user_id).subscribe(
          
          (res) => {
            console.log(res);
            this.user_name = res['user_arr'][0]['user_name'];
          }
        )

        

        

   }

  ngOnInit(): void {
    this.previewService.checkBuystatus(localStorage.getItem('currentUserId'),this.prodId).subscribe(

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
    if(localStorage.getItem('buyNowStat') == '1'){
      this.buy_now_stat = '1';
    }else{
      this.buy_now_stat = '0';
    }
    
  }

  gogtoStudyplan(prodId) {
    
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', prodId)
    this.router.navigate(['liveclass-dashboard/'+this.urlEncryptId+'/study-plan'])
  }

  

}

