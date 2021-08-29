import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUser from '../../user/searchbar-results/state';
import * as searchBarActions from '../../user/searchbar/state/searchbar.actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  resultsTotal$: Observable<number>;
  constructor(private searchBarStore: Store<fromUser.SearchBarResultsDataState>) {
    this.resultsTotal$ = this.searchBarStore.pipe(select(fromUser.selectUsersTotal));
   }

  ngOnInit(): void {

  }

}
