import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/auth.service';
import * as firebase from 'firebase';
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl, Validators } from '@angular/forms';
import { WindowService } from './window.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-schollar',
  templateUrl: './schollar.component.html',
  styleUrls: ['./schollar.component.scss']
})
export class SchollarComponent implements OnInit {

  phone_number: any
  windowRef: any
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  sent: boolean;
  user: any;
  showPhoneNumberDiv: boolean = true
  showOtp: boolean = false
  phoneNumberString: any
  otp: any;
  showSpinner: boolean = false
  hide = true;
  continueEmail: boolean = false
  showRegisterSection: boolean = false
  showUpdateEmail: boolean = false
  showverifyPhone: boolean = false

  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth, private authService: AuthService, private spinner2: NgxSpinnerService, private widowService: WindowService, private dialog: MatDialog, private snackbar: MatSnackBar) {

  }

  ngOnInit(): void {

  }

  googleLogin() {
    var result = this.authService.loginWithGoogle()
    if(result) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));         
          if(this.user.phoneNumber == null) {
            this.showverifyPhone = true
            this.continueEmail = false
            this.showPhoneNumberDiv = false
            this.showOtp = false
            this.showRegisterSection = false
          }
        } else {
          localStorage.setItem('user', null);
        }
      })
    }
    
  }

  onSubmit(formData) {

    
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = formData.value

    this.phoneNumberString = phoneNumberString

    firebase.auth().signInWithPhoneNumber(`+91${phoneNumberString}`, appVerifier)
      .then(result => {
        
        console.log(result)
        this.windowRef = result;
        this.showPhoneNumberDiv = false
        this.showverifyPhone = false
        this.showOtp = true
        

      })
      .catch(error => console.log('error', error));
  };


  verifyLoginCode() {


    this.windowRef
      .confirm(this.otp)
      .then(result => {
        this.user = result.user;
        console.log(result);
        this.widowService.getUserDataByPhone(this.phoneNumberString).subscribe(
          (res) => {
            console.log(res)

            if (res['status'] == 200) {
              localStorage.setItem('currentUser', '1');
              localStorage.setItem('currentUserSession', 'true');
              localStorage.setItem('currentUserId', res['user_information'][0]['user_id']);
              localStorage.setItem('currentUserName', res['user_information'][0]['user_name']);
              localStorage.setItem('currentUserEmail', res['user_information'][0]['user_email']);
              localStorage.setItem('currentUserPhone', res['user_information'][0]['user_phone']);
              localStorage.setItem('userloggedIn', '1');
              this.dialog.closeAll()
            }
            else {
              console.log("No Data")

              this.showUpdateEmail = true
              this.showOtp = false

            }
          })

      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }



  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp)
  }

  showPhoneDiv() {
    this.showPhoneNumberDiv = true
    this.showOtp = false
  }

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  fullName = new FormControl('', [Validators.required]);
  requiredEmail = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }


  }

  login() {

    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    else if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    else {
      console.log(this.email.value)
      console.log(this.password.value)

      this.authService.register(this.email.value, this.password.value)

      this.widowService.login(this.email.value, this.password.value).subscribe(
        (data: any) => {

          console.log("user information...");
          console.log(data);
          if (data.status == 200) {
            localStorage.setItem('currentUser', '1');
            localStorage.setItem('currentUserSession', 'true');
            localStorage.setItem('currentUserId', data['user_id']);
            localStorage.setItem('currentUserName', data['user_information'][0]['user_name']);
            localStorage.setItem('currentUserEmail', data['user_information'][0]['user_email']);
            localStorage.setItem('currentUserPhone', data['user_information'][0]['user_phone']);
            localStorage.setItem('userloggedIn', '1');
            this.dialog.closeAll()

          }

        })
    }//else

  }

  continueWithEmail() {
    this.continueEmail = true
    this.showPhoneNumberDiv = false
    this.showOtp = false
  }

  showRegister() {
    this.continueEmail = false
    this.showPhoneNumberDiv = false
    this.showOtp = false
    this.showRegisterSection = true
  }

  showlogin() {
    this.continueEmail = false
    this.showPhoneNumberDiv = true
    this.showOtp = false
    this.showRegisterSection = false
  }

  register() {



    this.authService.sendEmailVerification()

    if (this.requiredEmail.hasError('required')) {
      return false;

    }

    else if (this.fullName.hasError('required')) {
      return false;
    }

    else {
      console.log(this.requiredEmail.value, this.fullName.value)
      this.widowService.signup(this.requiredEmail.value, this.fullName.value, this.phoneNumberString).subscribe(
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

            this.dialog.closeAll()
          }

        }
      )
    }

  }


  new_register() {
    alert("sad")

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

    else if (this.phone.hasError('required')) {
      this.snackbar.open("Phone is  Required", "close", {
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


    var result = this.authService.sendEmailVerification()

    console.log(result)



      this.widowService.signupWithPassword(this.email.value, this.fullName.value, this.password.value, this.phone.value).subscribe(
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
            this.dialog.closeAll()
          }
          else {
            this.snackbar.open(data['message'], "close", {
              duration: 2000
            })
          }
        })


    }
  }


}
