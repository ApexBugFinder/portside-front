import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faPenSquare,
  faMinusCircle,
  faEye,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import { threadId } from 'node:worker_threads';
import { throwIfEmpty } from 'rxjs/operators';
import { Project } from '../project';

interface ViewProjectDialogData {
  project: Project;
}
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  @ViewChild('bannerContainer') banner: HTMLElement | undefined;
  bkImg: string = '../../../assets/images/pngs/techDoc_banner_large.png';
  // ICONS
  faEye = faEye;
  faDelete = faMinusCircle;
  faEdit = faPenSquare;
  faPublished = faLightbulb;

// FORM
requirementsForm?: FormGroup;
requirementAbstractControl?: AbstractControl;
  constructor(
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewProjectDialogData,
    private fb: FormBuilder
  ) {
    this.requirementsForm = this.fb.group({
      requirement: ['', [Validators.required]],
    });



  }

  ngOnInit(): void {
   console.log('data passed to edit component: ', JSON.stringify(this.data.project));


  }
  onNoClick(): void {
    // this.dialogRef.close();
  }

  addRequirement(a: string) {
    let boss = this.requirementsForm?.get('requirement');
    console.log(a)



  }
}

