import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';

import { User } from '../user/Models/user';

import * as fromAuth from '../auth/state';
import * as authActions from '../auth/state/auth.actions';
import * as fromUser from '../user/state';
import * as UserActions from '../user/state/user.actions';
import * as fromShared from '../shared/state';
import * as sharedActions from '../shared/state/shared-actions';
import { timeout } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  private appUser: User;

  constructor(private authService: AuthService,
    private authStore: Store<fromAuth.State>,
    private userStateStore: Store<fromUser.UserState>,
    private sharedStore: Store<fromShared.SharedState>,

    private router: Router,
    ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.isLoggedIn()) {
      const myClaims = this.authService.getClaims();
      console.log('MyClaims: ', myClaims);

      this.appUser = {
        id: myClaims.sub,
        username: myClaims.username,
        email: myClaims.email,
        userPicUrl: ''
      };

      this.authenticated(this.appUser);
      return true;
    }
    this.authService.startAuthentication();
    return false;
  }


  authenticated(user: User) {
    console.log('authenticated: ', user);

    // SET AUTHENTICATION STATE
    this.setAuthentication(user.id).then(id => {
      // THEN LOAD STATE FOR USER
      this.userStateStore.dispatch(new UserActions.LoadUserState());
    }).catch(err => {
        console.log('ERROR - while setting authentication state: ', err);
    });


    return true;
  }
  notAuthenticated() {

    this.authStore.dispatch(new authActions.ClearAuthorizedUserId());
    this.authStore.dispatch(new authActions.SetNotAuthenticated());
    this.userStateStore.dispatch(new UserActions.ClearCurrentUser());


    this.authService.logout();
  }

  setAuthentication(id: string): Promise<string> {
    const authenticationPromise = new Promise<string>((resolve, reject) => {
          try {
            setTimeout(() => {
              this.sharedStore.dispatch(new sharedActions.SetUserId(id));
            this.authStore.dispatch(new authActions.SetAuthenticated());
            this.authStore.dispatch(new authActions.SetAuthorizedUserId(id));
            }, 200);
            resolve(id);
          } catch (err) {
            reject(err)
          }
    });

    return authenticationPromise;
  }
}
