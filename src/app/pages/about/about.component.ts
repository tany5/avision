import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router,ActivatedRoute, ParamMap, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  page_slug:any
  page_meta : any
  title:any
  teacher_arr : any
  customOptions2: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    animateOut:'slideOutUp',
    navSpeed: 1000, 
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
    nav: true
  }
  tree: any;
  fragment: any;
  primary: any;
  constructor(private router:Router,public route: ActivatedRoute,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta,private aboutService: AboutService) { 

      this.aboutService.teamDetails().subscribe(
        (res) => {
          console.log(res);
          this.teacher_arr = res['teaching_detals'];
        }
      );
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
          this.metaTagService.updateTag(
            { name: 'keywords', content: this.page_meta[0]['page_content'] }
          );
          this.metaTagService.updateTag(
            { name: 'description', content: this.page_meta[0]['page_description'] }
          );
        }
        
      }

    );
  }

}
