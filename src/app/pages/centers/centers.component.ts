import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { CentersService } from './centers.service';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss']
})
export class CentersComponent implements OnInit {
  page_slug: any;
  page_meta: any;
  title: any;
  centerList: any
  tree: any;
  fragment: any;
  primary: any;

  constructor(private router: Router,private route: ActivatedRoute,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta,private centerservice : CentersService) { 

        this.centerservice.centerList().subscribe(
        (res) => {

          this.centerList = res['center_list']
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
        }else{
          this.title = 'Distance education courses India | online professional courses India';
          this.titleService.setTitle(this.title);
        }
        
      }

    );
  }

}
