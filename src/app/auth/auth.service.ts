import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';
// import { AppUser } from '../user/models/user';
import { Constants } from '../helpers/Constants';
import { throwError } from 'rxjs';
import { AuthState } from '../auth/state/auth.reducer';
import { Store } from '@ngrx/store';

import * as authActions from '../auth/state/auth.actions';

import * as fromShared from '../shared/state';
import * as sharedActions from '../shared/state/shared-actions';



// PROJECT DATA STORE
import * as fromProjectData from '../project/state';
import * as projectDataActions from '../project/state/project.actions';
// EXPERIENCE DATA STORE

import * as fromExperiencesData from '../experience/state';
import * as experienceDataActions from '../experience/state/experience.actions';
// CERTIFICATION DATA STORE
import * as fromCertificationData from '../education/Models/certification/state';
import * as certificaitonDataActions from '../education/Models/certification/state/certification.actions';
// DEGREE DATA STORE
import * as fromDegreeData from '../education/Models/degree/state';
import * as degreeDataActions from '../education/Models/degree/state/degree.actions';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // private appUser: AppUser = null;
  private userOidc: User;
  private manager = new UserManager(Constants.getClientSettings);
  private userWebStore: WebStorageStateStore;

  constructor(
    private router: Router,
    private authStore: Store<AuthState>,
    private projectDataStore: Store<fromProjectData.ProjectModuleState>,
    private experienceDataStore: Store<fromExperiencesData.ExperienceDataState>,

    private certificationDataStore: Store<fromCertificationData.CertificationDataState>,
    private degreeDataStore: Store<fromDegreeData.DegreeDataState>,
    private sharedStore: Store<fromShared.SharedState>,

  ) {
    this.userWebStore = new WebStorageStateStore({
      store: window.localStorage,
    });
  }

  isLoggedIn(): boolean {
    console.log("Hello from AuthService IsLoggedIn", this.userOidc);

    return this.userOidc != null && !this.userOidc.expired;
  }

  getClaims(): any {
    return this.userOidc.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.userOidc.token_type} ${this.userOidc.access_token}`;
    //  return `${this.userOidc.access_token}`;
  }

  startAuthentication(): Promise<void> {
    console.log("Hello from AuthService startAuthentication");

    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    console.log("Authentication");
    console.log(window.location.hash);
   // window.location.hash = decodeURIComponent(window.location.hash);
    console.log(window.location.hash);
    const myRedirectUrl = window.location.hash.replace("?", "#");
    console.log('myRedirectURL: ', myRedirectUrl);
    this.manager.clearStaleState();


   return this.manager
      .signinRedirectCallback(myRedirectUrl)
      .then((useraa: User) => {
        console.log("completeAuth in authService", useraa);
        this.userOidc = useraa;
        this.authStore.dispatch(
          new authActions.SetAuthorizedUserId(useraa.profile.sub)
        );
        this.authStore.dispatch(new authActions.SetAuthenticated());
        const userID = JSON.stringify(useraa.profile.sub);
        this.userWebStore.set(
          `user:${Constants.authority}:portfoliofront-access`,
          `${useraa.access_token}`
        );
        // this.userWebStore.set(
        //   `user:${Constants.authority}:portfoliofront-id`,
        //   `${useraa.id_token}`
        // );
        this.sharedStore.dispatch(
          new sharedActions.SetUserId(useraa.profile.sub)
        );


        this.sharedStore.dispatch(
          new sharedActions.LoadUserStateById(useraa.profile.sub)
        );


        this.routeTo();

      }).catch(error => {
        console.log(error);
        this.routeTo();
      } );

    // THIS MIGHT BE THE SPOT TO HANDLE SETAUTHENTICATED USER
  }

  private handleError(err: any) {
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

    this.userWebStore = new WebStorageStateStore({
      store: window.localStorage,
    });
    this.authStore.dispatch(new authActions.ClearAuthorizedUserId());
    this.authStore.dispatch(new authActions.SetNotAuthenticated());
    // CLEAR ALL OF STATE - dont' clear state, unauthorizing will cut off editMOde
    // this.projectDataStore.dispatch(projectDataActions.clearProjects());
    // this.experienceDataStore.dispatch(experienceDataActions.clearExperiences());
    // this.certificationDataStore.dispatch(certificaitonDataActions.clearCertifications());
    // this.degreeDataStore.dispatch(degreeDataActions.clearDegrees());
    this.userWebStore.remove(
      `user:${Constants.authority}:portfoliofront-access`
    );
       this.userWebStore.remove(
         `user:${Constants.authority}:portfoliofront`
       );
    this.userWebStore.remove(`user:${Constants.authority}:portfoliofront-id`);
    this.userWebStore.remove(`oidc:${Constants.authority}:portfoliofront`);
    this.manager.clearStaleState();
    this.manager.removeUser();
    this.manager.processSignoutResponse();
    this.manager.revokeAccessToken();
    this.router.navigate([""]);

    //    this.router.ngOnDestroy();
  }
  routeTo() {
    this.router.navigate(["/pages/home"]);
  }
}
