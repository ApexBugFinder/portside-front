import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager, UserManagerSettings, User, WebStorageStateStore } from 'oidc-client';
import { AppUser } from '../user/models/user';
import { Constants } from '../Constants';
import { throwError } from 'rxjs';
import { AuthState } from '../auth/state/auth.reducer';
import { Store } from '@ngrx/store';
import { UserState } from '../user/state/user.reducer';
import * as authActions from '../auth/state/auth.actions';
import * as userActions from '../user/state/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private appUser: AppUser = null;
  private userOidc: User;
  private manager = new UserManager(Constants.getClientSettings);
  private userWebStore: WebStorageStateStore;

  constructor(private router: Router,
              private authStore: Store<AuthState>,
              private userStore: Store<UserState>) {

  }

  isLoggedIn(): boolean {
    console.log('Hello from AuthService IsLoggedIn', this.userOidc);

    return this.userOidc != null && !this.userOidc.expired;
  }


  getClaims(): any {
    return this.userOidc.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.userOidc.token_type} ${this.userOidc.access_token}`;
  }

  startAuthentication(): Promise<void> {
    console.log('Hello from AuthService startAuthentication');
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback()
        .then(useraa => {
          console.log('completeAuth in authService', useraa);
          this.userOidc = useraa;
          this.authStore.dispatch(new authActions.SetAuthorizedUserId(useraa.profile.sub));
          this.authStore.dispatch(new authActions.SetAuthenticated());
          this.userStore.dispatch(new userActions.LoadCurrentUser());

        });
    // THIS MIGHT BE THE SPOT TO HANDLE SETAUTHENTICATED USER


  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  logout() {

    this.manager.createSignoutRequest();

    this.userWebStore = new WebStorageStateStore({ store: window.localStorage });
    this.authStore.dispatch(new authActions.ClearAuthorizedUserId());
    this.authStore.dispatch(new authActions.SetNotAuthenticated());
    this.userStore.dispatch(new userActions.ClearCurrentUser());
    this.userWebStore.remove(`user:${Constants.authority}:recipeant2019`);

    this.manager.clearStaleState();
    this.manager.removeUser();
    this.manager.processSignoutResponse();
    this.manager.revokeAccessToken();
    this.router.navigate(['']);


//    this.router.ngOnDestroy();
  }

}
