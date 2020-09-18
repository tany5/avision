import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atse-thanks',
  templateUrl: './atse-thanks.component.html',
  styleUrls: ['./atse-thanks.component.scss']
})
export class AtseThanksComponent implements OnInit {

  constructor(private router: Router,private dialogRef: MatDialogRef<AtseThanksComponent>,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialogRef.disableClose=true
  }
  closePopup(){
    this.dialogRef.close()
    localStorage.clear()
    localStorage.setItem("examdone","1");
    this.router.navigate([''])

    
  }
  
}
