import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-profile-buttons',
  templateUrl: './profile-buttons.component.html',
  styleUrls: ['./profile-buttons.component.scss'],
})
export class ProfileButtonsComponent implements OnInit {

  @Output() back: EventEmitter<string> = new EventEmitter<string>() ;
  @Output() toProject: EventEmitter<string> = new EventEmitter<string>();
  @Input() inputEventKey: string;
  constructor(private dialogRef: MatDialogRef<ViewUserComponent>) {}

  ngOnInit(): void {}

  toBack() {
    console.log(this.inputEventKey);
    this.back.emit(this.inputEventKey);
  }
  toProjects() {
    console.log('hello');
    this.toProject.emit(this.inputEventKey);
  }
}
