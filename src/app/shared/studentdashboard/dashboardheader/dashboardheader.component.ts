import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { sideNavAnimation, sideNavContainerAnimation } from 'src/app/shared/studentdashboard/dashboardsidebar/sidenav.animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboardheader',
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.scss'],
  animations: [ sideNavAnimation, sideNavContainerAnimation ]
})
export class DashboardheaderComponent implements OnInit, AfterViewInit {
  @Output() toggleSibarForMe: EventEmitter<any> = new EventEmitter()
  @ViewChild ('logo') namebutton: ElementRef;
  isOpen = true;
  userName: any
  constructor(private router: Router) {
    
    if(localStorage.getItem('currentUserId')==null || localStorage.getItem('currentUserId') == '') {
      this.router.navigate(['/'])
    }
    this.userName = localStorage.getItem('currentUserName')
    
  }
  ngAfterViewInit(): void {
    if (window.innerWidth < 1037) {
      this.isOpen = false
      this.namebutton.nativeElement.classList.add('small_logo')
      console.log(this.namebutton.nativeElement)
    }
  }

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSibarForMe.emit()
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  toggle() {
   
    this.isOpen = !this.isOpen;
  }


  @HostListener('window:resize', ['$event'])
   onResize(event) {
       if (event.target.innerWidth < 1037) {
         this.isOpen = false
         this.namebutton.nativeElement.classList.add('small_logo')
       }
       else {
        this.isOpen = true
        this.namebutton.nativeElement.classList.remove('small_logo')
       }
   }
   
  //  canActivate() {
    
  //   if (window.innerWidth < 768) {
  //     this.isOpen = false
  //     this.namebutton.nativeElement.classList.add('small_logo')
  //   }

   
  // }
   


}
