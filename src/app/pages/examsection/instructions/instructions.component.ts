import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {
  prodId: any
  username:any
  constructor(private location: Location, private route: ActivatedRoute, private router: Router) { 
    this.username = localStorage.getItem('currentUserName')
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']        
      })
  }

  ngOnInit(): void {
  }

  backClicked() {
    this.location.back();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

}
