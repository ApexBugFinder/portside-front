import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../Models/user.service";
import { Store, select } from '@ngrx/store';
import * as fromSearchBar from './index';
import * as fromSearchBarResults from '../../searchbar-results/state';
import * as SearchBarActions from './searchbar.actions';
import * as SearchBarResultsActions from '../../searchbar-results/state/searchbar-results.actions';
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { User, UserState } from "../../Models/user";
import * as fromSharedData from '../../../shared/userData/state'
import * as SharedUserDataAction from '../../../shared/userData/state/userData.actions';
@Injectable()
export class SearchBarEffects {

    private searchyWord: string;
    constructor(
        private actions$: Actions,
        private userService: UserService,
        private sharedUserDataStore: Store<fromSharedData.SharedUserDataState>,
        private searchBarResultsStateStore: Store<fromSearchBarResults.SearchBarResultsDataState>,
        private searchBarStateStore: Store<fromSearchBar.SearchBarState>
    ) {
        this.searchBarStateStore
            .pipe(select(fromSearchBar.selectSearchWord))
            .subscribe((value:string) => {
                this.searchyWord = value;
                console.log(this.searchyWord);
            });
    }

    LoadSearchBarSearch$ = createEffect(
        () => 
        this.actions$.pipe(
            ofType(
                SearchBarActions.SearchBarActionTypes
                    .LOADS_SEARCHBAR_SEARCH_WORD
            ),
            mergeMap(
                (
                    action: SearchBarActions.LoadsSearchBarSearchWord
                ) => this.userService.getUsersByUsernameSearch(this.searchyWord)
                .pipe(
                    tap(() => console.log(
                        'searchyWord: ', this.searchyWord
                    )),
                    map(
                        (payload: UserState[]) => {
                            this.searchBarResultsStateStore.dispatch(SearchBarResultsActions.clearUsers());
                            this.sharedUserDataStore.dispatch(SharedUserDataAction.upsertUsers({Users: payload}));
                            this.searchBarResultsStateStore.dispatch(SearchBarResultsActions.addUsers({ Users: payload }));
                            return new SearchBarActions.LoadsSearchBarSearchWordSuccess(payload);
                        }
                    ),
                    catchError((err) => 
                    of(
                        new SearchBarActions.LoadsSearchBarSearchWordFail(err)
                        )
                    ),
                    
                    
                    
                )
            )
        )
    );
     
}