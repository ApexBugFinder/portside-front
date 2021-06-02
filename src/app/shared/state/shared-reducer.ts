import { SharedActions, SharedActionTypes } from "./shared-actions";

export interface SharedState {
  isLoading: boolean;
  userID: string;
  username: string;
  error: string
}

const initialState: SharedState = {
  isLoading: false,
  userID: '',
  username: '',
 error: '',
}


export function sharedReducer (state = initialState, action: SharedActions): SharedState {
   switch(action.type) {
     case SharedActionTypes.SET_USER_ID
     || SharedActionTypes.LOAD_USERSTATE_SUCCESS:
     return {
       ...state,
       userID: action.payload
     };
     case SharedActionTypes.LOAD_USERSTATE_FAIL:
       return {
         ...state,
         error: action.payload
       };
     default:
       return state;
   }
}
