import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-profile-buttons',
  templateUrl: './profile-buttons.component.html',
  styleUrls: ['./profile-buttons.component.scss'],
})
export class ProfileButtonsComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ViewUserComponent>) {}

  ngOnInit(): void {}

  toBack() {
    this.dialogRef.close();
  }
  toProjects() {}
}
