import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faArrowCircleLeft, faUserGraduate, faHistory, faBriefcase, faUser} from '@fortawesome/free-solid-svg-icons';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'app-profile-buttons',
  templateUrl: './profile-buttons.component.html',
  styleUrls: ['./profile-buttons.component.scss'],
})
export class ProfileButtonsComponent implements OnInit {
  @Output() back: EventEmitter<string> = new EventEmitter<string>();
  @Output() toProjects: EventEmitter<string> = new EventEmitter<string>();

  @Output() toExperiences: EventEmitter<string> = new EventEmitter<string>();
  @Output() toEducation: EventEmitter<string> = new EventEmitter<string>();

  @Input() inputEventKey: string;

  faExperience = faHistory;
  faProjects = faBriefcase;
  faBack = faArrowCircleLeft;
  faEducation = faUserGraduate;

  constructor(private dialogRef: MatDialogRef<ViewUserComponent>) {}

  ngOnInit(): void {}

  toBack() {
    console.log(this.inputEventKey);
    this.back.emit(this.inputEventKey);
  }
  toProjectsPage() {
    console.log('hello');
    this.toProjects.emit(this.inputEventKey);
  }
  toExperiencesPage() {
    this.toExperiences.emit(this.inputEventKey);
  }
  toEducationPage() {
    this.toEducation.emit(this.inputEventKey);
  }
}
