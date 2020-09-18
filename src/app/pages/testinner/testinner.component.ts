import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestinnerService } from './testinner.service';
declare var jQuery: any;
@Component({
  selector: 'app-testinner',
  templateUrl: './testinner.component.html',
  styleUrls: ['./testinner.component.scss']
})
export class TestinnerComponent implements OnInit {
  prodId: any
  fullTest: any = []
  sesctionTest: any = []
  prevTest: any = []
  totalTestCount: any
  fullTestCount: any
  sectionTestCount: any
  prevTestCount: any
  fullTestLoader: boolean = false
  user_id: string;
  test_buy_stat: any;

  constructor(private route: ActivatedRoute, private testInnerService: TestinnerService,private router: Router ) { 

    if(localStorage.getItem('userloggedIn') == "1"){
      this.user_id = localStorage.getItem('currentUserId')
      this.testInnerService.gettestBuyStat(this.user_id).subscribe(
        (res) => {
          if(res['status'] == 200){
            this.test_buy_stat = res['plan_buy_stat']
          }else{
            this.test_buy_stat=0
          }
         
        }
      )
    }else{
      this.test_buy_stat = 0;
    }
   
    this.testInnerService.getProductId(this.route.snapshot.params.prodId).subscribe(
      
      (res) => {
        this.prodId = res['product_id']
        this.testInnerService.getFullTest(this.prodId).subscribe(
          (res)=> { 
            console.log(res)       
            this.fullTest = res
            this.fullTestCount = this.fullTest.length
            this.fullTestLoader =true        
          },
          (error) =>{
            console.log(error)
          })
    
    
          this.testInnerService.getSectionTest(this.prodId).subscribe(
            (res)=> {
             
              this.sesctionTest = res
              this.sectionTestCount = this.sesctionTest.length
            },
            (error) =>{
              console.log(error)
            }) 
    
    
    
            this.testInnerService.getPrevTest(this.prodId).subscribe(
              (res)=> {
                
                this.prevTest = res
                this.prevTestCount = this.prevTest.length
              },
              (error) =>{
                console.log(error)
              })
    
    
    
    
    
    
          this.testInnerService.getTestCount(this.prodId).subscribe(
            (res)=> {
              console.log(res)
              this.totalTestCount = res['total_count']
            }
          )
       
      }
      
    )
    
    


  }

  ngOnInit(): void {

    

    

  }

  goForTest(quiz_id){
    
    if(localStorage.getItem('userloggedIn') != '1'){
      jQuery('#loginModal').modal();
      
      
    }else{
      this.router.navigate([`exam/${quiz_id}`])
    }
  }

  goForLogin(){
    if(localStorage.getItem('userloggedIn') != '1'){
      jQuery('#loginModal').modal()
      jQuery('#test_mod_series').val(1)
    }else{
      this.router.navigate(['dashboard/testseriesinner/',this.prodId])
    }
  }

}
