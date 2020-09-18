import { Component, OnInit } from '@angular/core';
import { DashboardtestseriesService } from './dashboardtestseries.service';
import{ OwlOptions } from 'ngx-owl-carousel-o'
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboardtestseries',
  templateUrl: './dashboardtestseries.component.html',
  styleUrls: ['./dashboardtestseries.component.scss']
})
export class DashboardtestseriesComponent implements OnInit {
  testSeriesData: any
  timonialDetails: any
  courseDetails: any
  getTestSeriesSubData: any
  courses_id: any
  testSeriesLoader: boolean = false
  courseLoader: boolean = false
  subCourseLoader: boolean = false
  testimonialLoader: boolean = false


  customOptions3: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    animateOut:'slideOutUp',
    navSpeed: 600,
    autoWidth:false,
    navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: true
  }
  constructor(private tesSeriesServices: DashboardtestseriesService, private router: Router) {
    this.tesSeriesServices.getTestSeriesData().subscribe(
      (res)=> {
        this.testSeriesData = res
        this.testSeriesLoader = true
      },
      (error) =>{
        console.log(error)
      })


      this.tesSeriesServices.gettestimonialDetails().subscribe(
        (res)=> {

          this.timonialDetails = res
          this.testimonialLoader = true
        },
        (error) => {
          console.log(error)
        })

        this.tesSeriesServices.courseDetails().subscribe(
        (res)=> {

          this.courseDetails = res
          this.courseLoader = true
          this.tesSeriesServices.getTestSeriesSubData(res[0]['courses_id']).subscribe(
            (res)=> {
              this.getTestSeriesSubData = res
              this.subCourseLoader = true
            },
            (error)=> {

            })
        },
        (error) => {
          console.log(error)
        })
  }

  ngOnInit(): void {
  }

  getSubCourse(event) {
    this.courses_id = event.target.id

    this.tesSeriesServices.getTestSeriesSubData(this.courses_id).subscribe(
      (res)=> {
        this.getTestSeriesSubData = res
        
      },
      (error)=> {
        console.log(error)
      }
    )}



    testInner(id)
  {
    this.router.navigate(['dashboard/testseriesinner/',id])
  }

  createRange(number){ 

    var items = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
   return items;
  }

}
