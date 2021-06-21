import { SearchBarActions, SearchBarActionTypes } from './searchbar.actions';
export interface SearchBarState {
    error: string;
    searchWord: string;
}
const initialState: SearchBarState = {
    error: '',
    searchWord: ''
}

export function searchBarReducer(state = initialState, action: SearchBarActions): SearchBarState {
    switch(action.type) {
        case SearchBarActionTypes.SET_SEARCHBAR_SEARCH_WORD:
            return {
                ...state,
                searchWord: action.payload
            };
        
        case SearchBarActionTypes.CLEAR_SEARCHBAR_SEARCH_WORD:
            return {
                ...state,
                searchWord: ''
            };
        
        case SearchBarActionTypes.LOADS_SEARCHBAR_SEARCH_WORD_FAIL:
            return {
                ...state,
                error: action.payload
            };
        
        default:
            return {
                ...state
            };
    }
}