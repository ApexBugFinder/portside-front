import { Component, Inject, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProjectData from '../../project/state/project.reducer';
import * as projectDataActions from '../../project/state/project.actions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserState, ViewUserMatDialogData } from '../Models/user';

import * as fromSharedData from '../../shared/userData/state';
import * as SharedDataActions from '../../shared/userData/state/userData.actions';

import * as fromExperienceData from '../../experience/state';
import * as ExperienceDataActions from '../../experience/state/experience.actions';

import * as fromCertData from '../../education/Models/certification/state';
import * as CertDataActions from '../../education/Models/certification/state/certification.actions';

import * as fromDegreeData from '../../education/Models/degree/state';
import * as DegreeDataActions from '../../education/Models/degree/state/degree.actions';

import { faUser, faPen } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { User } from '../../user/Models/user';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  errorPic = 'gs://portfolio-a7105.appspot.com/defaults/user/Icon ionic-md-person.svg';
  iconUser = faUser;
  iconPen = faPen;
  user: User;
  userState$: Observable<(UserState|undefined)[]>;
  userstate: (UserState);
  editMode: boolean = false;
  sun= ''
  profilePic = 'https://firebasestorage.googleapis.com/v0/b/portfolio-a7105.appspot.com/o/users%2FD8D32EA4-5F9D-4BE9-9535-AB69C3F0A112%2FCertification%2F2F72FA2B-C7DE-4DF3-ABAA-5BE1BC1DA233%2FIssuing%20Body%20Logo?alt=media&token=5c74552a-4cb7-4b88-ad1d-d6d584dec31dhttps://firebasestorage.googleapis.com/v0/b/portfolio-a7105.appspot.com/o/users%2FD8D32EA4-5F9D-4BE9-9535-AB69C3F0A112%2FCertification%2F2F72FA2B-C7DE-4DF3-ABAA-5BE1BC1DA233%2FIssuing%20Body%20Logo?alt=media&token=5c74552a-4cb7-4b88-ad1d-d6d584dec31d';
  
  

  constructor(
    private dialogRef: MatDialogRef<ViewUserComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ViewUserMatDialogData,
    private projectStore: Store<fromProjectData.State>,
    private experienceStore: Store<fromExperienceData.ExperienceDataState>,
    private certDataStore: Store<fromCertData.CertificationDataState>,
    private degreeDataStore: Store<fromDegreeData.DegreeDataState>,
    private sharedDataStore: Store<fromSharedData.SharedUserDataState>
  ) {

   this.userState$ = this.sharedDataStore.pipe(select(fromSharedData.selectAllUsers));
  
   }

  ngOnInit(): void {
    console.log(this.data);
    this.user = this.data.user;
    this.sharedDataStore.dispatch(SharedDataActions.selectUser({UserId: this.user.id}));
    this.userState$.subscribe({
      next: (value: (UserState|undefined)[])=> {
        if (value.length>0){
        this.userstate = value?.find(i => i?.id == this.user.id) as UserState;
        }
      }
    })

    
  }

  toProjects() {
    this.projectStore.dispatch(projectDataActions.clearProjects());
    this.projectStore.dispatch(projectDataActions.addProjects({projects: this.data.user.projects}));

    this.experienceStore.dispatch(ExperienceDataActions.clearExperiences());
    this.experienceStore.dispatch(ExperienceDataActions.addExperiences({ experiences: this.data.user.experiences}));

    this.certDataStore.dispatch(CertDataActions.clearCertifications());
    this.certDataStore.dispatch(CertDataActions.addCertifications({Certifications: this.data.user.certifications}));

    this.degreeDataStore.dispatch(DegreeDataActions.clearDegrees());
    this.degreeDataStore.dispatch(DegreeDataActions.addDegrees({Degrees: this.data.user.degrees}));

    this.router.navigate(['pages/projects']);
    this.dialogRef.close();
  }

 

}
