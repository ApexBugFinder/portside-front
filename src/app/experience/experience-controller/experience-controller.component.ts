// Core IMports
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { faAnchor } from '@fortawesome/free-solid-svg-icons';

// Models
import { Experience } from '../Models/experience';

// NGRX STATE
import * as fromExperienceData from '../state';
import * as experienceDataActions from '../state/experience.actions';

import * as fromExperienceShell from '../experience-shell/state';
import * as experienceShellActions from '../experience-shell/state/experience-shell.actions';





@Component({
  selector: 'app-experience-controller',
  templateUrl: './experience-controller.component.html',
  styleUrls: ['./experience-controller.component.scss'],
})
export class ExperienceControllerComponent implements OnInit {


  faAnchor = faAnchor;

  // Listeners
  // ***********
  // IN this component I need to get the experienceData array ☑️
  // I need to subscribe to the experienceData total array ☑️
  // I need subscribe to the current experience for the experienceShell ☑️
  experienceData$: Observable<(Experience | undefined)[]>;
  experienceData: (Experience | undefined)[];
  experienceDataTotal$: Observable<number>;
  experienceDataTotal: number;
  experienceShellCurrentExperience$: Observable<Experience | undefined>;
  currentExperience: Experience | undefined;


  //  Actions
  // *********
  // I need to set the current experience for the experience Shell ☑️

  // Calculations
  // ***********
  // I need to calculate next and previous experience☑️
  focusedAt: number = 0;



  constructor(
    private experienceDataStore: Store<fromExperienceData.ExperienceDataState>,
    private experienceShellStore: Store<fromExperienceShell.ExperienceShellState>,

  ) {
    this.experienceData$ = this.experienceDataStore.pipe(
      select(fromExperienceData.selectAllExperiences)
    );

    this.experienceDataTotal$ = this.experienceDataStore.pipe(
      select(fromExperienceData.selectExperiencesTotal)
    );

    this.experienceShellCurrentExperience$ = this.experienceShellStore.pipe(
      select(fromExperienceShell.getCurrentExperience)
    );

  }

  ngOnInit(): void {
    // EXPERIENCE_DATA []
    this.experienceData$.subscribe({
      next: (value: (Experience | undefined)[]) => {
        this.experienceData = value as Experience[];
        // this.setFocalPoint();
      },
      error: (err) =>
        console.log(
          'OOps, sorry it looks like there was problem when getting the experienceData array from the ExperienceData Store in the Experience Controller',
          err
        ),
      complete: () =>
        console.log(
          'Completed getting the experienceData array in the ExperienceController component'
        ),
    });
    // CURRENT EXPERIENCE
    this.experienceShellCurrentExperience$.subscribe({
      next: (value: Experience | undefined) => {
        // GET current Experience
        if (value != undefined) {
          this.currentExperience = value as Experience;
          this.setFocalPoint();
        }
      },
      error: (err: string) =>
        console.log(
          'OOps, sorry it looks like there was problem when getting the Current Experience from the ExperienceShell in the Experience Controller',
          err
        ),
      complete: () =>
        console.log(
          'Completed getting the current Experience from the experienceShell Store in the ExperienceController component'
        ),
    });

    // EXPERIENCE DATA TOTAL
    this.experienceDataTotal$.subscribe({
      next: (value) => {
        this.experienceDataTotal = value;
        // this.updateFocalPoint();
      },
      error: (err) =>
        console.log(
          'OOps, sorry something went wrong when getting the experience'
        ),
      complete: () =>
        console.log(
          'Completed getting the experienceData total in the experience Controller component'
        ),
    });
  }

  // SETS FORM FIELD WITH CURRENT EXPERIENCE INDEX + 1
  setFocalPoint() {
    console.log('My old focalPoint is: ', this.focusedAt);

    // if the curent Experience has been assigned and the the experienceData has loaded
    // then get focal point

    if (this.currentExperience && this.experienceData?.length > 0) {
      this.focusedAt = this.experienceData?.findIndex(
        (i) => i?.id === this.currentExperience?.id
      );
    } else {
      this.focusedAt = 0;
    }
    // SET the form value for current
    this.printInfo();
    console.log('My new focalPoint is: ', this.focusedAt);


  }

  updateFocalPoint() {
    if (this.currentExperience && this.experienceData.length > 0) {
      console.log('Current focalPoint: ', this.focusedAt);
      this.printInfo();

      this.focusedAt = this.experienceData.findIndex(
        (i) => i?.id === this.currentExperience?.id
      );
    }
  }
  nextExperience() {
    this.printInfo();
    let focalLocal = this.experienceData.findIndex(
      (i) => i?.id === this.currentExperience?.id
    );

    console.log('index number of current Experience: ', focalLocal);
    let dataArrayLength = this.experienceData.length;

    // IF FOCAL POINT INCREASE IS NOT OUT OF BOUNDS
    if (focalLocal < this.experienceData.length - 1) {
      focalLocal++;
      console.log('focused new value', focalLocal);
      let currExp: Experience = this.experienceData[focalLocal] as Experience;
      console.log('new Experience is : ', currExp);
      // SET NEW  CURRENT EXPERIENCE
      this.experienceShellStore.dispatch(
        new experienceShellActions.SetCurrentExperience(currExp)
      );
    }
  }
  previousExperience() {
    this.printInfo();

    let focusedAtLocal = this.experienceData.findIndex(
      (i) => i?.id == this.currentExperience?.id
    );
    console.log('index number of current Experience: ', focusedAtLocal);
    // CHECK TO TO SEE IF INDEX NUMBER IS LAST NUMBER
    let dataArrayLength = this.experienceData.length;
    console.log('what is the length of data array: ', dataArrayLength);

    if (focusedAtLocal >= 1) {
      // SUBTRACT ONE TO INDEX NUMBER
      focusedAtLocal--;

      console.log('focused new value: ', focusedAtLocal);
      // GET EXPERIENCE WITH INDENTICAL INDEX NUMBER
      this.experienceShellStore.dispatch(
        new experienceShellActions.SetCurrentExperience(
          this.experienceData[focusedAtLocal] as Experience
        )
      );
    }
  }

  // HELPERS
  printInfo() {
    console.log('My new current Experience is: ', this.currentExperience);
    console.log('My experienceData array: ', this.experienceData);
    console.log(
      'Current Experience Index Value is: ',
      this.focusedAt
    );
  }
}


