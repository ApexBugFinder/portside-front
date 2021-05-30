"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DegreeShellEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var operators_1 = require("rxjs/operators");
var store_1 = require("@ngrx/store");
var degreeShellActions = require("./degree-shell.actions");
var fromDegreeShell = require(".");
var degreeEntityDataActions = require("../../Models/degree/state/degree.actions");
var fromDegreeEntityData = require("../../Models/degree/state");
var rxjs_1 = require("rxjs");
var Constants_1 = require("src/app/helpers/Constants");
var DegreeShellEffects = /** @class */ (function () {
    function DegreeShellEffects(actions$, degreeShellStore, degreeEntityDataStore, degreeService) {
        var _this = this;
        this.actions$ = actions$;
        this.degreeShellStore = degreeShellStore;
        this.degreeEntityDataStore = degreeEntityDataStore;
        this.degreeService = degreeService;
        // LOAD DEGREES TO ADAPTER
        this.LoadDegrees$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(degreeShellActions.DegreeActionTypes
                .LOAD_DEGREES_FROM_DB_on_PAGESHELL), operators_1.mergeMap(function (action) {
                return _this.degreeService.readAll(Constants_1.Constants.userID).pipe(operators_1.tap(function (payload) {
                    return console.log('NGRX EFFECT - READ ALL DEGREES FROM DB');
                }), operators_1.map(function (payload) {
                    // Delete all degrees
                    _this.degreeEntityDataStore.dispatch(degreeEntityDataActions.deleteDegrees({
                        ids: _this.degreeDataIds
                    }));
                    // ADD ALL DEGREES FROM THE BACKEND
                    _this.degreeEntityDataStore.dispatch(degreeEntityDataActions.addDegrees({
                        Degrees: payload
                    }));
                    // SET CURRENT DEGREE
                    _this.degreeShellStore.dispatch(new degreeShellActions.SetOriginalDegreeFromDegreeEffects(payload[0]));
                    _this.degreeShellStore.dispatch(new degreeShellActions.SetCurrentDegreeFromDegreeEffects(payload[0]));
                    // THROW SUCCESS ACTION
                    return new degreeShellActions.LoadDegreesByProjectCreatorIDFromDBSuccess(payload);
                }), operators_1.catchError(function (err) {
                    return rxjs_1.of(new degreeShellActions.LoadDegreesByProjectCreatorIDFromDBFail(err));
                }));
            }));
        });
        // SAVE DEGREE
        this.SaveNewDegree$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(degreeShellActions.DegreeActionTypes
                .SAVE_DEGREE_TO_DB_from_DegreeShellEdit), operators_1.mergeMap(function (action) {
                return _this.degreeService.createItem(_this.currentDegree).pipe(operators_1.tap(function (payload) {
                    return console.log('NGRX EFFECT - SAVE DEGREE TO DB SUCCESSFUL: ', payload);
                }), operators_1.map(function (payload) {
                    // SAVE TO DATA
                    _this.degreeEntityDataStore.dispatch(degreeEntityDataActions.addDegree({
                        Degree: payload
                    }));
                    return new degreeShellActions.SaveDegreeToDBSuccess(payload);
                }), operators_1.catchError(function (err) {
                    return rxjs_1.of(new degreeShellActions.SaveDegreeToDBFail(err));
                }));
            }));
        });
        // UPDATE DEGREE
        this.UpdateDegree$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(degreeShellActions.DegreeActionTypes
                .UPDATE_DEGREE_TO_DB_from_DegreeShellEdit), operators_1.tap(function () { return console.log(_this.currentDegree); }), operators_1.mergeMap(function (action) {
                return _this.degreeService.updateItem(_this.currentDegree).pipe(operators_1.tap(function (payload) {
                    return console.log('NGRX EFFECT - UPDATE DEGREE TO DB SUCCESSFUL: ', payload);
                }), operators_1.map(function (payload) {
                    // CHANGE ENTITY DATA STORE
                    _this.degreeEntityDataStore.dispatch(degreeEntityDataActions.upsertDegree({
                        Degree: payload
                    }));
                    return new degreeShellActions.UpdateDegreeToDBSuccess(payload);
                }), operators_1.catchError(function (err) {
                    return rxjs_1.of(new degreeShellActions.UpdateDegreeToDBFail(err));
                }));
            }));
        });
        // DELETE DEGREE
        this.DeleteDegree$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(degreeShellActions.DegreeActionTypes
                .DELETE_DEGREE_TO_DB_from_DegreeShellEdit), operators_1.mergeMap(function (action) {
                var _a;
                return _this.degreeService
                    .deleteItem((_a = _this.currentDegree) === null || _a === void 0 ? void 0 : _a.id)
                    .pipe(operators_1.tap(function (payload) {
                    return console.log('NGRX EFFECT - DELETED DEGREE: ', payload);
                }), operators_1.map(function (payload) {
                    // CLEAR ENTITY DATA STORE Of CURRENT DEGREE AND SET NEW CURRENT DEGREE
                    _this.degreeEntityDataStore.dispatch(degreeEntityDataActions.deleteDegree({
                        id: payload.id
                    }));
                    return new degreeShellActions.DeleteDegreeToDBSuccess(_this.degreeData[0]);
                }), operators_1.catchError(function (err) {
                    return rxjs_1.of(new degreeShellActions.DeleteDegreeToDBFail(err));
                }));
            }));
        });
        this.degreeData$ = this.degreeEntityDataStore.pipe(store_1.select(fromDegreeEntityData.selectAllDegrees));
        this.degreeData$.subscribe(function (i) {
            _this.degreeData = i;
        });
        this.currentDegree$ = this.degreeShellStore.pipe(store_1.select(fromDegreeShell.getCurrentDegree));
        this.currentDegree$.subscribe(function (value) { return (_this.currentDegree = value); });
        this.degreeDataIds$ = this.degreeEntityDataStore.pipe(store_1.select(fromDegreeEntityData.selectDegreeIds));
        this.degreeDataIds$.subscribe(function (value) { return (_this.degreeDataIds = value); });
    }
    DegreeShellEffects = __decorate([
        core_1.Injectable()
    ], DegreeShellEffects);
    return DegreeShellEffects;
}());
exports.DegreeShellEffects = DegreeShellEffects;
