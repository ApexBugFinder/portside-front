import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Store, select} from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '../../auth/state';

import * as fromShared from '../../shared/state';
import * as sharedActions from '../../shared/state/shared-actions';
import * as fromSharedData from '../../shared/userData/state';
import { User, UserState, ViewUserMatDialogData} from '../../user/Models/user';
import { ViewUserComponent } from '../view-user/view-user.component';
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

  // AUTHENTICATED USER
  authUserId$: Observable<string>;
  authUserData: UserState | undefined;

  userData: UserState | undefined;
  usersData$: Observable<(UserState | undefined)[]>;

  constructor(
    private authStore: Store<fromAuth.State>,
    private userStore: Store<fromShared.SharedState>,
    private userDataStore: Store<fromSharedData.SharedUserDataState>,
    private dialog: MatDialog
  ) {
    this.authUserId$ = this.authStore.pipe(select(fromAuth.getAuthenticatedUserId));

    this.userName$ = this.userStore.pipe(select(fromShared.getUsername));

    this.userId$ = this.userStore.pipe(select(fromShared.getUserId));
    this.userProfilePic$ = this.userStore.pipe(
      select(fromShared.getUserProfilePic)
    );
    this.defaultProfilePic$ = this.userStore.pipe(
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
          this.usersData$.subscribe({

            next: (users) => {
              console.log(
                'loggedin profile authenticated user id users data:',
                users
              );
              if (users && value) {
                this.authUserData = users.filter((i) => i?.id == value)[0];
                console.log('authenticated User Data for profile: ', this.authUserData);
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
              if ((users.length>0) && value) {
                this.userData = users.filter((i) => i?.id == value)[0];
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

  ngOnInit(): void {

  }

  viewProfile() {
    this.userStore.dispatch(new sharedActions.SetUserId(this.id));
    let myData: ViewUserMatDialogData = {
      user: this.userData as UserState,
    };
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data: myData,
      width: 'auto',
      panelClass: 'custom-modalbox2',
    });
  }
}
