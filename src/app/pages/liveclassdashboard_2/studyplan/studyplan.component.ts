import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
import { StudyplanService } from './studyplan.service';

@Component({
  selector: 'app-studyplan',
  templateUrl: './studyplan.component.html',
  styleUrls: ['./studyplan.component.scss']
})
export class StudyplanComponent implements OnInit {
  prodId: any
  urlEncryptId: any
  videoList: any = []
  curDay: any
  curDayString: any
  videoDetails: any
  videoListLoader: boolean = false
  videoLoader: boolean = false


  constructor(private route: ActivatedRoute, private EncrDecr: EncrDecrServiceService, private studyService: StudyplanService) {
   
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']         
        this.urlEncryptId = this.prodId
        var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.prodId)
        this.prodId = decrypted       
      })

      this.studyService.getLiveCLassDetails(this.prodId).subscribe(
        (res)=> {
          console.log(res)          
          this.curDay = res['live_cls_dtls_data']['cur_day']
          this.curDayString = res['live_cls_dtls_data']['cur_date_string']
          for(var i=1; i<=res['live_cls_dtls_data']['validity']; i++) {
            this.videoList.push(i)
          }

          this.studyService.getLiveClassVideo(this.prodId,  this.curDay).subscribe(
            (res)=> {        
              this.videoDetails = res['live_cls_vdo_list']
              console.log(this.videoDetails)
              this.videoLoader = true
              document.getElementById("accordionCollapse"+ this.curDay).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});        
            },
           (error)=> {
             console.log(error)
           })

          

          this.videoListLoader = true
          this.videoLoader = true 
          
        },
       (error)=> {
        console.log(error )
       } 
      )
      
   }

  ngOnInit(): void {
    
     
    
  }

  getVideo(id) {
    this.videoLoader = false
    this.studyService.getLiveClassVideo(this.prodId, id).subscribe(
      (res)=> {        
        this.videoDetails = res['live_cls_vdo_list']
        console.log(this.videoDetails)
        this.videoLoader = true        
      },
     (error)=> {
       console.log(error)
     })
  }

}
