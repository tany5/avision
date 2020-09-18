import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModule } from './layouts/user/user.module';
import { ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LiveclassdashboardModule } from './pages/liveclassdashboard/liveclassdashboard.module';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { ExamsectionpanelModule } from './layouts/examsectionpanel/examsectionpanel.module';
import { MessageDialougeComponent } from './pages/message-dialouge/message-dialouge.component';
import { MaterialModule } from './material/material.module';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {AngularFireModule} from '@angular/fire'
import { DatePipe} from '@angular/common'
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { HomepopupComponent } from './pages/homepopup/homepopup.component';
import { PlanpopupComponent } from './pages/planpopup/planpopup.component';
import { environment } from 'src/environments/environment';
import {NgOtpInputModule} from 'ng-otp-input';
import { SchollarComponent } from './pages/schollar/schollar.component';
import { ScholarregisterComponent } from './pages/scholarregister/scholarregister.component';
import { FormArrComponent } from './pages/form-arr/form-arr.component';
import { AtseComponent } from './pages/atse/atse.component';
import { AtseThanksComponent } from './pages/atse-thanks/atse-thanks.component';



@NgModule({
  declarations: [
    AppComponent,
    MessageDialougeComponent,
    HomepopupComponent,
    PlanpopupComponent,
    SchollarComponent,
    ScholarregisterComponent,
    AtseComponent,
    AtseThanksComponent
             
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,    
    UserModule,
    LiveclassdashboardModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    DashboardModule,
    ExamsectionpanelModule,
    MaterialModule,
    NgOtpInputModule,
    
    AngularFireModule.initializeApp(environment.firebase) 
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '740936457923-1h6q1e347r3cpj4nre17g0rkroj1qav0.apps.googleusercontent.com'
          ),
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('277834109825526'),
        },
      ],
    } as SocialAuthServiceConfig,
  },DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [MessageDialougeComponent,HomepopupComponent,PlanpopupComponent,SchollarComponent,ScholarregisterComponent,AtseComponent,AtseThanksComponent]
  
})
export class AppModule {
  
 }
