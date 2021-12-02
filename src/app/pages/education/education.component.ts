import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isMobile } from 'src/app/helpers/helperFunctions';
import { AddEducationComponent } from 'src/app/education/add-education/add-education.component';
import { EditCertificationShellComponent } from 'src/app/education/certificatn-shell/edit-certification-shell/edit-certification-shell.component';
import { EditDegreeShellComponent } from 'src/app/education/degree-shell/edit-degree-shell/edit-degree-shell.component';
import { Certification, defaultCert } from 'src/app/education/Models/certification/certification';
import { defaultDegree, Degree } from 'src/app/education/Models/degree/degree';
import { MakeGuid } from 'src/app/helpers/make-guid';


// import NGRX
import * as fromCertificationShell from '../../education/certificatn-shell/state';
import * as certificationShellActions from '../../education/certificatn-shell/state/certification-shell.actions';
import * as fromCertificaitonData from '../../education/Models/certification/state';


import * as fromDegreeShell from '../../education/degree-shell/state';
import * as degreeShellActions from '../../education/degree-shell/state/degree-shell.actions';
import * as fromDegreeData from '../../education/Models/degree/state';
import * as fromShared from '../../shared/state';
import * as SharedActions from '../../shared/state/shared-actions';

import * as fromAuth from '../../auth/state';



@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  loggedInMenuOpen$: Observable<boolean>;
  pageClass= "Education";
  degreeDataTotal$: Observable<number>;
  certificationDataTotal$: Observable<number>;
  userID$: Observable<string>;
  userID: string;
  isMobileScreen: boolean = false;
  authenticatedUserID$: Observable<string>;
  isAuthenticated$: Observable<boolean>;
  constructor(private dialog: MatDialog,
                        private authStore: Store<fromAuth.State>,

                        private degreeShellStore: Store<fromDegreeShell.DegreeShellState>,
                        private sharedStore: Store<fromShared.SharedState>,
                        private certificationDataStore: Store<fromCertificaitonData.CertificationDataState>,
                        private degreeDataStore: Store<fromDegreeData.DegreeDataState>,
                        private certificationShellStore: Store<fromCertificationShell.CertificationShellState>) {
                          this.userID$ = this.sharedStore.pipe(select(fromShared.getUserId));
                          this.authenticatedUserID$  = this.authStore.pipe(select(fromAuth.getAuthenticatedUserId));
                          this.isAuthenticated$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
                          this.certificationDataTotal$ = this.certificationDataStore.pipe(select(fromCertificaitonData.selectCertificationsTotal));
                          this.degreeDataTotal$ = this.degreeDataStore.pipe(select(fromDegreeData.selectDegreesTotal));
                              this.loggedInMenuOpen$ = this.sharedStore.pipe(
                                select(fromShared.getSideMenuState)
                              );
                        }

  ngOnInit(): void {
    let windWidth = window.innerWidth;




    this.userID$.subscribe({
      next: (value) => {
        if (value) {
        this.userID = value;
        this.degreeShellStore.dispatch(
          new degreeShellActions.LoadDegreesByProjectCreatorIDFromDB(this.userID)
        );
        this.certificationShellStore.dispatch(
          new certificationShellActions.LoadCertificationsByProjectCreatorIDFromDB(this.userID)
        );
        }
      },
      error: err => console.log(
        'OOps sorry, error occured getting the user\'s ID from Shared State store in Education component:',
        err
        ),
      complete: () => console.log(
        'Completed getting user\'s ID ngrx Shared State store in Education component'
        )
    });
  }

  createEducation() {
    const dialogRef = this.dialog.open(AddEducationComponent, {
      panelClass: 'custom-modalbox2'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result returned from dialog is: ', result);
      if(result ==='certification') {
        // Create new  Cert


          let newCert : Certification = {
            id: new MakeGuid().id.toString(),
            projectCreatorID: this.userID,
            certID: '',
            certName: 'Certificaiton',
            isActive: true,
            issuingBody_Name: '',
            issuingBody_Logo: '',
            issuedDate: new Date()


          };
        this.certificationShellStore.dispatch(new certificationShellActions.SetCurrentCertificationFromEducationCPT(newCert));
        this.certificationShellStore.dispatch(new certificationShellActions.SaveCertificationToDB(newCert))
        const dialogRef2 = this.dialog.open(EditCertificationShellComponent, {
        panelClass: 'custom-modalbox2'
      });
    }
    if (result == 'degree'){
      // Create new Degree
      let newDegree: Degree = {
        id: new MakeGuid().id.toString(),
        projectCreatorID: this.userID,
        degreeName: "Degree Name",
        degreeType: 'Degree Type',
        minors: 'List Minors',
        institutionLogo: '',
        institution: 'Institution Name',
        city: "City",
        state: 'State',
        graduationYear: new Date(),
        isGraduated: true


      };


      this.degreeShellStore.dispatch(new degreeShellActions.SetCurrentDegreeFromEducationCPT(newDegree));
      this.degreeShellStore.dispatch(new degreeShellActions.SaveDegreeToDB(newDegree));
      const dialogRef3 = this.dialog.open(EditDegreeShellComponent, {
        panelClass: 'custom-modalbox2'
      });
    }
    })
  }



}
