import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import * as fromExperienceShell from '../../experience-shell/state';
import { Experience } from '../../Models/experience';
import { Role } from '../../Models/role';
import * as experienceShellActions from '../../experience-shell/state/experience-shell.actions';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-edit-modal-shell',
  templateUrl: './edit-modal-shell.component.html',
  styleUrls: ['./edit-modal-shell.component.scss']
})
export class EditModalShellComponent implements OnInit {
  readonly classe: string = 'Experiences';
  originalExp$: Observable<Experience | undefined>;
  id$: Observable<string>;
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
  myExperienceForm: FormGroup;
 

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
  

  constructor(private experienceDataStore: Store<fromExperienceShell.ExperienceShellState>,
    private fb: FormBuilder) { 
    this.originalExp$ = this.experienceDataStore.pipe(select(fromExperienceShell.getOrginalExperience));
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
    this.company$.subscribe({
      next: (value: string) => this.company = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience Company Name from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience Company Name from ngrx store in Experience\'s Edit Shell component')
    });
    this.title$.subscribe({
      next: (value: string) => this.title = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience job Title from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience job Title from ngrx store in Experience\'s Edit Shell component')
    });
    this.started$.subscribe({
      next: (value: Date) => this.started = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience Start Date from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience Start Date from ngrx store in Experience\'s Edit Shell component')
    });
    this.completed$.subscribe({
      next: (value: Date) => this.completed = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience Complete Date from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience Complete Date from ngrx store in Experience\'s Edit Shell component')
    });
    this.city$.subscribe({
      next: (value: string | undefined) => this.city = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience\'s City from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience\'s City from ngrx store in Experience\'s Edit Shell component')
    });
    this.state$.subscribe({
      next: (value: string | undefined) => this.state = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience\'s State from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience\'s State from ngrx store in Experience\'s Edit Shell component')
    });
    this.roles$.subscribe({
      next: (value: Role[] | undefined) => this.roles = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience\'s State from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience\'s State from ngrx store in Experience\'s Edit Shell component')
    });
    this.logoUrl$.subscribe({
      next: (value: string) => this.logoUrl = value,
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience logo Url from store in Experience\'s Edit Shell component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experience logo Url from ngrx store in Experience\'s Edit Shell component')
    });
    this.initiateControls();
    this.resetControls();
  }

  getClass() {
    return this.classe;
  }
  processNewLogoUrlRt(returnUrl: string) {
 console.log('New Logo url: ', returnUrl);
    this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceLogoUrl(returnUrl));
  }





  // HELPERS
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
    this.startedAbstractControl?.setValue(this.started);
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
}
