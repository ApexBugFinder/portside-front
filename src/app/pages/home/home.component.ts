import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isMobile } from 'src/app/helpers/helperFunctions';
import * as fromUser from '../../user/searchbar-results/state';
import * as searchBarActions from '../../user/searchbar/state/searchbar.actions';
import * as fromShared from '../../shared/state';
import * as SharedActions from '../../shared/state/shared-actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  resultsTotal$: Observable<number>;
  loggedInMenuOpen$: Observable<boolean>;

  constructor(private searchBarStore: Store<fromUser.SearchBarResultsDataState>,
    private sharedStore: Store<fromShared.SharedState>) {
    this.resultsTotal$ = this.searchBarStore.pipe(select(fromUser.selectUsersTotal));
    this.loggedInMenuOpen$ = this.sharedStore.pipe(select(fromShared.getSideMenuState));
   }

  ngOnInit(): void {
   

  }

}
