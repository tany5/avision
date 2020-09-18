import { Component, OnInit } from '@angular/core';
import { DashboardvideodetailsService } from './dashboardvideodetails.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var jQuery: any;
@Component({
  selector: 'app-dashboardvideodetails',
  templateUrl: './dashboardvideodetails.component.html',
  styleUrls: ['./dashboardvideodetails.component.scss']
})
export class DashboardvideodetailsComponent implements OnInit {
  [x: string]: any;
  timonialDetails: Object;
  testimonialLoader: boolean;
  prodId(prodId: any) {
    throw new Error("Method not implemented.");
  }
  
  
files: FileList
  couseDetails: any
  product_name: any
  product_price: any
  product_offer_price: any
  product_desc: any
  product_img: any
  count_videos: any
  videoDetailsSubData: any
  chap_arr:any
  subjectLoader:boolean = false
  loader: boolean = false
  videoDetailsSubDataLoader: boolean = false
  chapterLoader: boolean = false
  teacherDetails: any;
  teacherLoader: boolean;
  vdoId:any
  buystat: any
  product_id: any
  demo_chpa_arr : any
  demo_vdo_url: any
  demo_vdoId:any
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

  constructor(private videoService:DashboardvideodetailsService , private route: ActivatedRoute , private router: Router) {
     this.videoService.getCourseDetails(this.route.snapshot.params.prodId).subscribe(
       (res)=> {       
        this.couseDetails = res['vdo_details_data'],
        this.product_id = this.couseDetails[0]['product_id']
        this.product_name = this.couseDetails[0]['product_name']
        this.product_price = this.couseDetails[0]['product_price']
        this.product_offer_price = this.couseDetails[0]['product_offer_price']
        this.product_desc = this.couseDetails[0]['product_desc']
        this.product_img = this.couseDetails[0]['product_img']
        this.count_videos = this.couseDetails[0]['count_videos']
        this.demo_vdo_url = this.couseDetails[0]['product_demo_video']
        var url = this.demo_vdo_url;
        var parts = url.split("/");
        this.demo_vdoId = parts[parts.length-1]; 
        this.loader = true
        this.subjectLoader = true
        
       },
       (error)=> {
         console.log(error)
       })

       this.videoService.getDemoChapterVideo(this.route.snapshot.params.prodId).subscribe(
       (res) => {
         console.log("demo...");
         console.log(res)
         this.demo_chpa_arr = res['vdo_details_chapter_data']
       }
       )
       this.videoService.getVieoCourseSubject(this.route.snapshot.params.prodId).subscribe(
         (res) => {    
          this.subjectLoader = true      
           this.videoDetailsSubData = res['vdo_details_sub_data']
           this.videoDetailsSubDataLoader = true
           this.videoService.getVideoCourseChapter(this.route.snapshot.params.prodId,this.videoDetailsSubData[0].subject_id).subscribe(
            (data)=> {
              this.chapterLoader = true
              this.chap_arr = data['vdo_details_chapter_data'];
              console.log(this.chap_arr)
            },
            (error)=> {
              console.log(error)
            }) 
         }, 
        (error) => {
          console.log(error)
        })

        this.videoService.geVideoCourseTeacherDetails(this.route.snapshot.params.prodId).subscribe(
          (res)=> {        
           this.teacherDetails = res['teacher_arr']
           console.log(this.teacherDetails)
           this.teacherLoader = true        
          },
         (error)=> {
           console.log(error)
         })

         this.videoService.gettestimonialDetails().subscribe(
          (res)=> {
            console.log(res)          
            this.timonialDetails = res
            this.testimonialLoader = true
          },
          (error) => {
            console.log(error)
          })
  

   }

  ngOnInit(): void {
    //this.loadScript("assets/js/checkout.js");
    //this.loadScript("assets/js/instamojo_implement.js");
    this.videoService.getbuystat(localStorage.getItem('currentUserId'),this.route.snapshot.params.prodId).subscribe(
      (res) => {
        if(res['buy_stat'] == 1){
          this.buystat = 1;
          
        }else{
          this.buystat = 0;
          
        }
      }
    )
  }
  
  fetchChapter(subject_id){
    
      this.videoService.getVideoCourseChapter(this.route.snapshot.params.prodId,subject_id).subscribe(
        (res)=> {
          this.chapterLoader = true
          this.chap_arr = res['vdo_details_chapter_data'];
          console.log(this.chap_arr)
        },
        (error)=> {
          console.log(error)
        })  
      
    }
    createRange(number){ 

      var items = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
     return items;
    }

    showVideo(video_url){
      //alert(video_url)
      jQuery("#vdoPlayer iframe").attr('src','https://www.youtube.com/embed/'+video_url);
      jQuery("#videoModal").modal();
    }

    
  
    public loadScript(url) {
      let node = document.createElement('script');
      node.src = url;
      node.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(node);
    }

    indicateVdocourse(){

      jQuery("#video_course").val(1);
      jQuery("#product_id").val(this.route.snapshot.params.prodId);
      if(localStorage.getItem('currentUser') == '1'){
        this.videoService.getbuystat(localStorage.getItem('currentUserId'),this.route.snapshot.params.prodId).subscribe(
          (res) => {
            if(res['buy_stat'] == 1){
              this.buystat = 1;
            }else{
              this.buystat = 0;
              location.href='https://avision.co.in/adminpanel/index.php/api/pay_now/'+localStorage.getItem('currentUserId')+'/'+this.route.snapshot.params.prodId;
            }
          }
        )
        
      }else{
        jQuery("#loginModal").modal();
      }
    }

    viewVideoCourse(product_id){
      
        this.router.navigate(['show-video/',product_id]);
     
     
    }
    viewDemoVideo(product_id){

      this.router.navigate(['show-video/',product_id]);
    }

    showDemoVideos(vdo_id){

      
      if(localStorage.getItem('currentUser') == '1'){
        this.router.navigateByUrl('show-video/'+vdo_id+'/'+this.route.snapshot.params.prodId)
      }else{
        jQuery("#video_course").val(2);
        jQuery("#product_id").val(this.route.snapshot.params.prodId);
        jQuery("#loginModal").modal();
      }
      
    }

}
