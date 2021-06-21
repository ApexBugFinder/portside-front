import * as fromRoot from '../state/app.state';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUserData from './userData/state/userData.reducer';
import * as fromShared from './state/shared-reducer'

export interface SharedModuleState {
userData: fromUserData.State;
sharedState: fromShared.SharedState;
}

export interface State extends fromRoot.State {
    sharedModule: SharedModuleState
}

export const sharedReducers: ActionReducerMap<SharedModuleState,any> = {
    userData: fromUserData.reducer,
    sharedState: fromShared.sharedReducer

}

export const selectSharedModuleState = createFeatureSelector<SharedModuleState>('shared');

export const selectUserData = createSelector(
    selectSharedModuleState,
    (state: SharedModuleState) => state.userData
);

export const selectSharedState = createSelector(
    selectSharedModuleState,
    (state: SharedModuleState) => state.sharedState
);