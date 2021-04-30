import { stringify } from '@angular/compiler/src/util';
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
import { Constants } from 'src/app/helpers/Constants';

import { defaultProject, editState, Project, ProjectRequirement, linkview, ProjectLink } from '../project';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { ProjectService } from '../project.service';
import { Guid } from 'guid-typescript'
import { Console } from 'node:console';

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
  @ViewChild('req') reqEditState: HTMLElement | null = document.getElementById('req');

  bkImg: string = '../../../assets/images/pngs/techDoc_banner_large.png';
  

  // LINKS
  linkView = linkview;
  linkEditor: linkview;
  gitStarter: ProjectLink;
  gitLink: ProjectLink;
  siteStarter: ProjectLink;
  siteLink: ProjectLink;
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
    this.initializeProjectRequirements();
    this.setProjectCreator();
    this.linkEditor = linkview.NONE;
    // this.localProject.banner = this.bkImg;
    console.log('local copy of data: ', JSON.stringify(this.localProject));
    this.gitStarter = {
      id: '5555',
      projectID: this.localProject.id,
      service: 'git',
      link: 'http://www.google.com'
    }
    this.siteStarter = {
      id: '5556',
      projectID: this.localProject.id,
      service: 'site',
      link: 'http://www.youtube.com'
    }
    // this.localProject.projectLinks.push(this.gitStarter);
    // this.localProject.projectLinks.push(this.siteStarter);
    this.initializeLinks();
    // INITIATE FORM
    this.requirementsForm = this.fb.group({
      id: ['', [Validators.required]],
      projectName: [''],
      started: [''],
      completed: [''],
      description: [''],
      banner: [''],
      published: [''],
      requirement: ['', [Validators.required]],
      projectLinks: [[]],
      reqEditState:['']
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

  
  
  
  
  
  // PROJECT METHODS
  // ===============================================================
  



// MAJOR PROJECT ACTIONS
//==================================================================
// SET PROJECT CREATOR
  setProjectCreator() {
    this.localProject.projectCreatorID = Constants.userID;
  }

  // CLEAR FORM

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

// DELETE PROJECT
deleteProject() {
  console.log('Beginning DELETE PROCESS for project: ', this.localProject.id);
  this.projectService.deleteItem(this.localProject.id).subscribe(i => {
    this.dialogRef.close();
  });
  
}
// 

// MANAGE FORM
// PUBLISH PROJECT && SAVE
publishToggleProject() {
  let publishToggle = this.buildFinalProject();
  console.log('publishedToggle Project pre toggle: ', publishToggle);
  this.publishedAbstractControl?.setValue(
    this.publishedAbstractControl.value === true ? false : true
  );
  let postToggle:Project = this.buildFinalProject();
  console.log('publishedToggle Project to be pushed to DB: ', postToggle);
    this.saveProject();
}

// MANAGE REQUIREMENTS
//============================================================
// INITIALIZE REQUIREMENTS
initializeProjectRequirements() {
  this.localProject.projectRequirements.forEach(j => {
      j.editState = editState.OK;
      j.stateHistory = [editState.OK];
      
      
    });
    console.log('ProjectRequirements after Augment from initializeProjectRequirements: ', this.localProject);
}

// ADD A REQUIREMENT

addRequirement(a: string) {
  let newReq: ProjectRequirement = this.createRequirement();

  this.localProject.projectRequirements.push(newReq);
  console.log(
    'these the local project requirements: ',
    JSON.stringify(this.localProject.projectRequirements)
  );
}

// AUGMENT REQUIREMENTS

toggleRemoveRequirement(a: ProjectRequirement) {
if (a.stateHistory[0] == editState.OK) {
  console.log('HERE');
  a.editState = a.editState == editState.OK? editState.REMOVE: editState.OK;
}
else {
  console.log('THERE');
  a.editState = a.editState == editState.ADD? editState.REMOVE: editState.ADD;
}

  console.log('the requirement ' + a.id + ' is marked for removal: ' + a.editState);
 }
// 
  
// LINKSS 
// ==========================
initializeLinks() {
  console.log('HELLO, lets initialize links');
  console.log(this.localProject.projectLinks);
  this.localProject.projectLinks?.forEach(uu => {
    if (uu.service == 'git') {
      this.gitLink = uu;
    }
    if (uu.service =='service') {
      this.siteLink = uu
    }

  });
  if (this.localProject.projectLinks.filter(i=> i.service =='git').length == 0){
    let newGitLink: ProjectLink = {
      id: '',
      projectID: this.localProject.id,
      service: 'git',
      link: ''

    };
    this.gitLink = newGitLink;
    this.localProject.projectLinks.push(newGitLink);
  }
  if (this.localProject.projectLinks.filter(i => i.service == 'site').length == 0) {
    let newSiteLink: ProjectLink = {
      id: '',
      projectID: this.localProject.id,
      service: 'site',
      link: ''
    };
    this.siteLink = newSiteLink;
    this.localProject.projectLinks.push(newSiteLink);
  }
  console.log('HELLO, links initialized');
  console.log(this.localProject.projectLinks);
}


newGitLinkToProcess(link: ProjectLink) {
  // REMOVE GIT SERVICE FROM PROJECTLINKS AND ADD NEW GIT LINK FROM GIT LINK EDITOR
    
  this.localProject.projectLinks = this.localProject.projectLinks.filter(i => i.service !== 'git');
  this.gitLink = link;
  this.localProject.projectLinks.push(link);

  
}

newSiteLinkToProcess(link: ProjectLink) {
  // REMOVE SITE SERVICE FROM PROJECT LINKS AND ADD NEW SITE LINK EDITOR
  this.localProject.projectLinks = this.localProject.projectLinks.filter(i => i.service !== 'site');
  this.localProject.projectLinks.push(link);
  this.siteLink = link;
}

linkViewTogglerClicked(message: string) {

// TOGGLE CLOSED EITHER THE GIT LINK EDITOR OR THE SITE LINK EDITOR
 if(message === linkview.NONE) {
   this.linkEditor = linkview.NONE;
 }
}
// DISPLAY GIT LINK EDITOR WHEN ICON IS CLICKED
displayGitLinkEditor() {
  this.linkEditor= this.linkEditor == linkview.GIT? linkview.NONE: linkview.GIT;
}
// DISPLAY SITE LINK EDITOR WHEN ICON IS CLICKED
displaySiteLinkEditor() {
  this.linkEditor = this.linkEditor == linkview.SITE? linkview.NONE: linkview.SITE;
}

// UPDATE PROJECT AND SAVE
  saveProject() {
    this.finalProject = this.buildFinalProject();
    
    // IF new proect Create Project if updating project Update Project
    if (this.finalProject.id == '') {
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

  



 
  // CORE DB ACTIONS
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



  // HELPERS

  createRequirement(): ProjectRequirement {
    let thisRequirement: ProjectRequirement = {
      id: Guid.create().toString(),
      projectID: this.localProject.id,
      requirement: this.requirementAbstractControl?.value,
      editState: editState.ADD,
      stateHistory: [editState.ADD] 
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

  getReqState(editstate: string) {
    switch (editstate) {
      case editState.ADD: 
        return 'markedForAdd';
      case editState.REMOVE:
        return 'markedForRemoval'
      case editState.OK:
        return 'unmarked';
      default:
        return 'unmarked';
    }
  }
}

