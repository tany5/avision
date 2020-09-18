import { Component, OnInit } from '@angular/core';
import { CoursesService } from './courses.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router, ActivatedRoute, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { $ } from 'protractor';
declare var jQuery: any;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  videoData:any
  bankingVideoCourse: any
  sscVideoCourse: any
  railwayVideoCourse: any
  teachingVideoCourse: any
  stateVideoCourse: any
  loader: boolean = false
  bankingLoader: boolean = false
  sscLoader: boolean = false
  railwayLoader: boolean = false
  teachingLoader: boolean = false
  stateLoader: boolean = false
  searchText

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
  page_slug: any;
  page_meta: any;
  title: any;
  seo_body: any;
  tree: any;
  fragment: any;
  primary: any;


  constructor(private courseService: CoursesService, private route: Router,private router: ActivatedRoute,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta) { 
    this.courseService.getAllPopularCourses().subscribe(
      (res)=> {  
        this.loader = true;
        console.log("popular courses..");
        console.log(res)      
        this.videoData = res['vdo_data']        
      },
      (error)=>{
        console.log(error)
               
      })

      this.courseService.getBankingVideoCourse().subscribe(
        (res)=> {
          console.log(res['vdo_data'])
          this.bankingVideoCourse = res['vdo_data']
          this.bankingLoader = true
        },
        (error)=> {
          console.log(error)
        })

        this.courseService.getSscVideoCourse().subscribe(
          (res)=> {
            console.log(res['vdo_data'])
            this.sscVideoCourse = res['vdo_data']
            this.sscLoader = true
          },
          (error)=> {
            console.log(error)
          })

          this.courseService.getBankingVideoCourse().subscribe(
            (res)=> {
              console.log(res['vdo_data'])
              this.bankingVideoCourse = res['vdo_data']
            },
            (error)=> {
              console.log(error)
            })
    
          this.courseService.getRailwayVideoCourse().subscribe(
            (res)=> {
              console.log(res['vdo_data'])
              this.railwayVideoCourse = res['vdo_data']
              this.railwayLoader = true
            },
            (error)=> {
              console.log(error)
            })

            this.courseService.getTeachingVideoCourse().subscribe(
              (res)=> {
                console.log(res['vdo_data'])
                this.teachingVideoCourse = res['vdo_data']
                this.teachingLoader = true
              },
              (error)=> {
                console.log(error)
              })

              this.courseService.getStateVideoCourse().subscribe(
                (res)=> {
                  console.log(res['vdo_data'])
                  this.stateVideoCourse = res['vdo_data']
                  this.stateLoader = true
                },
                (error)=> {
                  console.log(error)
                })



  }



  ngOnInit(): void {

    this.tree = this.route.parseUrl(this.route.url);
    this.fragment = this.tree.fragment;
    this.primary = this.tree.root.children[PRIMARY_OUTLET];
    const primarySegments: UrlSegment[] = this.primary.segments;
    this.page_slug = primarySegments[0];
    
    this.metatagservice.fetchMetaPage(this.page_slug).subscribe(

      (res:any) => {
        console.log(res)
        if(res.status == 200){
          this.page_meta = res.meta_data;
          this.title = this.page_meta[0]['page_title'];
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

  gotoVideoDetailsPage(id) {
    this.route.navigate(['video-details', id])    
  }
  gotoLiveClassComponent(id:any) {
    this.route.navigate(['liveclass-details',id])
   }

}
