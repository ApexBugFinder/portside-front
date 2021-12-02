import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as fromShared from '../../../shared/state';
import * as fromAuth from '../../../auth/state';
import { ThemePalette } from '@angular/material/core';
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons';
// Models
import {Degree, DegreeType } from '../../Models/degree/degree';

// NGRX
import * as fromDegreeShell from '../state';
import * as degreeActions from '../state/degree-shell.actions';

export type Theme = 'primary' | 'secondary' | 'accent' | 'warn' | undefined;


@Component({
  selector: 'app-edit-degree-shell',
  templateUrl: './edit-degree-shell.component.html',
  styleUrls: ['./edit-degree-shell.component.scss'],
})
export class EditDegreeShellComponent implements OnInit {
  degreeForm: FormGroup;
  faClose = faTimesCircle;
  // ABSTRACTS
  degreeNameAbstractControl: AbstractControl | null;
  degreeTypeAbstractControl: AbstractControl | null;
  minorAbstractControl: AbstractControl | null;
  institutionAbstractControl: AbstractControl | null;
  cityAbstractControl: AbstractControl | null;
  stateAbstractControl: AbstractControl | null;
  graduationYearAbstractControl: AbstractControl | null;
  isGraduatedAbstractControl: AbstractControl | null;

  //  NGRX Observables
  myDegree$: Observable<Degree>;
  currentDegree: Degree;
  institLogoOrig$: Observable<string|undefined>;
  institLogoRecorded: boolean = false;
  institLogo: string;
  viewUserId$: Observable<string>;
  userBeingViewedId: string;
  authenticatedUserId$: Observable<string>;
  authenticatedUserId: string;
  authenticated$: Observable<boolean>;
  auth: boolean;
  readonly myClass: string = 'Degree';
  // readonly myColor: string = 'green';
  // readonly myColor: string = 'rgb(186, 43, 210, 0.6)';
  readonly myColor: ThemePalette = 'primary';
  degreeTypes: DegreeType [] = [
    {value: 'AS', viewValue: 'Associate'},
    { value: 'BS', viewValue: 'Bachelors'},
    { value: 'MS', viewValue: 'Masters'},
    { value: 'PHD', viewValue: 'Doctorate'}
  ];

  constructor(
    private fb: FormBuilder,
    private sharedStore: Store<fromShared.SharedState>,
    private authStore: Store<fromAuth.State>,
    private degreeShellStore: Store<fromDegreeShell.DegreeShellState>,
    private dialogRef: MatDialogRef<EditDegreeShellComponent>
  ) {
    this.degreeForm = this.fb.group({
      degreeName: [''],
      degreeType: [''],
      minor: [''],
      institution: [''],
      city: [''],
      state: [''],
      graduationYear: [''],
      isGraduated: [false],
    });
    this.authenticated$ = this.authStore.pipe(
      select(fromAuth.getIsAuthenticated)
    );
    this.authenticatedUserId$ = this.authStore.pipe(
      select(fromAuth.getAuthenticatedUserId)
    );
    this.viewUserId$ = this.sharedStore.pipe(select(fromShared.getUserId));
    this.myDegree$ = this.degreeShellStore.pipe(
      select(fromDegreeShell.getCurrentDegree)
    );
    this.institLogoOrig$ = this.degreeShellStore.pipe(
      select(fromDegreeShell.getCurrentDegreeInstitutionLogo)
    );
  }

  ngOnInit(): void {
    this.initiateControls();
    this.institLogoOrig$.subscribe(value => {
    if (value && !this.institLogoRecorded)
      this.institLogo =JSON.parse(JSON.stringify(value));
    });
    this.myDegree$.subscribe(value => this.currentDegree = value);
    this.monitorControls();
  }

  initiateControls() {
    this.degreeNameAbstractControl = this.degreeForm.get('degreeName');
    this.degreeTypeAbstractControl = this.degreeForm.get('degreeType');
    this.minorAbstractControl = this.degreeForm.get('minor');
    this.institutionAbstractControl = this.degreeForm.get('institution');
    this.cityAbstractControl = this.degreeForm.get('city');
    this.stateAbstractControl = this.degreeForm.get('state');
    this.graduationYearAbstractControl = this.degreeForm.get('graduationYear');
    this.isGraduatedAbstractControl = this.degreeForm.get('isGraduated');
  }
  monitorControls() {
    this.degreeTypeAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
             console.log("new value: ", value);
          if (value) {

            this.degreeShellStore.dispatch(
              new degreeActions.SetCurrentDegreeDegreeTypeFromDegreeShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Degree Type in Education's Degree Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating user's Current Degree Type  in ngrx store in Education's Degree Edit Shell component"
          ),
      });
    this.degreeNameAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
          if (value) {
            console.log('new value: ', value);
            this.degreeShellStore.dispatch(
              new degreeActions.SetCurrentDegreeDegreeNameFromDegreeShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Degree Name in Education's Degree Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating user's Current Degree Name  in ngrx store in Education's Degree Edit Shell component"
          ),
      });
    this.minorAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
          if (value) {
            this.degreeShellStore.dispatch(
              new degreeActions.SetCurrentDegreeMinorFromDegreeShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Degree Minor in Education's Degree Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating user's Current Degree Minor in ngrx store in Education's Degree Edit Shell component"
          ),
      });

    this.institutionAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
          if (value) {
            this.degreeShellStore.dispatch(
              new degreeActions.SetCurrentDegreeInstitutionFromDegreeShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Degree Institution in Education's Degree Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating user's Current Degree Institution  in ngrx store in Education's Degree Edit Shell component"
          ),
      });

    this.cityAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
          if (value) {
            this.degreeShellStore.dispatch(
              new degreeActions.SetCurrentDegreeCityFromDegreeShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Degree City in Education's Degree Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating user's Current Degree City  in ngrx store in Education's Degree Edit Shell component"
          ),
      });

    this.stateAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
          if (value) {
            this.degreeShellStore.dispatch(
              new degreeActions.SetCurrentDegreeStateDegreeShellEditCpt(value)
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Degree State in Education's Degree Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating user's Current Degree State in ngrx store in Education's Degree Edit Shell component"
          ),
      });

    this.graduationYearAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: Date | null) => {
          if (value) {
            this.degreeShellStore.dispatch(
              new degreeActions.SetCurrentDegreeGraduationYrFromDegreeShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Degree Graduation Year in Education's Degree Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating user's Current Degree Graduation Year in ngrx store in Education's Degree Edit Shell component"
          ),
      });

    this.isGraduatedAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: boolean | null) => {
          if (value) {
            this.degreeShellStore.dispatch(
              new degreeActions.SetCurrentDegreeIsGraduatedFromDegreeShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Degree IsGraduated in Education's Degree Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating user's Current Degree IsGraduated in ngrx store in Education's Degree Edit Shell component"
          ),
      });
  }

  saveToDB(value: string) {
    

    // console.log('userbeingViewd: ', this.userBeingViewedId);
    // console.log('authenticated User ID: ', this. authenticatedUserId);
    // console.log('authorized: ', this.auth);
    // if (
    //   value == 'Save Current' &&
    //   (this.userBeingViewedId == this.authenticatedUserId) &&
    //   this.auth
    // ) {
      // this.degreeShellStore.dispatch(new degreeActions.UpdateDegreeToDB(this.currentDegree));
      this.degreeShellStore.dispatch(new degreeActions.UpdateDegreeToDB());
      this.dialogRef.close();
    // }
  }

  resetChanges(value: string) {
    if (
      value == 'Reset Current' &&
      this.userBeingViewedId == this.authenticatedUserId &&
      this.auth
    )
      this.degreeShellStore.dispatch(
        new degreeActions.ResetCurrentDegreeToOriginal()
      );
  }
  deleteFromDB(value: string) {
    if (
      value == 'Delete Current' &&
      this.userBeingViewedId == this.authenticatedUserId &&
      this.auth
    ) {
      this.degreeShellStore.dispatch(new degreeActions.DeleteDegreeToDB());
      this.dialogRef.close();
    }
  }

  getClass() {
    return this.myClass;
  }

  processNewLogoUrlRt(newUrl: string) {
    console.log('REached RT process', newUrl);

    this.degreeShellStore
      .dispatch(
        new degreeActions.SetCurrentDegreeInstitutionLogoFromDegreeShellEditCpt(newUrl)
        );



  }
  closeDialog() {
    this.dialogRef.close();
  }
}
