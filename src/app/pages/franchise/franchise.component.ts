import { Component, OnInit } from '@angular/core';
import { FranchiseService } from './franchise.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss']
})
export class FranchiseComponent implements OnInit {
  footerData: any
  page_slug: string;
  page_meta: any;
  title: any;
  constructor(private franchiseService: FranchiseService,private router: Router,private route: ActivatedRoute,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta) {
    this.franchiseService.getFooterMenuDetils().subscribe(
      (res)=> {
        
        this.footerData = res
      },
      (error)=> {
        console.log(error)
      })
   }

  ngOnInit(): void {
    this.page_slug = this.route.snapshot.paramMap.get('slug');
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

  createRange(number){ 

    var items = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
   return items;
  }


}
