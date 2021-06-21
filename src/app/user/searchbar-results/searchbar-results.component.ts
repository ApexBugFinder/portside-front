import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import * as fromSearchBarResults from '../searchbar-results/state' ;

@Component({
  selector: 'app-searchbar-results',
  templateUrl: './searchbar-results.component.html',
  styleUrls: ['./searchbar-results.component.scss']
})
export class SearchbarResultsComponent implements OnInit {

  results$: Observable<(User|undefined)[]>;
  constructor(
    private searchbarResultsStore: Store<fromSearchBarResults.SearchBarResultsDataState>
    ) {
      this.results$ = this.searchbarResultsStore.pipe(select(fromSearchBarResults.selectAllUsers))
     }

  ngOnInit(): void {
  }

}
