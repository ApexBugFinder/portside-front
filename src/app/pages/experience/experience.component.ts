import { Component, DoCheck, OnInit } from '@angular/core';
import {
faPencilAlt,
faAnchor
} from '@fortawesome/free-solid-svg-icons';
import { defaultExperience, Experience } from 'src/app/experience/Models/experience';
import { ExperienceService } from 'src/app/experience/experience.service';


import { defaultRole, Role } from 'src/app/experience/Models/role';
import { Observable, of } from 'rxjs';

import { Store, select }from '@ngrx/store';
import * as fromExperienceData from '../../experience/state';
import * as fromExperienceShell from '../../experience/experience-shell/state';
import * as experienceDataActions from '../../experience/state/experience.actions';
import * as experienceShellActions from '../../experience/experience-shell/state/experience-shell.actions';

import {first, takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { EditModalShellComponent } from 'src/app/experience/editModal/edit-modal-shell/edit-modal-shell.component';
import { makeid } from 'src/app/helpers/helperFunctions';
import { MakeGuid } from '../../helpers/make-guid';
import * as fromShared from '../../shared/state';
import * as fromAuth from '../../auth/state';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  userID$: Observable<string>;
 private  userID: string;
  experienceData$: Observable<(Experience | undefined)[]>;
  experienceDataTotal$: Observable<Number>;
  currentExperience$: Observable<Experience>;
  currentExperience: Experience;
  experienceDataTotal: Number;
  experienceData: (Experience | undefined) [];
  role1: Role;
  role2: Role;
  itemToSend: Experience;
  first: boolean = false;
  focalPoint: number = 0;
  focusedAt: number = 0;
  faAnchor = faAnchor;
  pageClass= "Experience";

  authenticatedUserID$: Observable<string>;
  isAuthenticated$: Observable<boolean>;
  isAuthenticated: boolean;

  constructor(private experienceService: ExperienceService,
    private experienceDataStore: Store<fromExperienceData.ExperienceDataState>,
    public dialog: MatDialog,
    private authStore: Store<fromAuth.State>,
    private sharedStore: Store<fromShared.SharedState>,
    private experienceShellStore: Store<fromExperienceShell.ExperienceShellState>) {
      this.userID$ = this.sharedStore.pipe(select(fromShared.getUserId));
    this.experienceData$ = this.experienceDataStore.pipe(select(fromExperienceData.selectAllExperiences));
    this.currentExperience$ = this.experienceShellStore.pipe(select(fromExperienceShell.getCurrentExperience));
    this.experienceDataTotal$ = this.experienceDataStore.pipe(select(fromExperienceData.selectExperiencesTotal));
    this.isAuthenticated$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
    this.authenticatedUserID$ = this.authStore.pipe(select(fromAuth.getAuthenticatedUserId));
  }



  ngOnInit(): void {
    this.pageClass = 'Experience';
    this.currentExperience$.subscribe({
      next: (value: Experience) => {
        this.currentExperience = value;
        console.log('currentExperience is: ', value);
        console.log('experienceDatat: ', this.experienceData);
        if(this.currentExperience && (this.experienceData?.length>0))
        this.focusedAt = this.experienceData?.findIndex(i => i?.id == this.currentExperience.id);
        console.log('my new focal point: ', this.focusedAt);
        console.log('My current experience on Component Page', value);
      },
      error: err => console.log('OOps sorry, error occured getting the user\'s current experience from store in Experiences component: ', err),
      complete: () => console.log('Completed getting user\'s Current Experiences from ngrx store in Experiences component')
    });

     this.userID$.subscribe({
       next: (value) => {
         if (value) {
           this.userID = value;
         }
       },
       error: (err) =>
         console.log(
           "OOps sorry, error occured getting the user's ID from Shared State store in  Experience component:",
           err
         ),
       complete: () =>
         console.log(
           "Completed getting user's ID ngrx Shared State store in Experience component"
         ),
     });
     this.isAuthenticated$.subscribe({
      next: (value:boolean) => {
        
          this.isAuthenticated = value;
        
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user's isAuthenticated from Auth State store in  Experience component:",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting user's isAuthenticated ngrx Auth State store in Experience component"
        ),
    });
this.experienceData$.subscribe({
    next: (value) => {
      this.experienceData = (value) as Experience[];
      this.focusExperience();


      console.log('My experiences called from DB into experiences Component Page', value);
     return value;
     },
    error: err => console.log('OOps sorry, error occured getting the user\'s experiences from store in Experiences component: ', err),
    complete: () => console.log('Completed getting user\'s Experiences from ngrx store in Experiences component')
  });

    this.experienceDataTotal$.subscribe({
      next: (value) => {
        this.experienceDataTotal = (value);

        console.log('Total Number of experiences called from DB into NGRX state into experiences Component Page', value);
       return value;
       },
      error: err => console.log('OOps sorry, error occured getting the Total of user\'s Experiences from store in Experiences component: ', err),
      complete: () => console.log('Completed getting user\'s Experiences from ngrx store inExperiences component')
    });


  }

  createExperience() {
    // SET CURRENT EXPERIENCE AS DEFAULT EXPERIENCE
    // GET DEFAULT EXPERIENCE
    let newExp: Experience = JSON.parse(JSON.stringify(defaultExperience));
    // CREATE  NEW ID WITH 'new-' PREFIX
    newExp.id = JSON.stringify((new  MakeGuid()).id);
    newExp.projectCreatorID = this.userID;
    this.experienceShellStore.dispatch(new experienceShellActions.SetOriginalExperience(newExp));
    this.experienceShellStore.dispatch(new experienceShellActions.SaveExperienceToDB);








    // OPEN DIALOG OF EDIT MODAL SHELL
    const dialogRef = this.dialog.open(EditModalShellComponent, {
      width: '980px',
      panelClass: 'custom-modalbox'
    });
  }

  focusExperience() {
    if (this.currentExperience.id === '' && this.experienceData.length> 0) {
      let focalPoint = 0;
      this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(this.experienceData[focalPoint] as Experience));
    }


  }

  upOneExperience() {
  console.log(this.currentExperience);
    // GET INDEX NUMBER OF CURRENT EXPERIENCE
    console.log('the experienceData: ', this.experienceData);
    let focusedAtLocal = this.experienceData.findIndex(i => i?.id == this.currentExperience.id);
    console.log('index number of current Experience: ', focusedAtLocal);
    // CHECK TO TO SEE IF INDEX NUMBER IS LAST NUMBER
    let dataArrayLength = this.experienceData.length;
    console.log('what is the length of data array: ', this.experienceData.length);

    if (focusedAtLocal < (this.experienceData.length -1 )){
    // ADD ONE TO INDEX NUMBER
      focusedAtLocal ++;
      console.log('focused new value: ', focusedAtLocal);
      console.log('new Experience from experienceData: ', this.experienceData[focusedAtLocal]);
      // GET EXPERIENCE WITH INDENTICAL INDEX NUMBER
      this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(this.experienceData[focusedAtLocal] as Experience));
    }


  }
  downOneExperience() {
    console.log('current experience is: ', this.currentExperience);
    // GET INDEX NUMBER OF CURRENT EXPERIENCE
    console.log('the experienceData: ', this.experienceData);
    let focusedAtLocal = this.experienceData.findIndex(i => i?.id == this.currentExperience.id);
    console.log('index number of current Experience: ', focusedAtLocal);
    // CHECK TO TO SEE IF INDEX NUMBER IS LAST NUMBER
    let dataArrayLength = this.experienceData.length;
    console.log('what is the length of data array: ', this.experienceData.length);

    if (focusedAtLocal >= 1){
    // SUBTRACT ONE TO INDEX NUMBER
     focusedAtLocal--;

      console.log('focused new value: ', focusedAtLocal);
      // GET EXPERIENCE WITH INDENTICAL INDEX NUMBER
      this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(this.experienceData[focusedAtLocal] as Experience));
    }


  }
}
