import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CountdownComponent } from 'ngx-countdown'
import { Title } from '@angular/platform-browser';
import { FreequizsolutionService } from './freequizsolution.service';
import { count } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-freequizsolution',
  templateUrl: './freequizsolution.component.html',
  styleUrls: ['./freequizsolution.component.scss']
})
export class FreequizsolutionComponent implements OnInit {

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  step = 0;
  opendTrue: boolean = true
  quizId: any;
  quizName: any;
  quizInfo: any
  quizQuestionAnswer: any
  charArray: string[];
  customFormat: { leftTime: number; };
  duration: number = 10;
  showTimer: boolean = false
  test_taken_id: any
  title: any
  yourAnswer: any
  totalCorrect: any = 0
  totalWrong: any = 0
  totalMarks: any = 0
  total: any 
  showMark: boolean = false
  
  constructor(private route: ActivatedRoute, private freequizSolutionService: FreequizsolutionService, @Inject(DOCUMENT) private document: Document, private titleService: Title, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.charArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    this.quizName = this.route.snapshot.params.quizName
    this.quizId = this.quizName.substring(0, this.quizName.indexOf("-"));
    this.title = this.quizName.substr(this.quizName.indexOf("-") + 1);

    this.titleService.setTitle( this.title );
    

    const userId = localStorage.getItem("currentUserId")

    this.freequizSolutionService.getUserTestTakenId(this.quizId, userId).subscribe(
      (res)=> {
        
        this.test_taken_id = res['test_taken_id'][0]['student_taken_tests_id']

        this.freequizSolutionService.getFreeQuizSolution(this.quizId, this.test_taken_id).subscribe(
          (res) => {
            console.log(res)        
            this.quizInfo = res['quiz_question_answer']
            this.quizQuestionAnswer = res['quiz_question_answer']
            
            

            this.total = this.quizQuestionAnswer.length

           

            for(var i = 0; i< this.quizQuestionAnswer.length; i++) {

              if(this.quizQuestionAnswer[i].student_ans.length > 0){
               

                 
                  if(this.quizQuestionAnswer[i].student_ans[0].answer_status == '1') {
                    this.totalCorrect = this.totalCorrect + 1
                    this.totalMarks = this.totalMarks +1
                  }
                  
                  if(this.quizQuestionAnswer[i].student_ans[0].answer_status == '0') {
                    this.totalWrong = this.totalWrong + 1
                  }
                }
              

              

              
              
            }

            console.log("Total Correct",this.totalCorrect, "worng", this.totalWrong, 'marks', this.totalMarks)
            
            this.spinner.hide();
            this.showMark = true
          })
        
      }
    )

    
    
    

    
  }

  ngOnInit(): void {
    
    
  }


  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  scrollToQuestion(id, step) {
    
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: "nearest" });
    this.step = step;
  }

 


  //   @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  //     event.returnValue = false;
  // }

  // @HostListener('contextmenu', ['$event'])
  // onRightClick(event) {
  //   event.preventDefault();
  // }

  // @HostListener('document:keydown', ['$event'])
  //   handleKeyboardEvent(event: KeyboardEvent) {

  //   console.log(event);
  //    event.returnValue = false;
  //    event.preventDefault();

  //    //or
  //    //do something

  // }

 
}
