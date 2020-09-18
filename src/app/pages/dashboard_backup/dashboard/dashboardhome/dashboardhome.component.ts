import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DashboardhomeService } from './dashboardhome.service';






@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.scss']
})




export class DashboardhomeComponent implements OnInit {

  testSeriesData: any
  testSeriesLoader: boolean = false
  videoData: any
  loader: boolean = false

  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    animateOut:'slideOutUp',
    navSpeed: 300,
    navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }



  customOptions4: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    animateOut:'slideOutUp',
    navSpeed: 300,
    navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      },
      1040: {
        items: 1
      }

    },
    nav: false
  }

  customOptions5: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    animateOut:'slideOutUp',
    navSpeed: 300,
    navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }






  constructor(private dashboardService: DashboardhomeService) {
    this.dashboardService.getTestSeriesData().subscribe(
      (res)=> {
        console.log(res)
        this.testSeriesData = res
        this.testSeriesLoader = true
      },
      (error) =>{
        console.log(error)
      })

      this.dashboardService.getAllPopularCourses().subscribe(
        (res)=> {  
          this.loader = true;
          console.log(res)      
          this.videoData = res['vdo_data']        
        },
        (error)=>{
          console.log(error)
                 
        })


   }

   


  ngOnInit(): void {
  }

}
