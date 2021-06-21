import { User } from 'oidc-client';
import { UserActionTypes, UsersActions } from './user.actions';

export interface UserState {
    error: string;
    userId: string;
    username: string;
    email?: string;


};

const initialState: UserState = {
    error: '',
    userId: '',
    username: '',
    email: ''
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
                userId: action.payload.id,
                email: action.payload.email
            };
        
        case UserActionTypes.SET_USERSTATE_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case UserActionTypes.SET_USERSTATE_USERID:
            return {
                ...state,
                userId: action.payload
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
                userId: '',
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
                userId: ''
            };
        case UserActionTypes.CLEAR_USERSTATE_USERNAME:
            return {
                ...state,
                username: ''
            };
        
        default: 
            return {
            ...state
        };
    }
}