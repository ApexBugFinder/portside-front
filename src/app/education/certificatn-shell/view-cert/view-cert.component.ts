import { Component, Input, OnInit } from '@angular/core';
import { Certification } from '../../Models/certification/certification';
import { Store, select } from '@ngrx/store';
import * as
  CertificationActions from '../state/certification-shell.actions';
import * as fromCertificationShell  from '../state/certification-shell.reducer';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditCertificationShellComponent } from '../edit-certification-shell/edit-certification-shell.component';
import * as fromAuth from '../../../auth/state';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-view-cert',
  templateUrl: './view-cert.component.html',
  styleUrls: ['./view-cert.component.scss']
})
export class ViewCertComponent implements OnInit {
  isAuth$: Observable<boolean>;
  private isAuth: boolean;
  authID$: Observable<string>;
  private authID: string;
@Input() myCert: Certification;
testDate: Date;
  constructor(
    private certificationShellStore: Store<fromCertificationShell.CertificationShellState>,
    private dialog: MatDialog,
    private authStore: Store<fromAuth.State>
  ) {
    this.isAuth$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
    this.authID$ = this.authStore.pipe(select(fromAuth.getAuthenticatedUserId));
  }

  ngOnInit(): void {
    this.isAuth$. subscribe( {
    next:(authState: boolean) =>{
      this.isAuth = authState;
    },
    complete: () => console.log('Completed successfully fetching isAuth State from AuthState'),
    error: (err) => console.log('OOPs something went wrong fetching isAuth State from the AuthState',err)}
    );

    this.authID$. subscribe( {
    next:(id: string) =>{
      this.authID = id;
    },
    complete: () => console.log('Completed successfully fetching authorized User ID from Auth State'),
    error: (err) => console.log('OOPs something went wrong fetching authorized UserID from Auth State',err)}
    );
  }

  editCert() {
    // Set myCert to current Certifiation
if (this.myCert.projectCreatorID == this.authID && this.isAuth) {

console.log(this.myCert);
this.certificationShellStore.dispatch(
  new CertificationActions.SetOriginalCertificationFromViewCert(this.myCert)
);

// start edit dialog
const dialogRef = this.dialog.open(EditCertificationShellComponent, {
  panelClass: "custom-modalbox2",
});

}



  }
}
