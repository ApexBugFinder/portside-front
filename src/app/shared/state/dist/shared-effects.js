"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var store_1 = require("@ngrx/store");
var fromShared = require("./");
var sharedActions = require("./shared-actions");
var experienceDataActions = require("../../experience/state/experience.actions");
var projectDataActions = require("../../project/state/project.actions");
var degreeDataActions = require("../../education/Models/degree/state/degree.actions");
var certDataActions = require("../../education/Models/certification/state/certification.actions");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var SharedEffects = /** @class */ (function () {
    function SharedEffects(actions$, shareStore, projectStore, experienceStore, certDataStore, degreeDataStore, userService) {
        var _this = this;
        this.actions$ = actions$;
        this.shareStore = shareStore;
        this.projectStore = projectStore;
        this.experienceStore = experienceStore;
        this.certDataStore = certDataStore;
        this.degreeDataStore = degreeDataStore;
        this.userService = userService;
        this.GetUserState$ = effects_1.createEffect(function () { return _this.actions$.pipe(effects_1.ofType(sharedActions.SharedActionTypes.LOAD_USERSTATE), operators_1.mergeMap(function (action) {
            return _this.userService.getUserInfo(action.payload)
                .pipe(operators_1.tap(function (payload) { return console.log(payload); }), operators_1.tap(function (userState) {
                if (userState.userId != null) {
                    _this.projectStore.dispatch(projectDataActions.loadProjects({ projects: userState.projects }));
                    _this.degreeDataStore.dispatch(degreeDataActions.loadDegrees({ Degrees: userState.Degrees }));
                    _this.certDataStore.dispatch(certDataActions.loadCertifications({ Certifications: userState.Certifications }));
                    _this.experienceStore.dispatch(experienceDataActions.loadExperiences({ experiences: userState.experiences }));
                }
            }), operators_1.map(function (userState) { return (new sharedActions.LoadUserStateSuccess(userState.userId)); }), operators_1.catchError(function (err) { return rxjs_1.of(new sharedActions.LoadUserStateFail(err)); }));
        })); });
        this.shareStore.pipe(store_1.select(fromShared.getUsername))
            .subscribe(function (value) { return _this.userName = value; });
    }
    SharedEffects = __decorate([
        core_1.Injectable()
    ], SharedEffects);
    return SharedEffects;
}());
exports.SharedEffects = SharedEffects;
