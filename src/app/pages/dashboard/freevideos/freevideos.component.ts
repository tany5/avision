import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-freevideos',
  templateUrl: './freevideos.component.html',
  styleUrls: ['./freevideos.component.scss']
})
export class FreevideosComponent implements OnInit {

  href: any
  // apiKey = 'AIzaSyBcBm-jRhsBSp8K3qBspaU_w4gNTQN25v8'
  apiKey = 'AIzaSyDliQ0ec_c0RY5KwubAvMcn2hrXovuWcLo'
  youtubeChannelId = "UC3KcJmp8UC1Nnyc3wTiXGNA"
  img = "https://estore.avision24x7.com/video_image/1593774995143.jpeg" 
  apiUrl:any = "https://www.googleapis.com/youtube/v3/search"
  apiUrl2: any = `https://www.googleapis.com/youtube/v3/search`
  mainUrl: any
  mainUrl3: any
  searchQuery:string ="Bank"
  searchVideoLists: any
  latestVideo: any
  
  constructor(private router: Router, private location: Location,private route:ActivatedRoute, private webServie: WebserviceService) { 

    this.mainUrl = this.apiUrl + `?part=snippet&channelId=${this.youtubeChannelId}&maxResults=50&order=date&q=${this.searchQuery}&key=${this.apiKey}&part=snippet`

    this.mainUrl3 = this.apiUrl2 + `?part=snippet&channelId=${this.youtubeChannelId}&maxResults=12&order=date&key=${this.apiKey}`


    console.log(this.mainUrl)

    
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    this.webServie.api(this.mainUrl,headers).subscribe(
      (res)=> {
        console.log(res['items'])       
        this.searchVideoLists = res['items']
        console.log(this.searchVideoLists[0].snippet['liveBroadcastContent'])
      })

      this.webServie.api(this.mainUrl3,headers).subscribe(
        (res)=> {
          console.log(res['items'])       
          this.latestVideo = res['items']          
        })
  }

  ngOnInit(): void {

    const node = document.createElement('script'); 
    node.src = "https://apis.google.com/js/platform.js"; 
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
   
  }

  videoDetails(videoId, searchQuery) { 
   
    this.router.navigate([`dashboard/videosdetails/${videoId}/${this.searchQuery}`])   
  }

  searhYoutube(searchTerm) {
    this.searchQuery = searchTerm
    this.mainUrl = this.apiUrl + `?part=snippet&channelId=${this.youtubeChannelId}&maxResults=50&order=date&q=${searchTerm}&key=${this.apiKey}&part=snippet`

    
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    this.webServie.api(this.mainUrl,headers).subscribe(
      (res)=> {
       
        this.searchVideoLists = res['items']
        console.log(this.searchVideoLists)
      })
  }

}
