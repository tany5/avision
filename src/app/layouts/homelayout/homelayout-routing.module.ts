import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomelayoutComponent } from './homelayout.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { CentersComponent } from 'src/app/pages/centers/centers.component';
import { ContactComponent } from 'src/app/pages/contact/contact.component';
import { TestseriesComponent } from 'src/app/pages/testseries/testseries.component';
import { CoursesComponent } from 'src/app/pages/courses/courses.component';
import { LiveclassComponent } from 'src/app/pages/liveclass/liveclass.component';
import { LiveclassdetailsComponent } from 'src/app/pages/liveclassdetails/liveclassdetails.component';
import { PassComponent } from 'src/app/pages/pass/pass.component';
import { ReferearnComponent } from 'src/app/pages/referearn/referearn.component';
import { CourseinfoComponent } from 'src/app/pages/courseinfo/courseinfo.component';
import { VideocoursedetailsComponent } from 'src/app/pages/videocoursedetails/videocoursedetails.component';
import { TestinnerComponent } from 'src/app/pages/testinner/testinner.component';
import { EnquiryformComponent } from 'src/app/pages/enquiryform/enquiryform.component';
import { MainfreevideosComponent } from 'src/app/pages/mainfreevideos/mainfreevideos.component';
import { FreevideosectionComponent } from 'src/app/pages/dashboard/freevideosection/freevideosection.component';
import { FreequizfrontComponent } from 'src/app/pages/freequizfront/freequizfront.component';

const routes: Routes = [
  { path: '', 
  component: HomelayoutComponent,
  children: [{
    path: '',
    component:HomeComponent
  },
  {
    path:"about",
    component:AboutComponent

  },
  {
    path:"centers",
    component: CentersComponent

  },
  {
    path:"contact",
    component: ContactComponent

  },
  
   {
     path: "testseries",
     component: TestseriesComponent

  },
  {
    path: 'courses',
    component: CoursesComponent
    
  },
   {
     path: 'liveclass',
     component: LiveclassComponent

  },
  {
    path: "liveclass-details/:prodId",
    component: LiveclassdetailsComponent

  },
  {
    path: "pass",
    component: PassComponent
  },
  {
    path: "referearn",
    component: ReferearnComponent

  },
  {
    path: "courseinfo/:slug",
    component: CourseinfoComponent

  },
  {
    path: "video-details/:prodId",
    component: VideocoursedetailsComponent

  },
  {
    path: 'testinner/:prodId',
    component: TestinnerComponent

  },
  {
    path: 'enquiry-form',
    component: EnquiryformComponent
  },
  {
    path: 'freeliveclass',
    component: MainfreevideosComponent
  },
  {
    path: 'freeliveclassvideo/:videoId/:searchQuery',
    component: FreevideosectionComponent
  },
  {
    path: 'freequiz',
    component: FreequizfrontComponent
  }
  
] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomelayoutRoutingModule { }
