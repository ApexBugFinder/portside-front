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



import { Constants } from 'src/app/helpers/Constants';

import { defaultProject, editState, Project, ProjectRequirement, linkview, ProjectLink } from '../project';

import { ProjectService } from '../project.service';
import { Guid } from 'guid-typescript'
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';




interface ViewProjectDialogData {
  project: Project;
}

@Component({
  selector: 'app-edit-shell',
  templateUrl: './edit-shell.component.html',
  styleUrls: ['./edit-shell.component.scss']
})
export class EditShellComponent implements OnInit {
  
  projectID$: Observable<string>;
  projectIDStore: string;
  projectCreatorID$: Observable<string>;
  projectCreatorIDStore: string;
  projectBanner$: Observable<string>;
  projectBannerStore: string;

  projectName$: Observable<string>;
  projectNameStore: string;
  projectDescription$: Observable<string>;
  projectDescriptionStore: string;





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
    // this.projectID$.subscribe(value => this.projectIDStore = value);
    // this.projectName$.subscribe(value => this.projectNameStore = value);
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
    // this.startedAbstractControl = this.myProjectForm.get('started');
    // this.completedAbstractControl = this.myProjectForm.get('completed');
    this.descriptionAbstractControl = this.myProjectForm.get('description');
    this.bannerAbstractControl = this.myProjectForm.get('banner');
    this.smallBannerAbstractControl = this.myProjectForm.get('smallBanner');
    // this.publishedAbstractControl = this.myProjectForm.get('published');
    // this.projectLinkAbstractControl = this.myProjectForm.get('projectLink');
    // this.requirementAbstractControl = this.myProjectForm.get('requirement');

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
        let urlString =  'url(&quot;' + value + '&quot; )'
        let bannerCtl = document.getElementById('bannerContainer');
        this.renderer.setStyle(bannerCtl, 'background-image', urlString)
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

    // LINKS
    //======================================
    // newGitLinkToProcess(link: ProjectLink) {
    //   // REMOVE GIT SERVICE FROM PROJECTLINKS AND ADD NEW GIT LINK FROM GIT LINK EDITOR
    //   console.log('Hello Made it to the top'); 
    //   this.localProject.projectLinks = this.localProject.projectLinks.filter(i => i.service !== 'git');
    //   this.gitLink = link;
    //   // UPDATE LOCAL STORE
    //   this.localProject.projectLinks.push(link);
    
      
    // }
    
    // newSiteLinkToProcess(link: ProjectLink) {
    //   // REMOVE SITE SERVICE FROM PROJECT LINKS AND ADD NEW SITE LINK EDITOR
    //   this.localProject.projectLinks = this.localProject.projectLinks.filter(i => i.service !== 'site');
    //   // UPDATE LOCAL STORE
    //   this.localProject.projectLinks.push(link);
    //   this.siteLink = link;
    // }
    

    // IMAGES
    // ==================================================
    processNewSmallBannerRt(returnUrl: string) {
      // set ngrx store
      this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectSmallBanner(returnUrl));

      /// TODO: might not need these below
      this.localProject.smallBanner = returnUrl;
      this.smallBannerAbstractControl?.setValue(returnUrl);
      
    }
    
    processNewBannerRt(returnUrl: string) {
      console.log('REached RT process', returnUrl);

      this.editProjectStore.dispatch(new edipProjectActions.SetEditProjectBigBanner(returnUrl));

      this.localProject.banner = returnUrl;
      this.bannerAbstractControl?.setValue(returnUrl);
     
    }

    // SAVE

    // CLEAR

    // PUBLISH

    // DELETE
    
    // DB ACTIONS
    
    
    // HELPERS
    // LINKSS 
// ==========================
// initializeLinks() {
//   console.log('HELLO, lets initialize links');
//   console.log(this.localProject.projectLinks);
//   this.localProject.projectLinks?.forEach(uu => {
//     if (uu.service == 'git') {
//       this.gitLink = uu;
//     }
//     if (uu.service =='site') {
//       this.siteLink = uu
//     }

//   });
//   if (this.localProject.projectLinks.filter(i=> i.service =='git').length == 0){
//     let newGitLink: ProjectLink = {
//       id: '',
//       projectID: this.localProject.id,
//       service: 'git',
//       link: ''

//     };
//     this.gitLink = newGitLink;
//     this.localProject.projectLinks.push(newGitLink);
//   }
//   if (this.localProject.projectLinks.filter(i => i.service == 'site').length == 0) {
//     let newSiteLink: ProjectLink = {
//       id: '',
//       projectID: this.localProject.id,
//       service: 'site',
//       link: ''
//     };
//     this.siteLink = newSiteLink;
//     this.localProject.projectLinks.push(newSiteLink);
//   }
//   console.log('HELLO, links initialized');
//   console.log(this.localProject.projectLinks);
// }


// MANAGE REQUIREMENTS
//============================================================
// INITIALIZE REQUIREMENTS
// initializeProjectRequirements() {
//   this.localProject.projectRequirements.forEach(j => {
//       j.editState = editState.OK;
//       j.stateHistory = [editState.OK];
      
      
//     });
//     console.log('ProjectRequirements after Augment from initializeProjectRequirements: ', this.localProject);
// }

// // ADD A REQUIREMENT

// addRequirement(a: string) {
//   let newReq: ProjectRequirement = this.createRequirement();

//   this.localProject.projectRequirements.push(newReq);
//   console.log(
//     'these the local project requirements: ',
//     JSON.stringify(this.localProject.projectRequirements)
//   );
// }

// // AUGMENT REQUIREMENTS

// toggleRemoveRequirement(a: ProjectRequirement) {
// if (a.stateHistory[0] == editState.OK) {
//   console.log('HERE');
//   a.editState = a.editState == editState.OK? editState.REMOVE: editState.OK;
// }
// else {
//   console.log('THERE');
//   a.editState = a.editState == editState.ADD? editState.REMOVE: editState.ADD;
// }

//   console.log('the requirement ' + a.id + ' is marked for removal: ' + a.editState);
//  }
// // 
  
// createRequirement(): ProjectRequirement {
//   let thisRequirement: ProjectRequirement = {
//     id: Guid.create().toString(),
//     projectID: this.localProject.id,
//     requirement: this.requirementAbstractControl?.value,
//     editState: editState.ADD,
//     stateHistory: [editState.ADD] 
//   };
//   return thisRequirement;
// }

buildFinalProject(): Project {

  let a: Project = {
    id: this.idAbstractControl?.value,
    projectCreatorID: this.localProject.projectCreatorID,
    projectName: this.projectNameAbstractControl?.value,
    started: this.startedAbstractControl?.value,
    completed: this.completedAbstractControl?.value,
    description: this.descriptionAbstractControl?.value,
    banner: this.bannerAbstractControl?.value,
    smallBanner: this.smallBannerAbstractControl?.value,
    published: this.publishedAbstractControl?.value,
    
  
    projectRequirements: this.localProject.projectRequirements,
    projectLinks: this.localProject.projectLinks,
  };

  console.log('Project Creator: ', a.projectCreatorID);
  return a;
}

// getMediaLocation(): string {

//   let location:string = '';
//   location = 'users/'+ this.projectCreatorIDStore + '/projects/' + this.projectIDStore;
//   return location;
// }

getClass(): string {
  let typeOfClass: string = '/projects/';
  return typeOfClass;
}
}


