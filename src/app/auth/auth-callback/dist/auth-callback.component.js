"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthCallbackComponent = void 0;
var core_1 = require("@angular/core");
var oidc_client_1 = require("oidc-client");
// import { Constants } from 'src/app/Constants';
// import * as userActions from '../../user/state/user.actions';
// import { UserState } from '../../user/state/user.reducer';
var AuthCallbackComponent = /** @class */ (function () {
    function AuthCallbackComponent(authService, 
    // private authStore: Store<AuthState>,
    // private userStore: Store<UserState>,
    router) {
        this.authService = authService;
        this.router = router;
        this.manager = new oidc_client_1.UserManager(Constants.getClientSettings);
    }
    AuthCallbackComponent.prototype.ngOnInit = function () {
        this.authService.completeAuthentication();
        //  this.userStore.dispatch(new userActions.LoadCurrentUser());
        this.routeTo();
    };
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
    AuthCallbackComponent.prototype.routeTo = function () {
        this.router.navigate(['']);
    };
    AuthCallbackComponent = __decorate([
        core_1.Component({
            selector: 'app-auth-callback',
            templateUrl: './auth-callback.component.html',
            styleUrls: ['./auth-callback.component.scss']
        })
    ], AuthCallbackComponent);
    return AuthCallbackComponent;
}());
exports.AuthCallbackComponent = AuthCallbackComponent;
