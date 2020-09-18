import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './layouts/user/user.component';
import { AboutComponent } from './pages/about/about.component';
import { TestseriesComponent } from './pages/testseries/testseries.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LiveclassComponent } from './pages/liveclass/liveclass.component';
import { LiveclassdetailsComponent } from './pages/liveclassdetails/liveclassdetails.component';
import { PassComponent } from './pages/pass/pass.component';
import { ReferearnComponent } from './pages/referearn/referearn.component';
import { VideocoursedetailsComponent } from './pages/videocoursedetails/videocoursedetails.component';
import { LiveclassdashboardComponent } from './pages/liveclassdashboard/liveclassdashboard.component';
import { LiveclasspreviewComponent } from './pages/liveclassdashboard/liveclasspreview/liveclasspreview.component';
import { StudyplanComponent } from './pages/liveclassdashboard/studyplan/studyplan.component';
import { CoursecurriculumComponent } from './pages/liveclassdashboard/coursecurriculum/coursecurriculum.component';
import { AskdoubtsComponent } from './pages/liveclassdashboard/askdoubts/askdoubts.component';
import { MocktestComponent } from './pages/liveclassdashboard/mocktest/mocktest.component';
import { TestinnerComponent } from './pages/testinner/testinner.component';
import { CourseinfoComponent } from './pages/courseinfo/courseinfo.component';
import { CentersComponent } from './pages/centers/centers.component';
import { FranchiseComponent } from './pages/franchise/franchise.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ShowvideoComponent } from './pages/showvideo/showvideo.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { DashboardhomeComponent } from './pages/dashboard/dashboardhome/dashboardhome.component';
import { DashboardtestseriesComponent } from './pages/dashboard/dashboardtestseries/dashboardtestseries.component';
import { DashboardtestseriesinnerComponent } from './pages/dashboard/dashboardtestseriesinner/dashboardtestseriesinner.component';
import { DashboardvideocoursesComponent } from './pages/dashboard/dashboardvideocourses/dashboardvideocourses.component';
import { DashboardvideodetailsComponent } from './pages/dashboard/dashboardvideodetails/dashboardvideodetails.component';
import { DashboardliveclassComponent } from './pages/dashboard/dashboardliveclass/dashboardliveclass.component';
import { DashboardpassComponent } from './pages/dashboard/dashboardpass/dashboardpass.component';
import { DashboardreferearnComponent } from './pages/dashboard/dashboardreferearn/dashboardreferearn.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { OrderComponent } from './pages/dashboard/order/order.component';
import { ExamsectionpanelComponent } from './layouts/examsectionpanel/examsectionpanel.component';
import { InstructionsComponent } from './pages/examsection/instructions/instructions.component';
import { ExamformatComponent } from './pages/examsection/examformat/examformat.component';
import { ExampanelComponent } from './pages/examsection/exampanel/exampanel.component';
import { AnalysisComponent } from './pages/examsection/analysis/analysis.component';
import { DashboardstudyplanComponent } from './pages/dashboard/dashboardstudyplan/dashboardstudyplan.component';
import { DashboardpracticeComponent } from './pages/dashboard/dashboardpractice/dashboardpractice.component';
import { SolutionComponent } from './pages/examsection/solution/solution.component';
import { FreevideosComponent } from './pages/dashboard/freevideos/freevideos.component';
import { FreevideosectionComponent } from './pages/dashboard/freevideosection/freevideosection.component';
import { OnlinepanelComponent } from './pages/liveclassdashboard/onlinepanel/onlinepanel.component';
import { EnquiryformComponent } from './pages/enquiryform/enquiryform.component';
import { ResumeComponent } from './pages/examsection/resume/resume.component';
import { DashboardliveclassdetailsComponent } from './pages/dashboard/dashboardliveclassdetails/dashboardliveclassdetails.component';
import { PracticetestComponent } from './pages/dashboard/practicetest/practicetest.component';
import { MainfreevideosComponent } from './pages/mainfreevideos/mainfreevideos.component';
import { FreequizComponent } from './pages/dashboard/freequiz/freequiz.component';
import { FreequizpanelComponent } from './pages/dashboard/freequizpanel/freequizpanel.component';
import { FreequizsolutionComponent } from './pages/dashboard/freequizsolution/freequizsolution.component';
import { PreviousyearComponent } from './pages/dashboard/previousyear/previousyear.component';
import { PreviousyearexampanelComponent } from './pages/dashboard/previousyearexampanel/previousyearexampanel.component';
import { FormArrComponent } from './pages/form-arr/form-arr.component';
import { AtseAnalyticsComponent } from './pages/examsection/atse-analytics/atse-analytics.component';
const routes: Routes = [  
  
    {
      path:"franchise/:slug",
      component: FranchiseComponent

    },
    {
      path: "show-video/:vdoId/:prodId",
      component: ShowvideoComponent
    },
    {
      path: "formArr",
      component: FormArrComponent
    },
 
  {
    path: 'liveclass-dashboard/:prodId',
    component: LiveclassdashboardComponent,
    children: [
      {
         path: 'preview',
         component: LiveclasspreviewComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'preview'
      }, 
      {
        path: "study-plan",
        component: StudyplanComponent
      },
      {
        path: "course-curriculum",
        component: CoursecurriculumComponent
      },
      {
        path: "ask-doubts",
        component: AskdoubtsComponent
      },
      {
        path: "mock-tests",
        component: MocktestComponent
      }
    ]
  },
  {
    path: 'online-panel',
    component: OnlinepanelComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path:'',
        component: DashboardhomeComponent,
      },
    {
      path: 'testseries',
      component: DashboardtestseriesComponent
    },
    {
       path: 'testseriesinner/:prodId',
       component: DashboardtestseriesinnerComponent
    },
    {
      path: 'dashboardvideocourses',
      component:DashboardvideocoursesComponent
    },
    {
      path: 'dashboardvideodetails/:prodId',
      component: DashboardvideodetailsComponent
    },
    {
      path: 'dashboardliveclass',
      component: DashboardliveclassComponent
  },
  {
    path: 'dashboardliveclassdetails/:prodId',
    component: DashboardliveclassdetailsComponent
  },
  {
    path: "dashboardpass",
    component: DashboardpassComponent
  },
  {
    path: "dashboardreferearn",
    component: DashboardreferearnComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'practiceTest',
    component: PracticetestComponent
  }
  ,
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'studyplan',
    component: DashboardstudyplanComponent
  },
  {
    path: 'practice',
    component: DashboardpracticeComponent
  },
  {
    path: 'videos',
    component: FreevideosComponent
  },
  {
    path: 'videosdetails/:videoId/:searchQuery',
    component: FreevideosectionComponent
  },
  {
    path: 'freequiz',
    component: FreequizComponent
  },
  {
    path: 'freequizpanel/:quizName',
    component: FreequizpanelComponent
  },
  {
    path: 'freequizsolution/:quizName',
    component: FreequizsolutionComponent
  },
  {
    path: 'previous-year',
    component: PreviousyearComponent
  },
  {
    path: 'previous-year-papers/:quizName',
    component: PreviousyearexampanelComponent
  }

]
 },
 {
   path: "exam/:prodId",
   component: ExamsectionpanelComponent,
   children:[
     {
       path:'',
       component: InstructionsComponent
     },
     {
       path: 'examformat',
       component: ExamformatComponent
     },
     {
       path: 'exampanel',
       component: ExampanelComponent
     },
     {
       path: 'analysis',
       component: AnalysisComponent
     },
     {
      path: 'atse-analysis/:userId',
      component: AtseAnalyticsComponent
    },
     {
       path: 'solution',
       component: SolutionComponent
     },
     {
       path: 'resume',
       component: ResumeComponent
     }
   ]
 },
  
    { path: '', loadChildren: () => import('./layouts/homelayout/homelayout.module').then(m => m.HomelayoutModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
