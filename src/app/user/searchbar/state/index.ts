import { createSelector } from '@ngrx/store';
import * as fromUserRoot from '../../';
import * as fromSearchBar from '../state/searchbar.reducer'

export interface SearchBarState extends fromUserRoot.State {
    searchBar: fromSearchBar.SearchBarState;
}

export const selectSearchWord = createSelector(
    fromUserRoot.selectSearchBarState,
    (state) => state.searchWord
);
