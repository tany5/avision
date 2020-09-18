import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveclasspreviewComponent} from './liveclasspreview/liveclasspreview.component';
import { StudyplanComponent } from './studyplan/studyplan.component';
import { RouterModule } from '@angular/router';
import { LiveclassdashboardComponent } from './liveclassdashboard.component';
import { CoursecurriculumComponent } from './coursecurriculum/coursecurriculum.component';
import { AskdoubtsComponent } from './askdoubts/askdoubts.component';
import { MocktestComponent } from './mocktest/mocktest.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { OnlinepanelComponent } from './onlinepanel/onlinepanel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    LiveclassdashboardComponent,
    LiveclasspreviewComponent,
    StudyplanComponent,
    CoursecurriculumComponent,
    AskdoubtsComponent,
    MocktestComponent,
    OnlinepanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CarouselModule
        
  ]
})
export class LiveclassdashboardModule { }
