import { Action } from '@ngrx/store';


export enum AuthActionTypes {
    SET_AUTHENTICATED = '[Auth] SET isAuthenticated True',
    SET_NOT_AUTHENTICATED = '[Auth] SET IsAuthenticated False',

    SET_CURRENT_AUTH_USERID = '[Auth] SET Authorized User',
    CLEAR_CURRENT_AUTH_USERID = '[Auth] CLEAR Authorized User'

}

export class SetAuthenticated implements Action {
    readonly type = AuthActionTypes.SET_AUTHENTICATED;
}

export class SetNotAuthenticated implements Action {
    readonly type = AuthActionTypes.SET_NOT_AUTHENTICATED;
}

export class SetAuthorizedUserId implements Action {
    readonly type = AuthActionTypes.SET_CURRENT_AUTH_USERID;
    constructor(public payload: string) {}
}
export class ClearAuthorizedUserId implements Action {
    readonly type = AuthActionTypes.CLEAR_CURRENT_AUTH_USERID;

}

export type AuthActions = SetAuthenticated
                        | SetNotAuthenticated
                        | SetAuthorizedUserId
                        | ClearAuthorizedUserId
                        ;
