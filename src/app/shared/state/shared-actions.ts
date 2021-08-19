import { Action }
 from '@ngrx/store';
import { UserState } from 'src/app/user/Models/user';


 export enum SharedActionTypes {
   SET_USER_ID = '[SHARED EFFECTS] SET USER ID FROM SHARE EFFECTS',
   SET_USERNAME = '[USER COMPONENT] SET USERNAME FROM USER COMPONENT',
   SET_PROFILEPIC = '[SHARED EFFECTS] SET PROFILE PIC',
   LOAD_USERSTATE = '[SHARED EFFECTS] LOAD USER STATE FROM USER COMPONENT By Username',
   LOAD_USERSTATE_SUCCESS = '[SHARED EFFECTS] LOAD USER STATE FROM USER COMPONENT  By Username====> SUCCESS',
   LOAD_USERSTATE_FAIL = '[SHARED EFFECTS] LOAD USER STATE FROM USER COMPONENT By Username====> FAIL',

   LOAD_USERSTATE_ByID = '[SHARED EFFECTS] LOAD USER STATE FROM USER COMPONENT By UserID',
   LOAD_USERSTATE_ByID_SUCCESS = '[SHARED EFFECTS] LOAD USER STATE FROM USER COMPONENT  By UserID====> SUCCESS',
   LOAD_USERSTATE_ByID_FAIL = '[SHARED EFFECTS] LOAD USER STATE FROM USER COMPONENT By UserID====> FAIL',
   CLEAR_USER_ID = '[AUTH MODULE] CLEAR USER ID FROM AUTH MODULE',
 }

// USER COMPONENT
 export class SetUserId implements Action {
   readonly type = SharedActionTypes.SET_USER_ID;
   constructor(public payload: string) {}
 }

 export class SetUsername implements Action {
   readonly type = SharedActionTypes.SET_USERNAME;
   constructor(public payload: string) {}
 }

 export class SetUserProfilePic implements Action {
   readonly type = SharedActionTypes.SET_PROFILEPIC;
   constructor(public payload: string) {}
 }

 // SHARED EFFECTS
 export class LoadUserState implements Action {
   readonly type = SharedActionTypes.LOAD_USERSTATE;
   constructor(public payload: string) {}
 }
 export class LoadUserStateSuccess implements Action {
   readonly type = SharedActionTypes.LOAD_USERSTATE_SUCCESS;
   constructor(public payload: string) {}
 }

 export class LoadUserStateFail implements Action {
   readonly type = SharedActionTypes.LOAD_USERSTATE_FAIL;
   constructor(public payload: string) {}
 }


 export class LoadUserStateById implements Action {
  readonly type = SharedActionTypes.LOAD_USERSTATE_ByID;
  constructor(public payload: string) {}
}
export class LoadUserStateByIdSuccess implements Action {
  readonly type = SharedActionTypes.LOAD_USERSTATE_ByID_SUCCESS;
  constructor(public payload: string) {}
}

export class LoadUserStateByIdFail implements Action {
  readonly type = SharedActionTypes.LOAD_USERSTATE_ByID_FAIL;
  constructor(public payload: string) {}
}


export type SharedActions = SetUserId
                                            | SetUsername
                                            | SetUserProfilePic
                                            | LoadUserState
                                            | LoadUserStateSuccess
                                            | LoadUserStateFail
                                            | LoadUserStateById
                                            | LoadUserStateByIdSuccess
                                            | LoadUserStateByIdFail
;
