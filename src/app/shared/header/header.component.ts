import { Component, OnInit,PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators, NgForm  } from '@angular/forms';
import * as $ from 'jquery'
import { HeaderService } from './header.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
//import  * as custom from '../../../assets/js/my.js'
import { isPlatformBrowser } from '@angular/common';
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hide = true;
  reg_form: FormGroup;
  login_form: FormGroup;
  submitted= false;
  registered = false;
  unregistered = false;
  page_slug:any
  product_id:any
  unlogin = false;
  login = false;
  menuPODetails: any;
  menuSODetails: any;
  menuClerkDetails: any;
  menuRrbDetails: any;
  menuSscDetails: any;
  menuRailwaysDetails: any;
  menuInsuranceDetail: any;
  menuTetDetails: any;
  menuDefenceDetails: any;
  menuWbDetails: any;
  menuFciDetails: any;
  menuRRb:any
  bankOther: any
  //email = new FormControl('', [Validators.required, Validators.email]);

  /* getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  } */

  constructor(private formbuilder: FormBuilder,private headerService: HeaderService,private route: ActivatedRoute,private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { 
    
    this.reg_form = this.formbuilder.group({
      user_name: ['',Validators.required],
      user_email: ['',[Validators.required,Validators.minLength(1), Validators.email]],
      user_phone: ['',[Validators.required]],
      user_password: ['',[Validators.required]],
      confirmPassword: ['',Validators.required]
  
      
      },{
        validator: this.MustMatch('user_password','confirmPassword')
      });

      this.login_form = this.formbuilder.group({
        login_email: ['',Validators.required],
        login_password: ['',Validators.required]
      })

      this.headerService.getbankPOData().subscribe(

        (res) => {
          console.log(res);
          this.menuPODetails = res;
          console.log(this.menuPODetails);
        }
      );
      this.headerService.getbankSOData().subscribe(

        (res) => {
          this.menuSODetails = res;
        }
      );
      this.headerService.getbankSscData().subscribe(
        (res) => {
          this.menuSscDetails = res;
        }
      );

      this.headerService.getbankRrbData().subscribe(

        (res) => {
          this.menuRrbDetails = res;
        }
      );
      this.headerService.getbankRailwaysData().subscribe(
        (res) => {
          this.menuRailwaysDetails = res;
        }
      );
      this.headerService.getbankInsurancesData().subscribe(
        (res) => {
          this.menuInsuranceDetail = res;
        }
      );
      this.headerService.getbankClerkData().subscribe(

        (res) => {
          this.menuClerkDetails = res;
        }
      );
      this.headerService.getbankFciData().subscribe(
        (res) => {

          this.menuFciDetails = res;
        }
      );
      this.headerService.getbankTetData().subscribe(
        (res) => {
          this.menuTetDetails = res;
        }
      );
      this.headerService.getbankDefenceData().subscribe(

        (res) => {
          this.menuDefenceDetails = res;
        }
      );
      this.headerService.getbankWbData().subscribe(
        (res) => {
          this.menuWbDetails = res;
        }
      );
      this.headerService.getBankrrb().subscribe(
        (res) => {
          console.log("rrb...")
          console.log(res);
          this.menuRRb = res;
        } 
      )
      this.headerService.getBankothers().subscribe(
        (res) => {
          console.log("bvank other..")
          console.log(res);
          this.bankOther = res;
        }
      )
   }

  ngOnInit(): void {
    
    this.loadScript("assets/js/my.js");
    //alert(this.product_id)
    
  }

  //custom validators for match password and confirm password 
  MustMatch(controlName: string, matchingControlName: string){

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
 // convenience getter for easy access to form fields
 get f() { return this.reg_form.controls; }
 get f1() { return this.login_form.controls; }

 onRegSubmit(regForm){

    
    this.submitted = true;
    // stop here if form is invalid
    if (this.reg_form.invalid) {
      return;
    }

    this.headerService.signup(regForm.value.user_name,regForm.value.user_email,regForm.value.user_phone,regForm.value.user_password).subscribe(

      (data:any) => {
        console.log(data);
        if(data.status == 200){
          this.registered = true;
          if (isPlatformBrowser(this.platformId)) {
            // Your client side code
            localStorage.setItem('currentUser', 'true');
            localStorage.setItem('currentUserSession','true');
            localStorage.setItem('currentUserId',data.user_id);
            localStorage.setItem('currentUserName',data.user_information.user_name);
            localStorage.setItem('currentUserEmail',data.user_information.user_email);
            localStorage.setItem('currentUserEmail',data.user_information.user_phone);
            localStorage.setItem('userloggedIn','1');

            if(this.page_slug == 'liveclass-details'){
              jQuery("#loginModal").modal('hide');
                  this.router.navigateByUrl('liveclass-dashboard/'+this.product_id);
            }else{
              
                jQuery("#loginModal").modal('hide');
              
              
            }
         }
          
        }else{
          this.unregistered = true;
          if (isPlatformBrowser(this.platformId)) {
            setInterval(() => {
              jQuery("#loginModal").modal('hide');
            }, 2000);
          }
          
        }
      }
    )

 }

 onloginSubmit(login_form){
  this.submitted = true;
  if (this.login_form.invalid) {
    return;
  }
    this.headerService.login(login_form.value.login_email,login_form.value.login_password).subscribe(

      (data:any) => {
        console.log("user information...");
          console.log(data);
          if(data.status == 200){
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('currentUser', '1');
            localStorage.setItem('currentUserSession','true');
            localStorage.setItem('currentUserId',data['user_id']);
            localStorage.setItem('currentUserName',data['user_information'][0]['user_name']);
            localStorage.setItem('currentUserEmail',data['user_information'][0]['user_email']);
            localStorage.setItem('currentUserEmail',data['user_information'][0]['user_phone']);
            localStorage.setItem('userloggedIn','1');


            this.login = true;
            

              jQuery("#loginModal").modal('hide');
              if(jQuery("#video_course").val() == 1){
                var product_id = jQuery("#product_id").val();
                this.headerService.getbuystat(localStorage.getItem('currentUserId'),product_id).subscribe(
                  (resp) => {
                    if(resp['buy_stat'] == 1){
                      alert("You have already bought this product.Please enjoy your learning video course");
                      location.reload();
                    }else{
                      location.href='https://avision.co.in/adminpanel/index.php/api/pay_now/'+localStorage.getItem('currentUserId')+'/'+jQuery("#product_id").val();
                    }
                  } 
                )
                // this.headerService.pay_now(localStorage.getItem('currentUserId'),jQuery("#product_id").val()).subscribe(
                //   (data) => {
                //     console.log(data);

                //   }

                // );
                
              }else if(jQuery("#video_course").val() == 2){
                location.reload();
              }else if(jQuery("#live_class").val() == 1){
                var product_id = jQuery("#product_id").val();
                this.router.navigate(['liveclass-dashboard',product_id])
              } else if(jQuery('#free_videos').val() == 1){
                this.router.navigate(['dashboard/videos'])
              }else if(jQuery('#test_mod_series').val()==1){
                this.router.navigate(['dashboard/testseries'])
              }else if(jQuery('#free_quiz').val()==1){
                location.reload()
              }else if(jQuery('#practice').val()==1){
                this.router.navigate(['dashboard/practiceTest'])
              }else{
                this.router.navigate(['dashboard'])
              }
            }
            
                  
              
            

          }else{

            
              this.unlogin = true;
              //jQuery("#loginModal").modal('hide');
             
            

          }
      }
    );
 }

 public loadScript(url) {
  let node = document.createElement('script');
  node.src = url;
  node.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(node);
}

freeliveclass(){
  if(localStorage.getItem('userloggedIn') == '1'){
    this.router.navigate(['dashboard/videos'])
  }else{
    jQuery('#free_videos').val(1);
    jQuery("#loginModal").modal('show');
  }
}

gotofreequiz(){
  this.router.navigate(['freequiz'])
  // if(localStorage.getItem('userloggedIn') == '1'){
  //   this.router.navigate(['freequiz'])
  // }else{
  //   jQuery('#free_quiz').val(1);
  //   jQuery("#loginModal").modal('show');
  // }
}

practice(){

  if(localStorage.getItem('userloggedIn') == '1'){
    this.router.navigate(['dashboard/practiceTest'])
  }else{
    jQuery('#practice').val(1);
    jQuery("#loginModal").modal('show');
  }  
}
  

}
