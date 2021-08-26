import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, DoCheck, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faArrowCircleLeft,
  faUserGraduate,
  faHistory,
  faBriefcase,
  faUser,
  faHome,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import * as fromAuth from '../../auth/state';

import * as fromShared from '../../shared/state';
import * as sharedActions from '../../shared/state/shared-actions';

import * as fromSharedData from '../../shared/userData/state';

import * as fromUser from '../../user/state';
import * as userActions from '../../user/state/user.actions';
import { User, UserState, ViewUserMatDialogData } from '../../user/Models/user';
import { ViewUserComponent } from '../view-user/view-user.component';
import { share } from 'rxjs/operators';
@Component({
  selector: 'app-logged-in-profile',
  templateUrl: './logged-in-profile.component.html',
  styleUrls: ['./logged-in-profile.component.scss'],
})
export class LoggedInProfileComponent implements OnInit, DoCheck {
  // USER TO VIEW
  userId$: Observable<string>;
  id: string;
  userName$: Observable<string>;
  userProfilePic$: Observable<string>;
  defaultProfilePic$: Observable<string>;
  userToView: User;
  // AUTHENTICATED USER
  authUserId$: Observable<string>;
  authUserData: UserState | undefined;
  authUser: User;
  private authUserId: string;

  userData: UserState | undefined;
  usersData$: Observable<(UserState | undefined)[]>;
  faEducationIcon = faUserGraduate;
  faProjectsIcon = faBriefcase;
  faExperiencesIcon = faHistory;
  faHomeIcon = faHome;
  faKeyIcon = faKey;

  constructor(
    private authStore: Store<fromAuth.State>,
    private renderer: Renderer2,
    private sharedUser: Store<fromShared.SharedState>,
    private userStore: Store<fromUser.UserState>,
    private userDataStore: Store<fromSharedData.SharedUserDataState>,
    private dialog: MatDialog
  ) {
    this.authUserId$ = this.authStore.pipe(
      select(fromAuth.getAuthenticatedUserId)
    );

    this.userName$ = this.sharedUser.pipe(select(fromShared.getUsername));

    this.userId$ = this.sharedUser.pipe(select(fromShared.getUserId));
    this.userProfilePic$ = this.sharedUser.pipe(
      select(fromShared.getUserProfilePic)
    );
    this.defaultProfilePic$ = this.sharedUser.pipe(
      select(fromShared.getDefaultProfilePic)
    );
    this.usersData$ = this.userDataStore.pipe(
      select(fromSharedData.selectAllUsers)
    );
  }
  ngDoCheck(): void {
    this.authUserId$.subscribe({
      next: (value) => {
        if (value) {
          console.log('loggedin profile authenticated user id: ', value);

          let b = document.getElementsByClassName('menuItem');
          let e = document.getElementById('homeId');
          let homeTop = e?.offsetTop as number +  50;
          for (var i =0; i< b.length; i++) {
            let c = b[i] as HTMLElement;
            let p = c.offsetTop + 100;
            console.log(c.id, p);
            this.renderer.setProperty(c, 'top', p);
          }

          this.usersData$.subscribe({
            next: (users) => {
              console.log(
                'loggedin profile authenticated user id users data:',
                users
              );
              if (users && value) {
                this.authUserData = users.filter((i) => i?.id == value)[0];
                this.authUser = {
                  id: this.authUserData?.id as string,
                  userPicUrl: this.authUserData?.userPicUrl as string,
                  username: this.authUserData?.username as string,
                  email: this.authUserData?.email as string
                };
                console.log(
                  'authenticated User Data for profile: ',
                  this.authUserData
                );
              }
            },
            error: (err) =>
              console.log(
                "OOps sorry, error occured getting a User's Data from the SharedData store Logged-In-Profile component: ",
                err
              ),
            complete: () =>
              console.log(
                "Completed getting a User's Information from the shared data store logged-in-profile component"
              ),
          });
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting a User's ID from the Shared store Logged-In-Profile component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting a User's ID Information from the shared store logged-in-profile component"
        ),
    });

    this.userId$.subscribe({
      next: (value) => {
        if (value) {
          console.log('loggedin profile user to view id: ', value);

          this.usersData$.subscribe({
            next: (users) => {
              console.log('loggedin profile usersData: ', users);
              if (users.length > 0 && value) {
                this.userData = users.filter((i) => i?.id == value)[0];

                this.userToView = {
                  id: this.userData?.id as string,
                  email: this.userData?.email as string,
                  userPicUrl: this.userData?.userPicUrl as string,
                  username: this.userData?.username as string
                };
              }
            },
            error: (err) =>
              console.log(
                "OOps sorry, error occured getting a User's Data from the SharedData store Logged-In-Profile component: ",
                err
              ),
            complete: () =>
              console.log(
                "Completed getting a User's Information from the shared data store logged-in-profile component"
              ),
          });
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting a User's ID from the Shared store Logged-In-Profile component: ",
          err
        ),
      complete: () =>
        console.log(
          "Completed getting a User's ID Information from the shared store logged-in-profile component"
        ),
    });
  }

  ngOnInit(): void {}

  viewProfile() {

    this.userStore.dispatch(new userActions.SetCurrentUser(this.userToView));
    this.sharedUser.dispatch(new sharedActions.SetUserId(this.userToView.id));
    this.sharedUser.dispatch(new sharedActions.SetUserProfilePic(this.userToView.userPicUrl));
    this.sharedUser.dispatch(new sharedActions.SetUsername(this.userToView.username));

    let myData: ViewUserMatDialogData = {
      user: this.userData as UserState,
    };
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data: myData,
      width: 'auto',
      panelClass: 'custom-modalbox2',
    });
  }

  viewAuthProfile() {
    this.userStore.dispatch(new userActions.SetCurrentUser(this.authUser));
    this.sharedUser.dispatch(new sharedActions.SetUserId(this.authUser.id));
    // this.sharedUser.dispatch(new sharedActions.SetUsername(this.authUserData?.username as string));
    // this.sharedUser.dispatch(new sharedActions.SetUserProfilePic(this.authUserData?.userPicUrl as string));
    this.userData = JSON.parse(JSON.stringify(this.authUserData));
   let myData: ViewUserMatDialogData = {
     user: this.authUserData as UserState,
   };
   const dialogRef = this.dialog.open(ViewUserComponent, {
     data: myData,
     width: 'auto',
     panelClass: 'custom-modalbox2',
   });
  }
}
