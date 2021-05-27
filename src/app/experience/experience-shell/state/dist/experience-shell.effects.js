"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExperienceShellEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var operators_1 = require("rxjs/operators");
var store_1 = require("@ngrx/store");
var experienceShellActions = require("../state/experience-shell.actions");
var fromExperienceShell = require("../state");
var experienceEntityDataActions = require("../../state/experience.actions");
var fromExperienceEntityData = require("../../state");
var rxjs_1 = require("rxjs");
var Constants_1 = require("src/app/helpers/Constants");
var ExperienceShellEffects = /** @class */ (function () {
    function ExperienceShellEffects(actions$, experienceShellStore, experienceEntityDataStore, experienceService) {
        var _this = this;
        this.actions$ = actions$;
        this.experienceShellStore = experienceShellStore;
        this.experienceEntityDataStore = experienceEntityDataStore;
        this.experienceService = experienceService;
        // LOAD EXPERIENCES TO ADAPTER
        this.LoadExperiences$ = effects_1.createEffect(function () { return _this.actions$.pipe(effects_1.ofType(experienceShellActions.ExperienceActionTypes.LOAD_EXPERIENCES_FROM_DB), operators_1.mergeMap(function (action) {
            return _this.experienceService.readAll(Constants_1.Constants.userID)
                .pipe(operators_1.tap(function (payload) { return console.log('NGRX EFFECT - READ ALL EXPERIENCES FROM DB'); }), operators_1.map(function (payload) {
                // Delete all experiences
                _this.experienceEntityDataStore.dispatch(experienceEntityDataActions.deleteExperiences({ ids: _this.experienceDataIds }));
                // ADD ALL EXPERIENCES FROM THE BACKEND
                _this.experienceEntityDataStore.dispatch(experienceEntityDataActions.addExperiences({ experiences: payload }));
                // SET CURRENT EXPERIENCE
                _this.experienceShellStore.dispatch(new experienceShellActions.SetOriginalExperience(payload[0]));
                _this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(payload[0]));
                // THROW SUCCESS ACTION
                return new experienceShellActions.LoadExperiencesByProjectCreatorIDFromDBSuccess(payload);
            }), operators_1.catchError(function (err) { return rxjs_1.of(new experienceShellActions.LoadExperiencesByProjectCreatorIDFromDBFail(err)); }));
        })); });
        // SAVE EXPERIENCE
        this.SaveNewExperience$ = effects_1.createEffect(function () { return _this.actions$.pipe(effects_1.ofType(experienceShellActions.ExperienceActionTypes.SAVE_EXPERIENCE_TO_DB), operators_1.mergeMap(function (action) {
            return _this.experienceService.createItem(_this.currentExperience)
                .pipe(operators_1.tap(function (payload) { return console.log('NGRX EFFECT - SAVE EXPERIENCE TO DB SUCCESSFUL: ', payload); }), operators_1.map(function (payload) {
                // SAVE TO DATA
                _this.experienceEntityDataStore.dispatch(experienceEntityDataActions.addExperience({ experience: payload }));
                return new experienceShellActions.SaveExperienceToDBSuccess(payload);
            }), operators_1.catchError(function (err) { return rxjs_1.of(new experienceShellActions.SaveExperienceToDBFail(err)); }));
        })); });
        // UPDATE EXPERIENCE
        this.UpdateExperience$ = effects_1.createEffect(function () { return _this.actions$.pipe(effects_1.ofType(experienceShellActions.ExperienceActionTypes.UPDATE_EXPERIENCE_TO_DB), operators_1.mergeMap(function (action) {
            return _this.experienceService.updateItem(_this.currentExperience)
                .pipe(operators_1.tap(function (payload) { return console.log('NGRX EFFECT - UPDATE EXPERIENCE TO DB SUCCESSFUL: ', payload); }), operators_1.map(function (payload) {
                // CHANGE ENTITY DATA STORE
                _this.experienceEntityDataStore.dispatch(experienceEntityDataActions.upsertExperience({ experience: payload }));
                return new experienceShellActions.UpdateExperienceToDBSuccess(payload);
            }), operators_1.catchError(function (err) { return rxjs_1.of(new experienceShellActions.UpdateExperienceToDBFail(err)); }));
        })); });
        // DELETE EXPERIENCE
        this.DeleteExperience$ = effects_1.createEffect(function () { return _this.actions$.pipe(effects_1.ofType(experienceShellActions.ExperienceActionTypes.DELETE_EXPERIENCE_TO_DB), operators_1.mergeMap(function (action) {
            var _a;
            return _this.experienceService.deleteItem((_a = _this.currentExperience) === null || _a === void 0 ? void 0 : _a.id)
                .pipe(operators_1.tap(function (payload) { return console.log('NGRX EFFECT - DELETED EXPERIENCE: ', payload); }), operators_1.map(function (payload) {
                // this.experienceShellStore.dispatch(new experienceShellActions.ClearOriginalExperience());
                //this.experienceShellStore.dispatch(new experienceShellActions.ClearCurrentExperience());
                // CLEAR ENTITY DATA STORE Of CURRENT EXPERIENCE AND SET NEW CURRENT EXPERIENCE
                _this.experienceEntityDataStore.dispatch(experienceEntityDataActions.deleteExperience({ id: payload.id }));
                return new experienceShellActions.DeleteExperienceToDBSuccess(_this.experienceData[0]);
            }), operators_1.catchError(function (err) { return rxjs_1.of(new experienceShellActions.DeleteExperienceToDBFail(err)); }));
        })); });
        this.experienceData$ = this.experienceEntityDataStore.pipe(store_1.select(fromExperienceEntityData.selectAllExperiences));
        this.experienceData$.subscribe(function (i) {
            _this.experienceData = i;
        });
        this.currentExperience$ = this.experienceShellStore.pipe(store_1.select(fromExperienceShell.getCurrentExperience));
        this.currentExperience$.subscribe(function (value) { return _this.currentExperience = value; });
        this.experienceDataIds$ = this.experienceEntityDataStore.pipe(store_1.select(fromExperienceEntityData.selectExperienceIds));
        this.experienceDataIds$.subscribe(function (value) { return _this.experienceDataIds = value; });
    }
    ExperienceShellEffects.prototype.setNewDataStore = function (newDataStore) {
        var myProm = new Promise(function (resolve, reject) {
        });
        return myProm;
    };
    ExperienceShellEffects = __decorate([
        core_1.Injectable()
    ], ExperienceShellEffects);
    return ExperienceShellEffects;
}());
exports.ExperienceShellEffects = ExperienceShellEffects;
