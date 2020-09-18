import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-onlinepanel',
  templateUrl: './onlinepanel.component.html',
  styleUrls: ['./onlinepanel.component.scss']
})
export class OnlinepanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openRightBar(){
    $('.cus-right-liveclass-panel').toggleClass('slideright');
			$('.cus-middle-liveclass-panel').toggleClass('slideright-middle');
  }
  openLeftBar(){
    $('.cus-left-liveclass-panel').toggleClass('slideleft');
			$('.cus-middle-liveclass-panel').toggleClass('slideleft-middle');
  }
  closeSearch(){
    $('.liveclass-search-demo').css('display', 'block');
			$('#main-liveclass-sear').css('display', 'none');
			$('#main-liveclass-sear input').blur();
  }
  openSeacrh(){
    $('.liveclass-search-demo').css('display', 'none');
			$('#main-liveclass-sear').css('display', 'table');
			$('#main-liveclass-sear input').focus();
  }

}
