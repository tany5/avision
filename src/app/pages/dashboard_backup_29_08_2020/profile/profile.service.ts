import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ProfileService {
  constructor(private webService: WebserviceService, private http: HttpClient) { }

  updateDetails(name,dob,category,location,language, user_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post('add_user_inofo', {name,dob,category,location,language, user_id},headers)
  }

  getCourseDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get("courseDetails", headers)
  }

  getSubCategoryName(id:any,user_id) {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`subCategoryNameUpdated/${id}/${user_id}`, headers)

    }

    getUserInfo(id:any) {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`get_user_info/${id}`, headers)

    }

    getUserData(id:any) {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`get_user_all_data/${id}`, headers)

    }

    UpdateUserPhone(id:any, phone) {
      let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
      return this.webService.post(`update_user_phone/`, {id, phone}, headers)
    }

    UpdateProfileImage(data: any, user_id: any) {
      const formData = new FormData()
      formData.append('image', data, data.name);
      formData.append('user_id', user_id);
      let headers = new  HttpHeaders()
      return this.http.post(`http://localhost/avisionService/index.php/api/update_user_img`,formData,{headers})
    }

    updateUserPassword(prev_password, new_password, id) {
      let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
      return this.webService.post(`update_user_password/`, {prev_password, new_password, id}, headers)
    }

    updateExamDetails(course_id, checkBoxArray, id) {
      let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
      return this.webService.post(`update_exam_details/`, {course_id, checkBoxArray, id}, headers)
    }

    getExamCategory(id) {
      let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
      return this.webService.post(`get_exam_details/`, {id}, headers)
    }
    deleteExamDetails(id) {
      let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
      return this.webService.post(`delete_exam_details/`, {id}, headers)
    }
}
