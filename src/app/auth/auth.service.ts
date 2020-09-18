import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { async } from 'rxjs/internal/scheduler/async';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  sent: boolean = false;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })

    
  }

  

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password)    
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
    
}

async sendEmailVerification() {
  return await (await this.afAuth.currentUser).sendEmailVerification()
  
}

async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
}

async phoneNumberVerification(phone_number: string) {
  const appVerifier = this.recaptchaVerifier; 
  return await this.afAuth.signInWithPhoneNumber(phone_number, appVerifier) .then((confirmationResult) => {
    this.sent = true;
    const verification = prompt('Enter verification code');
    if (verification != null) {
      console.log(verification);
      confirmationResult.confirm(verification)
        .then((good) => {
          // all checks out
        })
        .catch((bad) => {
          // code verification was bad.
        });
    } else {
      console.log('No verification code entered');
    }
  })
  .catch((err) => {
    console.log('sms not sent', err);
  });
}



async  loginWithGoogle(){
  return await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  // this.router.navigate(['admin/list']);
}

async logout(){
  await this.afAuth.signOut();
  localStorage.removeItem('user');
  this.router.navigate(['admin/login']);
}

get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}


}
