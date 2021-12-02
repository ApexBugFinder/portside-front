import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromShared from './shared/state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoggedInProfile$: Observable<boolean>;
  title = 'PortSide';
  constructor(private sharedStore: Store<fromShared.SharedState> ) {
    this.showLoggedInProfile$ = this.sharedStore.pipe(select(fromShared.getSideMenuState));
  }
}
