import { Component, OnInit } from '@angular/core';
import { MocktestService } from './mocktest.service';
import { ActivatedRoute, Params } from '@angular/router';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';

@Component({
  selector: 'app-mocktest',
  templateUrl: './mocktest.component.html',
  styleUrls: ['./mocktest.component.scss']
})
export class MocktestComponent implements OnInit {
  prodId: any
  urlEncryptId: any
  testDetails: any

  productDetails: any
 product_offer_price: any
 currentVideo: any
 product_price: any
 product_name: any
 description: any
 feature: any
 demoVideo: any
 id: any
 mockTestLoader: boolean = false
 testDetailsLoader: boolean = false


  constructor(private mocktestService: MocktestService, private route: ActivatedRoute,private EncrDecr: EncrDecrServiceService) {
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']         
        this.urlEncryptId = this.prodId
        var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.prodId)
        this.prodId = decrypted       
      })
    this.mocktestService.getLiveCLassDashboardTest(this.prodId).subscribe(
      (res)=> {
        console.log(res)
        this.testDetails = res['test_arr']
        this.testDetailsLoader = true
      },
      (error)=> {
        console.log(error)
        
      })


      this.mocktestService.getLiveClassDetails(this.prodId).subscribe(
        (res)=> {       
          this.productDetails = res['live_cls_dtls_data']

          console.log(this.productDetails)
         
          this.product_name = this.productDetails['product_name']
          this.product_offer_price = this.productDetails['product_offer_price']
          this.product_price = this.productDetails['product_price']
          this.description = this.productDetails['description']
          this.feature = this.productDetails['feature']
          this.mockTestLoader = true
        },
        (error)=> {
          console.log(error)
        })



   }

  ngOnInit(): void {
  }

}
