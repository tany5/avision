import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowvideoService } from './showvideo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialougeComponent } from '../../pages/message-dialouge/message-dialouge.component';

declare var jQuery: any;

@Component({
  selector: 'app-showvideo',
  templateUrl: './showvideo.component.html',
  styleUrls: ['./showvideo.component.scss']
})
export class ShowvideoComponent implements OnInit {
  subjectLoader: boolean = false;
  videoDetailsSubData: any;
  videoDetailsSubDataLoader: boolean = false;
  chapterLoader: boolean = false;
  chap_arr: any;
  couseDetails = [];
  product_name: any;
  vdo_url:boolean = false;
  vdo_loader: boolean = false;
  demo_user : any
  demo_vdo_url : any
  vdo_id: any
  vdoUrl: SafeResourceUrl
  element:any
  proid_buy_stat: any

  constructor(private route:ActivatedRoute,private router: Router,private showvideoService: ShowvideoService,public santizer: DomSanitizer,private _location: Location,private dialog: MatDialog) { 
    this.product_id = this.route.snapshot.params.prodId
    this.vdo_id = this.route.snapshot.params.vdoId
    //alert(this.vdo_id)
    //this.vdoUrl='https://player.vimeo.com/video/'+this.vdo_id
    //let el = document.getElementById('showVideo');
    //l.setAttribute('src',this.vdoUrl);
    //console.log(this.vdoUrl);
    //jQuery("#showVideo iframe").attr('src','https://player.vimeo.com/video/'+this.vdo_id);
    this.showvideoService.getCourseDetails(this.product_id).subscribe(
      (res)=> { 
        console.log(res);      
       this.couseDetails = res['vdo_details_data'],
       console.log(this.couseDetails)
       this.product_name = res['vdo_details_data'][0]['product_name']
       this.demo_vdo_url = res['vdo_details_data'][0]['product_demo_video']
       var url = this.demo_vdo_url;
      var parts = url.split("/");
      var last_part = parts[parts.length-1];
      
       //jQuery("#showVideo iframe").attr('src','https://player.vimeo.com/video/'+last_part);
       //console.log(this.demo_vdo_url)
       
      },
      (error)=> {
        console.log(error)
      })

    this.showvideoService.getVieoCourseSubject(this.product_id).subscribe(

      (res) => {
           this.subjectLoader = true      
           this.videoDetailsSubData = res['vdo_details_sub_data']
           console.log(res['vdo_details_sub_data'])
           this.videoDetailsSubDataLoader = true
           this.showvideoService.getVideoCourseChapter(this.product_id,this.videoDetailsSubData[0].subject_id).subscribe(

            (res) => {
              this.chapterLoader = true
                this.chap_arr = res['vdo_details_chapter_data'];
                this.vdo_url = this.chap_arr[0].vdo_arr[0].video_url;
                
                
                if(this.demo_user == 0){
                  var count=1;
                  for(var i=0; i<this.chap_arr.length; i++){
                    for(var j=0; j<this.chap_arr[i].vdo_arr.length; j++){
                        if(count==1){
                          if(this.chap_arr[i].vdo_arr[j].demo_video == 1){
                            this.vdo_url = this.chap_arr[i].vdo_arr[j].video_url
                            //jQuery("#showVideo iframe").attr('src','https://www.youtube.com/embed/'+this.vdo_url);
                            count++;
                          }
                        }
                        
                    }
                  }
                }else{
                  //jQuery("#showVideo iframe").attr('src','https://www.youtube.com/embed/'+this.vdo_url);
                }
                //this.vdo_loader = true
                console.log(this.vdo_url)
            }
          )
      }
    )
  }
  product_id: any

  ngOnInit(): void {
    this.vdoUrl= this.santizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/'+this.vdo_id);
    if(localStorage.getItem('currentUser') == '1'){
      this.demo_user = 1;
    }else{
      this.demo_user = 0;
    }

    this.showvideoService.getbuystat(this.product_id,localStorage.getItem('currentUserId')).subscribe(

      (res) => {
        
          if(res['buy_stat'] == 1){
            this.proid_buy_stat = 1
          }else{
            this.proid_buy_stat = 0
          }
      }
    );
  }

  showChapter(subject_id,subject_name){
    jQuery(".sidebar-brand h4").html(subject_name);
    this.showvideoService.getVideoCourseChapter(this.product_id,subject_id).subscribe(

      (res) => {
        this.chapterLoader = true
          this.chap_arr = res['vdo_details_chapter_data'];
          console.log(this.chap_arr)
      }
    )
  }

  showVideo(video_url){
    if(video_url == ''){
      this.dialog.open(MessageDialougeComponent)
    }else{
      this.vdoUrl= this.santizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/'+video_url);
    }
    
    
  }

  onBack(){
    //this.router.navigate(['./'])
    this._location.back();
  }

  payToUnlock(){
    location.href='https://avision.co.in/adminpanel/index.php/api/pay_now/'+localStorage.getItem('currentUserId')+'/'+this.product_id;
  }
  
  openPopUp(){

    this.dialog.open(MessageDialougeComponent)
  }

}
