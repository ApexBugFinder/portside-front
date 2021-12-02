import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select  } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Certification } from '../../Models/certification/certification';
import * as fromCertficationShell from '../state';
import * as CertificationActions from '../state/certification-shell.actions';
import * as fromShared from '../../../shared/state';
import * as fromAuth from '../../../auth/state';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ThemePalette } from '@angular/material/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-edit-certification-shell',
  templateUrl: './edit-certification-shell.component.html',
  styleUrls: ['./edit-certification-shell.component.scss'],
})
export class EditCertificationShellComponent implements OnInit {
  faClose = faTimesCircle;
  certificationForm: FormGroup;
  myCert$: Observable<Certification>;
  myCert: Certification;
  viewUserId$: Observable<string>;
  userBeingViewedId: string;
  authenticatedUserId$: Observable<string>;
  authenticatedUserId: string;
  authenticated$: Observable<boolean>;
  auth: boolean;
  origValues: boolean= true;
  certNameAbstractControl: AbstractControl | null;
  certIDAbstractControl: AbstractControl | null;
  isActiveAbstractControl: AbstractControl | null;
  issuingBodyNameAbstractControl: AbstractControl | null;
  issuingBodyLogoAbstractControl: AbstractControl | null;
  issuedDateAbstractControl: AbstractControl | null;
  controllerClass: string = 'Certification';
  myColor: ThemePalette = 'primary';
  constructor(
    private fb: FormBuilder,
    private sharedStore: Store<fromShared.SharedState>,
    private authStore: Store<fromAuth.State>,
    private renderer: Renderer2,
    private certificationShellStore: Store<fromCertficationShell.CertificationShellState>,
    private dialogRef: MatDialogRef<EditCertificationShellComponent>
  ) {
    this.authenticated$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
    this.authenticatedUserId$ = this.authStore.pipe(select(fromAuth.getAuthenticatedUserId));
    this.viewUserId$ = this.sharedStore.pipe(select(fromShared.getUserId));
    this.myCert$ = this.certificationShellStore.pipe(
      select(fromCertficationShell.getCurrentCertification)
    );
    this.certificationForm = this.fb.group({
      certName: [''],
      certID: [''],
      isActive: [false],
      issuingBodyName: [''],
      issuingBodyLogo: [''],
      issuedDate: [''],
    });
  }

  ngOnInit(): void {
    this.myCert$.subscribe({
      next: (value: Certification) => {
        if (value.id !== '') {
          console.log(value);
          this.myCert = value;
          this.setControls(value);

        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the user's current Certification from store in Education's Certification Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting user's Current Certification from ngrx store in Education's Certification Edit Shell component"
        ),
    });


    this.authenticated$.subscribe({
      next: (value: boolean) => {
        if (value) {
          console.log(value);
          this.auth = value;

        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting the current user's authentication from Auth ngrx store in Education's Certification Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting current user's authentication from Auth ngrx store in Education's Certification Edit Shell component"
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
          "OOps sorry, error occured getting the current user's authenticated UserId from Auth ngrx store in Education's Certification Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting current user's authenticated UserId from Auth ngrx store in Education's Certification Edit Shell component"
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
          "OOps sorry, error occured getting the user being view UserId from Shared ngrx store in Education's Certification Edit Shell component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting the user being viewed UserId from Shared ngrx store in Education's Certification Edit Shell component"
        ),
    });
    this.initiateControls();
    this.monitorControlChanges();
  }

  initiateControls() {
    this.certNameAbstractControl = this.certificationForm.get('certName');
    this.certIDAbstractControl = this.certificationForm.get('certID');
    this.isActiveAbstractControl = this.certificationForm.get('isActive');
    this.issuingBodyNameAbstractControl = this.certificationForm.get('issuingBodyName');
    this.issuingBodyLogoAbstractControl = this.certificationForm.get('issuingBodyLogo');
    this.issuedDateAbstractControl = this.certificationForm.get('issuedDate');
  }
  setControls(cert: Certification) {
    this.certNameAbstractControl?.setValue(cert.certName);
    this.certIDAbstractControl?.setValue(cert.certID);
    this.isActiveAbstractControl?.setValue(cert.isActive);
    this.issuingBodyNameAbstractControl?.setValue(cert.issuingBody_Name);
    this.issuingBodyLogoAbstractControl?.setValue(cert.issuingBody_Logo);
    this.issuedDateAbstractControl?.setValue(cert.issuedDate);
  }



  monitorControlChanges() {
    this.certNameAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
          if (value) {
            this.certificationShellStore.dispatch(
              new CertificationActions.SetCurrentCertificationCertNameFromCertShellEditCpt(
                value as string
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Certification CertName in Education's Certification Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating  user's Current Certification CertName in ngrx store in Education's Certification Edit Shell component"
          ),
      });

    this.certIDAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
          if (value != null) {
            this.certificationShellStore.dispatch(
              new CertificationActions.SetCurrentCertificationIdFromCertShellEditCpt(
                value as string
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Certification IsActive in Education's Certification Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating user's Current Certification IsActive in ngrx store in Education's Certification Edit Shell component"
          ),
      });

    this.isActiveAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: boolean | null) => {
          if (value != null) {
            console.log('CHANGE FROM ABSTRACT', value);
            this.certificationShellStore.dispatch(
              new CertificationActions.SetCurrentCertificationIsActiveFromCertShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Certification IsActive in Education's Certification Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating  user's Current Certification IsActive in ngrx store in Education's Certification Edit Shell component"
          ),
      });

    this.issuingBodyNameAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
          if (value) {
            this.certificationShellStore.dispatch(
              new CertificationActions.SetCurrentCertificationIssuingBodyNameFromCertShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Certification Issuing Body Name in Education's Certification Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating  user's Current Certification Issuing Body Name in ngrx store in Education's Certification Edit Shell component"
          ),
      });

    this.issuingBodyLogoAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
          if (value) {
            this.certificationShellStore.dispatch(
              new CertificationActions.SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Certification Issuing Body Logo in Education's Certification Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating  user's Current Certification Issuing Body Logo in ngrx store in Education's Certification Edit Shell component"
          ),
      });

    this.issuedDateAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: Date | null) => {
          if (value) {
            this.certificationShellStore.dispatch(
              new CertificationActions.SetCurrentCertificationIssuedDateFromCertShellEditCpt(
                value
              )
            );
          }
        },
        error: (err: string) =>
          console.log(
            "OOps sorry, error while updating user's current Certification Issued Date in Education's Certification Edit Shell component: ",
            err
          ),
        complete: () =>
          console.log(
            "Completed updating  user's Current Certification Issued Date in ngrx store in Education's Certification Edit Shell component"
          ),
      });
  }

  getClass() {
    return this.controllerClass;
  }
  processNewLogoUrlRt(returnUrl: string) {
    console.log('newLogoURL: ', returnUrl);
    // this.issuingBodyLogoAbstractControl?.setValue(returnUrl);
    this.certificationShellStore.dispatch(new CertificationActions.SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt(returnUrl));
  }

    deleteFromDB(value: string) {
      if ((this.userBeingViewedId == this.authenticatedUserId) && this.auth) {
    this.certificationShellStore.dispatch(
      new CertificationActions.DeleteCertificationToDB()
    );
    this.dialogRef.close();
      }
  }
  resetChanges(value: string) {
    this.certificationShellStore.dispatch(
      new CertificationActions.ResetCurrentCertificationToOriginal()
    );

  }

  saveToDB(value: string) {

    if ((this.userBeingViewedId == this.authenticatedUserId) && this.auth) {
      this.certificationShellStore.dispatch(
      new CertificationActions.UpdateCertificationToDB()
    );
    this.dialogRef.close();
    }

  }

  isCertActive(event: MatSlideToggleChange) {
    console.log('HELLO');;
    let Ctl = document.getElementById('activeSlideToggleId');
    if (event.checked) {
       this.isActiveAbstractControl?.setValue(true);
console.log('HELLO ADD CLASS');
     this.renderer.addClass(Ctl, 'certIsActive');

    } else if (!event.checked){
       this.isActiveAbstractControl?.setValue(false);
      console.log('HELLO REMOVE CLASS');
      this.renderer.removeClass(Ctl, 'certIsActive');
    }

  }
  closeDialog() {
    this.dialogRef.close();
  }
}
