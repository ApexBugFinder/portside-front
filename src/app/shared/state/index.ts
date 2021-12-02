import * as fromShared from '../state/shared-reducer';
import * as fromRoot from '../../state/app.state';
import * as fromUserData from '../userData/state/userData.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSharedRoot from '../index';


export interface SharedState  {
  sharedState: fromShared.SharedState;

}


export interface State extends fromRoot.State
 {
 sharedState: SharedState
 }


export const selectSharedModuleState = createFeatureSelector<fromShared.SharedState>('sharedState');


 export const getUserId = createSelector(
   fromSharedRoot.selectSharedState,
   state => state.userID
 );

 export const getUserProfilePic = createSelector(
   fromSharedRoot.selectSharedState,
  state => state.profilePic
 );
 export const getDefaultProfilePic = createSelector(
   fromSharedRoot.selectSharedState,
   state => state.defaultProfilePic
 );

 export const getIsLoading = createSelector(
  fromSharedRoot.selectSharedState,
   state => state.isLoading
 );

 export const getUsername = createSelector(
  fromSharedRoot.selectSharedState,
   state => state.username
 );

 export const getDefaultProjectPic = createSelector(
   fromSharedRoot.selectSharedState,
   state => state.defaultProjectPic
 );

 export const  getSideMenuState = createSelector(
   fromSharedRoot.selectSharedState,
   state => state.showSideMenu
 );



