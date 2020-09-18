import { Component, OnInit, Inject } from '@angular/core';
import { HomeService } from '../home/home.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ScholarregisterComponent } from '../scholarregister/scholarregister.component';

@Component({
  selector: 'app-homepopup',
  templateUrl: './homepopup.component.html',
  styleUrls: ['./homepopup.component.scss']
})
export class HomepopupComponent implements OnInit {
  popup_banner: any;
  dataItem: any;
  popupImage: any;

  constructor(private homesevice: HomeService,private dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<HomepopupComponent>,private router : Router) { 
    dialogRef.disableClose = true; 
    this.dataItem = this.data
    this.popupImage = this.dataItem.pop_up_image
    
}

  ngOnInit(): void {

   
    
  }

  closePopup(){
    this.dialog.closeAll();
  }

  onPreoceed(){

    this.router.navigate(['/testseries']).then(
      (res) => {
        this.dialog.closeAll();
        this.dialog.open(ScholarregisterComponent);
      }
    )    
  }

}
