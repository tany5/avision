import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AskdoubtsService {

  constructor(private webservice: WebserviceService) { }

  getAllSubject() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`get_all_subject`, headers)
  }

  getAllChapter(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`get_all_chapter/${id}`, headers)
  }
  getAllDoubt(prod_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`get_doubt_all/${prod_id}`, headers)
  }
  getfilteredDoubt(sub_id,chap_id,prod_id){
    console.log(sub_id+'-'+chap_id+'-'+prod_id)
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`get_filter_doubts/${sub_id}/${chap_id}/${prod_id}`, headers)
  }

  postDoubt(type,sub_id,chap_id,title,desc,user_id,product_id){
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webservice.post(`insert_doubt_details`,{type,sub_id,chap_id,title,desc,user_id,product_id}, headers)
  }

  getDoubtForComment(doubt_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`comment_doubt_fetch/${doubt_id}`, headers)
  }

  getCommentForDoubt(doubt_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`fetch_commentsById/${doubt_id}`, headers)
  }
  getUserName(user_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webservice.get(`fetch_user_name/${user_id}`, headers)
  }
  postcomment(comment,doubt_id,user_id){
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webservice.post(`insert_comment_details`,{comment,doubt_id,user_id}, headers)
  }
}
