import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';
import { User } from 'oidc-client';
import { UserActionTypes, UsersActions } from './user.actions';

export interface UserState {
  error: string;
  id: string;
  username: string;
  email: string;
  userPicUrl: string;
};

const initialState: UserState = {
  error: '',
  id: '',
  username: '',
  email: '',
  userPicUrl: '',
};

export function userReducer(state = initialState, action: UsersActions): UserState {
    switch (action.type) {

        // LOAD EFFECTS
        case UserActionTypes.LOAD_USER_STATE_FAIL:
            return {
                ...state,
                error: action.payload
            };

        // SET
        case UserActionTypes.SET_USERSTATE_CURRENT_AUTH_USER:
            return {
                ...state,
                username: action.payload.username,
                id: action.payload.id,
                email: action.payload.email,
                userPicUrl: action.payload.userPicUrl
            };

        case UserActionTypes.SET_USERSTATE_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case UserActionTypes.SET_USERSTATE_USERID:
            return {
                ...state,
                id: action.payload
            };
        case UserActionTypes.SET_USERSTATE_USERNAME:
            return {
                ...state,
                username: action.payload
            }

        // CLEAR
        case UserActionTypes.CLEAR_USERSTATE_CURRENT_AUTH_USER:
            return {
                ...state,
                id: '',
                username: '',
                email: ''
            };
        case UserActionTypes.CLEAR_USERSTATE_EMAIL:
            return {
                ...state,
                email: ''
            };
        case UserActionTypes.CLEAR_USERSTATE_USERID:
            return {
                ...state,
                id: ''
            };
        case UserActionTypes.CLEAR_USERSTATE_USERNAME:
            return {
                ...state,
                username: ''
            };
        case UserActionTypes.SET_USERSTATE_PROFILE_URL:
          return {
            ...state,
            userPicUrl: action.payload
          };
        case UserActionTypes.CLEAR_USERSTATE_PROFILE_URL:
          return {
            ...state,
            userPicUrl: '',
          };
          case UserActionTypes.UPDATE_USER_SUCCESS:
            return {
              ...state,
              id: action.payload.id,
              username: action.payload.username,
              userPicUrl: action.payload.userPicUrl

            }
        default:
            return {
            ...state
        };
    }
}
