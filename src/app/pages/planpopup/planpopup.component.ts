import { Component, OnInit } from '@angular/core';
import { PassService } from '../pass/pass.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
declare var jQuery: any;
@Component({
  selector: 'app-planpopup',
  templateUrl: './planpopup.component.html',
  styleUrls: ['./planpopup.component.scss']
})
export class PlanpopupComponent implements OnInit {
  passData: Object;
  passLoader: boolean;
  plan_id: any;

  constructor(private passServices : PassService,private dialog: MatDialog,private dialogRef: MatDialogRef<PlanpopupComponent>) { 
    dialogRef.disableClose = true;
    this.passServices.getPassData().subscribe(
      (res)=> {
        console.log('passData...');
        console.log(res);       
        this.passData = res
        this.passLoader = true
        
      },
     (error)=> {
      console.log(error)
     })

   }

  ngOnInit(): void {
  }

  PayForPlan(plan_id){
    this.plan_id = plan_id
    this.passServices.payForPlan(this.plan_id,localStorage.getItem('currentUserId')).subscribe(

      (res) => {
        console.log(res);
        location.href=res['pay_url']
      }
    )
    

  }
  closePopup(){
    this.dialog.closeAll();
  }

}
