import { AuthActions, AuthActionTypes } from './auth.actions';


export interface AuthState {
    isAuthenticated: boolean;
    currentUserId: string;

}

const initialState: AuthState = {
    isAuthenticated: false,
    currentUserId: ''
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true
            };
        case AuthActionTypes.SET_NOT_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: false
            };
        case AuthActionTypes.SET_CURRENT_AUTH_USERID:
            return {
                ...state,
                currentUserId: action.payload
            };
        case AuthActionTypes.CLEAR_CURRENT_AUTH_USERID:
            return {
                ...state,
                currentUserId: ''
            };
        default :
            return state;
    }
}
