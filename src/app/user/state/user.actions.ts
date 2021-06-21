import { Action } from '@ngrx/store';
import { User } from '../Models/user';

export enum UserActionTypes {
    LOAD_USER_STATE = '[AUTHGUARD] LOAD USER STATE from AUTH GUARD SERVICE',
    LOAD_USER_STATE_SUCCESS = '[AUTHGUARD] LOAD USER STATE from AUTH GUARD SERVICE **SUCCESS',
    LOAD_USER_STATE_FAIL = '[AUTHGUARD] LOAD USER STATE from AUTH GUARD SERVICE **FAIL',

    // sSET USER NAME USERID AND CURRENT USER
    SET_USERSTATE_USERNAME = '[AUTHGUARD] SET USERNAME OF USERSTATE FROM AUTHGUARD',
    SET_USERSTATE_USERID = '[AUTHGUARD] SET USERiD OF USERSTATE FROM AUTHGUARD',
    SET_USERSTATE_EMAIL = '[AUTHGUARD] SET USER EMAIL OF USERSTATE FROM AUTHGUARD',
    SET_USERSTATE_CURRENT_AUTH_USER = '[AUTHGUARD] SET CURRENT_USER OF USERSTATE FROM AUTHGUARD',

    // CLEAR USERNAME USERID AND CURRENT USER
    CLEAR_USERSTATE_USERNAME = '[AUTHGUARD] CLEAR USERNAME OF USERSTATE FROM AUTHGUARD',
    CLEAR_USERSTATE_CURRENT_AUTH_USER = '[AUTHGUARD] CLEAR CURRENT_USER OF USERSTATE FROM AUTHGUARD',
    CLEAR_USERSTATE_USERID = '[AUTHGUARD] CLEAR USERiD OF USERSTATE FROM AUTHGUARD',
    CLEAR_USERSTATE_EMAIL = '[AUTHGUARD] CLEAR USER EMAIL OF USERSTATE FROM AUTHGUARD',
}

//
export class LoadUserState implements Action {
    readonly type = UserActionTypes.LOAD_USER_STATE;
    
}
export class LoadUserStateSuccess implements Action {
    readonly type = UserActionTypes.LOAD_USER_STATE_SUCCESS;
    

}
export class LoadUserStateFail implements Action {
    readonly type = UserActionTypes.LOAD_USER_STATE_FAIL;
    constructor(public payload: string) {}
}

// SET FROM AUTHGUARD
export class SetUserStateUsername implements Action{
    readonly type = UserActionTypes.SET_USERSTATE_USERNAME;
    constructor(public payload: string) {}
}

export class SetUserStateUserId implements Action {
    readonly type = UserActionTypes.SET_USERSTATE_USERID;
    constructor(public payload: string){}

}

export class SetCurrentUser implements Action {
    readonly type = UserActionTypes.SET_USERSTATE_CURRENT_AUTH_USER;
    constructor(public payload: User) {}
}

export class SetUserEmail implements Action {
    readonly type = UserActionTypes.SET_USERSTATE_EMAIL;
    constructor(public payload: string) {}
}

// CLEAR (4)
export class ClearUserStateUsername implements Action{
    readonly type = UserActionTypes.CLEAR_USERSTATE_USERNAME;
    
}

export class ClearUserStateUserId implements Action {
    readonly type = UserActionTypes.CLEAR_USERSTATE_USERID;
    

}

export class ClearCurrentUser implements Action {
    readonly type = UserActionTypes.CLEAR_USERSTATE_CURRENT_AUTH_USER;
    
}

export class ClearUserEmail implements Action {
    readonly type = UserActionTypes.CLEAR_USERSTATE_EMAIL;
    
}

export type UsersActions = LoadUserState
                    |   LoadUserStateSuccess
                    |   LoadUserStateFail

                    |   SetCurrentUser
                    |   SetUserEmail
                    |   SetUserStateUserId
                    |   SetUserStateUsername


                    |   ClearCurrentUser
                    |   ClearUserEmail
                    |   ClearUserStateUsername
                    |   ClearUserStateUserId
;