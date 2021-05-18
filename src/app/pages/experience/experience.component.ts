import { Component, OnInit } from '@angular/core';
import {
faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import { defaultExperience, Experience } from 'src/app/experience/Models/experience';
import { ExperienceService } from 'src/app/experience/experience.service';
import { Constants } from 'src/app/helpers/Constants';
import { Guid } from 'guid-typescript';
import { defaultRole, Role } from 'src/app/experience/Models/role';
import { Observable, of } from 'rxjs';

import { Store, select }from '@ngrx/store';
import * as fromExperienceData from '../../experience/state';
import * as fromExperienceShell from '../../experience/experience-shell/state';
import * as experienceDataActions from '../../experience/state/experience.actions';
import * as experienceShellActions from '../../experience/experience-shell/state/experience-shell.actions';
import * as fromExperiences from '../../experience';
import {first, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { InvokeMethodExpr, ThrowStmt } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { EditModalShellComponent } from 'src/app/experience/editModal/edit-modal-shell/edit-modal-shell.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
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

  pageClass= "Experience";
  constructor(private experienceService: ExperienceService,
    private experienceDataStore: Store<fromExperienceData.ExperienceDataState>,
    public dialog: MatDialog,
    private experienceShellStore: Store<fromExperienceShell.ExperienceShellState>) { 
    this.experienceData$ = this.experienceDataStore.pipe(select(fromExperienceData.selectAllExperiences));
    this.currentExperience$ = this.experienceShellStore.pipe(select(fromExperienceShell.getCurrentExperience));
    this.experienceDataTotal$ = this.experienceDataStore.pipe(select(fromExperienceData.selectExperiencesTotal));
  }


  ngOnInit(): void {
  // this.experienceData$.pipe().subscribe({
  //     next: (value) => {
  //       this.experienceData = (value) as Experience[];
       
        
       
  //       console.log('My experiences called from DB into experiences Component Page', value);
  //      return value;
  //      },
  //     error: err => console.log('OOps sorry, error occured getting the user\'s experiences from store in Experiences component: ', err),
  //     complete: () => console.log('Completed getting user\'s Experiences from ngrx store in Experiences component')
  //   });
  this.currentExperience$.subscribe({
    next: (value: Experience) => {
      this.currentExperience = value;
    },
    error: err => console.log('OOps sorry, error occured getting the user\'s current experience from store in Experiences component: ', err),
    complete: () => console.log('Completed getting user\'s Current Experiences from ngrx store in Experiences component')
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
    const dialogRef = this.dialog.open(EditModalShellComponent, {
      width: '980px',
      panelClass: 'custom-modalbox'
    });
  }
 
  focusExperience() {
    if (this.currentExperience.id === '1234' && this.experienceData.length> 0) {
      let focalPoint = 0;
      this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(this.experienceData[focalPoint] as Experience));
    }
    
    
  }

  upOneExperience() {
    console.log(JSON.stringify(this.experienceData));
    let lastFocus = this.experienceData.indexOf(this.currentExperience) +  1;
    console.log('last focus was: ', lastFocus);
    console.log('Experience Data Length: ', this.experienceData.length);
    if (lastFocus < (this.experienceData.length - 1)) {
      lastFocus++;
      this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(this.experienceData[lastFocus] as Experience));
    }
    console.log('las focus is now: ', lastFocus);
  }
  downOneExperience() {
    console.log(JSON.stringify(this.experienceData));
    let lastFocus = this.experienceData.indexOf(this.currentExperience) + 1;
    console.log('last focus was: ', lastFocus);
    console.log('Experience Data Length: ', this.experienceData.length);
    if (lastFocus > 0) {
      lastFocus--;
      this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(this.experienceData[lastFocus] as Experience));
    }
    console.log('las focus is now: ', lastFocus);
  }
}
