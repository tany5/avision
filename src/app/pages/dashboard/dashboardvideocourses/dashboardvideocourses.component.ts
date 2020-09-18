import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { DashboardvideocoursesService } from './dashboardvideocourses.service';

@Component({
  selector: 'app-dashboardvideocourses',
  templateUrl: './dashboardvideocourses.component.html',
  styleUrls: ['./dashboardvideocourses.component.scss']
})
export class DashboardvideocoursesComponent implements OnInit {
  videoData:any
  bankingVideoCourse: any
  sscVideoCourse: any
  railwayVideoCourse: any
  teachingVideoCourse: any
  stateVideoCourse: any
  loader: boolean = false
  bankingLoader: boolean = false
  sscLoader: boolean = false
  railwayLoader: boolean = false
  teachingLoader: boolean = false
  stateLoader: boolean = false

  customOptions2: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    animateOut:'slideOutUp',
    navSpeed: 300,
    autoWidth:false,
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
  constructor(private courseService: DashboardvideocoursesService, private route: Router) {
    this.courseService.getAllPopularCourses().subscribe(
      (res)=> {
        this.loader = true;
        console.log(res)
        this.videoData = res['vdo_data']
      },
      (error)=>{
        console.log(error)

      })

      this.courseService.getBankingVideoCourse().subscribe(
        (res)=> {
          console.log(res['vdo_data'])
          this.bankingVideoCourse = res['vdo_data']
          this.bankingLoader = true
        },
        (error)=> {
          console.log(error)
        })

        this.courseService.getSscVideoCourse().subscribe(
          (res)=> {
            console.log(res['vdo_data'])
            this.sscVideoCourse = res['vdo_data']
            this.sscLoader = true
          },
          (error)=> {
            console.log(error)
          })

          this.courseService.getBankingVideoCourse().subscribe(
            (res)=> {
              console.log(res['vdo_data'])
              this.bankingVideoCourse = res['vdo_data']
            },
            (error)=> {
              console.log(error)
            })

          this.courseService.getRailwayVideoCourse().subscribe(
            (res)=> {
              console.log(res['vdo_data'])
              this.railwayVideoCourse = res['vdo_data']
              this.railwayLoader = true
            },
            (error)=> {
              console.log(error)
            })

            this.courseService.getTeachingVideoCourse().subscribe(
              (res)=> {
                console.log(res['vdo_data'])
                this.teachingVideoCourse = res['vdo_data']
                this.teachingLoader = true
              },
              (error)=> {
                console.log(error)
              })

              this.courseService.getStateVideoCourse().subscribe(
                (res)=> {
                  console.log(res['vdo_data'])
                  this.stateVideoCourse = res['vdo_data']
                  this.stateLoader = true
                },
                (error)=> {
                  console.log(error)
                })
   }

  ngOnInit(): void {
  }

  gotoVideoDetailsPage(id) {
    this.route.navigate(['dashboard/dashboardvideodetails', id])
  }

  scroll(event) {
    const elmnt = event.target.id;
    alert(elmnt)
    elmnt.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}

gotoLiveClassComponent(id:any) {
  this.route.navigate(['liveclass-details',id])
 }

}
