import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardheaderComponent } from './dashboardheader/dashboardheader.component';
import { DashboardsidebarComponent } from './dashboardsidebar/dashboardsidebar.component';
import { DashboardfooterComponent } from './dashboardfooter/dashboardfooter.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    DashboardheaderComponent,
    DashboardsidebarComponent,
    DashboardfooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule    
  ],
  exports:[
    DashboardheaderComponent,
    DashboardsidebarComponent,
    DashboardfooterComponent
  ]
})
export class StudentdashboardModule { }
