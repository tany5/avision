import { Component, OnInit } from '@angular/core';
import { LiveclassService } from './liveclass.service';
import{ OwlOptions } from 'ngx-owl-carousel-o'
import { Router, ActivatedRoute, UrlTree, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
declare var jQuery: any;


@Component({
  selector: 'app-liveclass',
  templateUrl: './liveclass.component.html',
  styleUrls: ['./liveclass.component.scss']
})
export class LiveclassComponent implements OnInit {
  
  liveClassData: any
  timonialDetails: any
  liveCLassLoader:boolean = false
  searchText


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
  tree: UrlTree;
  fragment = '';
  primary: any;
  testimonialLoader: boolean = false;
  

  constructor(private liveClassService: LiveclassService, private router: Router,private route: ActivatedRoute,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta) {

    // var url = this.route.parent.snapshot.url[2].path;
    // console.log(url);
    
    this.liveClassService.getLiveClassData().subscribe(
      (res)=> {
        console.log(res);
        this.liveClassData = res['live_cls_data']
        console.log(this.liveClassData)
        this.liveCLassLoader = true
      },
      (error)=> {
        console.log(error)
      })


      this.liveClassService.gettestimonialDetails().subscribe(
        (res)=> {
          
          this.timonialDetails = res
          this.testimonialLoader = true
        },
        (error) => {
          console.log(error)
        })


   }

  ngOnInit(): void {

   
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

  gotoLiveClassComponent(id:any) {
   this.router.navigate(['liveclass-details',id])
  }

  createRange(number){ 

    var items = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
   return items;
  }
  

}
