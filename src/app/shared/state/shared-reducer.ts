import { SharedActions, SharedActionTypes } from "./shared-actions";

export interface SharedState {
  isLoading: boolean;
  userID: string;
  username: string;
  error: string;
  profilePic: string;
  defaultProfilePic: string;
  defaultProjectPic: string;
  showSideMenu: boolean;
}

const initialState: SharedState = {
  isLoading: false,
  userID: "",
  username: "",
  error: "",
  profilePic: "",
  defaultProfilePic: "https://firebasestorage.googleapis.com/v0/b/portfolio-a7105.appspot.com/o/defaults%2Fuser%2FIcon%20ionic-md-person.svg?alt=media&token=de900d75-57db-4d92-b0db-3ccd1bdf6c04",
  defaultProjectPic: "https://firebasestorage.googleapis.com/v0/b/portfolio-a7105.appspot.com/o/defaults%2Fsite%2FAsset%203.svg?alt=media&token=489a99e5-166c-454b-8702-fd19b14f3336'",
  showSideMenu: false
};


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
      case SharedActionTypes.LOAD_USERSTATE_ByID_SUCCESS:
        return {
          ...state,
          userID: action.payload.id,
          username: action.payload.username,
          profilePic: action.payload.userPicUrl

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
         case SharedActionTypes.SHOW_SIDE_MENU:
           return {
             ...state,
             showSideMenu: true
           };
        case SharedActionTypes.HIDE_SIDE_MENU:
          return {
            ...state,
            showSideMenu: false
          };
     default:
       return state;
   };
}
