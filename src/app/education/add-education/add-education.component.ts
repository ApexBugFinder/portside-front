import { Component, OnInit } from '@angular/core';
import { DialogRole, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit {


  constructor(private dialogRef: MatDialogRef<AddEducationComponent>) { }

  ngOnInit(): void {
  }

  toCert() {
    this.dialogRef.close('certification');
  }
  toDegree() {
    this.dialogRef.close('degree');
  }
}
