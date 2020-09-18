import { Component, OnInit, Inject, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FreequizpanelService } from './freequizpanel.service';
import { DOCUMENT } from '@angular/common';
import { CountdownComponent } from 'ngx-countdown'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-freequizpanel',
  templateUrl: './freequizpanel.component.html',
  styleUrls: ['./freequizpanel.component.scss']
})
export class FreequizpanelComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  step = 0;
  opendTrue: true
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
  constructor(private route: ActivatedRoute, private freequizpanelService: FreequizpanelService, @Inject(DOCUMENT) private document: Document, private titleService: Title, private router: Router) {

    this.charArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    this.quizName = this.route.snapshot.params.quizName
    this.quizId = this.quizName.substring(0, this.quizName.indexOf("-"));
    this.title = this.quizName.substr(this.quizName.indexOf("-") + 1);

    this.titleService.setTitle( this.title );

    const userId = localStorage.getItem("currentUserId")
    
    

    this.freequizpanelService.getQuizQuestionAnswer(this.quizId).subscribe(
      (res) => {
        console.log(res)
        this.quizInfo = res['quiz_details']['quiz_info']
        this.quizQuestionAnswer = res['quiz_details']['quiz_question_answer']
        this.customFormat = { leftTime: this.quizInfo[0]['tot_qus'] * 60 }
        console.log(this.quizInfo)
        console.log(this.quizQuestionAnswer)
        this.showTimer = true
      })
  }

  ngOnInit(): void {
    this.test_taken_id = localStorage.getItem('test_taken_id')
    
  }


  
  setStep(index: number) {
    this.step = index;
  }

  nextStep(question_id, answer_id) {

    let element = document.getElementById(`answer_given_${answer_id}`) as HTMLElement;   
    element.setAttribute("class", "answer_list col-12 given_answer")

    let element2 = document.getElementById(`row_toggle_enable_${question_id}`) as HTMLElement;
    
    element2.setAttribute("class", "row disabled")
    element2.setAttribute("disabled", "disabled")

    if (answer_id) {
      this.freequizpanelService.addFreeQuizStudentQuestion(question_id, localStorage.getItem('test_taken_id'), 1).subscribe(
        (res) => {
          console.log(res)
          this.freequizpanelService.addFreeQuizStudentAnswer(question_id, localStorage.getItem('test_taken_id'), answer_id).subscribe(
            (res) => {
              console.log(res)
            })
        })

        let element3 = document.getElementById(`answer_${question_id}`) as HTMLElement;
        element3.setAttribute("class", "answerd")
    }

    else {
      this.freequizpanelService.addFreeQuizStudentQuestion(question_id, localStorage.getItem('test_taken_id'), 0).subscribe(
        (res) => {
          console.log(res)
        })
    }



    this.step++;
  }

  prevStep() {
    this.step--;
  }

  scrollToQuestion(id, step) {
    console.log(`scrolling to ${id}`);
    let el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: "nearest" });
    this.step = step;
  }

  handleEvent(event) {
    if (event.action == "done") {
      console.log("done")
      this.freequizpanelService.submitFreeQuiz(localStorage.getItem('test_taken_id')).subscribe(
        (res)=> {         
          this.router.navigate(['/dashboard/freequizsolution/', this.quizName])
        })
    }
  }


    @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
      event.returnValue = false;
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {

    console.log(event);
     event.returnValue = false;
     event.preventDefault();

     //or
     //do something

  }

  submitQuiz() {
    if(confirm("Are you sure to Submit")) {
      this.freequizpanelService.submitFreeQuiz(localStorage.getItem('test_taken_id')).subscribe(
        (res)=> {
          this.router.navigate(['/dashboard/freequizsolution/', this.quizName])
        })
    }
    
  }

}
