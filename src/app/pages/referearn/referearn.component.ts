import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
declare var jQuery: any;

@Component({
  selector: 'app-referearn',
  templateUrl: './referearn.component.html',
  styleUrls: ['./referearn.component.scss']
})
export class ReferearnComponent implements OnInit {
  page_slug: any;
  page_meta: any;
  title: any;
  seo_body: any;
  tree: any;
  fragment: any;
  primary: any;

  constructor(private router: Router,private route: ActivatedRoute,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta) { }

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
          jQuery('head').append(this.seo_body)
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
