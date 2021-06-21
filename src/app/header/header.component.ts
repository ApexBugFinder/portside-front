import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faKey, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../auth/state';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faCoffee = faCoffee;
  fakey = faKey;
  faDoor = faDoorOpen;
  isAuth$: Observable<boolean>;
  constructor(private router: Router,
              private authService: AuthService,
              private authStore: Store<fromAuth.State>) { 
                this.isAuth$ = this.authStore.pipe(select(fromAuth.getIsAuthenticated))
              }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
