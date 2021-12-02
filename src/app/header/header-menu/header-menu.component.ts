import { Component, OnInit } from '@angular/core';
import { ViewUserComponent } from '../../user/view-user/view-user.component';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import * as fromShared from '../../shared/state';
import * as sharedActions from '../../shared/state/shared-actions';

import * as fromSharedData from '../../shared/userData/state';
import * as sharedDataActions from '../../shared/userData/state/userData.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState, ViewUserMatDialogData } from 'src/app/user/Models/user';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: "app-header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
})
export class HeaderMenuComponent implements OnInit {
  // get current profile userId from shared
  profileToViewUserId$: Observable<string>;
  userId: string;

  // get data for userId shared userData
  userData$: Observable<UserState | undefined>;
  userDataRepo$: Observable<(UserState | undefined)[]>;
  userDataInfo: UserState | undefined;
  // Send data to ViewUserComponent
  viewUserData: ViewUserMatDialogData;
  constructor(
    public dialog: MatDialog,
    private sharedStore: Store<fromShared.SharedState>,
    private authService: AuthService,
    private sharedDataStore: Store<fromSharedData.SharedUserDataState>
  ) {
    this.profileToViewUserId$ = this.sharedStore.pipe(
      select(fromShared.getUserId)
    );
    this.userData$ = this.sharedDataStore.pipe(
      select(fromSharedData.selectCurrentUser)
    );
    this.userDataRepo$ = this.sharedDataStore.pipe(
      select(fromSharedData.selectAllUsers)
    );
  }

  ngOnInit(): void {
    this.profileToViewUserId$.subscribe({
      next: (userID: string) => {
      if( userID) {
        this.userId = userID;
          this.userDataRepo$.subscribe({
            next: (users) => {
              if (users) {
                this.userDataInfo = users.filter(
                  (i) => i?.id == this.userId
                )[0];
                this.viewUserData.user = JSON.parse(
                  JSON.stringify(this.userDataInfo)
                );
              }
            },
            complete: () => {},
            error: () => {},
          });

      }
      },
      complete: () => {},
      error: (err) => {
        console.log('There was an error getting the userData from sharedState:', err);
      }
    });
  //   this.userData$.subscribe({
  //     next: (userInfo: UserState | undefined) => {
  //       if (userInfo) {
  //         this.viewUserData = {
  //           user: userInfo as UserState,
  //         };
  //       }
  //     },
  //     complete: () => {},
  //     error: (err) => {
  //       console.log(
  //         "There was an error getting the userData from sharedState:",
  //         err
  //       );
  //     },
  //   });
  }
  viewUser() {
    console.log("userID: ", this.userId);

    console.log("viewUserData: ", this.viewUserData);

    let config: MatDialogConfig = {
      width: "600px",
      panelClass: "custom-modalbox2",
      hasBackdrop: true,
      data: this.viewUserData,
    };

    const dialogRef = this.dialog.open(ViewUserComponent, config);
  }

  logout() {
    this.authService.logout();
  }
}
