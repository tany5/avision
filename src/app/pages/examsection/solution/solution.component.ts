import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown'
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder, FormGroup } from '@angular/forms';
import { error } from 'protractor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy } from '@angular/common';
import { ExampanelService } from '../exampanel/exampanel.service';
declare var $: any;

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {

  showFiller = true;
  isOpen = true;
  startButton: boolean = false
  changedIcon = "keyboard_arrow_right"
  toggleIcon: boolean = false
  showPasuseButton: boolean = true
  showRestartButton: boolean = false
  questionPaper: boolean = true
  prodId: any
  quiz_info: any
  quiz_details: any
  quiz_name: any
  correct_mark: any
  negative_mark: any
  question_type_id: any
  total_question = []
  duration: number
  customFormat: any
  element: HTMLElement
  count: number = 1
  examLoader: boolean = false
  quizQuestionAnswerDetails: any
  quizQuestionQuestionPaper: any
  quizQuestionList: any
  quizQuestionListQuestionPaper: any
  quizAnswerList: any
  changeable: any
  question: any
  answers: any
  directions: any
  directionsStatus: any
  selected: any
  slectedTab: any
  questionNumber: any
  answerd = []
  markedAnswerd = []
  marked = []
  visited = []
  question_id: any
  answerId: any
  visitedStatus: boolean = false
  answerLists = []
  answerVal: any
  answer_form: FormGroup
  selectedAnswerId: any
  disabledRadio: boolean = false
  firstQuestionId: any
  selectedQs: any
  result_arr = []
  charArray: any;
  isfullscreen: boolean = false
  isDisabled: boolean = true
  viewSolution: boolean = false
  viewSolutionArr = []
  tempSolutionAnswer: any = []
  correctAnswerStatus: any
  resultAnserStatus: boolean = false
  ansDesc: any
  showProgress: boolean = true

  

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('drawer', { static: false }) private drawer: MatSidenav;
  elem: any;
  username: string;


  constructor(private router: Router, private route: ActivatedRoute, private exampanelService: ExampanelService, private formbuilder: FormBuilder, private modalService: NgbModal, private elRef: ElementRef, private location: LocationStrategy) {
    
    this.username = localStorage.getItem('currentUserName')
    this.charArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
      })

    this.exampanelService.getQuizInformation(this.prodId).subscribe(
      (res) => {
        this.quiz_info = res['quiz_information']['quiz_info']
        this.quiz_details = res['quiz_information']['quiz_details']

        this.slectedTab = this.quiz_details[0]['question_type_name']

        this.quiz_name = this.quiz_info[0]['quiz_name']
        this.correct_mark = this.quiz_info[0]['correct_mark']
        this.negative_mark = this.quiz_info[0]['negative_mark']
        this.question_type_id = this.quiz_details[0]['question_type_id']
        this.selected = this.question_type_id



        this.changeable = this.quiz_info[0]['changable']

        if (this.changeable == 0) {
          this.duration = parseInt(this.quiz_details[0]['duration'])
        }
        else {
          this.duration = parseInt(this.quiz_info[0]['duration'])
        }

        this.customFormat = { leftTime: this.duration * 60 }
        for (var i = 0; i < this.quiz_details[0]['total_question']; i++) {
          this.total_question.push(i + 1);
        }

        this.exampanelService.getQuizQuestionAnswers(this.prodId, this.question_type_id, localStorage.getItem("test_taken_id")).subscribe(
          (res) => {

            this.showProgress = false
            $("#waitModalCenter").modal('hide');
            console.log(res)
            this.quizQuestionAnswerDetails = res['quiz_question_answer']
            this.quizQuestionList = this.quizQuestionAnswerDetails['question_details']
            this.question = this.quizQuestionAnswerDetails[0]['question_details']['question']
            this.ansDesc = this.quizQuestionAnswerDetails[0]['question_details']['ans_desc']
            this.question_id = this.quizQuestionAnswerDetails[0]['question_details']['question_id']
            this.firstQuestionId = this.quizQuestionAnswerDetails[0]['question_details']['question_id']
            this.directions = this.quizQuestionAnswerDetails[0]['question_details']['directions']
            this.directionsStatus = this.quizQuestionAnswerDetails[0]['question_details']['directions_status']
            this.answers = this.quizQuestionAnswerDetails[0]['answers_list']
            this.quizAnswerList = this.quizQuestionAnswerDetails['answers_list']
            this.examLoader = true
            console.log("Question Id:", this.question_id)
            this.selectedQs = this.question_id
          },
          (error) => {
            console.log(error)
          })



      },
      (error) => {
        console.log(error)
      })

  }


  iconToggle(e) {
    this.toggleIcon = !this.toggleIcon
    if (this.toggleIcon == true) {
      this.changedIcon = "keyboard_arrow_left"
    }
    else {
      this.changedIcon = "keyboard_arrow_right"
    }

  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 1037) {
      this.changedIcon = "keyboard_arrow_left"
      this.drawer.toggle()
    }
    else {
      this.changedIcon = "keyboard_arrow_right"
      this.drawer.toggle()
    }

  }







  getQuestionAnswer(id, qsNo) {
    const get_question_id = id
    this.questionNumber = qsNo
    let click_question;
    let direction;
    let answers
    let directionsStatus
    let slectedId
    let selectedAnswer
    let visited: boolean = false
    this.question_id = get_question_id
    let visitstatus: boolean = false
    let disabledRadioBtn
    this.selectedQs = get_question_id
    this.viewSolution = false
    console.log(this.answerLists)
    this.answerLists.map(function (qsid) {
      if (qsid['question_id'] == get_question_id) {
        selectedAnswer = qsid['answerId']
      }
    })
    this.answerId = selectedAnswer


    this.quizQuestionAnswerDetails.map(function (element) {
      if (element['question_details']['question_id'] == get_question_id) {
        click_question = element['question_details']['question']
        direction = element['question_details']['directions']
        answers = element['answers_list']
        directionsStatus = element['question_details']['directions_status']
        return false
      }
    });

    let result = answers.filter(o => this.tempSolutionAnswer.some(({ answerId }) => o.ans_id == answerId));
    console.log("ansewer_list", result);

    console.log(result.length)

    if (result.length > 0) {
      this.correctAnswerStatus = result[0]['ans_id']

      if (result[0]['status'] == 0) {
        this.resultAnserStatus = false
      }
      else {
        this.resultAnserStatus = true
      }
      this.viewSolution = true
    }
    else {
      this.correctAnswerStatus = 0
      this.viewSolution = false
    }

    result = []


    this.question = click_question
    this.directions = direction
    this.answers = answers
    this.directionsStatus = directionsStatus




  }

  getQUizDataById(id, name) {
    this.showProgress = true
    $("#waitModalCenter").modal('show');

   

    console.log("Marked Answerd", this.markedAnswerd)
    console.log("Marked ", this.marked)
    console.log("Answerd ", this.answerLists)
    this.slectedTab = name
    this.startButton = true
    this.question_type_id = id
    this.selected = this.question_type_id
    this.viewSolution = false
    let selectedAnswer
    let disabledRadioBtn
    let slectedId
    let question_id
    let answers


    this.exampanelService.getQuizQuestionAnswers(this.prodId, this.question_type_id, localStorage.getItem('test_taken_id')).subscribe(
      (res) => {
        console.log(res)
        this.quizQuestionAnswerDetails = res['quiz_question_answer']
        this.quizQuestionList = this.quizQuestionAnswerDetails['question_details']
        this.question = this.quizQuestionAnswerDetails[0]['question_details']['question']
        this.ansDesc = this.quizQuestionAnswerDetails[0]['question_details']['ans_desc']
        this.question_id = this.quizQuestionAnswerDetails[0]['question_details']['question_id']
        question_id = this.question_id
        this.directions = this.quizQuestionAnswerDetails[0]['question_details']['directions']
        this.directionsStatus = this.quizQuestionAnswerDetails[0]['question_details']['directions_status']
        this.answers = this.quizQuestionAnswerDetails[0]['answers_list']
        answers = this.answers
        this.quizAnswerList = this.quizQuestionAnswerDetails['answers_list']

        $("#waitModalCenter").modal('hide');
        this.showProgress = false

        this.restartTimer();

        let result = answers.filter(o => this.tempSolutionAnswer.some(({ answerId }) => o.ans_id == answerId));
        console.log("ansewer_list", result);

        console.log(result.length)

        if (result.length > 0) {
          this.correctAnswerStatus = result[0]['ans_id']

          if (result[0]['status'] == 0) {
            this.resultAnserStatus = false
          }
          else {
            this.resultAnserStatus = true
          }
          this.viewSolution = true
        }
        else {
          this.correctAnswerStatus = 0
          this.viewSolution = false
        }

        result = []


        this.answerLists.map(function (qsid) {
          if (qsid['question_id'] == question_id) {
            selectedAnswer = qsid['answerId']
          }
        })
        this.answerId = selectedAnswer

        if (question_id) {

          let element = document.getElementById(question_id) as HTMLElement;
          element.setAttribute("class", "card skipped")

          this.answerd.map(function (qsid) {
            if (qsid == question_id) {
              slectedId = qsid

              let element = document.getElementById(question_id) as HTMLElement;
              element.setAttribute("class", "card attempted")

              disabledRadioBtn = true
              return false
            }


          })



          this.markedAnswerd.map(function (qsid) {
            console.log(qsid)
            if (qsid == question_id) {

              slectedId = qsid

              let element = document.getElementById(question_id) as HTMLElement;
              element.setAttribute("class", "card attempted_bookmarked")
              disabledRadioBtn = false
              return false
            }



          })

          this.marked.map(function (qsid) {
            console.log(qsid)
            if (qsid == question_id) {
              slectedId = qsid

              let element = document.getElementById(question_id) as HTMLElement;
              element.setAttribute("class", "card bookmarked")
              disabledRadioBtn = false
              return false
            }



          })

        }



        this.disabledRadio = disabledRadioBtn

      },
      (error) => {
        console.log(error)
      }
    )

  }



  isActive(item) {
    return this.selected == item;
  };





  goNext(question_id) {
    let indexPosition
    this.viewSolution = false
    this.quizQuestionAnswerDetails.map(function (element, index) {
      if (element['question_details']['question_id'] == question_id) {
        console.log(index)
        indexPosition = index
      }
    });

    let element = document.getElementById("previous") as HTMLElement;
    element.removeAttribute("disabled")

    let next_question_id = this.quizQuestionAnswerDetails[indexPosition + 1]['question_details']['question_id']
    this.getQuestionAnswer(next_question_id, indexPosition + 1)
  }

  goBack(question_id) {
    let indexPosition
    this.viewSolution = false
    this.quizQuestionAnswerDetails.map(function (element, index) {
      if (element['question_details']['question_id'] == question_id) {
        console.log(index)
        indexPosition = index
      }
    });

    if (indexPosition == 1) {
      let element = document.getElementById("previous") as HTMLElement;
      element.setAttribute("disabled", "disabled")
    }

    let next_question_id = this.quizQuestionAnswerDetails[indexPosition - 1]['question_details']['question_id']
    this.getQuestionAnswer(next_question_id, indexPosition - 1)
  }





  openVerticallyCentered(content) {    
    this.modalService.open(content, { centered: true });
  }

  pauseTimer() {
    this.countdown.pause()
    this.showPasuseButton = !this.showPasuseButton
    this.showRestartButton = !this.showRestartButton
    $("#pauseModalCenter").modal('show');
  }

  restartTimer() {
    this.countdown.resume()
    this.showRestartButton = !this.showRestartButton
    this.showPasuseButton = !this.showPasuseButton
    $("#pauseModalCenter").modal('hide');
  }

  goToAnalytics() {
    $("#ResultModalCenter").modal('hide');
    this.router.navigate([`exam/${this.prodId}/analysis`]).then(() => {
      window.location.reload();
    });
  }


  view_solution(question_id, answerId) {    
    this.viewSolution = true
  }

  radioChange(question_id, answerId, status) {
    
    this.correctAnswerStatus = ''

    if (this.tempSolutionAnswer.findIndex(e => e['question_id'] == question_id) != -1) {
      this.tempSolutionAnswer.splice(this.tempSolutionAnswer.findIndex(e => e['question_id'] == question_id), 1)
    }

    this.tempSolutionAnswer.push({ question_id, answerId, status })
    console.log(this.tempSolutionAnswer)
    if (status == 1) {
     
      let element = document.getElementById(answerId) as HTMLElement;
      element.setAttribute("class", "checkedClass")
      this.viewSolution = true


    }
    else {     
      this.correctAnswerStatus = answerId
      let element = document.getElementById(answerId) as HTMLElement;
      element.setAttribute("class", "red")
      this.viewSolution = true

    }

  }





  ngOnInit(): void {
    $("#waitModalCenter").modal('show');
  }
}
