import * as fromSharedRoot from '../../index';
import { createSelector } from '@ngrx/store';

import * as fromUserData from './userData.reducer';

export interface SharedUserDataState extends fromSharedRoot.SharedModuleState {

    searchBarResults: fromUserData.State;
}

export const selectUserIds = createSelector(
    fromSharedRoot.selectUserData,
    (state) => state.ids
  );
 
  export const selectUserEntities = createSelector(
    fromSharedRoot.selectUserData,
    (state) => state.entities
  );
 
  export const selectAllUsers = createSelector(
    fromSharedRoot.selectUserData,
    (state) => Object.values(state.entities)
  );
 
  export const selectUsersTotal = createSelector(
    fromSharedRoot.selectUserData,
    (state) => Object.values(state.entities).length
  );
 
  export const selectCurrentUserId = createSelector(
      fromSharedRoot.selectUserData,
    (state) => state.selectedUserId
  );
 
  export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) =>
      Object.values(userEntities).find((i) => i?.id == userId)
  );
 
  export const selectAll = createSelector(
      fromSharedRoot.selectUserData,
    (state) =>
      (state?.ids as Array<string | number>)?.map((id) => state?.entities[id])
  );
 