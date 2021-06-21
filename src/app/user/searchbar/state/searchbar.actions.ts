import { Action } from '@ngrx/store';
import { User, UserState } from '../../Models/user';
import { SearchbarComponent } from '../searchbar.component';

export enum SearchBarActionTypes {
    SET_SEARCHBAR_SEARCH_WORD = '[SEARCHBAR] SETS THE SEARCHBAR SEARCH WORD IN THE SEARCHBAR COMPONENT',
    CLEAR_SEARCHBAR_SEARCH_WORD = '[SEARCHBAR] CLEARS THE SEARCHBAR SEARCH WORD IN THE SEARCHBAR COMPONENT',

    LOADS_SEARCHBAR_SEARCH_WORD = '[SEARCHBAR] LOADS THE SEARCHBAR SEARCH WORD IN THE SEARCHBAR COMPONENT',
    LOADS_SEARCHBAR_SEARCH_WORD_SUCCESS = '[SEARCHBAR] LOADS THE SEARCHBAR SEARCH WORD IN THE SEARCHBAR COMPONENT ***SUCCESS',
    LOADS_SEARCHBAR_SEARCH_WORD_FAIL = '[SEARCHBAR] LOADS THE SEARCHBAR SEARCH WORD IN THE SEARCHBAR COMPONENT ***FAIL',
    
}

export class SetSearchbarSearchWord implements Action {
    readonly type = SearchBarActionTypes.SET_SEARCHBAR_SEARCH_WORD;
    constructor(public payload: string) {}
}

export class ClearsSearchbarSearchWord implements Action {
    readonly type = SearchBarActionTypes.CLEAR_SEARCHBAR_SEARCH_WORD;

}

export class LoadsSearchBarSearchWord implements Action {
    readonly type = SearchBarActionTypes.LOADS_SEARCHBAR_SEARCH_WORD;

}

export class LoadsSearchBarSearchWordSuccess implements Action {
    readonly type = SearchBarActionTypes.LOADS_SEARCHBAR_SEARCH_WORD_SUCCESS;
    constructor(public payload: UserState[]) {}

}
export class LoadsSearchBarSearchWordFail implements Action {
    readonly type = SearchBarActionTypes.LOADS_SEARCHBAR_SEARCH_WORD_FAIL;
    constructor(public payload: string) {}
}

export type SearchBarActions = SetSearchbarSearchWord
                            |   ClearsSearchbarSearchWord
                            |   LoadsSearchBarSearchWord
                            |   LoadsSearchBarSearchWordSuccess
                            |   LoadsSearchBarSearchWordFail
                            ;