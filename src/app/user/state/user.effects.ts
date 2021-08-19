import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType,OnInitEffects } from "@ngrx/effects";
import { Action, Store, select } from "@ngrx/store";
import { UserService } from '../Models/user.service';
import * as UserActions from './user.actions';
import * as fromAuth from '../../auth/state';
import * as fromUser from './';
import {User, UserState } from '../Models/user';
import * as UserSharedData from '../../shared/userData/state';
import * as UserSharedDataActions from '../../shared/userData/state/userData.actions';

import { Observable, of } from "rxjs";
import { map, mergeMap, tap, catchError } from "rxjs/operators";
@Injectable()
export class UserEffects{
    myUser: User;
    myUserState: UserState|undefined;
    authorizedUserId$: Observable<string>;
    authorizedUserId: string;
    constructor(
        private actions$: Actions,
        private userService: UserService,
        private userStateStore: Store<fromUser.UserState>,
        private authStateStore: Store<fromAuth.State>,
        private userDataStore: Store<UserSharedData.SharedUserDataState>
    ) {
        this.authStateStore.pipe(select(fromAuth.getAuthenticatedUserId))
        .subscribe({
            next: (value) => {
                this.authorizedUserId = value;
            },
            error: (err: string) => console.log(
                "OOps sorry, error occured getting the authorized user's Id from the Authentication store in User Effects: ",
                err
            ),
            complete: () => console.log(
                "Completed getting Authorized User's ID from ngrx Authentication store in User Effects"
            ),

        });
        this.userStateStore
          .pipe(select(fromUser.getCurrentUserInfo))
          .subscribe({
            next: (value) => {
              if (value) this.myUser = value;
            },
            error: (err: string) =>
              console.log(
                "OOps sorry, error occured getting the user Id from the User store in User Effects: ",
                err
              ),
            complete: () =>
              console.log(
                "Completed getting User from User store in User Effects"
              ),
          });

          this.userDataStore
            .pipe(select(UserSharedData.selectAllUsers))
            .subscribe({
              next: (value ) => {
                if (value.length>0) {
                  this.myUserState = value.filter(i => i?.id === this.myUser.id)[0];

                }
              },
              error: (err: string) =>
                console.log(
                  'OOps sorry, error occured getting the Shared User Data from the Shared Data store in User Effects: ',
                  err
                ),
              complete: () =>
                console.log(
                  'Completed getting the Shared User Data from the Shared Data storee in User Effects'
                ),
            });;
    }


    LoadUserStateByAuthorizedUserId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                UserActions.UserActionTypes
                    .LOAD_USER_STATE
        ),
        mergeMap(
            (
                action: UserActions.LoadUserState
            ) =>
            this.userService.getUserById(this.authorizedUserId)
            .pipe(
                    tap(
                        () => console.log(
                        'NGRX EFFECT - READ ALL USER\'S FROM DB'
                        )
                    ),
                    map(
                        (payload: UserState) => {

                        return new UserActions.LoadUserStateSuccess();
                    }),
                    catchError((err)=>
                        of(
                            new UserActions.LoadUserStateFail(
                                err
                            )
                        )
                    )
            )
        )
        ));
      UpdateUserInfo$ = createEffect(() =>
        this.actions$.pipe(
          ofType(UserActions.UserActionTypes.UPDATE_USER),
          mergeMap(
            (action: UserActions.UpdateUser) =>
            this.userService.updateUserInfo(this.myUser)
            .pipe(tap((value) => console.log('NGRX EFFECT - UPDATED USER: ', value)

            ), map((payload:User) => {
              if(this.myUserState && payload) {
               let b: UserState = JSON.parse(JSON.stringify(this.myUserState));
                b.username = payload.username;
                b.email = payload.username;
                
                this.userDataStore.dispatch(UserSharedDataActions.upsertUser({UserState: b}));
            }
              return new UserActions.UpdateUserSuccess(payload);
            }), catchError((err) => of(new UserActions.UpdateUserFail(err))))
          )
        )
      );

}
