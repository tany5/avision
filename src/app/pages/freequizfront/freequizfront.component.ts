import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FreequizService } from '../dashboard/freequiz/freequiz.service';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-freequizfront',
  templateUrl: './freequizfront.component.html',
  styleUrls: ['./freequizfront.component.scss']
})
export class FreequizfrontComponent implements OnInit {

  selector: string = '.main-panel';
  color="warn"
  showProgress: boolean = false

  quizType: any = 0;
  limit: any = 10
  quiz_details: any = []
  quizTypeList: any
  searchText: any
  userID: string;

  constructor(private freeQuizService: FreequizService, private spinner: NgxSpinnerService,private router: Router) {
    if(localStorage.getItem('userloggedIn') == '1'){
      this.userID =localStorage.getItem("currentUserId")
    }else{
      this.userID ='0'
    }
    if(localStorage.getItem('userloggedIn') == '1' && localStorage.getItem('quiz_id')!=null){
      this.freeQuizService.addTopicTests(localStorage.getItem('quiz_id') ,localStorage.getItem("currentUserId")).subscribe(
        (res) => {      
          localStorage.setItem('test_taken_id', res['student_taken_tests_id']);
          this.router.navigate(['/dashboard/freequizpanel/',localStorage.getItem('quiz_id')+'-'+this.replaceAll (localStorage.getItem('quiz_name'), ' ', '-')])
        })
      // this.router.navigate(['/dashboard/freequizpanel/'+localStorage.getItem('quiz_id')+this.replaceAll (localStorage.getItem('quiz_name'), ' ', '-')])
    }
    this.spinner.show();
    this.freeQuizService.get_free_quiz_list_all(0,this.userID).subscribe(
      (res)=> {
        
        this.quiz_details = res['quiz_details']

        
      },
      (error)=> {
        console.log(error)
      })

      this.freeQuizService.get_free_quiz_question_type().subscribe(
        (res)=> {
          
          this.quizTypeList = res['quiz_type']
          this.spinner.hide();
        })
   }

  ngOnInit(): void {
  }

  onScroll() {
    console.log('scrolled!!');
  }

  getFreeQuizListAll() {
    this.showProgress = true
    this.limit = this.limit + 12
    this.freeQuizService.get_free_quiz_list_all(this.limit,this.userID).subscribe(
      (res)=> {
        console.log(res)       

        for(var i = 0; i< res['quiz_details'].length; i++) {
          this.quiz_details.push(res['quiz_details'][i])
        }

        this.showProgress = false
      },
      (error)=> {
        console.log(error)
      })
    
  }

  getQuizTypeId(id) {
    var limit =0;
    this.showProgress = true
    this.spinner.show();
    this.limit = this.limit + 12
    
    this.quiz_details = []
    this.freeQuizService.get_free_quiz_list_by_id(id, limit ).subscribe(
      (res)=> {
        console.log(res)  

        if(res['status']=='200') {
          if(res['quiz_details'].length ==0) {
            this.showProgress = false
            this.spinner.hide();
            return false
          }
  
          for(var i = 0; i< res['quiz_details'].length; i++) {
            this.quiz_details.push(res['quiz_details'][i])
          }
          this.showProgress = false
          this.spinner.hide();
        }

        else {
          this.showProgress = false
          this.spinner.hide();
        }
        
        
        
      },
      (error)=> {
        console.log(error)
        this.spinner.hide();
      })
  }

  getQuizAll() {
    this.spinner.show();
    this.showProgress = true
    this.limit = 10
    this.quiz_details = []
    this.freeQuizService.get_free_quiz_list_all(0,this.userID).subscribe(
      (res)=> {        
        for(var i = 0; i< res['quiz_details'].length; i++) {
          this.quiz_details.push(res['quiz_details'][i])
        }
        this.showProgress = false
        this.spinner.hide();
      },
      (error)=> {
        console.log(error)
      })
  }

  replaceAll(input: string, find: string, replace: string): string {
    return input.replace(new RegExp(find, 'g'), replace);
 }

 addTopic(quiz_id,quiz_name) {
  if(localStorage.getItem('userloggedIn') == '1'){
    const userId = localStorage.getItem("currentUserId")
    localStorage.setItem('quiz_id',quiz_id);
    localStorage.setItem('quiz_name',quiz_name);
  this.freeQuizService.addTopicTests(quiz_id, userId).subscribe(
    (res) => {      
      localStorage.setItem('test_taken_id', res['student_taken_tests_id']);
      this.router.navigate(['/dashboard/freequizpanel',quiz_id+'-'+this.replaceAll (quiz_name, ' ', '-')])
    })

  }else{
    localStorage.setItem('quiz_id',quiz_id);
    localStorage.setItem('quiz_name',quiz_name);
    jQuery('#free_quiz').val(1);
    jQuery("#loginModal").modal();
  } 
  
 }

}
