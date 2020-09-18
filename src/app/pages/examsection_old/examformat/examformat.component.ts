import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExamformatService } from './examformat.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-examformat',
  templateUrl: './examformat.component.html',
  styleUrls: ['./examformat.component.scss']
})
export class ExamformatComponent implements OnInit {
  prodId: any
  quizInfo:any
  quizDetails: any
  quiz_name: any
  noofquestion: any
  negativemark: any
  correctmark: any
  duration: any
  changable: any
  agree: any

  constructor(private route: ActivatedRoute, private examformatService: ExamformatService, private location: Location, private router: Router) {
    this.route.parent.params.subscribe(
      (params: Params) => {        
        this.prodId = params['prodId']  
      }) 
      
      this.examformatService.getQuizInformation(this.prodId).subscribe(
        (res)=> {
          
          this.quizInfo = res['quiz_information']['quiz_info']
          this.quizDetails = res['quiz_information']['quiz_details']
          console.log(this.quizDetails)
          this.quiz_name = this.quizInfo[0]['quiz_name']
          
          this.noofquestion = this.quizInfo[0]['no_of_qs']
          this.negativemark = this.quizInfo[0]['negative_mark']
          this.duration = this.quizInfo[0]['duration']
          this.correctmark = this.quizInfo[0]['correct_mark']
          this.changable = this.quizInfo[0]['changable']
        },
        (error)=> {
          console.log(error)
        })
   }

  ngOnInit(): void {
  }

  backClicked() {
    this.location.back();
  }

  goToExamPanel() {
    this.examformatService.startQuiz(this.prodId, localStorage.getItem('currentUserId')).subscribe(
      (res)=> {
        console.log(res)
        if(res['status']==200) {
          localStorage.setItem("test_taken_id", res['test_taken_id'])
          this.router.navigate([`exam/${this.prodId}/exampanel`])
        }
        else {
          alert("You Already Completed This Exam")
        }
      })
    
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

}
