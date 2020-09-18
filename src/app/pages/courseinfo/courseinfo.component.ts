import { Component, OnInit } from '@angular/core';
import { CourseinfoService } from './courseinfo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';
declare var jQuery: any;

@Component({
  selector: 'app-courseinfo',
  templateUrl: './courseinfo.component.html',
  styleUrls: ['./courseinfo.component.scss']
})
export class CourseinfoComponent implements OnInit {
  prodId: any
  sub_category_name: any
  courseDetails: any
  testSeriesData: any
  videoCourse: any
  page_slug: string;
  page_meta: any;
  title: any;
  seo_body: any;

  constructor(private courseinfoService: CourseinfoService, private route: ActivatedRoute,private router:Router,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta,private location: Location) {
    //this.location.replaceState('/courseInfo')
    this.page_slug =  this.route.snapshot.params.slug
    this.courseinfoService.getCourseId(this.page_slug).subscribe(

      (res) => {
        this.prodId = res['courses_id'];
       
        this.courseinfoService.getCourseName(this.prodId).subscribe(
          (res)=> {
           
            this.sub_category_name = res[0]['sub_category_name']
          },
          (error)=> {
            console.log(error)
          })
    
          this.courseinfoService.getCourseContent(this.prodId).subscribe(
            (res)=> {          
              this.courseDetails = res          
            },
            (error)=> {
              console.log(error)
            })
    
            this.courseinfoService.getTestSeriesById(this.prodId).subscribe(
              (res)=> {
               
                this.testSeriesData = res          
              },
              (error)=> {
                console.log(error)
              })
    
              this.courseinfoService.getVideoCourseById(this.prodId).subscribe(
                (res)=> {
                  console.log(res)
                  this.videoCourse = res          
                },
                (error)=> {
                  console.log(error)
                })

      }
    );
    
  }

  ngOnInit(): void {
    
    this.page_slug = this.route.snapshot.params.slug;
    this.courseinfoService.getCourseId(this.page_slug).subscribe(

      (res) => {
        this.prodId = res['courses_id'];
        this.metatagservice.fetchInnerMetaPage('13',this.prodId).subscribe(

          (res:any) => {
            console.log(res);
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
    )
    
    this.metatagservice.fetchInnerMetaPage(this.page_slug,this.prodId).subscribe(

      (res:any) => {
        console.log(res);
        if(res.status == 200){
          this.page_meta = res.meta_data;
          //this.title = this.page_meta[0]['page_title'];
          //this.titleService.setTitle(this.title);
          this.seo_body = this.page_meta[0]['seo_body'];
          // this.metaTagService.updateTag(
          //   { name: 'keywords', content: this.page_meta[0]['page_content'] }
          // );
          // this.metaTagService.updateTag(
          //   { name: 'description', content: this.page_meta[0]['page_description'] }
          // );

          jQuery('head').append(this.seo_body)
        }
        
      }

    );
  }

}