import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LiveclasspreviewService } from './liveclasspreview.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';

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

 
  constructor(private route: ActivatedRoute, private previewService: LiveclasspreviewService, private EncrDecr: EncrDecrServiceService, private router: Router) {
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']        
      })
      

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

   }

  ngOnInit(): void {
  }

  gogtoStudyplan(prodId) {
    
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', prodId)
    this.router.navigate(['liveclass-dashboard/'+this.urlEncryptId+'/study-plan'])
  }

}
