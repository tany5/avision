import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardsidebar',
  templateUrl: './dashboardsidebar.component.html',
  styleUrls: ['./dashboardsidebar.component.scss']
})
export class DashboardsidebarComponent implements OnInit {
  @Output() toggleSibarForMe1: EventEmitter<any> = new EventEmitter()
  showFiller = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  hideSidebar(){
    this.router.navigate(['dashboard/practiceTest']).then(
      (res) => {
        this.toggleSibarForMe1.emit()
        
      }
    )
    
  }
}
