"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var store_1 = require("@ngrx/store");
var UserActions = require("./user.actions");
var fromAuth = require("../../auth/state");
var fromUser = require("./");
var UserSharedData = require("../../shared/userData/state");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var UserEffects = /** @class */ (function () {
    function UserEffects(actions$, userService, userStateStore, authStateStore, userDataStore) {
        var _this = this;
        this.actions$ = actions$;
        this.userService = userService;
        this.userStateStore = userStateStore;
        this.authStateStore = authStateStore;
        this.userDataStore = userDataStore;
        this.LoadUserStateByAuthorizedUserId$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(UserActions.UserActionTypes
                .LOAD_USER_STATE), operators_1.mergeMap(function (action) {
                return _this.userService.getUserById(_this.authorizedUserId)
                    .pipe(operators_1.tap(function () { return console.log('NGRX EFFECT - READ ALL USER\'S FROM DB'); }), operators_1.map(function (payload) {
                    return new UserActions.LoadUserStateSuccess();
                }), operators_1.catchError(function (err) {
                    return rxjs_1.of(new UserActions.LoadUserStateFail(err));
                }));
            }));
        });
        this.UpdateUserInfo$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(UserActions.UserActionTypes.UPDATE_USER), operators_1.mergeMap(function (action) {
                return _this.userService.updateUserInfo(_this.myUser)
                    .pipe(operators_1.tap(function (value) { return console.log('NGRX EFFECT - UPDATED USER: ', value); }), operators_1.map(function (payload) {
                    if (_this.myUserState && payload) {
                        _this.myUserState.email = payload.email;
                        _this.myUserState;
                    }
                    return new UserActions.UpdateUserSuccess(payload);
                }), operators_1.catchError(function (err) { return rxjs_1.of(new UserActions.UpdateUserFail(err)); }));
            }));
        });
        this.authStateStore.pipe(store_1.select(fromAuth.getAuthenticatedUserId))
            .subscribe({
            next: function (value) {
                _this.authorizedUserId = value;
            },
            error: function (err) { return console.log("OOps sorry, error occured getting the authorized user's Id from the Authentication store in User Effects: ", err); },
            complete: function () { return console.log("Completed getting Authorized User's ID from ngrx Authentication store in User Effects"); }
        });
        this.userStateStore
            .pipe(store_1.select(fromUser.getCurrentUserInfo))
            .subscribe({
            next: function (value) {
                if (value)
                    _this.myUser = value;
            },
            error: function (err) {
                return console.log("OOps sorry, error occured getting the user Id from the User store in User Effects: ", err);
            },
            complete: function () {
                return console.log("Completed getting User from User store in User Effects");
            }
        });
        this.userDataStore
            .pipe(store_1.select(UserSharedData.selectAllUsers))
            .subscribe({
            next: function (value) {
                if (value.length > 0) {
                    _this.myUserState = value.filter(function (i) { return (i === null || i === void 0 ? void 0 : i.id) === _this.myUser.id; })[0];
                }
            },
            error: function (err) {
                return console.log('OOps sorry, error occured getting the Shared User Data from the Shared Data store in User Effects: ', err);
            },
            complete: function () {
                return console.log('Completed getting the Shared User Data from the Shared Data storee in User Effects');
            }
        });
        ;
    }
    UserEffects = __decorate([
        core_1.Injectable()
    ], UserEffects);
    return UserEffects;
}());
exports.UserEffects = UserEffects;
