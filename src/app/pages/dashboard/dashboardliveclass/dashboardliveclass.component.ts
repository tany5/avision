import { Component, OnInit } from '@angular/core';
import{ OwlOptions } from 'ngx-owl-carousel-o'
import { Router } from '@angular/router';
import { DashboardliveclassService } from './dashboardliveclass.service';

@Component({
  selector: 'app-dashboardliveclass',
  templateUrl: './dashboardliveclass.component.html',
  styleUrls: ['./dashboardliveclass.component.scss']
})
export class DashboardliveclassComponent implements OnInit {

  liveClassData: any
  timonialDetails: any
  liveCLassLoader:boolean = false
  searchText:string
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

  constructor(private liveClassService: DashboardliveclassService, private router: Router) {

    this.liveClassService.getLiveClassData().subscribe(
      (res)=> {
        console.log(res)
        this.liveClassData = res['live_cls_data']
        this.liveCLassLoader = true
      },
      (error)=> {
        console.log(error)
      })


      this.liveClassService.gettestimonialDetails().subscribe(
        (res)=> {
          this.testimonialLoader = true
          this.timonialDetails = res
        },
        (error) => {
          console.log(error)
        })
  }

  ngOnInit(): void {
  }

  createRange(number){ 

    var items = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
   return items;
  }

  gotoLiveClassComponent(id:any) {
    console.log(id)
    this.router.navigate(['dashboard/dashboardliveclassdetails',id])
   }

}
