import * as fromShared from '../state/shared-reducer';
import * as fromRoot from '../../state/app.state';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
export interface SharedModuleState  {
  sharedState: fromShared.SharedState
}


export interface State extends fromRoot.State
 {
 sharedState: SharedModuleState
 }


export const selectSharedModuleState = createFeatureSelector<fromShared.SharedState>('sharedState');


 export const getUserId = createSelector(
   selectSharedModuleState,
   state => state.userID
 );

 export const getIsLoading = createSelector(
   selectSharedModuleState,
   state => state.isLoading
 );

 export const getUsername = createSelector(
   selectSharedModuleState,
   state => state.username
 );




