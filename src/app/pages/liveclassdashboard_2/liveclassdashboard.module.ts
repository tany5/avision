import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveclasspreviewComponent } from './liveclasspreview/liveclasspreview.component';
import { StudyplanComponent } from './studyplan/studyplan.component';
import { RouterModule } from '@angular/router';
import { LiveclassdashboardComponent } from './liveclassdashboard.component';
import { CoursecurriculumComponent } from './coursecurriculum/coursecurriculum.component';
import { AskdoubtsComponent } from './askdoubts/askdoubts.component';
import { MocktestComponent } from './mocktest/mocktest.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    LiveclassdashboardComponent,
    LiveclasspreviewComponent,
    StudyplanComponent,
    CoursecurriculumComponent,
    AskdoubtsComponent,
    MocktestComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    NgxSkeletonLoaderModule
        
  ]
})
export class LiveclassdashboardModule { }
