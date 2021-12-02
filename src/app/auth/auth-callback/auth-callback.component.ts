import { Component, OnInit } from '@angular/core';
// import { AppUser } from '../../user/models/user';
import { AuthService } from '../auth.service';
import { WebStorageStateStore, UserManager } from 'oidc-client';
import { Router, ActivatedRoute } from '@angular/router';

import * as authActions from '../state/auth.actions';
import { AuthState } from '../state/auth.reducer';
import { Store, select } from '@ngrx/store';
import { Constants } from 'src/app/helpers/Constants';
import { switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';
// import * as userActions from '../../user/state/user.actions';
// import { UserState } from '../../user/state/user.reducer';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  // private appUser: AppUser;
  id_token$: Observable<string>;


  private userWebStore: WebStorageStateStore;
  private manager: UserManager = new UserManager(Constants.getClientSettings);

  constructor(
    private authService: AuthService,
    
   // private authStore: Store<AuthState>,
   // private userStore: Store<UserState>,
   private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
      const id_token = this.route.snapshot.paramMap.get('id_token');
      const access_token = this.route.snapshot.paramMap.get('access_token');

      console.log('id-token: ', id_token);
      console.log('access_token: ', access_token);
    if (window.location.hash) {
      console.log(window.location.hash);
      console.log(this.router.url);
      console.log(this.route.url);
     window.location.hash = decodeURIComponent(window.location.hash);

     console.log(window.location.hash);

      this.authService.completeAuthentication().then(() => this.routeTo());


    } else {
      this.authService.startAuthentication();
    }

    // this.routeTo();
  //  this.userStore.dispatch(new userActions.LoadCurrentUser());

  }

  // completeAuthentication() {

  //   console.log('from complete authentication');
  //   this.authService.completeAuthentication();

  //   // TODO: dispatch SetAuthenticated
  //   this.authStore.dispatch(new authActions.SetAuthenticated());
  //   // this.manager.getUser().then(user => {
  //   //   console.log('from inside auth-callback complete authentication this manager:', user);
  //   //   this.appUser = {
  //   //     subjectId: user.profile.sub,
  //   //     firstName: user.profile.given_name,
  //   //     lastName: user.profile.family_name,
  //   //     email: user.profile.email

  //   //   };
  //   //   console.log(this.appUser);
  //   // }).then(() => {
  //   //   // SET USER AS CURRENT USER
  //   //   console.log('completeAuth in auth-Callback', this.appUser);
  //   //   this.authStore.dispatch(new authActions.SetAuthorizedUserId(this.appUser.subjectId));

  //   //   this.authStore.dispatch(new authActions.SetAuthenticated());
  //   //   this.userStore.dispatch(new userActions.LoadCurrentUser());

  //   // });

  // }

  routeTo() {
    this.router.navigate(['/pages/projects']);
  }

}
