import { Component, OnInit } from '@angular/core';
import * as fromSharedState from '../../shared/state/';
import * as fromSharedData from '../../shared/userData/state';
import {UserState, User, defaultUserState } from '../Models/user';
import { Store, select } from '@ngrx/store';
import { selectCurrentUserId } from '../searchbar-results/state';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})

export class ViewProfileComponent implements OnInit {
  private userID$: Observable<string>;
  userToView: UserState = JSON.parse(JSON.stringify(defaultUserState));
  constructor(
    private sharedStateStore: Store<fromSharedState.SharedState>,
    private sharedDataStore: Store<fromSharedData.SharedUserDataState>
  ) {
    this.userID$ = this.sharedStateStore.pipe(select(fromSharedState.getUserId));
  }

  ngOnInit(): void {
    this.userID$.subscribe({next: (usrId: string)=> {
      if (usrId) {
        this.sharedDataStore.pipe(select(fromSharedData.selectAllUsers)).subscribe({next: (users: (UserState|undefined) [])=>{
          if (users) {
          let found =  users.filter(i => i?.id === usrId)[0];
          if(found)
            this.userToView = JSON.parse(JSON.stringify(found));
          }
        }})
      }
    },
  error: () => {},
  complete: () => {}})
  }
}
