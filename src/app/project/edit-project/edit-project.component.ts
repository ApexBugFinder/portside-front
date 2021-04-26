import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { throwIfEmpty } from 'rxjs/operators';

import { defaultProject, Project, ProjectRequirement } from '../project';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectService } from '../project.service';

interface ViewProjectDialogData {
  project: Project;
}

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit, AfterViewInit {
  @ViewChild('publishStatusButton') publishStatusButton: HTMLElement | null = document.getElementById('publishStatusButton');

  bkImg: string = '../../../assets/images/pngs/techDoc_banner_large.png';

  // ICONS
  faEye = faEye;
  faDelete = faMinusCircle;
  faEdit = faPenSquare;
  faPublished = faLightbulb;
  private originalProject: Project;
  localProject: Project;
  finalProject: Project;
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
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: ViewProjectDialogData,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {
    console.log('data in constructor: ', JSON.stringify(this.data.project));
    this.originalProject = JSON.parse(JSON.stringify(this.data.project));
    this.localProject = JSON.parse(JSON.stringify(this.data.project));


    // this.localProject.banner = this.bkImg;
    console.log('local copy of data: ', JSON.stringify(this.localProject));

    // INITIATE FORM
    this.requirementsForm = this.fb.group({
      id: ['new', [Validators.required]],
      projectName: [''],
      started: [''],
      completed: [''],
      description: [''],
      banner: [''],
      published: [''],
      requirement: ['', [Validators.required]],
      projectLinks: [[]],
    });
  }



  ngAfterViewInit(): void {

  }

  ngOnInit(): void {





    console.log(
      'data passed to edit component ngOnInit: ',
      JSON.stringify(this.data.project)
    );

    this.initControls();
    this.resetControls();

  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  // FORM ACTIONS
  addRequirement(a: string) {
    let newReq: ProjectRequirement = this.createRequirement();

    this.localProject.projectRequirements.push(newReq);
    console.log(
      'these the local project requirements: ',
      JSON.stringify(this.localProject.projectRequirements)
    );
  }

  saveProject() {
    this.finalProject = this.buildFinalProject();
    this.finalProject.id = 'new';
    // IF new proect Create Project if updating project Update Project
    if (this.finalProject.id == 'new') {
      console.log(
        'this is the new project to be saved to DB: ',
        JSON.stringify(this.finalProject)
      );
      this.createNewProject(this.finalProject);
    } else {
      console.log(
        'this is the project to be updated in the DB: ',
        JSON.stringify(this.finalProject)
      );
      this.updateProject(this.finalProject);
    }
  }

  publishToggleProject() {
    let publishToggle = this.buildFinalProject();
    console.log('publishedToggle Project pre toggle: ', publishToggle);
    this.publishedAbstractControl?.setValue(
      this.publishedAbstractControl.value === true ? false : true
    );
    let postToggle = this.buildFinalProject();
    console.log('publishedToggle Project to be pushed to DB: ', postToggle);

    this.updateProject(postToggle);
  }

  clearChanges() {
    console.log(
      'the original project is now: ',
      JSON.stringify(this.originalProject)
    );
    console.log('this local project: ', this.localProject);
    this.resetControls();
    console.log('my local copy is now: ', this.localProject);
    this.dialogRef.close();
  }

  // DB ACTIONS
  createNewProject(a: Project) {
    a.id = '';
    console.log('Sending this project to DB to create New:', JSON.stringify(a));
    this.projectService.createItem(a)
    .subscribe(a => {
      this.dialogRef.close();
    })
    ;
  }

  updateProject(a: Project) {
    console.log('project to update: ', a);
    this.projectService.updateItem(a)
    .subscribe((a) => {
      this.dialogRef.close();
    })
    ;
  }

  deleteProject() {
    let projectToDeleteID = this.localProject.id;
    console.log('Project to Delete ID: ', projectToDeleteID);
  }

  // HELPERS

  createRequirement(): ProjectRequirement {
    let thisRequirement: ProjectRequirement = {
      id: 'new',
      projectID: this.localProject.id,
      requirement: this.requirementAbstractControl?.value,
    };
    return thisRequirement;
  }
  buildFinalProject(): Project {

    let a: Project = {
      id: this.idAbstractControl?.value,
      projectCreatorID: this.localProject.projectCreatorID,
      projectName: this.projectNameAbstractControl?.value,
      started: this.startedAbstractControl?.value,
      completed: this.completedAbstractControl?.value,
      description: this.descriptionAbstractControl?.value,
      banner: this.bannerAbstractControl?.value,
      published: this.publishedAbstractControl?.value,

      projectRequirements: this.localProject.projectRequirements,
      projectLinks: this.localProject.projectLinks,
    };

    console.log('Project Creator: ', a.projectCreatorID);
    return a;
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

    this.publishedAbstractControl?.valueChanges.subscribe(selectedValue => {
 this.publishStatusButton = document.getElementById(
              'publishStatusButton'
            );
      if (selectedValue) {

           console.log('red');
this.renderer.addClass(this.publishStatusButton, 'publishStatusButtonTrue');

      } else {
this.renderer.removeClass(this.publishStatusButton, 'publishStatusButtonTrue');

      }
    })
  }

  resetControls(): void {
    this.idAbstractControl?.setValue(this.originalProject.id);
    this.projectNameAbstractControl?.setValue(this.originalProject.projectName);
    this.startedAbstractControl?.setValue(this.originalProject.started);
    this.completedAbstractControl?.setValue(this.originalProject.completed);
    this.descriptionAbstractControl?.setValue(this.originalProject.description);
    this.bannerAbstractControl?.setValue(this.originalProject.banner);
    this.publishedAbstractControl?.setValue(this.originalProject.published);
  }
}

