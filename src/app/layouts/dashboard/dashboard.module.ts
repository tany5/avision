import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentdashboardModule } from 'src/app/shared/studentdashboard/studentdashboard.module';
import { DashboardhomeComponent } from 'src/app/pages/dashboard/dashboardhome/dashboardhome.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSkeletonLoaderModule  } from 'ngx-skeleton-loader';
import { DashboardtestseriesComponent } from 'src/app/pages/dashboard/dashboardtestseries/dashboardtestseries.component';
import { DashboardtestseriesinnerComponent } from 'src/app/pages/dashboard/dashboardtestseriesinner/dashboardtestseriesinner.component';
import { DashboardvideocoursesComponent } from 'src/app/pages/dashboard/dashboardvideocourses/dashboardvideocourses.component';
import { DashboardvideodetailsComponent } from 'src/app/pages/dashboard/dashboardvideodetails/dashboardvideodetails.component';
import { DashboardliveclassComponent } from 'src/app/pages/dashboard/dashboardliveclass/dashboardliveclass.component';
import { DashboardpassComponent } from 'src/app/pages/dashboard/dashboardpass/dashboardpass.component';
import { DashboardreferearnComponent } from 'src/app/pages/dashboard/dashboardreferearn/dashboardreferearn.component';
import { ProfileComponent } from 'src/app/pages/dashboard/profile/profile.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from 'src/app/pages/dashboard/order/order.component';
import { DashboardpracticeComponent } from 'src/app/pages/dashboard/dashboardpractice/dashboardpractice.component';
import { DashboardstudyplanComponent } from 'src/app/pages/dashboard/dashboardstudyplan/dashboardstudyplan.component';
import { FreevideosComponent } from 'src/app/pages/dashboard/freevideos/freevideos.component';
import { FreevideosectionComponent } from 'src/app/pages/dashboard/freevideosection/freevideosection.component';
import { DashboardliveclassdetailsComponent } from 'src/app/pages/dashboard/dashboardliveclassdetails/dashboardliveclassdetails.component';
import { PracticetestComponent } from 'src/app/pages/dashboard/practicetest/practicetest.component';
import { FreequizComponent } from 'src/app/pages/dashboard/freequiz/freequiz.component';
import { FreequizpanelComponent } from 'src/app/pages/dashboard/freequizpanel/freequizpanel.component';
import { FreequizsolutionComponent } from 'src/app/pages/dashboard/freequizsolution/freequizsolution.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CountdownModule } from 'ngx-countdown';
import { PreviousyearComponent } from 'src/app/pages/dashboard/previousyear/previousyear.component';
import { PreviousyearexampanelComponent } from 'src/app/pages/dashboard/previousyearexampanel/previousyearexampanel.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardhomeComponent,
    DashboardtestseriesComponent,
    DashboardtestseriesinnerComponent,
    DashboardvideocoursesComponent,
    DashboardvideodetailsComponent,
    DashboardliveclassComponent,
    DashboardpassComponent,
    DashboardreferearnComponent,
    ProfileComponent,
    OrderComponent,
    DashboardpracticeComponent,
    DashboardstudyplanComponent,
    FreevideosComponent,
    FreevideosectionComponent,
    DashboardliveclassdetailsComponent,
    PracticetestComponent,
    FreequizComponent,
    FreequizpanelComponent,
    FreequizsolutionComponent,
    PreviousyearComponent,
    PreviousyearexampanelComponent
  ],
  imports: [    
    CommonModule,
    StudentdashboardModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    CarouselModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    CountdownModule
    
  ]
})
export class DashboardModule {  }
