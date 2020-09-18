import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScholarregisterService } from './scholarregister.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scholarregister',
  templateUrl: './scholarregister.component.html',
  styleUrls: ['./scholarregister.component.scss']
})
export class ScholarregisterComponent implements OnInit {

  phone_number: any
  windowRef: any
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  sent: boolean;
  user: any;
  phoneNumberString: any;
  showPhoneNumberDiv: boolean = true;
  showOtp: boolean = false;
  otp: any;
  button_text = "Generate OTP"
  showUpdateEmail: boolean = false
  hide = true;

  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth,  private spinner2: NgxSpinnerService, private snackbar: MatSnackBar, private scholrregisterService: ScholarregisterService,private router:Router) { }

  ngOnInit(): void {
    
  }


  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  fullName = new FormControl('', [Validators.required]);
  requiredEmail = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required]);


  onSubmit(formData) {
    
    this.button_text = "Continue"
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container1');     
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = formData.value
    this.phoneNumberString = phoneNumberString
    

    firebase.auth().signInWithPhoneNumber(`+91${phoneNumberString}`, appVerifier)
      .then(result => {
        this.showPhoneNumberDiv= false
        this.showOtp = true 
        this.windowRef = result;     
      })
      .catch(error => console.log('error', error));
  }


  verifyLoginCode() {


    this.windowRef
      .confirm(this.otp)
      .then(result => {
        this.user = result.user;
        this.showOtp = false
        this.showUpdateEmail = true
        console.log(result);        

      })
      .catch(
        error => 
        this.snackbar.open("OTP is not valid", "close", {
          duration: 2000
        })
      );
  }


  


  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp)
  }

  new_register() {
    

    if (this.fullName.hasError('required')) {

      this.snackbar.open("Name is  Required", "close", {
        duration: 2000
      })
      return false;
    }

    else if (this.email.hasError('required')) {
      this.snackbar.open("Email is  Required", "close", {
        duration: 2000
      })
      return false;
    }

   

    else if (this.password.hasError('required')) {
      this.snackbar.open("Password is  Required", "close", {
        duration: 2000
      })
      return false;
    }

    else {
      console.log(this.fullName, this.email, this.password, this.phone)

     

      firebase.auth()
    .createUserWithEmailAndPassword(this.email.value, this.password.value)
    .then(function(userCredential) {
        userCredential.user.updateEmail(this.email.value)
    })
    
      this.scholrregisterService.signupWithPassword(this.email.value, this.fullName.value, this.password.value, this.phoneNumberString).subscribe(
        (data) => {
          console.log(data)
          if (data['status'] == 200) {
            localStorage.setItem('currentUser', '1');
            localStorage.setItem('currentUserSession', 'true');
            localStorage.setItem('currentUserId', data['user_information'][0]['user_id']);
            localStorage.setItem('currentUserName', data['user_information'][0]['user_name']);
            localStorage.setItem('currentUserEmail', data['user_information'][0]['user_email']);
            localStorage.setItem('currentUserPhone', data['user_information'][0]['user_phone']);
            localStorage.setItem('userloggedIn', '1');
            localStorage.setItem('userloggedInSchollarship', '1');
            this.router.navigate(['/testseries'])
            
          }
          else {
           let snackbarRef = this.snackbar.open(data['message'], "close", {
              duration: 2000
            })

            snackbarRef.afterDismissed().subscribe(
              (res)=> {
                this.router.navigate(['/testseries'])
              }
            )

          }
        })


    }
  }

}
