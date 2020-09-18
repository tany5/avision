import { Component, OnInit } from '@angular/core';
import { DashboardpassService } from './dashboardpass.service'

@Component({
  selector: 'app-dashboardpass',
  templateUrl: './dashboardpass.component.html',
  styleUrls: ['./dashboardpass.component.scss']
})
export class DashboardpassComponent implements OnInit {
  passData: any
  passLoader: boolean =false
  courseDetails: any
  subCategoryAllData: any
  id: any
  subCategoryName: any
  constructor(private passServices: DashboardpassService) { 
    this.passServices.getPassData().subscribe(
      (res)=> {
        console.log(res)       
        this.passData = res
        this.passLoader = true
        
      },
     (error)=> {
      console.log(error)
     })


     this.passServices.getCourseDetails().subscribe(
       (res)=> {
        
        this.courseDetails = res
        this.passServices.getSubCategoryAllData().subscribe(
          (res2)=> {
            console.log(res2)
            
            this.subCategoryAllData = res2
          },
          (error)=>{
            console.log(error)
          }
        )
       },
       (error)=> {
         console.log(error)
       }
     )
  }

  ngOnInit(): void {
  }

  getSubCategory(event) {
    this.id = event.target.id
   

    this.passServices.getSubCategoryName(this.id).subscribe(
      (res)=> {
       
        this.subCategoryAllData = []
        this.subCategoryName = res
      },
      (error)=> {
        console.log(error)
    })
  }

  getAllCourseData() {
    this.passServices.getSubCategoryAllData().subscribe(
      (res)=> {
        this.subCategoryName = []
        this.subCategoryAllData = res
      },
      (error)=> {
        console.log(error)
      })

  }

}
