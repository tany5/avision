import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-atse',
  templateUrl: './atse.component.html',
  styleUrls: ['./atse.component.scss']
})
export class AtseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AtseComponent>,private dialog: MatDialog) {
    dialogRef.disableClose=true
    
   }

  ngOnInit(): void {
  }
  closeExampopup(){
    this.dialog.closeAll()
  } 

}
