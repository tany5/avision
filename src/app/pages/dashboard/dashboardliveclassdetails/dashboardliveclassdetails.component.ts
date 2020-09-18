import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { LiveclassdetailsService } from '../../liveclassdetails/liveclassdetails.service';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { DashboardliveclassdetailsService } from './dashboardliveclassdetails.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var jQuery:any

@Component({
  selector: 'app-dashboardliveclassdetails',
  templateUrl: './dashboardliveclassdetails.component.html',
  styleUrls: ['./dashboardliveclassdetails.component.scss']
})
export class DashboardliveclassdetailsComponent implements OnInit {

  prodId:any
  liveClassLoader: boolean = false
  testimonialLoader: boolean = false
  teacherLoader: boolean = false

  liveClassDetails: any
  productName: any
  product_offer_price: any
  product_price: any
  description: any
  end_date: any
  feature: any
  image: any
  start_date: any
  validity: any
  teacherDetails: any
  timonialDetails: any
  encryptProdId: any
  showurl:boolean = true;



  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    animateOut:'slideOutUp',
    navSpeed: 600, 
    autoWidth:false,
    navText: ['<span class="fa fa-chevron-left fa-2x"></span>', '<span class="fa fa-chevron-right fa-2x"></span>'],
    margin: 20,       
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  customOptions2: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    animateOut:'slideOutUp',
    navSpeed: 600, 
    autoWidth:false,
    margin: 20,       
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: false
  }
  live_class: any;
  mock_test: any;
  pdf_notes: any;
  practice_question: any;
  tree: any;
  fragment: any;
  primary: any;
  page_slug: any;
  page_meta:any;
  title: any;

  constructor(private route: ActivatedRoute,private router:Router, private dashboardliveclassdetailsService: DashboardliveclassdetailsService,private EncrDecr: EncrDecrServiceService,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta) { 

    this.dashboardliveclassdetailsService.getProductId(this.route.snapshot.params.prodId).subscribe(

      (res) => {
        this.prodId = res['product_id']
        
        this.encryptProdId = this.EncrDecr.set('123456$#@$^@1ERF', this.prodId)
        this.dashboardliveclassdetailsService.geLiveClassDetails(this.prodId).subscribe(
          (res)=> {
            this.liveClassDetails  = res['live_cls_dtls_data']       
            this.productName = this.liveClassDetails['product_name']
            this.product_offer_price = this.liveClassDetails['product_offer_price']
            this.product_price = this.liveClassDetails['product_price']
            this.description = this.liveClassDetails['description']
            this.end_date = this.liveClassDetails['end_date']
            this.feature = this.liveClassDetails['feature']
            this.image = this.liveClassDetails['image']
            this.start_date = this.liveClassDetails['start_date']
            this.validity = this.liveClassDetails['validity']
            this.live_class = this.liveClassDetails['live_class']
            this.mock_test = this.liveClassDetails['mock_test']
            this.pdf_notes = this.liveClassDetails['pdf_notes']
            this.practice_question = this.liveClassDetails['practice_question']
            this.liveClassLoader = true
    
    
          },
         (error)=> {
          console.log(error)
         })
    
         this.dashboardliveclassdetailsService.geLiveClassTeacherDetails(this.prodId).subscribe(
           (res)=> {        
            this.teacherDetails = res['teacher_arr']
            this.teacherLoader = true        
           },
          (error)=> {
            console.log(error)
          })
    
    
          this.dashboardliveclassdetailsService.gettestimonialDetails().subscribe(
            (res)=> {
              console.log(res)          
              this.timonialDetails = res
              this.testimonialLoader = true
            },
            (error) => {
              console.log(error)
            })
    
            if(localStorage.getItem('userloggedIn') == '1'){
              this.showurl = true;
            }else{
              this.showurl = false;
            }
      }
    )
    //this.encryptProdId = this.EncrDecr.set('123456$#@$^@1ERF', this.prodId)
   }

  ngOnInit(): void {

    this.tree = this.router.parseUrl(this.router.url);
    this.fragment = this.tree.fragment;
    this.primary = this.tree.root.children[PRIMARY_OUTLET];
    const primarySegments: UrlSegment[] = this.primary.segments;
    //alert(primarySegments);
    //this.page_slug = primarySegments[0];
    this.dashboardliveclassdetailsService.getProductId(this.route.snapshot.params.prodId).subscribe(
      (res) => {
        this.prodId = res['product_id']
        this.encryptProdId = this.EncrDecr.set('123456$#@$^@1ERF', this.prodId)
        this.metatagservice.fetchInnerMetaPage('10',this.prodId).subscribe(

          (data) => {
            console.log(data);
            this.page_meta = data['meta_data'];
            this.title = this.page_meta[0]['page_title'];
            this.titleService.setTitle(this.title);
            this.metaTagService.updateTag(
              { name: 'keywords', content: this.page_meta[0]['page_content'] }
            );
            this.metaTagService.updateTag(
              { name: 'description', content: this.page_meta[0]['page_description'] }
            );
          }
      )
        jQuery("#product_id").val(this.encryptProdId)
        jQuery('#live_class').val(1);
        // if(localStorage.getItem('userloggedIn') == '1'){
        //   this.router.navigate(['liveclass-dashboard/'+this.encryptProdId]);

        //   //location.href = 'liveclass-details/liveclass-details/'+this.prodId;
        // }

        
      }
    )
  }
  createRange(number){ 

    var items = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
   return items;
  }
}
