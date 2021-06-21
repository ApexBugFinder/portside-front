import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControlName, AbstractControl } from '@angular/forms';
import {  faSearchDollar, faSearch } from '@fortawesome/free-solid-svg-icons'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import * as fromSearchBar from '../searchbar/state';
import * as SearchBarActions from '../searchbar/state/searchbar.actions'

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  faSearchDollar= faSearchDollar;
  faSearch = faSearch;
  searchForm: FormGroup;
  searchInputAbstractControl: AbstractControl| null;
  constructor(
    private fb: FormBuilder, 
    private searchBarStore: Store<fromSearchBar.SearchBarState>,
    ) { 
    this.searchForm = this.fb.group({
      searchInput: ['']
    });

    this.searchBarStore.pipe(select(fromSearchBar.selectSearchWord))
      .subscribe(value => console.log(value));
  }

  ngOnInit(): void {
    this.initControls();
    this.monitorAndControl();
  }

  initControls() {
    this.searchInputAbstractControl = this.searchForm.get('searchInput');
  }

  monitorAndControl() {
    this.searchInputAbstractControl?.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged()).subscribe({
      next: (value:string) => {
        console.log(value);
        
      },
      error: (err:string) => console.log(
        '',
        err
        ),
      complete: () => console.log(
        ''
      )                                                   
    })
  }

  searchWord() {
    let searchy = null;
    searchy = this.searchInputAbstractControl?.value;
    if (searchy && searchy != null) {
    this.searchBarStore.dispatch(new SearchBarActions.SetSearchbarSearchWord(searchy));
     this.searchBarStore.dispatch(new SearchBarActions.LoadsSearchBarSearchWord());

     
    }
  }
}
