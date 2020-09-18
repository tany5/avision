import { Component, OnInit } from '@angular/core';
import { PassService } from './pass.service';
import { Router, ActivatedRoute, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
declare var jQuery: any;

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss']
})
export class PassComponent implements OnInit {
  passData: any
  passLoader: boolean =false
  courseDetails: any
  subCategoryAllData: any
  id: any
  subCategoryName: any
  page_slug: any;
  page_meta: any;
  title: any;
  plan_id: any
  seo_body: any;
  tree: any;
  fragment: any;
  primary: any;
  constructor(private passServices: PassService,private router: Router,private route: ActivatedRoute,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta) {
    this.passServices.getPassData().subscribe(
      (res)=> {
        console.log('passData...');
        console.log(res);       
        this.passData = res
        this.passLoader = true
        
      },
     (error)=> {
      console.log(error)
     })


     this.passServices.getCourseDetails().subscribe(
       (res)=> {
        
        this.courseDetails = res
        this.passServices.getSubCategoryAllData().subscribe(
          (res2)=> {
            console.log(res2)
            
            this.subCategoryAllData = res2
          },
          (error)=>{
            console.log(error)
          }
        )
       },
       (error)=> {
         console.log(error)
       }
     )


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
          this.seo_body = this.page_meta[0]['seo_body'];
          this.titleService.setTitle(this.title);
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

  getSubCategory(event) {
    this.id = event.target.id
   

    this.passServices.getSubCategoryName(this.id).subscribe(
      (res)=> {
       
        this.subCategoryAllData = []
        this.subCategoryName = res
      },
      (error)=> {
        console.log(error)
    })
  }

  getAllCourseData() {
    this.passServices.getSubCategoryAllData().subscribe(
      (res)=> {
        this.subCategoryName = []
        this.subCategoryAllData = res
      },
      (error)=> {
        console.log(error)
      })

  }

  PayForPlan(plan_id){
    this.plan_id = plan_id
    //alert(localStorage.getItem('userloggedIn'))
    if(localStorage.getItem('userloggedIn') != '1'){
      jQuery('#loginModal').modal()
    }else{
      this.passServices.payForPlan(this.plan_id,localStorage.getItem('currentUserId')).subscribe(

        (res) => {
          console.log(res);
          location.href=res['pay_url']
        }
      )
    } 

  }

}
