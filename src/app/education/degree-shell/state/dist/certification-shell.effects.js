"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CertificationShellEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var operators_1 = require("rxjs/operators");
var store_1 = require("@ngrx/store");
var certificationShellActions = require("./degree-shell.actions");
var fromCertificationShell = require(".");
var certificationEntityDataActions = require("../../Models/certification/state/certification.actions");
var fromCertificationEntityData = require("../../Models/certification/state");
var rxjs_1 = require("rxjs");
var Constants_1 = require("src/app/helpers/Constants");
var CertificationShellEffects = /** @class */ (function () {
    function CertificationShellEffects(actions$, certificationShellStore, certificationEntityDataStore, certificationService) {
        var _this = this;
        this.actions$ = actions$;
        this.certificationShellStore = certificationShellStore;
        this.certificationEntityDataStore = certificationEntityDataStore;
        this.certificationService = certificationService;
        // LOAD CERTIFICATIONS TO ADAPTER
        this.LoadCertifications$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(certificationShellActions.CertificationActionTypes
                .LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL), operators_1.mergeMap(function (action) {
                return _this.certificationService.readAll(Constants_1.Constants.userID).pipe(operators_1.tap(function (payload) {
                    return console.log('NGRX EFFECT - READ ALL CERTIFICATIONS FROM DB');
                }), operators_1.map(function (payload) {
                    // Delete all certifications
                    _this.certificationEntityDataStore.dispatch(certificationEntityDataActions.deleteCertifications({
                        ids: _this.certificationDataIds
                    }));
                    // ADD ALL CERTIFICATIONS FROM THE BACKEND
                    _this.certificationEntityDataStore.dispatch(certificationEntityDataActions.addCertifications({
                        Certifications: payload
                    }));
                    // SET CURRENT CERTIFICATION
                    _this.certificationShellStore.dispatch(new certificationShellActions.SetOriginalCertificationFromCertEffects(payload[0]));
                    _this.certificationShellStore.dispatch(new certificationShellActions.SetCurrentCertificationFromCertEffects(payload[0]));
                    // THROW SUCCESS ACTION
                    return new certificationShellActions.LoadCertificationsByProjectCreatorIDFromDBSuccess(payload);
                }), operators_1.catchError(function (err) {
                    return rxjs_1.of(new certificationShellActions.LoadCertificationsByProjectCreatorIDFromDBFail(err));
                }));
            }));
        });
        // SAVE CERTIFICATION
        this.SaveNewCertification$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(certificationShellActions.CertificationActionTypes
                .SAVE_CERTIFICATION_TO_DB_from_CertShellEdit), operators_1.mergeMap(function (action) {
                return _this.certificationService.createItem(_this.currentCertification).pipe(operators_1.tap(function (payload) {
                    return console.log('NGRX EFFECT - SAVE CERTIFICATION TO DB SUCCESSFUL: ', payload);
                }), operators_1.map(function (payload) {
                    // SAVE TO DATA
                    _this.certificationEntityDataStore.dispatch(certificationEntityDataActions.addCertification({
                        Certification: payload
                    }));
                    return new certificationShellActions.SaveCertificationToDBSuccess(payload);
                }), operators_1.catchError(function (err) {
                    return rxjs_1.of(new certificationShellActions.SaveCertificationToDBFail(err));
                }));
            }));
        });
        // UPDATE CERTIFICATION
        this.UpdateCertification$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(certificationShellActions.CertificationActionTypes
                .UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit), operators_1.mergeMap(function (action) {
                return _this.certificationService.updateItem(_this.currentCertification).pipe(operators_1.tap(function (payload) {
                    return console.log('NGRX EFFECT - UPDATE CERTIFICATION TO DB SUCCESSFUL: ', payload);
                }), operators_1.map(function (payload) {
                    // CHANGE ENTITY DATA STORE
                    _this.certificationEntityDataStore.dispatch(certificationEntityDataActions.upsertCertification({
                        Certification: payload
                    }));
                    return new certificationShellActions.UpdateCertificationToDBSuccess(payload);
                }), operators_1.catchError(function (err) {
                    return rxjs_1.of(new certificationShellActions.UpdateCertificationToDBFail(err));
                }));
            }));
        });
        // DELETE CERTIFICATION
        this.DeleteCertification$ = effects_1.createEffect(function () {
            return _this.actions$.pipe(effects_1.ofType(certificationShellActions.CertificationActionTypes
                .DELETE_CERTIFICATION_TO_DB_from_CertShellEdit), operators_1.mergeMap(function (action) {
                var _a;
                return _this.certificationService
                    .deleteItem((_a = _this.currentCertification) === null || _a === void 0 ? void 0 : _a.id)
                    .pipe(operators_1.tap(function (payload) {
                    return console.log('NGRX EFFECT - DELETED CERTIFICATION: ', payload);
                }), operators_1.map(function (payload) {
                    // CLEAR ENTITY DATA STORE Of CURRENT CERTIFICATION AND SET NEW CURRENT CERTIFICATION
                    _this.certificationEntityDataStore.dispatch(certificationEntityDataActions.deleteCertification({
                        id: payload.id
                    }));
                    return new certificationShellActions.DeleteCertificationToDBSuccess(_this.certificationData[0]);
                }), operators_1.catchError(function (err) {
                    return rxjs_1.of(new certificationShellActions.DeleteCertificationToDBFail(err));
                }));
            }));
        });
        this.certificationData$ = this.certificationEntityDataStore.pipe(store_1.select(fromCertificationEntityData.selectAllCertifications));
        this.certificationData$.subscribe(function (i) {
            _this.certificationData = i;
        });
        this.currentCertification$ = this.certificationShellStore.pipe(store_1.select(fromCertificationShell.getCurrentCertification));
        this.currentCertification$.subscribe(function (value) { return (_this.currentCertification = value); });
        this.certificationDataIds$ = this.certificationEntityDataStore.pipe(store_1.select(fromCertificationEntityData.selectCertificationIds));
        this.certificationDataIds$.subscribe(function (value) { return (_this.certificationDataIds = value); });
    }
    CertificationShellEffects = __decorate([
        core_1.Injectable()
    ], CertificationShellEffects);
    return CertificationShellEffects;
}());
exports.CertificationShellEffects = CertificationShellEffects;
