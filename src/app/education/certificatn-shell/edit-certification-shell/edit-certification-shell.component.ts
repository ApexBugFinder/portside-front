import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select  } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Certification } from '../../Models/certification/certification';
import * as fromCertficationShell from '../state';
import * as CertificationActions from '../state/certification-shell.actions';
@Component({
  selector: 'app-edit-certification-shell',
  templateUrl: './edit-certification-shell.component.html',
  styleUrls: ['./edit-certification-shell.component.scss'],
})
export class EditCertificationShellComponent implements OnInit {
  certificationForm: FormGroup;
  myCert$: Observable<Certification>;
  myCert: Certification;
  certNameAbstractControl: AbstractControl | null;
  certIdAbstractControl: AbstractControl | null;
  isActiveAbstractControl: AbstractControl | null;
  issuingBodyNameAbstractControl: AbstractControl | null;
  issuingBodyLogoAbstractControl: AbstractControl | null;
  issuedDateAbstractControl: AbstractControl | null;
  controllerClass: string = 'Certification';
  constructor(
    private fb: FormBuilder,
    private certificationShellStore: Store<fromCertficationShell.CertificationShellState>,
    private dialogRef: MatDialogRef<EditCertificationShellComponent>
  ) {
    this.myCert$ = this.certificationShellStore.pipe(
      select(fromCertficationShell.getCurrentCertification)
    );
    this.certificationForm = this.fb.group({
      certName: [''],
      certId: [''],
      isActive: [false],
      issuingBodyName: [''],
      issuingBodyLogo: [''],
      issuedDate: [''],
    });
  }

  ngOnInit(): void {
    this.myCert$.subscribe({
      next: (value: Certification) => {
        if (value) {
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
    this.initiateControls();
    this.monitorControlChanges();
  }

  initiateControls() {
    this.certNameAbstractControl = this.certificationForm.get('certName');
    this.certIdAbstractControl = this.certificationForm.get('certId');
    this.isActiveAbstractControl = this.certificationForm.get('isActive');
    this.issuingBodyNameAbstractControl = this.certificationForm.get('issuingBodyName');
    this.issuingBodyLogoAbstractControl = this.certificationForm.get('issuingBodyLogo');
    this.issuedDateAbstractControl = this.certificationForm.get('issuedDate');
  }
  setControls(cert: Certification) {
    this.certNameAbstractControl?.setValue(cert.certName);
    this.certIdAbstractControl?.setValue(cert.certId);
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

    this.certIdAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (value: string | null) => {
          if (value) {
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
          if (value) {
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
    this.issuingBodyLogoAbstractControl?.setValue(returnUrl);
    this.certificationShellStore.dispatch(new CertificationActions.SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt(returnUrl));
  }

    deleteFromDB(value: string) {
    this.certificationShellStore.dispatch(
      new CertificationActions.DeleteCertificationToDB()
    );
    this.dialogRef.close();11111
  }
  resetChanges(value: string) {
    this.certificationShellStore.dispatch(
      new CertificationActions.ResetCurrentCertificationToOriginal()
    );

  }

  saveToDB(value: string) {
    console.log('go');
    this.certificationShellStore.dispatch(
      new CertificationActions.UpdateCertificationToDB()
    );
    this.dialogRef.close();
  }
}
