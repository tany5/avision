import { Component, OnInit } from '@angular/core';
import { PracticetestService } from './practicetest.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { of } from 'rxjs';
declare var jQuery: any;

@Component({
  selector: 'app-practicetest',
  templateUrl: './practicetest.component.html',
  styleUrls: ['./practicetest.component.scss']
})

export class PracticetestComponent implements OnInit {
 
  panelOpenState = false;
  subject: any
  chapters: any;
  active: boolean = false;
  chap_id : any
  question_arr = [] 
  qustn_arr: any 
  question_count: any;
  question_statement: any;
  question_ans_arr: any;
  question_id: any;
  position: number;
  isActive: boolean=false
  questionid_prev: any;
  solution: any;
  isCorrect: boolean;
  checked_id: any;
  isWrong: boolean;
  result_answer_stat: boolean;
  count_check: boolean = true;
  qsId: any
  qnStatearr: any = []
  buttonText: any = 'Skip'
  question_position:any
  sub_id: any;
  user_id: string;
  answer_id: any;
  anwser_status: any;
  test_given_stat : boolean = false
  question_ans_check_arr: any =[]
  isCount: boolean;
  given_ans_id: any;
  given_ans_stat: any;
  complete_count: any;
  complete_test: boolean = false;
  skipped: boolean;
  test_taken_id: any;
  tab_index: number;
  constructor(private practiceService: PracticetestService) { 
    this.user_id = localStorage.getItem('currentUserId')
    this.practiceService.get_practice_subject(this.user_id).subscribe(

      (res) => {
        console.log(res)
        this.subject = res['sub_arr']
      }
    )
  }

  ngOnInit(): void {
    
    // jQuery('#sub_close').on('click',function(){
    //   jQuery('.example-container').toggleClass('add_left')
    // })
  }

  getChapter(subject_id){
    
    this.practiceService.get_practice_chapter(subject_id,this.user_id).subscribe(
      (res) => {
        this.chapters = res['chap_arr']
        
        //console.log("chapters...")
        //console.log(this.chapters)
      }
    )
  }

  loadQuestion(subject_id,chapter_id){
    //alert(subject_id+'-'+chapter_id)
    let div_ele = document.getElementById('div_tab') as HTMLDivElement
    div_ele.style.display ='block'
    let div_ele1 = document.getElementById('question_div') as HTMLDivElement
    div_ele1.style.display ='block'
    this.active = true;
    this.chap_id = chapter_id
    this.sub_id = subject_id
    this.question_arr = []
    this.practiceService.checkTestComplete(this.user_id,this.sub_id,this.chap_id).subscribe(
      (data) => {
        this.complete_count = data['test_question_count']
        //alert(this.complete_count)
      }

    )
    this.practiceService.fetchPracticetesttakenId(this.user_id,this.sub_id,this.chap_id).subscribe(

      (res) => {
        this.test_taken_id = res['test_taken_id']
      }
    )
    this.practiceService.checkPracticetestState(this.user_id,this.sub_id,this.chap_id).subscribe(

      (data) => {
        //alert(data['status'])
        if(data['status'] == 200){
          this.isCount = true
          this.test_given_stat = true;
          this.question_ans_check_arr = data['question_check_arr']
          this.question_ans_arr =  this.question_ans_check_arr[0]['answer_arr']
          console.log(this.question_ans_check_arr)
          this.given_ans_id = this.question_ans_check_arr[0]['given_answer_id']
          this.given_ans_stat = this.question_ans_check_arr[0]['given_answer_status']
          if(this.given_ans_stat == 2 || this.given_ans_stat == 3){
            this.skipped = true
          }else{
            this.skipped = false
          }
          this.buttonText = (this.question_ans_check_arr[0]['given_answer_status']=='2' || this.question_ans_check_arr[0]['given_answer_status']=='3') ? 'skip' : (this.question_ans_check_arr[0]['given_answer_status']=='0'||this.question_ans_check_arr[0]['given_answer_status']=='1') ? 'next' : 'next'
          let ele = document.getElementById("solv") as HTMLDivElement;
          ele.style.display=(this.question_ans_check_arr[0]['given_answer_status']=='2' || this.question_ans_check_arr[0]['given_answer_status']=='3')?'none' : (this.question_ans_check_arr[0]['given_answer_status']=='0'||this.question_ans_check_arr[0]['given_answer_status']=='1') ? 'block' : 'none'
          //alert(this.question_ans_check_arr.length)
          if(this.complete_count == this.question_ans_check_arr.length){
            this.complete_test = true
          }else{
            this.complete_test = false
          }
          //alert(this.complete_test)
          // for(var i=0;i<tab.length;i++){
          //   console.log(tab.)
          // }
          this.practiceService.getPracticeQuesion(subject_id,chapter_id).subscribe(
      
            (res) => {
              //console.log(res['question_arr'])
              
              for(var i =0;i<res['question_arr'].length; i++){
                 this.question_arr.push(res['question_arr'][i])
               }
               console.log(this.question_arr[0])
               this.position = 1;
               this.question_statement = this.question_arr[0]['question_statement']
               this.question_id = this.question_arr[0]['question_id']
               this.practiceService.getPracticeQuestionCount(subject_id,chapter_id).subscribe(

                (res) => {
          
                      
                      this.question_count = res['question_arr']
                      console.log(this.question_count)
                      for(var i =0;i<res['question_arr'].length; i++){
                        this.question_arr.push(res['question_arr'][i])
                      }
                }
              )

              //  this.practiceService.getPracticeQuestionAnswer(this.question_arr[0]['question_id']).subscribe(
      
              //   (data) => {
              //     console.log("answers...")
              //     this.question_ans_arr = data['question_ans_arr']
                  
              //   }
              //  )
                //alert(this.question_id)
                this.qsId = this.question_id
               this.practiceService.getPracticeQuestionSolution(this.question_id).subscribe(
                (data) => {
                  console.log(data)
                  this.solution = data['question_arr_sol'][0]['solution']
                }
              )
            }
          )

        }else{
          
          this.practiceService.getPracticeQuesion(subject_id,chapter_id).subscribe(
      
            (res) => {
              //console.log(res['question_arr'])
              
              for(var i =0;i<res['question_arr'].length; i++){
                 this.question_arr.push(res['question_arr'][i])
               }
               console.log(this.question_arr[0])
               this.position = 1;
               this.question_statement = this.question_arr[0]['question_statement']
               this.question_id = this.question_arr[0]['question_id']
               this.practiceService.getPracticeQuestionAnswer(this.question_arr[0]['question_id']).subscribe(
      
                (data) => {
                  console.log("answers...")
                  this.question_ans_arr = data['question_ans_arr']
                  
                }
               )
                //alert(this.question_id)
                this.qsId = this.question_id
               this.practiceService.getPracticeQuestionSolution(this.question_id).subscribe(
                (data) => {
                  console.log(data)
                  this.solution = data['question_arr_sol'][0]['solution']
                }
              )
            }
          )
          this.practiceService.getPracticeQuestionCount(subject_id,chapter_id).subscribe(

            (res) => {
      
                  
                  this.question_count = res['question_arr']
                  console.log(this.question_count)
                  for(var i =0;i<res['question_arr'].length; i++){
                    this.question_arr.push(res['question_arr'][i])
                  }
            }
          ) 
          this.practiceService.savePracticeTest(this.user_id,this.sub_id,this.chap_id).subscribe(
            (res) => {
              console.log(res);
              if(res['status'] == 200){
                localStorage.setItem('practiceTestTakenId',res['test_taken_id'])
              }
            }
          )
        }
      } 
    ) 
    
    //console.log(this.qustn_arr)
   // this.question_statement = this.question_arr[0]['question_statement']

    

    // console.log(this.question_arr)
    
   
      let ele = document.getElementById("myName") as HTMLElement;
      ele.setAttribute('disabled','disabled')
      
      
    
  }

  goNext(question_id,){
    
    this.buttonText = 'Skip'
    this.result_answer_stat = false
    this.questionid_prev = question_id
    this.isActive=true;
    var index_pos
    if(this.test_given_stat){

      
      this.question_ans_check_arr.map(function(element, index){
      
        if(element['question_id'] == question_id){
          console.log(index)
          index_pos = index
          
        }
        
      })
      //alert(question_id)
      //alert(index_pos)
      
      if(index_pos+1 > 0){
        
        let ele = document.getElementById("myName") as HTMLElement;
        ele.removeAttribute('disabled')
      }
      this.question_statement = this.question_arr[index_pos+1]['question_statement']
      this.question_id = this.question_arr[index_pos+1]['question_id']
      this.position = index_pos+2
      this.qsId = this.question_id
      this.question_ans_arr = this.question_ans_check_arr[index_pos+1]['answer_arr']
      this.given_ans_id = this.question_ans_check_arr[index_pos+1]['given_answer_id']
      this.given_ans_stat = this.question_ans_check_arr[index_pos+1]['given_answer_status']
      if(this.given_ans_stat == 2 || this.given_ans_stat == 3){
        this.skipped = true
      }else{
        this.skipped = false
      }
      this.buttonText = (this.question_ans_check_arr[index_pos+1]['given_answer_status']=='2') ? 'skip' : (this.question_ans_check_arr[index_pos+1]['given_answer_status']=='0'||this.question_ans_check_arr[index_pos+1]['given_answer_status']=='1') ? 'next' : 'next'
      let ele = document.getElementById("solv") as HTMLDivElement;
      ele.style.display=(this.question_ans_check_arr[index_pos+1]['given_answer_status']=='2')?'none' : (this.question_ans_check_arr[index_pos+1]['given_answer_status']=='0'||this.question_ans_check_arr[index_pos+1]['given_answer_status']=='1') ? 'block' : 'none'

      
            
            let element2 = document.getElementById("mat-tab-label-1-"+(index_pos)) as HTMLElement;
            let element3=element2.getElementsByTagName('span') as HTMLCollection
            if(!element3[0].classList.contains('is-correct-count') || !element3[0].classList.contains('is-wrong-count')){
              //alert(element2.classList.contains('is-given-correct'))
              var answer_id = this.answer_id
              var answer_status = this.anwser_status
              var answered_status = false;
              this.qnStatearr.map(function(element, index){
        
                if(element['question_id'] == question_id){
                  alert(question_id)
                  if(element['answer_status'] == 0){
                    element3[0].classList.add('is-wrong-count')
                    answered_status = true
                    // this.practiceService.PracticeQuestionSave(this.test_taken_id,question_id,answer_id,answer_status).subscribe(
                    //   (res) => {
                    //     console.log(res)
                    //   }
                    // ) 
                  }else{
                    element3[0].classList.add('is-correct-count')
                    answered_status = true
                    
                  }
                  
                }else{
                  element3[0].classList.add('is-visited')
                  answered_status = false
                  
                }
                
              })
              if(answered_status){
                this.practiceService.PracticeQuestionSave(this.test_taken_id,question_id,answer_id,answer_status).subscribe(
                      (res) => {
                        console.log(res)
                      }
                    ) 
                
                
              }else{
                
               this.practiceService.PracticeQuestionSave(this.test_taken_id,question_id,0,2).subscribe(
                    (res) => {
                      console.log(res)
                    }
                  )
              }
              
              // this.practiceService.PracticeQuestionSave(test_taken_id,question_id,this.answer_id,this.anwser_status).subscribe(
              //   (res) => {
              //     console.log(res)
              //   }
              // ) 
              // this.checked_id  =  this.qnStatearr[index_pos]['answer_id']
              // if(this.qnStatearr[index_pos]['answer_status'] == 0){
              //   this.isWrong = true
              //   this.result_answer_stat = true
              // }else{
              //   this.isCorrect = true
              //   this.result_answer_stat = true
              // }
            }else{
              //this.qnStatearr.push({'question_id':this.question_id,'answer_id':0,'answer_status':2})
              // this.practiceService.PracticeQuestionSave(test_taken_id,question_id,0,2).subscribe(
              //   (res) => {
              //     console.log(res)
              //   }
              // ) 
            }
            
            this.practiceService.getPracticeQuestionSolution(this.question_id).subscribe(
              (data) => {
                console.log(data)
                this.solution = data['question_arr_sol'][0]['solution']
              }
            )
      
    }else{
      this.question_arr.map(function(element, index){
      
        if(element['question_id'] == question_id){
          console.log(index)
          index_pos = index
          
        }
        
      })
      
      if(index_pos+1 > 0){
        
        let ele = document.getElementById("myName") as HTMLElement;
        ele.removeAttribute('disabled')
      }
      let element1 = document.getElementById("mat-tab-label-0-"+index_pos) as HTMLElement;
     
      element1.classList.add('is-visited')
  
  
          this.question_statement = this.question_arr[index_pos+1]['question_statement']
           this.question_id = this.question_arr[index_pos+1]['question_id']
           this.position = index_pos+2
           this.qsId = this.question_id
           this.practiceService.getPracticeQuestionAnswer(this.question_id).subscribe(
  
            (data) => {
             
              this.question_ans_arr = data['question_ans_arr']
              
            }
           )
  
           this.practiceService.getPracticeQuestionSolution(this.question_id).subscribe(
             (data) => {
               this.solution = data['question_arr_sol'][0]['solution']
             }
           )
  
           let ele = document.getElementById("solv") as HTMLDivElement;
           ele.style.display='none'
            //alert(index_pos) 
            let element2 = document.getElementById("mat-tab-label-0-"+(index_pos+1)) as HTMLElement;
            if(element2.classList.contains('is-correct-count') || element2.classList.contains('is-wrong-count')){
              //alert(element2.classList.contains('is-correct-count'))
              this.checked_id  =  this.qnStatearr[index_pos+1]['answer_id']
              if(this.qnStatearr[index_pos+1]['answer_status'] == 0){
                this.isWrong = true
                this.result_answer_stat = true
              }else{
                this.isCorrect = true
                this.result_answer_stat = true
              }
              
            }else{
              this.qnStatearr.push({'question_id':this.question_id,'answer_id':0,'answer_status':2})
            }
          //  if(typeof ( this.qnStatearr[index_pos+1]['answer_id'])=='undefined'){
            
          //  }
  
          this.question_position = index_pos+1
  
          var test_taken_id = localStorage.getItem('practiceTestTakenId') 
          let ele3 =  document.getElementById("mat-tab-label-0-"+(index_pos)) as HTMLElement;
          //alert(ele3.classList.contains('is-visited'))
          if(ele3.classList.contains('is-correct-count') || ele3.classList.contains('is-wrong-count')){
            this.practiceService.PracticeQuestionSave(test_taken_id,question_id,this.answer_id,this.anwser_status).subscribe(
              (res) => {
                console.log(res)
              }
            ) 
  
          }else{
            this.practiceService.PracticeQuestionSave(test_taken_id,question_id,0,2).subscribe(
              (res) => {
                console.log(res)
              }
            ) 
          }
    }
    
        
        

        
       
  }

  goPrev(question_id){
    
    this.result_answer_stat = false
    
    var index_pos
    if(this.test_given_stat){
      //alert("test given")
    }else{
      this.question_arr.map(function(element, index){
      
        if(element['question_id'] == question_id){
          console.log(index)
          index_pos = index
          
        }
        
      })
  
      if(index_pos == 1){
       
        let ele = document.getElementById("myName") as HTMLElement;
        ele.setAttribute('disabled','disabled')
      }
  
          this.question_statement = this.question_arr[index_pos-1]['question_statement']
           this.question_id = this.question_arr[index_pos-1]['question_id']
           this.position = this.position-1
           this.qsId = this.question_id
           this.practiceService.getPracticeQuestionAnswer(this.question_id).subscribe(
  
            (data) => {
             
              this.question_ans_arr = data['question_ans_arr']
              
            }
           )
  
           this.practiceService.getPracticeQuestionSolution(this.question_id).subscribe(
            (data) => {
              this.solution = data['question_arr_sol'][0]['solution']
            }
          )
          //alert(index_pos)
          let element2 = document.getElementById("mat-tab-label-0-"+(index_pos-1)) as HTMLElement;
          if(element2.classList.contains('is-correct-count') || element2.classList.contains('is-wrong-count')){
            //alert(element2.classList.contains('is-correct-count'))
            this.checked_id  =  this.qnStatearr[index_pos-1]['answer_id']
            if(this.qnStatearr[index_pos+1]['answer_status'] == 0){
              this.isWrong = true
              this.result_answer_stat = true
            }else{
              this.isCorrect = true
              this.result_answer_stat = true
            }
          }
          this.question_position = index_pos-1

    }
    
  }

  checkAnswer(status,id, qsId){
    
    if(!this.complete_test){
     
      this.answer_id = id
      this.anwser_status = status
      this.buttonText = 'Next'
      console.log(qsId)
      this.questionid_prev = qsId
      this.checked_id = id
      var index_pos
      this.question_ans_check_arr.map(function(element, index){
        
        if(element['question_id'] == qsId){
          console.log(index)
          index_pos = index
          
        }
        
      })
      if(status == 0){
        this.given_ans_stat=0
        this.given_ans_id = id
        this.skipped=false
      // let element1 = document.getElementById("mat-tab-label-0-"+index_pos) as HTMLElement;
     
      // element1.classList.add('is-wrong-count')
  
      }else{
        this.given_ans_stat=1
        this.given_ans_id = id
        this.skipped=false
        
        // let element1 = document.getElementById("mat-tab-label-0-"+index_pos) as HTMLElement;
     
        // element1.classList.add('is-correct-count')
      }
      
      let ele = document.getElementById("solv") as HTMLDivElement;
      ele.style.display='block'
      if (this.qnStatearr.findIndex(e => e['question_id'] == qsId) != -1) {
        this.qnStatearr.splice(this.qnStatearr.findIndex(e => e['question_id'] == qsId), 1)
      }
      this.qnStatearr.push({'question_id':qsId,'answer_id':id,'answer_status':status})
      console.log(this.qnStatearr)
    }else{

      this.answer_id = id
      this.anwser_status = status
      this.buttonText = 'Next'
      console.log(qsId)
      this.questionid_prev = qsId
      this.checked_id = id
      var index_pos
      this.question_arr.map(function(element, index){
        
        if(element['question_id'] == qsId){
          console.log(index)
          index_pos = index
          
        }
        
      })
      if(status == 0){
        
        this.isWrong = true
        this.result_answer_stat = true
        this.count_check = false;
        let element1 = document.getElementById("mat-tab-label-0-"+index_pos) as HTMLElement;
     
        element1.classList.add('is-wrong-count')
  
      }else{
        this.isCorrect = true
        this.result_answer_stat = true
        this.count_check = true;
        
        let element1 = document.getElementById("mat-tab-label-0-"+index_pos) as HTMLElement;
     
        element1.classList.add('is-correct-count')
      }
      
      let ele = document.getElementById("solv") as HTMLDivElement;
      ele.style.display='block'
      if (this.qnStatearr.findIndex(e => e['question_id'] == qsId) != -1) {
        this.qnStatearr.splice(this.qnStatearr.findIndex(e => e['question_id'] == qsId), 1)
      }
      this.qnStatearr.push({'question_id':qsId,'answer_id':id,'answer_status':status})
      console.log(this.qnStatearr)
    }
    

  }

  
  fetchQuesAns(event: MatTabChangeEvent){
    this.tab_index = event.index
    if(this.tab_index + 1 > 0){
        
      let ele = document.getElementById("myName") as HTMLElement;
      ele.removeAttribute('disabled')
    }
    let ele = document.getElementById("solv") as HTMLDivElement;
      
    this.position = this.tab_index + 1
    let element2 = document.getElementById("mat-tab-label-1-"+(this.tab_index)) as HTMLElement;
    let element3=element2.getElementsByTagName('span') as HTMLCollection
    //console.log(event.index)
    
    this.question_id = this.question_arr[this.tab_index]['question_id']
    //console.log(this.question_ans_check_arr[this.tab_index]['answer_arr'])
    this.question_statement = this.question_arr[this.tab_index]['question_statement']
    this.question_ans_arr = this.question_ans_check_arr[this.tab_index]['answer_arr']
    this.practiceService.getPracticeQuestionSolution(this.question_id).subscribe(
      (data) => {
        console.log(data)
        this.solution = data['question_arr_sol'][0]['solution']
      }
    )

    console.log(this.question_ans_check_arr[this.tab_index])
    var given_ans_id
    var given_ans_stat
    
    if(this.question_ans_check_arr[this.tab_index]['given_answer_status'] == 0){

      this.given_ans_id = this.question_ans_check_arr[this.tab_index]['given_answer_id']
      this.given_ans_stat = this.question_ans_check_arr[this.tab_index]['given_answer_status']
      var qus_id = this.question_id
      ele.style.display='block'
    }else if(this.question_ans_check_arr[this.tab_index]['given_answer_status'] == 3){
      ele.style.display='none'
      this.skipped = true
    }else{
      this.qnStatearr.map(function(element, index){
        
        if(element['question_id'] == qus_id){
          if(element['answer_status'] == 0){
          given_ans_id = element['answer_id']
           given_ans_stat = element['answer_status']
          }
        }
      })
      this.given_ans_stat = given_ans_id
      this.given_ans_stat = given_ans_stat
      ele.style.display='block'
    }
    if(element3[0].classList.contains('is-visited')){
      this.skipped = true
      ele.style.display='none'
    }else if(element3[0].classList.contains('is-correct-count') || element3[0].classList.contains('is-wrong-count')){
      this.skipped=false
    }
    
    
    
 
  }
}
