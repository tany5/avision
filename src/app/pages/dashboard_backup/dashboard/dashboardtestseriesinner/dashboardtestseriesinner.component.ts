import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardtestseriesinnerService } from './dashboardtestseriesinner.service';

@Component({
  selector: 'app-dashboardtestseriesinner',
  templateUrl: './dashboardtestseriesinner.component.html',
  styleUrls: ['./dashboardtestseriesinner.component.scss']
})
export class DashboardtestseriesinnerComponent implements OnInit {
  prodId: any
  fullTest: any = []
  sesctionTest: any = []
  prevTest: any = []
  totalTestCount: any
  fullTestCount: any
  sectionTestCount: any
  prevTestCount: any
  fullTestLoader: boolean = false
  buyStatus: any
  constructor(private testInnerService: DashboardtestseriesinnerService, private route: ActivatedRoute) { 
    this.prodId = this.route.snapshot.params.prodId

    this.testInnerService.getFullTest(this.prodId).subscribe(
      (res)=> {  
        console.log("full_test_arr",res)      
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

      this.testInnerService.getBuyStatus(this.prodId, localStorage.getItem("currentUserId")).subscribe(
        (res)=> {
          console.log(res)
          this.buyStatus = res['buy_status']
        },
        (error)=> {
          console.log(error)
        })
  }

  ngOnInit(): void {
  }

}
