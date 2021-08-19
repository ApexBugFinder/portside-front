import { SharedActions, SharedActionTypes } from "./shared-actions";

export interface SharedState {
  isLoading: boolean;
  userID: string;
  username: string;
  error: string;
  profilePic: string;
  defaultProfilePic: string;
}

const initialState: SharedState = {
  isLoading: false,
  userID: '',
  username: '',
 error: '',
 profilePic: '',
 defaultProfilePic: 'https://firebasestorage.googleapis.com/v0/b/portfolio-a7105.appspot.com/o/defaults%2Fuser%2FIcon%20ionic-md-person.svg?alt=media&token=de900d75-57db-4d92-b0db-3ccd1bdf6c04',
}


export function sharedReducer (state = initialState, action: SharedActions): SharedState {
   switch(action.type) {
     case SharedActionTypes.SET_USER_ID
     || SharedActionTypes.LOAD_USERSTATE_SUCCESS:
     return {
       ...state,
       userID: action.payload
     };
     case SharedActionTypes.SET_USERNAME:
       return {
         ...state,
         username: action.payload
       };
  case SharedActionTypes.SET_PROFILEPIC:
    return {
      ...state,
      profilePic: action.payload
    };


     case SharedActionTypes.LOAD_USERSTATE_FAIL:
       return {
         ...state,
         error: action.payload
       };
       case SharedActionTypes.LOAD_USERSTATE_ByID_FAIL:
         return {
           ...state,
           error: action.payload
         };
     default:
       return state;
   };
}
