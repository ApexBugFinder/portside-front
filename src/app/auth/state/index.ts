import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';


export interface State extends fromRoot.State {
    auth: AuthState;
}


const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getIsAuthenticated = createSelector(
    getAuthFeatureState,
    state => state.isAuthenticated
);

export const getAuthenticatedUserId = createSelector(
    getAuthFeatureState,
    state => state.currentUserId
);
