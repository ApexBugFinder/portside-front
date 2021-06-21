import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType,OnInitEffects } from "@ngrx/effects";
import { Action, Store, select } from "@ngrx/store";
import { UserService } from '../Models/user.service';
import * as UserActions from './user.actions';
import * as fromAuth from '../../auth/state';
import * as fromUser from './';
import {User, UserState } from '../Models/user';

import { Observable, of } from "rxjs";
import { map, mergeMap, tap, catchError } from "rxjs/operators";
@Injectable()
export class UserEffects{

    authorizedUserId$: Observable<string>;
    authorizedUserId: string;
    constructor(
        private actions$: Actions,
        private userService: UserService,
        private userStateStore: Store<fromUser.UserState>,
        private authStateStore: Store<fromAuth.State>
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
        ))

}