import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomelayoutRoutingModule } from './homelayout-routing.module';
import { HomelayoutComponent } from './homelayout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { NgOtpInputModule } from 'ng-otp-input';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { TestseriesComponent } from 'src/app/pages/testseries/testseries.component';
import { CoursesComponent } from 'src/app/pages/courses/courses.component';
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
import { MainfreevideosComponent } from 'src/app/pages/mainfreevideos/mainfreevideos.component';
import { MainfreevideosectionComponent } from 'src/app/pages/mainfreevideosection/mainfreevideosection.component';
import { FreequizfrontComponent } from 'src/app/pages/freequizfront/freequizfront.component';
import { FormArrComponent } from 'src/app/pages/form-arr/form-arr.component';


@NgModule({
  declarations: [
    HomelayoutComponent,
    HomeComponent,
    AboutComponent,
    TestseriesComponent,
    CoursesComponent,
    LiveclassComponent,
    LiveclassdetailsComponent,
    PassComponent,
    ReferearnComponent,
    VideocoursedetailsComponent,
    TestinnerComponent,
    CourseinfoComponent,
    CentersComponent,
    FranchiseComponent,
    ContactComponent,
    ShowvideoComponent,
    EnquiryformComponent,
    MainfreevideosComponent,
    MainfreevideosectionComponent,
    FreequizfrontComponent,
    FormArrComponent   
  ],
  imports: [
    CommonModule,
    HomelayoutRoutingModule,
    SharedModule,
    RouterModule,
    CarouselModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule,
    MaterialModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(environment.firebase),    
    NgOtpInputModule
  ]
})
export class HomelayoutModule { }
