import { AfterViewInit, Component, Inject,  OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import * as fromEditProject from '../edit/state';
import * as fromProject from '../state';
import * as edipProjectActions from '../edit/state/edit-project.actions';

// Models
import { Project} from '../models/project';
import { ProjectLink } from '../models/projectLink';
import { ProjectService } from '../project.service';
interface ViewProjectDialogData {
  project: Project;
}

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';






@Component({
  selector: 'app-edit-shell',
  templateUrl: './edit-shell.component.html',
  styleUrls: ['./edit-shell.component.scss']
})
export class EditShellComponent implements OnInit {

  projectID$: Observable<string  | undefined>;
  projectIDStore: string   | undefined;
  projectCreatorID$: Observable<string  | undefined>;
  projectCreatorIDStore: string  | undefined;
  projectBanner$: Observable<string  | undefined>;
  projectBannerStore: string  | undefined;

  projectName$: Observable<string  | undefined>;
  projectNameStore: string  | undefined;
  projectDescription$: Observable<string  | undefined>;
  projectDescriptionStore: string  | undefined;





  gitLink: ProjectLink;
  siteLink: ProjectLink;

  private originalProject: Project;
  localProject: Project;
  finalProject: Project;
  editMode: boolean = true;

    // FORM
    myProjectForm: FormGroup;
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
    smallBannerAbstractControl: AbstractControl | null;

  constructor(
    public dialogRef: MatDialogRef<EditShellComponent>,
    private renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: ViewProjectDialogData,
    private projectService: ProjectService,
    private editProjectStore: Store<fromEditProject.EditProjectState>,
    private projectStore: Store<fromProject.ProjectModuleState>,
    private fb: FormBuilder
  ) {

        this.projectID$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectId));
    this.projectCreatorID$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectProjectCreatorID));
    this.projectName$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectProjectName));
    this.projectDescription$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectDescription));
    this.projectBanner$ = this.editProjectStore.pipe(select(fromEditProject.getEditProjectBigBanner));


    this.myProjectForm = this.fb.group({
      id: ['', [Validators.required]],
      projectName: [''],
      started: [''],
      completed: [''],
      description: [''],
      banner: [''],
      smallBanner: [''],
      published: [''],
      requirement: ['', [Validators.required]],
      projectLinks: [[]],
      reqEditState:['']
    });


   }

  ngOnInit(): void {

 this.projectID$.subscribe({
   next: value => {
     this.projectIDStore = value
    return value;
    },
   error: err => console.log('OOps sorry, error occured getting projectId from store in edit shell component: ', err),
   complete: () => console.log('Completed getting projectID from ngrx store in edit shell component')
 });

 this.projectCreatorID$.subscribe({
  next: value => this.projectCreatorIDStore = value,
  error: err => console.log('OOps sorry, error occured getting projectCreatorId from store in edit shell component: ', err),
  complete: () => console.log('Completed getting projectCreatorID from ngrx store in edit shell component')
});

this.projectName$.subscribe({
  next: value => this.projectNameStore = value,
  error: err => console.log('OOps sorry, error occured getting projectName from store in edit shell component: ', err),
  complete: () => console.log('Completed getting projectName from ngrx store in edit shell component')
});
this.projectDescription$.subscribe({
  next: value => this.projectDescriptionStore = value,
  error: err => console.log('OOps sorry, error occured getting projectDescription from store in edit shell component: ', err),
  complete: () => console.log('Completed getting projectDescription from ngrx store in edit shell component')
});
this.initControls();
this.resetControls();
this.monitorForControlChanges();
  }




  // FORM CONTROLS
  initControls(): void {
    this.idAbstractControl = this.myProjectForm.get('id');
    this.projectNameAbstractControl = this.myProjectForm.get('projectName');


    this.descriptionAbstractControl = this.myProjectForm.get('description');
    this.bannerAbstractControl = this.myProjectForm.get('banner');
    this.smallBannerAbstractControl = this.myProjectForm.get('smallBanner');


  }

  monitorForControlChanges() {
    this.projectNameAbstractControl?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: value => this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectProjectName(value)),
      error: err => console.log('OOps, there was an error while changing the value of your projectName'),
      complete: () => console.log('Completed: updating your Edit Project Project Name in the edit shell component')
    });
    this.descriptionAbstractControl?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: value => this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectDescription(value)),
      error: err => console.log('OOps, there was an error while changing the value of your projectDEscription in edit shell component'),
      complete: () => console.log('Completed: updating your Edit Project Project Name in the edit shell component')
    });
    this.bannerAbstractControl?.valueChanges.subscribe({
      next: value => {
        let urlString =  'url(&quot;' + value + '&quot; )';
        let bannerCtl = document.getElementById('bannerContainer');
        this.renderer.setStyle(bannerCtl, 'background-image', urlString);
        console.log(urlString);
      },
      error: err => console.log('OOOps, there was an error while changing the value of your banner url: ', err),
      complete: () =>  console.log('Completed updating banner url')
    });
    this.smallBannerAbstractControl?.valueChanges.subscribe({
      next: value => {

      },
      error: err => console.log('OOOps, there was an error while changing the value of your smallbanner url: ', err),
      complete: () =>  console.log('Completed updating smallbanner url')
    });
  }
  resetControls(): void {
    this.idAbstractControl?.setValue(this.projectIDStore);
    this.projectNameAbstractControl?.setValue(this.projectNameStore);
    this.descriptionAbstractControl?.setValue(this.projectDescriptionStore);
    this.bannerAbstractControl?.setValue(this.projectBannerStore);


  }




    // PAGE ACTIONS
    // CLOSE NO SAVE
    // ==================================================
    closeDialog(message: string) {

      console.log('catch ya');
      if (message === 'closeDialog') {
        this.dialogRef.close();
      }
    }



    // IMAGES
    // ==================================================
    // processNewSmallBannerRt(returnUrl: string) {
    //   // set ngrx store
    //   this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectSmallBanner(returnUrl));

    //   /// TODO: might not need these below

    //   this.smallBannerAbstractControl?.setValue(returnUrl);

    // }

    processNewBannerRt(returnUrl: string) {
      console.log('REached RT process', returnUrl);

      this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectBigBanner(returnUrl));


      this.bannerAbstractControl?.setValue(returnUrl);

    }








getClass(): string {
  let typeOfClass: string = '/projects/';
  return typeOfClass;
}
}


