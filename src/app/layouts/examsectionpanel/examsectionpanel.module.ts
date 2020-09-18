import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamsectionpanelComponent } from './examsectionpanel.component';
import { ExamformatComponent } from 'src/app/pages/examsection/examformat/examformat.component';
import { InstructionsComponent } from 'src/app/pages/examsection/instructions/instructions.component';
import { ExampanelComponent } from 'src/app/pages/examsection/exampanel/exampanel.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';
import { BrowserModule } from '@angular/platform-browser';
import { ProgressBarColor } from 'src/app/pages/examsection/analysis/progress-bar-color';
import { AnalysisComponent } from 'src/app/pages/examsection/analysis/analysis.component';
import { ChartsModule } from 'ng2-charts';
import { SolutionComponent } from 'src/app/pages/examsection/solution/solution.component';
import { ResumeComponent } from 'src/app/pages/examsection/resume/resume.component';
import { AtseAnalyticsComponent } from 'src/app/pages/examsection/atse-analytics/atse-analytics.component';



@NgModule({
  declarations: [
    ExamsectionpanelComponent,
    ExamformatComponent,
    InstructionsComponent,
    ExampanelComponent,
    ProgressBarColor,
    AnalysisComponent,
    SolutionComponent,
    ResumeComponent,
    AtseAnalyticsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CountdownModule,
    BrowserModule,
    ChartsModule
  ]
})
export class ExamsectionpanelModule { }
