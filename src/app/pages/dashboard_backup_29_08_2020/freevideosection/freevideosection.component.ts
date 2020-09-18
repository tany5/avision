import { Component, OnInit, Sanitizer, Pipe, PipeTransform  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { WebserviceService } from 'src/app/webservice.service';
import { Location } from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-freevideosection',
  templateUrl: './freevideosection.component.html',
  styleUrls: ['./freevideosection.component.scss']
})

@Pipe({
  name: 'striphtml'
})



export class FreevideosectionComponent implements OnInit {

  transform(value: string): any {
    return value.replace(/<.*?>/g, ''); // replace tags
}


  videoDetails: any
  apiKey = 'AIzaSyBcBm-jRhsBSp8K3qBspaU_w4gNTQN25v8'
  youtubeChannelId = "UC3KcJmp8UC1Nnyc3wTiXGNA"
  apiUrl: any = "https://www.googleapis.com/youtube/v3/videos" 
  apiUrl2: any = `https://www.googleapis.com/youtube/v3/search`
  
  videoId: any
  mainUrl: any
  mainUrl2: any
  getvideoId: boolean = false
  videoUrl: any
  videoDesc: any
  videoTitle: any
  viewCount: any
  likeCount: any
  searchTerm: any = "bank"
  searchVideoLists: any
  mainUrl3: any
  latestVideo: any

  constructor(private http: HttpClient, private route: ActivatedRoute, private webServie: WebserviceService, private location: Location, private  sanitizer: DomSanitizer) {

    this.route.params.subscribe(
      (params: Params) => {
        this.videoId = params['videoId']
        this.searchTerm = params['searchQuery']
        
      })

    this.mainUrl = this.apiUrl + `?id=${this.videoId}&key=${this.apiKey}&part=snippet&part=statistics`

    this.mainUrl2 = this.apiUrl2 + `?part=snippet&channelId=${this.youtubeChannelId}&maxResults=5&order=date&q=${this.searchTerm}&key=${this.apiKey}`

    this.mainUrl3 = this.apiUrl2 + `?part=snippet&channelId=${this.youtubeChannelId}&maxResults=12&order=date&key=${this.apiKey}`
    
   

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})

    //this.videoDetails =  this.http.get(this.apiUrl + `?id=${this.videoId}&key=${this.apiKey}&part=snippet`, {headers})
   this.webServie.api(this.mainUrl,headers).subscribe(
     (res)=> {
       
       this.videoDesc = res['items'][0]['snippet']['localized']['description']
       this.videoTitle = res['items'][0]['snippet']['localized']['title']
       this.viewCount = res['items'][0]['statistics']['viewCount']
       this.likeCount = res['items'][0]['statistics']['likeCount']
       this.getvideoId = true      
       this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoId}?autoplay=0&color=white&loop=1&rel=0&showinfo=0&enablejsapi=1&origin=http://avision.co.in/&widgetid=1`)
      
     })


     
    this.webServie.api(this.mainUrl2,headers).subscribe(
      (res)=> {
        console.log(this.mainUrl2)      
        console.log(this.mainUrl)       
        console.log(res)   
        this.searchVideoLists = res['items']
        
      })


      this.webServie.api(this.mainUrl3,headers).subscribe(
        (res)=> {
          console.log(res['items'])       
          this.latestVideo = res['items']          
        })
    
  }

  ngOnInit(): void {
    
  }

  htmlgeneration(title) {
    //title = title.slice(0, 21);
    title = title.toString();
    return  title.slice(0, 21);
  }

}
