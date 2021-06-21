import * as fromUserRoot from '../../';
import { createSelector } from '@ngrx/store';

import * as fromSearchBarResultsData from './searchbar-results.reducer';

export interface SearchBarResultsDataState extends fromUserRoot.UserModuleState {

    searchBarResults: fromSearchBarResultsData.State;
}

export const selectUserIds = createSelector(
    fromUserRoot.selectSearchBarResultsState,
    (state) => state.ids
  );
 
  export const selectUserEntities = createSelector(
    fromUserRoot.selectSearchBarResultsState,
    (state) => state.entities
  );
 
  export const selectAllUsers = createSelector(
    fromUserRoot.selectSearchBarResultsState,
    (state) => Object.values(state.entities)
  );
 
  export const selectUsersTotal = createSelector(
    fromUserRoot.selectSearchBarResultsState,
    (state) => Object.values(state.entities).length
  );
 
  export const selectCurrentUserId = createSelector(
    fromUserRoot.selectSearchBarResultsState,
    (state) => state.selectedUserId
  );
 
  export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) =>
      Object.values(userEntities).find((i) => i?.id == userId)
  );
 
  export const selectAll = createSelector(
    fromUserRoot.selectSearchBarResultsState,
    (state) =>
      (state?.ids as Array<string | number>)?.map((id) => state?.entities[id])
  );
 