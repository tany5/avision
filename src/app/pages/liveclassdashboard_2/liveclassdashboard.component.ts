import { Component, OnInit } from '@angular/core';
import { LiveclassdashboardService } from './liveclassdashboard.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';


@Component({
  selector: 'app-liveclassdashboard',
  templateUrl: './liveclassdashboard.component.html',
  styleUrls: ['./liveclassdashboard.component.scss']
})
export class LiveclassdashboardComponent implements OnInit {
  product_name: any
  liveDetails: any
  prodId: any
  urlEncryptId: any
  constructor(private liveclassDashboardService: LiveclassdashboardService, private route: ActivatedRoute,private router: Router, private EncrDecr: EncrDecrServiceService) {

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
     
      },
      (error)=> {
        console.log(error)
      })
  }

  ngOnInit(): void {
    
  }

  onLogout(){

    localStorage.clear();
    this.router.navigate(['liveclass/liveclass']);
  }

}
