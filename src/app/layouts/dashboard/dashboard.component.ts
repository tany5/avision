import { Component, OnInit, HostListener, ViewChild, ElementRef  } from '@angular/core';
import { sideNavAnimation, sideNavContainerAnimation } from 'src/app/shared/studentdashboard/dashboardsidebar/sidenav.animations';
import { Router } from '@angular/router';
import { $ } from 'protractor';
declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [ sideNavAnimation, sideNavContainerAnimation ]
})
export class DashboardComponent implements OnInit {
  sideBarOpen = true
  isOpen = true;
  
  constructor(private router: Router) {    
    
    if(localStorage.getItem('currentUserId')== null || localStorage.getItem('currentUserId') == '') {
      this.router.navigate(['/'])
    }
   }

  ngOnInit(): void {
    this.canActivate()
  }

  sideBarToggle(e) {
    
    this.isOpen = !this.isOpen
    jQuery('.small_logo').addClass('logo')
      
  }

  sideBarToggle1(e) {
    
    this.isOpen = !this.isOpen
    jQuery('.logo').toggleClass('small_logo'); 
   
  }
   @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < 1037) {
          this.isOpen = false
        }
        else {
          this.isOpen = true
        }
    }

    logout() {
      localStorage.clear();
      this.router.navigate(['/'])
    }


    canActivate() {

      if (window.innerWidth < 1037) {
        this.isOpen = false
        
      }  
     
    }

}
