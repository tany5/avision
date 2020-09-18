import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerData: any
  constructor(private footerServices: FooterService) { 
    this.footerServices.getFooterMenuDetils().subscribe(
      (res)=> {
        
        this.footerData = res
      },
      (error)=> {
        console.log(error)
      })
  }

  ngOnInit(): void {
  }

  

}
