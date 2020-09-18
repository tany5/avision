import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { test1 } from '../../../assets/js/main_slider'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from './home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { TestseriesService } from '../testseries/testseries.service';
import { MatDialog } from '@angular/material/dialog';
import { HomepopupComponent } from '../homepopup/homepopup.component';
declare var jQuery: any;
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bannerDetails: any
  courseDetails: any
  id: string 
  subCourse: any
  examPreprationTitle: string
  examPreprationContent: string
  testSeriesData: any
  resultData: any
  term_id: any
  getStudentImage: any
  timonialDetails: any
  bannerLoading: boolean = false
  examLoader: boolean = false
  videoData: any
  loader: boolean = false
  searchText


  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    animateOut:'slideOutUp',
    navSpeed: 300,
    navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


  customOptions6: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    animateOut:'slideOutUp',
    navSpeed: 300,
    navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }


  customOptions2: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    animateOut:'slideOutUp',
    navSpeed: 300, 
    autoWidth:false,   
    responsive: {
      0: {
        items: 2 
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: false
  }


  customOptions3: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    animateOut:'slideOutUp',
    navSpeed: 600, 
    autoWidth:false,
    navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],   
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
      },
      1024: {
        items: 3
      }
    },
    nav: true
  }


  customOptions4: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    animateOut:'slideOutUp',
    navSpeed: 300, 
    autoWidth:false,  
    navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],    
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 1
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  page_slug: string;
  page_meta: any;
  title: any;
  seo_body: any;
  testimonialLoader: boolean = false;
  page_banner: any;

  constructor(private router: Router, private homeServices: HomeService,private route: ActivatedRoute,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta,private testseriesservice : TestseriesService,private dialog: MatDialog, private spinner: NgxSpinnerService) { 
       
    this.page_slug = this.route.snapshot.paramMap.get('slug');
            
    this.homeServices.getBanner().subscribe(
      (res)=>
      {               
        this.bannerDetails = res
        console.log(this.bannerDetails)
        this.bannerLoading = true
        //this.spinner.hide();
        this.homeServices.gethomePopupBanner().subscribe(
          (res) => {
            //alert(res['popup_ststus']);
            if(res['popup_ststus'] == 1){
              this.dialog.open(HomepopupComponent,{data: {
                pop_up_image : res['popup_banner']
              }})
            }
          }
        )
      },
      (error)=> {
        console.log(error)
      })


      this.homeServices.getCourseDetails().subscribe(
        (res)=> {           
          this.courseDetails = res          
          this.id = res[0]['courses_id']  
          this.examLoader = true        
          this.homeServices.getCourseDetailsbyId(this.id).subscribe(
            (result)=> {              
              this.subCourse = result
            },
            (e)=> {
              console.log(e)
            })

        },
        (error)=> {
          console.log(error)
        })

        this.homeServices.examPreprationDetails().subscribe( 
          (res)=> {
            this.examPreprationTitle = res[0]['meta_value']
            this.examPreprationContent = res[1]['meta_value']
            
          },
          (error)=> {
            console.log(error)
          })

          this.homeServices.getTestSeriesData().subscribe(
            (res)=> {
            this.testSeriesData = res
            
          },
          (error)=> {
            console.log(error)
          })


          this.homeServices.getResultData().subscribe(
            (res)=> {
              
              this.resultData = res
              this.term_id =  res[0]['term_id']
              this.homeServices.getStudentImage(this.term_id).subscribe(
                (res)=> {
                  
                  this.getStudentImage = res
                },
                (error)=> {
                  console.log(error)
                })
            },
            (error)=> {
              console.log(error)
            })


        this.homeServices.gettestimonialDetails().subscribe(
          (res)=> {
            
            this.timonialDetails = res
            this.testimonialLoader = true
          },
          (error) => {
            console.log(error)
          })



          this.homeServices.getAllPopularCourses().subscribe(
            (res)=> {  
              this.loader = true;
              console.log(res)      
              this.videoData = res['vdo_data']        
            },
            (error)=>{
              console.log(error)
                     
            })

            this.testseriesservice.getSectional_banner(8).subscribe(
              (res) => {
                this.page_banner = res['section_banner']
                console.log(this.page_banner)
              }
            )

            
            //this.dialog.open(HomepopupComponent)
      
  }
  ngOnInit(): void {
    //this.spinner.show(); 
    
    this.metatagservice.fetchMetaPage('home').subscribe(
        
      (res:any) => {
        
        if(res.status == 200){
          this.page_meta = res.meta_data;
          this.title = this.page_meta[0]['page_title'];
          this.titleService.setTitle(this.title);
          this.seo_body = this.page_meta[0]['seo_body'];
          this.metaTagService.addTags([
            { name: 'keywords', content: this.page_meta[0]['page_content'] },
            { name: 'description', content: this.page_meta[0]['page_description'] }
            
          ])
            
           
          // this.metaTagService.updateTag(
          //   { name: 'keywords', content: 'Online preparation for bank, Online preparation for SSC, Online preparation for railway, Online preparation for teaching' }
          // );
          //  this.metaTagService.updateTag(
          //  { name: 'description', content: this.page_meta[0]['page_description'] }
          //  );
           jQuery('head').append(this.seo_body)
        }else{
           this.title = 'Distance education courses India | online professional courses India';
          this.titleService.setTitle(this.title);
        }
        
      }

    );
  }
  
  
  getSubCourse(event) {
   this.id = event.target.id
    this.homeServices.getCourseDetailsbyId(this.id).subscribe(
      (res)=> {
             
        this.subCourse = res
      },
      (error)=> {
        console.log(error)
      })
 }

 getSingleStudentImage(event) {
   this.term_id = event.target.id   
   this.homeServices.getSingleStudentImage(this.term_id).subscribe(
     (res)=>{
       
      this.getStudentImage = res
     },
     (error)=> {
      console.log(error)
     })
 }


 gotoVideoDetailsPage(id) {
  this.router.navigate(['liveclass-details', id])    
}

createRange(number){ 

  var items = [];
for(var i = 1; i <= number; i++){
   items.push(i);
}
 return items;
}




}
