import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import * as fromExperienceShell from '../../experience-shell/state';
import * as fromExperienceEntityData from '../../state';
import * as experienceEntityActions from '../../state/experience.actions';
import { Experience } from '../../Models/experience';
import { Role } from '../../Models/role';
import * as experienceShellActions from '../../experience-shell/state/experience-shell.actions';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { editState } from 'src/app/shared/models/shared';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as fromShared from '../../../shared/state';
import * as fromAuth from '../../../auth/state';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-modal-shell',
  templateUrl: './edit-modal-shell.component.html',
  styleUrls: ['./edit-modal-shell.component.scss']
})
export class EditModalShellComponent implements OnInit {

  faTrash = faTrash;
  faAdd = faPlusCircle;
  readonly classe: string = 'Experiences';
  originalExp$: Observable<Experience | undefined>;
  originalExp: Experience | undefined;
  id$: Observable<string>;
  private experienceID: string;
  company$: Observable<string>;
  company: string;
  title$: Observable<string>;
  title: string;
  started$: Observable<Date>;
  started: Date;
  completed$: Observable<Date>;
  completed: Date;
  city$: Observable<string | undefined>;
  city: string | undefined;
  state$: Observable<string | undefined>;
  state: string | undefined;
  roles$: Observable<Role[] | undefined>;
  roles: Role[] | undefined;
  logoUrl$: Observable<string>;
  logoUrl: string = 'empty';
  projectCreatorID$: Observable<string>;
  projectCreatorID: string;
  myExperienceForm: FormGroup;
  currentExp$: Observable<Experience | undefined>;
  currentExp: Experience|undefined;
  viewUserId$: Observable<string>;
  userBeingViewedId: string;
  authenticatedUserId$: Observable<string>;
  authenticatedUserId: string;
  authenticated$: Observable<boolean>;
  auth: boolean;
  setOrig: boolean = false;
  origStart: string;
  origComplete: string;

  // ABSTRACTCONTROLS
  companyAbstractControl: AbstractControl | null;
  titleAbstractControl: AbstractControl | null;
  startedAbstractControl: AbstractControl | null;
  completedAbstractControl: AbstractControl | null;
  cityAbstractControl: AbstractControl | null;
  stateAbstractControl: AbstractControl | null;
  rolesAbstractControl: AbstractControl | null;
  logoUrlAbstractControl: AbstractControl | null;
  myRoleAbstractControl: AbstractControl | null;
  myTitleAbstractControl: AbstractControl | null;


  constructor(public dialogRef: MatDialogRef<EditModalShellComponent>,
    private router: Router,
    private sharedStore: Store<fromShared.SharedState>,
    private authStore: Store<fromAuth.State>,
    private experienceDataStore: Store<fromExperienceShell.ExperienceShellState>,
    private experienceEntityStore: Store<fromExperienceEntityData.ExperienceDataState>,
    private fb: FormBuilder) {
    this.authenticated$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
    this.authenticatedUserId$ = this.authStore.pipe(select(fromAuth.getAuthenticatedUserId));
    this.viewUserId$ = this.sharedStore.pipe(select(fromShared.getUserId));
    this.originalExp$ = this.experienceDataStore.pipe(select(fromExperienceShell.getOrginalExperience));
    this.currentExp$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperience));
    this.company$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperienceCompany));
    this.title$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperienceTitle));
    this.started$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperienceStartDate));
    this.completed$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperienceCompleteDate));
    this.city$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperienceCity));
    this.state$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperienceState));
    this.roles$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperienceRoles));
    this.logoUrl$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperienceLogoUrl));
    this.id$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperienceId));
    this.projectCreatorID$ = this.experienceDataStore.pipe(select(fromExperienceShell.getCurrentExperienceProjectCreator));


    this.myExperienceForm = this.fb.group({
      id: [''],
      company: [''],
      title: [''],
      started: [''],
      completed: [''],
      city: [''],
      state: [''],
      roles: [''],
      logoUrl: [''],
      myRole: [''],
      myTitle: ['']

    })
  }

  ngOnInit(): void {
   this.initiateControls();
    this.authenticated$.subscribe({
      next: (value: boolean) => {
        if (value) {
          console.log(value);
          this.auth = value;
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the current user's authentication from Auth ngrx store in Experience's Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting current user's authentication from Auth ngrx store in Experience's Edit Shell component"
        ),
    });

    this.authenticatedUserId$.subscribe({
      next: (value: string) => {
        if (value) {
          console.log(value);
          this.authenticatedUserId = value;
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the current user's authenticated UserId from Auth ngrx store in Experience's Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting current user's authenticated UserId from Auth ngrx store in  Experience's Edit Shell component"
        ),
    });


    this.viewUserId$.subscribe({
      next: (value: string) => {
        if (value) {
          console.log(value);
          this.userBeingViewedId = value;
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user being view UserId from Shared ngrx store in Experience's Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting the user being viewed UserId from Shared ngrx store in  Experience's Edit Shell component"
        ),
    });

    this.company$.subscribe({
      next: (value: string) => {
        if (value) {
          this.company = value;
          this.companyAbstractControl?.setValue(this.company);
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user's current experience Company Name from store in Experience's Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting user's Current Experience Company Name from ngrx store in Experiences Edit Shell component"
        ),
    });
    this.title$.subscribe({
      next: (value: string) => {
        if (value) {
          this.title = value;
          this.titleAbstractControl?.setValue(this.title);
        }
      },
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience job Title from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience job Title from ngrx store in Experience\'s Edit Shell component')
    });
    this.started$.subscribe({
      next: (value: Date) => {
        if (value) {
          this.started = value;
          let star = JSON.parse(JSON.stringify(value));
          let myStarter = new Date(star);
          console.log(
            'START DATE: ',
            value.toLocaleString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric'
            })
          );
          this.started = myStarter;
          this.origStart = myStarter.toLocaleString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric'
            })
          ;
          this.startedAbstractControl?.setValue(this.origStart)
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user's current experience Start Date from store in Experience's Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting user's Current Experience Start Date from ngrx store in Experience's Edit Shell component"
        ),
    });
    this.completed$.subscribe({
      next: (value: Date) => {
        if (value) {

          let star = JSON.parse(JSON.stringify(value));
          let myStarter = new Date(star);
          console.log(
            'START DATE: ',
            value.toLocaleString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
            })
          );
          this.completed = myStarter;
          this.origComplete = myStarter.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          });
          this.startedAbstractControl?.setValue(this.origComplete);
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user's current experience Complete Date from store in Experience's Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting user's Current Experience Complete Date from ngrx store in Experience's Edit Shell component"
        ),
    });
    this.city$.subscribe({
      next: (value: string | undefined) => {
        if(value){
          this.city = value;
          this.cityAbstractControl?.setValue(this.city);
        }

      },
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience\'s City from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience\'s City from ngrx store in Experience\'s Edit Shell component')
    });
    this.state$.subscribe({
      next: (value: string | undefined) => {
        if (value) {
          this.state = value;
          this.stateAbstractControl?.setValue(this.state);
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user's current experience's State from store in Experience's Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting user's Current Experience's State from ngrx store in Experience's Edit Shell component"
        ),
    });
    this.roles$.subscribe({
      next: (value: Role[] | undefined) => {
        if (value) {
          this.roles = value;
          this.rolesAbstractControl?.setValue(this.roles);
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user's current experience's State from store in Experience's Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting user's Current Experience's State from ngrx store in Experience's Edit Shell component"
        ),
    });
    this.logoUrl$.subscribe({
      next: (value: string) => {
        if (value) {
          this.logoUrl = value;
          this.logoUrlAbstractControl?.setValue(this.logoUrl);
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user's current experience logo Url from store in Experience's Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting user's Current Experience logo Url from ngrx store in Experience's Edit Shell component"
        ),
    });
    this.id$.subscribe({
      next: (value: string) => this.experienceID = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience logo Url from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience logo Url from ngrx store in Experience\'s Edit Shell component')
    });
    this.originalExp$.subscribe({
      next: (value) => this.originalExp = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s original experience from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s original Experience from ngrx store in Experience\'s Edit Shell component')
    });
    this.currentExp$.subscribe({
      next: (value: Experience|undefined) => {
        if(value?.id !== '') {

          this.currentExp = value;
          if (!this.setOrig) {
            this.experienceDataStore.dispatch(new experienceShellActions.SetOriginalExperience(value as Experience));
            this.setOrig = true;
          }
        }
      },
      error: err => console.log('OOps sorry, error occured getting the user\'s original experience from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s original Experience from ngrx store in Experience\'s Edit Shell component')
    });
    this.projectCreatorID$.subscribe({
      next: (value: string) => this.projectCreatorID = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience project Creator ID from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience project CreatorID from ngrx store in Experience\'s Edit Shell component')
    });



    this.monitorForControlChanges();
  }


// PAGE ACTIONS
// ******************************************
// GET THE PAGE TYPE CLASS FOR THE PAGE ACTION BUTTONS COMPONENT
getClass() {
  return this.classe;
}


// GET NEW LOGO URL AND SET IT TO THE CURRENT EXPERIENCE NGRX STORE DATA
processNewLogoUrlRt(returnUrl: string) {
  console.log('New Logo url: ', returnUrl);
  this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceLogoUrl(returnUrl));
}



// ADD A ROLE TO THE STATE
addRole() {
  console.log(this.myTitleAbstractControl?.value);
  console.log(this.myRoleAbstractControl?.value);

  let newRole:Role = {
    id: 'new',
    myRole: this.myRoleAbstractControl?.value,
    myTitle: this.myTitleAbstractControl?.value,
    experienceID: this.experienceID,
    editState: editState.ADD,
    stateHistory: [editState.ADD]
  }
  let newRoles: Role[] = JSON.parse(JSON.stringify(this.roles));
  newRoles.push(newRole);
  console.log(newRoles);
  this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceRoles(newRoles));
  this.myRoleAbstractControl?.setValue('');
  this.myTitleAbstractControl?.setValue('');
}



// TOGGLE A ROLE FOR REMOVAL
toggleRemoveRole(a: Role) {
// DO A DEEP COPY OF the Role because it is readonly because of NGRX
let b = JSON.parse(JSON.stringify(a));

if (b.stateHistory[0] === editState.OK) {
  // TOGGLE STATE BETWEEN REMOVE AND OK
  // OK IS A ROLE FROM THE bACKEND, NOT CREATED THIS SESSION.
  b.editState = a.editState === editState.OK? editState.REMOVE: editState.OK;
}
else {
  // TOGGLE STATE BETWEEN REMOVE AND ADD
  // ADD STATE IS A ROLE THAT WAS CREATED IN THIS SESSION.
  b.editState = a.editState ===editState.ADD? editState.REMOVE: editState.ADD;

}
// ADD to STATE History
b.stateHistory?.push(b.editState);
console.log('pre roles: ', this.roles);
console.log('new roles: ', b);
// DROP AND REPlACE EDITED ROLE FROM THE STORE WITH UPDATED ROLE
this.roles = this.roles?.filter(i => i.id != b.id);
this.roles?.push(b);
console.log('updated roles: ', this.roles );

this.updateRolesStore();
}

// UPDATE THE CURRENT ROLE STORE
updateRolesStore() {
  this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceRoles(this.roles as Role[]));
}



// RESET FORM
resetChanges() {
  this.experienceDataStore.dispatch(new experienceShellActions.ResetCurrentExperienceToOriginal());
}

closeDialog() {
  this.dialogRef.close();
}



  getReqState(b: string): string {
    switch (b) {
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





// SAVE TO DB
saveToDB() {


  if ((this.userBeingViewedId == this.authenticatedUserId) && this.auth) {

    // UPDATE DB IF UPDATING
    this.experienceDataStore.dispatch(new experienceShellActions.UpdateExperienceToDB());
  // CLOSE DIALOG
 this.closeDialog();
  this.router.navigateByUrl('pages/experiences');


  } else {

    //  this.resetChanges();
     this.closeDialog();
     this.router.navigateByUrl('pages/experiences');
  }



}

deleteFromDB() {
  if ((this.userBeingViewedId == this.authenticatedUserId) && this.auth) {
    this.experienceDataStore.dispatch(new experienceShellActions.DeleteExperienceToDB());
  }
    // CLOSE DIALOG
   this.closeDialog();

}

  // FORM HELPERS
  initiateControls() {

    this.companyAbstractControl = this.myExperienceForm.get('company');
    this.titleAbstractControl = this.myExperienceForm.get('title');
    this.startedAbstractControl = this.myExperienceForm.get('started');
    this.completedAbstractControl = this.myExperienceForm.get('completed');
    this.cityAbstractControl = this.myExperienceForm.get('city');
    this.stateAbstractControl = this.myExperienceForm.get('state');
    this.rolesAbstractControl = this.myExperienceForm.get('roles');
    this.logoUrlAbstractControl = this.myExperienceForm.get('logoUrl');
    this.myRoleAbstractControl = this.myExperienceForm.get('myRole');
    this.myTitleAbstractControl = this.myExperienceForm.get('myTitle');

  }
  resetControls() {

    this.companyAbstractControl?.setValue(this.company);

    this.titleAbstractControl?.setValue(this.title);
    this.startedAbstractControl?.setValue(this.started.toISOString().substring(0,10));
    this.completedAbstractControl?.setValue(this.completed);
    this.cityAbstractControl?.setValue(this.city);
    this.stateAbstractControl?.setValue(this.state);
    this.rolesAbstractControl?.setValue(this.roles);
    this.logoUrlAbstractControl?.setValue(this.logoUrl);

  }
  monitorForControlChanges() {

    this.companyAbstractControl?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: value => {
        console.log('new title:', value);
        this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceCompany(value));
      },
      error: err => console.log(),
      complete: () => console.log()
    });
    this.titleAbstractControl?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: value => {
        this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceTitle(value));
      },
      error: err => console.log(),
      complete: () => console.log()
    });
    this.startedAbstractControl?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: value => {
        this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceStarted(value));
      },
      error: err => console.log(),
      complete: () => console.log()
    });
    this.completedAbstractControl?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: value => {
        this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceCompleted(value));
      },
      error: err => console.log(),
      complete: () => console.log()
    });
    this.cityAbstractControl?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: value => {
        this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceCity(value));
      },
      error: err => console.log(),
      complete: () => console.log()
    });
    this.stateAbstractControl?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: value => {
        this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceState(value));
      },
      error: err => console.log(),
      complete: () => console.log()
    });

  }

  // getCurrentExperienceObject(): Experience | undefined {
  //   let current: Experience | undefined;
  //   this.currentExp$.subscribe({
  //     next: (experience: Experience | undefined) => current = experience,
  //     error: err => console.log('OOps sorry, error occured getting the user\'s current experience from store in Experience\'s Edit Shell component: ', err),
  //     complete: () => console.log('Completed: getting user\'s Current Experience from ngrx store in Experience\'s Edit Shell component')
  //   })
  //   return current;
  // }

  // buidFinalExperience(): Experience {

  //   console.log('company', this.companyAbstractControl?.value);
  //   let finalExp: Experience| undefined = {
  //   company: this.companyAbstractControl?.value,
  //   title: this.titleAbstractControl?.value,
  //   started: this.startedAbstractControl?.value,
  //   completed: this.completedAbstractControl?.value,
  //   city: this.cityAbstractControl?.value,
  //   state: this.stateAbstractControl?.value,
  //   roles: this.rolesAbstractControl?.value,
  //   logoUrl: this.logoUrlAbstractControl?.value,
  //   id: this.experienceID,
  //   projectCreatorID: this.projectCreatorID
  //   };
  //   return finalExp;
  // }
}
