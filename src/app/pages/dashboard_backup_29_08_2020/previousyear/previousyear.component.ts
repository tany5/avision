import { Component, OnInit } from '@angular/core';
import { PreviousyearService } from './previousyear.service';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previousyear',
  templateUrl: './previousyear.component.html',
  styleUrls: ['./previousyear.component.scss']
})
export class PreviousyearComponent implements OnInit {
  courses = new FormControl();
  selectedTabId: any
  subCourseList: any
  subCourseId: any = 0
  quiz_details: any = []
  searchText
  previousYearQuizList: any =[]

  coursesList: any
  showProgress: boolean;
  limit: any;
  freeQuizService: any;
  isfullscreen: boolean;
  constructor(private prevyearService: PreviousyearService, private spinner: NgxSpinnerService, private router: Router) {
    this.prevyearService.getCourseName().subscribe(
      (res)=> {
       
        this.coursesList = res['courses_name']
        this.selectedTabId = res['courses_name']['0']['courses_id']
        this.prevyearService.getSubCourseName(this.selectedTabId).subscribe(
          (res)=> {            
            this.subCourseList = res['sub_courses']
            this.getSubCourseId(res['sub_courses'][0]['sub_courses_id'])
          })
    })

    this.prevyearService.getPreviousYearQuizGivenTest(localStorage.getItem("currentUserId")).subscribe(
      (res)=> {
        console.log(res)
        this.previousYearQuizList = res['quiz_detials']
      })
   }

  ngOnInit(): void {
  }

  getSubCourse() {

    this.prevyearService.getSubCourseName(this.selectedTabId).subscribe(
    (res)=> {      
      this.subCourseList = res['sub_courses']
    })
    
  }

  getSubCourseId(sub_courses_id) { 
    this.spinner.show()
    this.prevyearService.getQuizBySubCategoryId(sub_courses_id).subscribe(
      (res)=> {    
        if(res['status']==200) {
          this.quiz_details = res['quiz_details']
          this.spinner.hide()
        }
        else {
          this.quiz_details = []
          this.spinner.hide()
        }    
        
      }, 
      (error)=>{
        this.quiz_details = []
        this.spinner.hide()
      })

  }

  mainSubcourse(selectedTabId) {  
    this.prevyearService.getSubCourseName(selectedTabId).subscribe(
      (res)=> {       
        this.subCourseList = res['sub_courses']
        this.getSubCourseId(res['sub_courses'][0]['sub_courses_id'])
      })

      
  }

  replaceAll(input: string, find: string, replace: string): string {
    return input.replace(new RegExp(find, 'g'), replace);
 }


 getFreeQuizListAll() {
  this.showProgress = true
  this.limit = this.limit + 12
  this.freeQuizService.get_free_quiz_list_all(this.limit ).subscribe(
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


goToExamPanel(prodId, quiz_name) {
  this.prevyearService.startQuiz(prodId, localStorage.getItem('currentUserId')).subscribe(
    (res)=> {
      console.log(res)
      if(res['status']==200) {
        localStorage.setItem("test_taken_id", res['test_taken_id'])
        this.router.navigate(['/dashboard/previous-year-papers',prodId+'-'+this.replaceAll (quiz_name, ' ', '-')]).then(()=> {
         
          history.pushState(null, null, document.URL);
          window.addEventListener('popstate', function () {
              history.pushState(null, null, document.URL);
          }); 
          
          const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
            mozRequestFullScreen(): Promise<void>;
            webkitRequestFullscreen(): Promise<void>;
            msRequestFullscreen(): Promise<void>;
          };
        
          if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
            docElmWithBrowsersFullScreenFunctions.requestFullscreen();
          } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
            docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
          } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
          } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
            docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
          }
          this.isfullscreen = true;
        })
      }
      else {
        alert("You Already Completed This Exam")
      }
    })
  
}


goToAnalytics(prodId) {  
  this.router.navigate([`exam/${prodId}/analysis`]).then(() => {
    window.location.reload();
  });
}


goToExamPanelPrevious(prodId, quiz_name, student_taken_tests_id) {  
      
        localStorage.setItem("test_taken_id", student_taken_tests_id)
        this.router.navigate(['/dashboard/previous-year-papers',prodId+'-'+this.replaceAll (quiz_name, ' ', '-')]).then(()=> {
         
          history.pushState(null, null, document.URL);
          window.addEventListener('popstate', function () {
              history.pushState(null, null, document.URL);
          }); 
          
          const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
            mozRequestFullScreen(): Promise<void>;
            webkitRequestFullscreen(): Promise<void>;
            msRequestFullscreen(): Promise<void>;
          };
        
          if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
            docElmWithBrowsersFullScreenFunctions.requestFullscreen();
          } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
            docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
          } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
          } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
            docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
          }
          this.isfullscreen = true;
        })
      
      
   
  
}

}
