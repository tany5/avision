import { Component, OnInit } from '@angular/core';
import { CoursecurriculumService } from './coursecurriculum.service';
import { ActivatedRoute, Params } from '@angular/router';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';

@Component({
  selector: 'app-coursecurriculum',
  templateUrl: './coursecurriculum.component.html',
  styleUrls: ['./coursecurriculum.component.scss']
})
export class CoursecurriculumComponent implements OnInit {


  prodId: any
  urlEncryptId: any
  subjectList: any
  videoList: any
  subjectLoader: boolean = false
  chapterLoader: boolean = false
  constructor(private courseService: CoursecurriculumService, private route: ActivatedRoute, private EncrDecr: EncrDecrServiceService) {

    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']         
        this.urlEncryptId = this.prodId
        var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.prodId)
        this.prodId = decrypted       
      })

    this.courseService.getLiveClassVideoSubject(this.prodId).subscribe(
      (res)=> {
        
        this.subjectList = res['sub_arr']
        this.subjectLoader = true
        this.courseService.getLiveClassDetails(this.prodId, this.subjectList[0]['subject_id']).subscribe(
          (res)=> {
            console.log(res['chap_arr'])
            this.videoList = res['chap_arr']
           
            this.chapterLoader = true
          })
      },
     (error)=> {
       console.log(error)
     })
   }

  ngOnInit(): void {
  }

  getSubjectVideo(id) {
    this.chapterLoader = false
    this.courseService.getLiveClassDetails(this.prodId, id).subscribe(
      (res)=> {
        console.log(res)
        this.videoList = res['chap_arr']
        this.chapterLoader = true
      }
    )}

}
