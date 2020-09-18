import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examsectionpanel',
  templateUrl: './examsectionpanel.component.html',
  styleUrls: ['./examsectionpanel.component.scss']
})
export class ExamsectionpanelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

}
