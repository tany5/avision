import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountdownComponent } from 'ngx-countdown'
import { MatSidenav } from '@angular/material/sidenav';
import { ExampanelService } from './exampanel.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { error } from 'protractor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-exampanel',
  templateUrl: './exampanel.component.html',
  styleUrls: ['./exampanel.component.scss']
})


export class ExampanelComponent implements OnInit {
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
  quizQuestionList: any
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



  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @ViewChild('drawer', { static: false }) private drawer: MatSidenav;

  constructor(private router: Router, private route: ActivatedRoute, private exampanelService: ExampanelService, private formbuilder: FormBuilder, private modalService: NgbModal) {



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

        this.exampanelService.getQuizQuestionAnswers(this.prodId, this.question_type_id,localStorage.getItem("test_taken_id")).subscribe(
          (res) => {
            console.log(res)
            this.quizQuestionAnswerDetails = res['quiz_question_answer']
            this.quizQuestionList = this.quizQuestionAnswerDetails['question_details']
            this.question = this.quizQuestionAnswerDetails[0]['question_details']['question']
            this.question_id = this.quizQuestionAnswerDetails[0]['question_details']['question_id']
            this.firstQuestionId = this.quizQuestionAnswerDetails[0]['question_details']['question_id']
            this.directions = this.quizQuestionAnswerDetails[0]['question_details']['directions']
            this.directionsStatus = this.quizQuestionAnswerDetails[0]['question_details']['directions_status']
            this.answers = this.quizQuestionAnswerDetails[0]['answers_list']
            this.quizAnswerList = this.quizQuestionAnswerDetails['answers_list']
            this.examLoader = true
            console.log("Question Id:",this.question_id)
            this.selectedQs = this.question_id
            this.exampanelService.saveAnswers(localStorage.getItem("test_taken_id"), this.question_id, 2, 0).subscribe(
              (res) => {
                console.log(res)
              },
              (error) => {
                console.log(error)
              })
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

  toggleQuestionPaper() {
    this.questionPaper = !this.questionPaper
  }

  handleEvent(event) {
    if (this.changeable == 0) {
      if (event.action == "done") {
        if (this.quiz_details.length == this.count) {
          console.log("submit")
        }
        else {
          this.questionNumber = 1
          this.examLoader = false
          this.duration = this.quiz_details[this.count]['duration']
          this.customFormat = { leftTime: this.duration * 60 }
          this.element = document.getElementById('next_question_type' + this.quiz_details[this.count]['question_type_id']) as HTMLElement;
          this.slectedTab = this.quiz_details[this.count]['question_type_name']

          this.element.removeAttribute('disabled')
          this.element.previousElementSibling.setAttribute('disabled', 'disabled')


          this.exampanelService.getQuizQuestionAnswers(this.prodId, this.quiz_details[this.count]['question_type_id'], localStorage.getItem("test_taken_id")).subscribe(
            (res) => {

              this.quizQuestionAnswerDetails = res['quiz_question_answer']
              this.quizQuestionList = this.quizQuestionAnswerDetails['question_details']
              this.question = this.quizQuestionAnswerDetails[0]['question_details']['question']
              this.question_id = this.quizQuestionAnswerDetails[0]['question_details']['question_id']
              this.directions = this.quizQuestionAnswerDetails[0]['question_details']['directions']
              this.directionsStatus = this.quizQuestionAnswerDetails[0]['question_details']['directions_status']
              this.answers = this.quizQuestionAnswerDetails[0]['answers_list']
              this.quizAnswerList = this.quizQuestionAnswerDetails['answers_list']
              this.examLoader = true
              console.log(this.question_id)
            },
            (error) => {
              console.log(error)
            }
          )
          this.count = this.count + 1
        }


      }
    }
    else {
     
      if (event.action == "done") {
        console.log("submit")
        let content2 = document.getElementById("content2")as HTMLElement
        this.openVerticallyCentered(content2)
      }

    }


  }

  pauseTimer() {
    this.countdown.pause()
    this.showPasuseButton = !this.showPasuseButton
    this.showRestartButton = !this.showRestartButton
  }

  restartTimer() {
    this.countdown.resume()
    this.showRestartButton = !this.showRestartButton
    this.showPasuseButton = !this.showPasuseButton
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

    console.log(this.answerLists)
    this.answerLists.map(function (qsid) {
      if (qsid['question_id'] == get_question_id) {
        selectedAnswer = qsid['answerId']
      }
    })
    this.answerId = selectedAnswer


    let element = document.getElementById(get_question_id) as HTMLElement;
    element.setAttribute("class", "card skipped")


    this.answerd.map(function (qsid) {
      if (qsid == get_question_id) {
        slectedId = qsid

        let element = document.getElementById(slectedId) as HTMLElement;
        element.setAttribute("class", "card attempted")

        disabledRadioBtn = true
        visited = true
        return false
      }


    })



    this.markedAnswerd.map(function (qsid) {
      console.log(qsid)
      if (qsid == get_question_id) {

        slectedId = qsid

        let element = document.getElementById(slectedId) as HTMLElement;
        element.setAttribute("class", "card attempted_bookmarked")
        disabledRadioBtn = false
        visited = true
        return false
      }



    })

    this.marked.map(function (qsid) {
      console.log(qsid)
      if (qsid == get_question_id) {
        slectedId = qsid

        let element = document.getElementById(slectedId) as HTMLElement;
        element.setAttribute("class", "card bookmarked")
        disabledRadioBtn = false
        visited = true
        return false
      }
    })

    if (!visited) {
      this.exampanelService.saveAnswers(localStorage.getItem("test_taken_id"), get_question_id, 2, 0).subscribe(
        (res) => {
          console.log(res)
        },
        (error) => {
          console.log(error)
        })
    }


    this.disabledRadio = disabledRadioBtn






    this.quizQuestionAnswerDetails.map(function (element) {
      if (element['question_details']['question_id'] == get_question_id) {
        click_question = element['question_details']['question']
        direction = element['question_details']['directions']
        answers = element['answers_list']
        directionsStatus = element['question_details']['directions_status']
        return false
      }
    });

    this.question = click_question
    this.directions = direction
    this.answers = answers

    this.directionsStatus = directionsStatus

  }

  getQUizDataById(id, name) {

    console.log("Marked Answerd", this.markedAnswerd)
    console.log("Marked ", this.marked)
    console.log("Answerd ", this.answerLists)
    this.slectedTab = name
    this.startButton = true
    this.question_type_id = id
    this.selected = this.question_type_id

    let selectedAnswer
    let disabledRadioBtn
    let slectedId
    let question_id



    this.exampanelService.getQuizQuestionAnswers(this.prodId, this.question_type_id, localStorage.getItem('test_taken_id')).subscribe(
      (res) => {
        console.log(res)
        this.quizQuestionAnswerDetails = res['quiz_question_answer']
        this.quizQuestionList = this.quizQuestionAnswerDetails['question_details']
        this.question = this.quizQuestionAnswerDetails[0]['question_details']['question']
        this.question_id = this.quizQuestionAnswerDetails[0]['question_details']['question_id']
        question_id = this.question_id
        this.directions = this.quizQuestionAnswerDetails[0]['question_details']['directions']
        this.directionsStatus = this.quizQuestionAnswerDetails[0]['question_details']['directions_status']
        this.answers = this.quizQuestionAnswerDetails[0]['answers_list']
        this.quizAnswerList = this.quizQuestionAnswerDetails['answers_list']

        this.exampanelService.saveAnswers(localStorage.getItem("test_taken_id"), question_id, 2, 0).subscribe(
          (res) => {
            console.log(res)
          },
          (error) => {
            console.log(error)
          })


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

  markForReview(question_id, answerId) {

    let indexPosition

    if (answerId) {
      let element = document.getElementById(question_id) as HTMLElement;
      element.setAttribute("class", "card attempted_bookmarked")

      this.exampanelService.saveAnswers(localStorage.getItem("test_taken_id"), question_id, 3, answerId).subscribe(
        (res) => {
          console.log(res)
        },
        (error) => {
          console.log(error)
        })

      if (this.answerLists.findIndex(e => e['question_id'] == question_id) != -1) {
        this.answerLists.splice(this.answerLists.findIndex(e => e['question_id'] == question_id), 1)
      }

      var index = this.answerLists.findIndex(qs_id => qs_id['question_id'] == question_id)
      if (index === -1) {
        this.answerLists.push({ question_id, answerId });
      }



      if (this.marked.findIndex(e => e == question_id) != -1) {
        this.marked.splice(this.marked.findIndex(e => e == question_id), 1)
      }

      var index = this.markedAnswerd.findIndex(qs_id => qs_id == question_id)
      if (index === -1) {
        this.markedAnswerd.push(question_id);
      }

      this.quizQuestionAnswerDetails.map(function (element, index) {
        if (element['question_details']['question_id'] == question_id) {
          console.log(index)
          indexPosition = index
        }
      });
      this.answerId = ''
      let next_question_id = this.quizQuestionAnswerDetails[indexPosition + 1]['question_details']['question_id']
      
      this.getQuestionAnswer(next_question_id, indexPosition + 1)
      console.log("Marked Answer", this.markedAnswerd)
      console.log("Marked", this.marked)
    }
    else {
      let element = document.getElementById(question_id) as HTMLElement;
      element.setAttribute("class", "card bookmarked")

      this.exampanelService.saveAnswers(localStorage.getItem("test_taken_id"), question_id, 4, 0).subscribe(
        (res) => {
          console.log("answer_id",res)
        },
        (error) => {
          console.log(error)
        })

      var index = this.marked.findIndex(qs_id => qs_id == question_id)
      if (index === -1) {
        this.marked.push(question_id);
      }
      this.quizQuestionAnswerDetails.map(function (element, index) {
        if (element['question_details']['question_id'] == question_id) {
          console.log(index)
          indexPosition = index
        }
      });
      this.answerId = ''
      let next_question_id = this.quizQuestionAnswerDetails[indexPosition + 1]['question_details']['question_id']
      
      this.getQuestionAnswer(next_question_id, indexPosition + 1)
      console.log("Marked Answer", this.markedAnswerd)
      console.log("Marked", this.marked)
    }




  }

  saveAndNext(question_id, answerId) {
    let indexPosition


    if (answerId) {
      let element = document.getElementById(question_id) as HTMLElement;
      element.setAttribute("class", "card attempted")

      this.exampanelService.saveAnswers(localStorage.getItem("test_taken_id"), question_id, 1, answerId).subscribe(
        (res) => {
          console.log("answer_id", res)
          let next_question_id = this.quizQuestionAnswerDetails[indexPosition + 1]['question_details']['question_id']
          
          this.getQuestionAnswer(next_question_id, indexPosition + 1)
        },
        (error) => {
          console.log(error)
        })


      if (this.answerLists.findIndex(e => e['question_id'] == question_id) != -1) {
        this.answerLists.splice(this.answerLists.findIndex(e => e['question_id'] == question_id), 1)
      }

      var index = this.answerLists.findIndex(qs_id => qs_id['question_id'] == question_id)
      if (index === -1) {
        this.answerLists.push({ question_id, answerId });
      }



      if (this.marked.findIndex(e => e == question_id) != -1) {
        this.marked.splice(this.marked.findIndex(e => e == question_id), 1)
      }

      else if (this.markedAnswerd.findIndex(e => e == question_id) != -1) {
        this.markedAnswerd.splice(this.markedAnswerd.findIndex(e => e == question_id), 1)
      }

      var index = this.answerd.findIndex(qs_id => qs_id == question_id)
      if (index === -1) {
        this.answerd.push(question_id);
      }
      this.answerId = ''
      this.quizQuestionAnswerDetails.map(function (element, index) {
        if (element['question_details']['question_id'] == question_id) {
          console.log(index)
          indexPosition = index
        }
      });




    }
    else {
      alert("Please Select An Answer")
    }
    //this.answerId = ''
  }

  goNext(question_id) {
    let indexPosition

    this.quizQuestionAnswerDetails.map(function (element, index) {
      if (element['question_details']['question_id'] == question_id) {
        console.log(index)
        indexPosition = index
      }
    });

    let next_question_id = this.quizQuestionAnswerDetails[indexPosition + 1]['question_details']['question_id']
    this.getQuestionAnswer(next_question_id, indexPosition + 1)
  }


  clearResponse(question_id, answerId) {
    if (answerId) {
      let element = document.getElementById(question_id) as HTMLElement;
      element.setAttribute("class", "card skipped")

      if (this.answerLists.findIndex(e => e['question_id'] == question_id) != -1) {
        this.answerLists.splice(this.answerLists.findIndex(e => e['question_id'] == question_id), 1)
      }

      if (this.markedAnswerd.findIndex(e => e == question_id) != -1) {
        this.markedAnswerd.splice(this.markedAnswerd.findIndex(e => e == question_id), 1)
      }

      if (this.marked.findIndex(e => e == question_id) != -1) {
        this.marked.splice(this.marked.findIndex(e => e == question_id), 1)
      }

    }
    this.answerId = null

  }


  openVerticallyCentered(content) {   
    this.modalService.open(content, { centered: true });
  }

  submit_exam() 
  {

  }



  ngOnInit(): void {



  }

}
