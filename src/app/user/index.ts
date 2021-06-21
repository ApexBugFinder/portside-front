import * as fromRoot from '../state/app.state';
import * as fromUser from './state/user.reducer';
import * as fromSearchBar from './searchbar/state/searchbar.reducer';
import * as fromSearchBarResultsData from './searchbar-results/state/searchbar-results.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


export interface UserModuleState {
    user: fromUser.UserState;
    searchBar: fromSearchBar.SearchBarState;
    searchBarResultsData: fromSearchBarResultsData.State;

}

export interface State extends fromRoot.State {
    userModule: UserModuleState;
}

export const userReducers: ActionReducerMap<UserModuleState, any> = {
    user: fromUser.userReducer,
    searchBar: fromSearchBar.searchBarReducer,
    searchBarResultsData: fromSearchBarResultsData.reducer
}


export const selectUserModuleState = createFeatureSelector<UserModuleState>('userState');

export const selectUserState = createSelector(
    selectUserModuleState,
    (state: UserModuleState) => state.user
);

export const selectSearchBarState = createSelector(
    selectUserModuleState,
    (state: UserModuleState) => state.searchBar
);

export const selectSearchBarResultsState = createSelector(
    selectUserModuleState,
    (state: UserModuleState) => state.searchBarResultsData
);

