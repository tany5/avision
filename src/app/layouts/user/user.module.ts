import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeService } from 'src/app/pages/home/home.service';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner'
import { TestseriesComponent } from 'src/app/pages/testseries/testseries.component';
import { CoursesComponent } from 'src/app/pages/courses/courses.component';
import { NgxSkeletonLoaderModule  } from 'ngx-skeleton-loader'
import { LiveclassComponent } from 'src/app/pages/liveclass/liveclass.component';
import { LiveclassdetailsComponent } from 'src/app/pages/liveclassdetails/liveclassdetails.component';
import { PassComponent } from 'src/app/pages/pass/pass.component';
import { ReferearnComponent } from 'src/app/pages/referearn/referearn.component';
import { VideocoursedetailsComponent } from 'src/app/pages/videocoursedetails/videocoursedetails.component';
import { TestinnerComponent } from 'src/app/pages/testinner/testinner.component';
import { CourseinfoComponent } from 'src/app/pages/courseinfo/courseinfo.component';
import { CentersComponent } from 'src/app/pages/centers/centers.component';
import { FranchiseComponent } from 'src/app/pages/franchise/franchise.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import { ShowvideoComponent } from 'src/app/pages/showvideo/showvideo.component';
import { EnquiryformComponent } from 'src/app/pages/enquiryform/enquiryform.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MainfreevideosComponent } from 'src/app/pages/mainfreevideos/mainfreevideos.component';
import { MainfreevideosectionComponent } from 'src/app/pages/mainfreevideosection/mainfreevideosection.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {NgOtpInputModule} from 'ng-otp-input';
@NgModule({
  declarations: [
    UserComponent,
    // HomeComponent,
    // AboutComponent,
    // TestseriesComponent,
    // CoursesComponent,
    // LiveclassComponent,
    // LiveclassdetailsComponent,
    // PassComponent,
    // ReferearnComponent,
    // VideocoursedetailsComponent,
    // TestinnerComponent,
    // CourseinfoComponent,
    // CentersComponent,
    // FranchiseComponent,
    // ContactComponent,
    // ShowvideoComponent,
    // EnquiryformComponent,
    // MainfreevideosComponent,
    // MainfreevideosectionComponent
    
           
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CarouselModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule,
    MaterialModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgOtpInputModule

    
     
  ],
  providers: [ HomeService, WebserviceService ]
})
export class UserModule { }
