import { Component, Inject, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromProjectData from '../../project/state/project.reducer';
import * as projectDataActions from '../../project/state/project.actions';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserState, ViewUserMatDialogData } from '../Models/user';

import * as fromAuth from '../../auth/state';

import * as fromSharedData from '../../shared/userData/state';
import * as SharedDataActions from '../../shared/userData/state/userData.actions';

import * as fromUserState from '../state';
import * as UserActions from '../state/user.actions';

import * as fromExperienceData from '../../experience/state';
import * as ExperienceDataActions from '../../experience/state/experience.actions';

import * as fromCertData from '../../education/Models/certification/state';
import * as CertDataActions from '../../education/Models/certification/state/certification.actions';

import * as fromDegreeData from '../../education/Models/degree/state';
import * as DegreeDataActions from '../../education/Models/degree/state/degree.actions';

import { faUser, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { User } from '../../user/Models/user';
import { Observable } from 'rxjs';
import { MakeGuid } from 'src/app/helpers/make-guid';




@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  isAuth$: Observable<boolean>;
  user$ :Observable<User>;
  userToView: User;
  errorPic =
    'gs://portfolio-a7105.appspot.com/defaults/user/Icon ionic-md-person.svg';
  iconUser = faUser;
  iconPen = faPen;
  iconEye = faEye;
  user: UserState;
  userState$: Observable<(UserState | undefined)[]>;
  userstate: UserState;
  editMode: boolean = false;
  sun = '';
  private originalUser: UserState;
  profilePic =
    'https://firebasestorage.googleapis.com/v0/b/portfolio-a7105.appspot.com/o/users%2FD8D32EA4-5F9D-4BE9-9535-AB69C3F0A112%2FCertification%2F2F72FA2B-C7DE-4DF3-ABAA-5BE1BC1DA233%2FIssuing%20Body%20Logo?alt=media&token=5c74552a-4cb7-4b88-ad1d-d6d584dec31dhttps://firebasestorage.googleapis.com/v0/b/portfolio-a7105.appspot.com/o/users%2FD8D32EA4-5F9D-4BE9-9535-AB69C3F0A112%2FCertification%2F2F72FA2B-C7DE-4DF3-ABAA-5BE1BC1DA233%2FIssuing%20Body%20Logo?alt=media&token=5c74552a-4cb7-4b88-ad1d-d6d584dec31d';
  public readonly eventKey: string = new MakeGuid().id.toString();

  constructor(
    private dialogRef: MatDialogRef<ViewUserComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ViewUserMatDialogData,
    private projectStore: Store<fromProjectData.State>,
    private experienceStore: Store<fromExperienceData.ExperienceDataState>,
    private certDataStore: Store<fromCertData.CertificationDataState>,
    private degreeDataStore: Store<fromDegreeData.DegreeDataState>,
    private sharedDataStore: Store<fromSharedData.SharedUserDataState>,
    private userStore: Store<fromUserState.UserState>,
    private authStore: Store<fromAuth.State>
  ) {
    this.user$ = this.userStore.pipe(select(fromUserState.getCurrentUserInfo));
    this.userState$ = this.sharedDataStore.pipe(
      select(fromSharedData.selectAllUsers)
    );
    this.isAuth$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated));
  }

  ngOnInit(): void {
    console.log(this.data);

    this.user = JSON.parse(JSON.stringify(this.data.user));

    this.userStore.dispatch(new UserActions.SetCurrentUser(this.user));
    this.sharedDataStore.dispatch(
      SharedDataActions.selectUser({ UserId: this.user.id })
    );
    this.user$.subscribe({
      next: (value: User) => {
        if (value) {
          this.userToView = value;
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting a User's Information from the user store Profile View component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed gettinga User's Information from the user store Profile View component"
        ),
    });
    this.router.navigate([{ outlets: { profile: 'view-profile' } }]);
    this.userState$.subscribe({
      next: (value: (UserState | undefined)[]) => {
        if (value.length > 0) {
          this.userstate = value?.find(
            (i) => i?.id == this.user.id
          ) as UserState;
        }
      },
    });
  }

  toBack(key: string) {
    // if (key === this.eventKey) {
      this.dialogRef.close();
    // }
  }
  loadProfile() {

      this.projectStore.dispatch(projectDataActions.clearProjects());
      this.projectStore.dispatch(
        projectDataActions.addProjects({ projects: this.data.user.projects })
      );

      this.experienceStore.dispatch(ExperienceDataActions.clearExperiences());
      this.experienceStore.dispatch(
        ExperienceDataActions.addExperiences({
          experiences: this.data.user.experiences,
        })
      );

      this.certDataStore.dispatch(CertDataActions.clearCertifications());
      this.certDataStore.dispatch(
        CertDataActions.addCertifications({
          Certifications: this.data.user.certifications,
        })
      );

      this.degreeDataStore.dispatch(DegreeDataActions.clearDegrees());
      this.degreeDataStore.dispatch(
        DegreeDataActions.addDegrees({ Degrees: this.data.user.degrees })
      );

}
  toProjects(key: string) {
    console.log('HELLO');
  //  if (key === this.eventKey) {
      this.loadProfile();
      this.router.navigate(['pages/projects']);
      this.dialogRef.close();
    // }
  }
  toExperiences(key: string) {
    //  if (key === this.eventKey) {
       this.loadProfile();
       this.router.navigate(['pages/experiences']);
       this.dialogRef.close();
    //  }
  }
  toEducation(key: string) {
    // if (key === this.eventKey) {
      this.loadProfile();
      this.router.navigate(['pages/education']);
      this.dialogRef.close();
    // }
  }
  getClass() {
    return 'User';
  }
  processNewLogoUrlRt(newAddress: string){
    // update
    this.userStore.dispatch(new UserActions.SetUserProfileUrl(newAddress));
    console.log(newAddress);

    console.log(this.userToView.userPicUrl);
    console.log(this.user.userPicUrl);
  }
  toggleEdit() {
    this.editMode = !this.editMode;
  }

  userCanSave() {
    let truth: boolean = false
    if(
    this.user.email != this.userToView.email ||
    this.user.username != this.userToView.username ||
    this.user.userPicUrl != this.userToView.userPicUrl
    ) {
      truth =  true;
    }
    return truth;
  }

  saveProfile() {
    this.userStore.dispatch(new UserActions.UpdateUser());
    this.editMode = true;
  }
}
