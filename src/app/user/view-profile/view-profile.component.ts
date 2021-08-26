import { Component, OnInit } from '@angular/core';
import * as fromSharedState from '../../shared/state/';
import * as fromSharedData from '../../shared/userData/state';
import {UserState, User, defaultUserState } from '../Models/user';
import { Store, select } from '@ngrx/store';
import { selectCurrentUserId } from '../searchbar-results/state';
import { Observable } from 'rxjs';
import { MakeGuid } from '../../helpers/make-guid';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  private userID$: Observable<string>;
  totalEducation: number;
  totalExperiences: number = 0;
  private userData$: Observable<(UserState | undefined)[]>;
  userToView: UserState = JSON.parse(JSON.stringify(defaultUserState));

  constructor(
    private sharedStateStore: Store<fromSharedState.SharedState>,
    private sharedDataStore: Store<fromSharedData.SharedUserDataState>
  ) {
    this.userID$ = this.sharedStateStore.pipe(
      select(fromSharedState.getUserId)
    );
    this.userData$ = this.sharedDataStore.pipe(
      select(fromSharedData.selectAllUsers)
    );
  }

  ngOnInit(): void {
    this.userID$.subscribe({
      next: (usrId: string) => {
        if (usrId) {
          this.userData$.subscribe({
            next: (users: (UserState | undefined)[]) => {
              if (users) {
                let found = users.filter((i) => i?.id === usrId)[0];
                if (found) {
                  this.userToView = JSON.parse(JSON.stringify(found));
                  this.calculateExperiences();

                }
              }
            },
            error: (err) =>
              console.log(
                "OOps sorry, error occured getting a User's Data from the SharedData store View Profile component: ",
                err
              ),
            complete: () =>
              console.log(
                "Completed getting a User's Information from the shared data store View Profile component"
              ),
          });
        }
      },
      error: (err) =>
        console.log(
          "OOps sorry, error occured getting a User's ID from the Shared store View Profile component: "
        ),
      complete: () =>
        console.log(
          "Completed getting a User's Information from the shared data store View Profile component"
        ),
    });
  }

  calculateExperiences() {
    this.userToView.experiences.forEach((i) => {
    let diff = (i.completed?.getDate() as number) - (i.started?.getDate() as number);
    this.totalExperiences += diff / (1000 * 60 * 60 * 24 *365);
    });
    return this.totalExperiences;
  }



}
