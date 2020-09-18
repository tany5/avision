import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestseriesService } from './testseries.service';
import{ OwlOptions } from 'ngx-owl-carousel-o'
import { Router, ActivatedRoute, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ScholarregisterComponent } from '../scholarregister/scholarregister.component';
import { DatePipe } from '@angular/common'
import { AnyAaaaRecord } from 'dns';
import { AtseComponent } from '../atse/atse.component';

declare var jQuery: any;
@Component({
  selector: 'app-testseries',
  templateUrl: './testseries.component.html',
  styleUrls: ['./testseries.component.scss']
})
export class TestseriesComponent implements OnInit {
  
  testSeriesData: any
  timonialDetails: any
  courseDetails: any
  getTestSeriesSubData: any
  courses_id: any
  testSeriesLoader: boolean = false
  courseLoader: boolean = false
  subCourseLoader: boolean = false


  customOptions3: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
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
      }
    },
    nav: true
  }
  page_slug: any;
  page_meta: any;
  title: any;
  seo_body: any;
  tree: any;
  fragment: any;
  primary: any; 
  searchText
  testimonialLoader: boolean = false;
  page_id: any
  page_banner: any;
  test_buy_stat: any
  user_id: string;
  registerStatus:boolean = false;
  test_taken_id: string;
  examStat: any =0;
  date:any
  time:any
  start_button:boolean = false
  loginStat:boolean = false
  examdone: boolean = false;

  constructor(private tesSeriesServices: TestseriesService, private router: Router,private route: ActivatedRoute,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta,private dialog: MatDialog,public datepipe: DatePipe) { 
    if(localStorage.getItem('examdone') == "1"){
      this.examdone =true;
    }
    
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    if(latest_date == '2020-09-15'){
      this.time = new Date();
      let latest_time = this.datepipe.transform(this.time, 'h:mm:ss a')

      if(latest_time >= '12:00:00 AM' && latest_time <= '5:00:00 PM'){
        if(localStorage.getItem('userloggedIn') == "1"){
          this.start_button=true
        }
        
      }else{
        this.start_button = false
      }
      
      
    }

    

    /*setInterval(()=>{
      
      this.time = new Date();
      let latest_time = this.datepipe.transform(this.time, 'h:mm:ss a')
      
      if(latest_time == '7:11:00 PM'){
        
        location.reload()
      }
    },1000)*/
    
    if(localStorage.getItem('userloggedIn') == "1"){
      this.registerStatus =false;
      this.user_id = localStorage.getItem('currentUserId')
      this.tesSeriesServices.gettestBuyStat(this.user_id).subscribe(
        (res) => {
          if(res['status'] == 200){
            this.test_buy_stat = res['plan_buy_stat']
          }else{
            this.test_buy_stat=0
          }
        }
      )
    }else{
      this.test_buy_stat = 0;
    }
    if(localStorage.getItem('userloggedInSchollarship') == "1"){
      this.registerStatus =false;
      this.test_taken_id = localStorage.getItem('test_taken_id');
      this.tesSeriesServices.getschollarExamStat(this.test_taken_id).subscribe(
        (data) => {
          console.log(data)
          this.examStat = data['exam_stat']
        }
      )
    }
    this.tesSeriesServices.getTestSeriesData().subscribe(
      (res)=> {
       
        this.testSeriesData = res
        this.testSeriesLoader = true
      },
      (error) =>{
        console.log(error)
      })


      this.tesSeriesServices.gettestimonialDetails().subscribe(
        (res)=> {
          
          this.timonialDetails = res
          this.testimonialLoader = true
        },
        (error) => {
          console.log(error)
        })

        this.tesSeriesServices.courseDetails().subscribe(
        (res)=> {  
               
          this.courseDetails = res
          this.courseLoader = true
          this.tesSeriesServices.getTestSeriesSubData(res[0]['courses_id']).subscribe(
            (res)=> {
              this.getTestSeriesSubData = res
              this.subCourseLoader = true
            },
            (error)=> {

            })
        },
        (error) => {
          console.log(error)
        })

  }

  

  ngOnInit(): void {
/*******************Timer Script************************************/
    var countDownDate = new Date("Sept 15, 2020 11:59:00").getTime();

// Update the count down every 1 second
if(!this.start_button){
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML = days + "days " + hours + "hours "
  + minutes + "minutes " + seconds + "seconds left";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "";
    //location.reload()
  }
}, 1000);
  }
/*******************Timer Script************************************/
    this.tree = this.router.parseUrl(this.router.url);
   this.fragment = this.tree.fragment;
   this.primary = this.tree.root.children[PRIMARY_OUTLET];
   const primarySegments: UrlSegment[] = this.primary.segments;

    this.page_slug = primarySegments[0];
    
    this.metatagservice.fetchMetaPage(this.page_slug).subscribe(

      (res:any) => {
        
        if(res.status == 200){
          this.page_meta = res.meta_data;
          this.title = this.page_meta[0]['page_title'];
          this.page_id = this.page_meta[0]['page_id'];
          this.tesSeriesServices.getSectional_banner(this.page_id).subscribe(
            (data) => {
                console.log(data)
                this.page_banner = data['section_banner']
                console.log(this.page_banner)
            }

          );
          this.titleService.setTitle(this.title);
          this.seo_body = this.page_meta[0]['seo_body'];
          this.metaTagService.updateTag(
            { name: 'keywords', content: this.page_meta[0]['page_content'] }
           );
           this.metaTagService.updateTag(
           { name: 'description', content: this.page_meta[0]['page_description'] }
           );

          jQuery('head').append(this.seo_body)
        }
        
      }

    );
  }


  getSubCourse(event) {
    this.courses_id = event.target.id
    
    this.tesSeriesServices.getTestSeriesSubData(this.courses_id).subscribe(
      (res)=> {        
        this.getTestSeriesSubData = res
      },
      (error)=> {
        console.log(error)
      }
    )}



    testInner(id)
  {
    
   this.router.navigate(['testinner/',id])
  }

  createRange(number){ 

    var items = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
   return items;
  }

  openLogin(){

    this.dialog.open(ScholarregisterComponent)
  }
  startTest(){
    if(localStorage.getItem('userloggedIn') == "1"){
      this.dialog.open(AtseComponent,{
        width: '100%',
        height: '40vh'
      })
    }else{

      this.dialog.open(ScholarregisterComponent)
    }
    
  }
  
}
