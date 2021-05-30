import { Component, Input, OnInit } from '@angular/core';
import { Certification } from '../../Models/certification/certification';
import { Store, select } from '@ngrx/store';
import * as
  CertificationActions from '../state/certification-shell.actions';
import * as fromCertificationShell  from '../state/certification-shell.reducer';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditCertificationShellComponent } from '../edit-certification-shell/edit-certification-shell.component';
@Component({
  selector: 'app-view-cert',
  templateUrl: './view-cert.component.html',
  styleUrls: ['./view-cert.component.scss']
})
export class ViewCertComponent implements OnInit {
@Input() myCert: Certification;
  constructor(
    private certificationShellStore: Store<fromCertificationShell.CertificationShellState>,
    private dialog: MatDialog,
  ) {  }

  ngOnInit(): void {
  }

  editCert() {
    // Set myCert to current Certifiation

    this.certificationShellStore.dispatch(
      new CertificationActions.SetCurrentCertificationFromViewCert(this.myCert)
    );

    // start edit dialog
    const dialogRef = this.dialog.open(EditCertificationShellComponent, {
      
      panelClass: 'custom-modalbox2'
    });


  }
}
