import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faPenSquare,
  faMinusCircle,
  faEye,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';

import { defaultProject, Project, ProjectRequirement } from '../project';

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
  originalProject: Project;
  localProject: Project;
  // FORM
  requirementsForm: FormGroup;
  // ABSTRACTCONTROLS
  requirementAbstractControl: AbstractControl | null;
  idAbstractControl: AbstractControl | null;
  projectNameAbstractControl: AbstractControl | null;
  startedAbstractControl: AbstractControl | null;
  completedAbstractControl: AbstractControl | null;
  descriptionAbstractControl: AbstractControl | null;
  bannerAbstractControl: AbstractControl | null;
  publishedAbstractControl: AbstractControl | null;
  projectLinkAbstractControl: AbstractControl | null;

  constructor(
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewProjectDialogData,
    private fb: FormBuilder
  ) {

    console.log('data in constructor: ', JSON.stringify(this.data.project));
    this.originalProject = this.data.project;
    this.localProject = this.data.project;

    this.localProject.banner = this.bkImg;
    console.log('local copy of data: ', JSON.stringify(this.localProject));
    this.requirementsForm = this.fb.group({
      id: [this.localProject.id, [Validators.required]],
      projectName: [this.localProject.projectName],
      started: [this.localProject.started],
      completed: [this.localProject.completed],
      description: [this.localProject.description],
      banner: [this.localProject.banner],
      published: [this.localProject.published],
      requirement: ['', [Validators.required]],
      projectLinks: [this.localProject.projectLinks],
    });
  }

  ngOnInit(): void {
    console.log(
      'data passed to edit component ngOnInit: ',
      JSON.stringify(this.data.project)
    );

    this.initControls();

    this.setControls();

  }

  initControls(): void {

    this.idAbstractControl = this.requirementsForm.get('id');
    this.projectNameAbstractControl = this.requirementsForm.get('projectName');
    this.startedAbstractControl = this.requirementsForm.get('started');
    this.completedAbstractControl = this.requirementsForm.get('completed');
    this.descriptionAbstractControl = this.requirementsForm.get('description');
    this.bannerAbstractControl = this.requirementsForm.get('banner');
    this.publishedAbstractControl = this.requirementsForm.get('published');
    this.projectLinkAbstractControl = this.requirementsForm.get('projectLink');
    this.requirementAbstractControl = this.requirementsForm.get('requirement');

  }

  setControls(): void{
    // this.idAbstractControl?.setValue(this.localProject.id);
    // this.projectNameAbstractControl?.setValue(this.localProject.projectName);
    // this.startedAbstractControl?.setValue(this.localProject.started);
    // this.completedAbstractControl?.setValue(this.localProject.completed);
    // this.descriptionAbstractControl?.setValue(this.localProject.description);
    // this.bannerAbstractControl?.setValue(this.localProject.banner);
    // this.publishedAbstractControl?.setValue(this.localProject.published);

  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  addRequirement(a: string) {



    let newReq: ProjectRequirement = {
      id: 'new',
      projectID: this.localProject.id,
      requirement: this.requirementAbstractControl?.value
    };

    this.localProject.projectRequirements.push(newReq);
    console.log('these the local project requirements: ', JSON.stringify(this.localProject.projectRequirements));

  }
}

