"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditCertificationShellComponent = void 0;
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var operators_1 = require("rxjs/operators");
var fromCertficationShell = require("../state");
var CertificationActions = require("../state/certification-shell.actions");
var EditCertificationShellComponent = /** @class */ (function () {
    function EditCertificationShellComponent(fb, certificationShellStore, dialogRef) {
        this.fb = fb;
        this.certificationShellStore = certificationShellStore;
        this.dialogRef = dialogRef;
        this.controllerClass = 'Certification';
        this.myCert$ = this.certificationShellStore.pipe(store_1.select(fromCertficationShell.getCurrentCertification));
        this.certificationForm = this.fb.group({
            certName: [''],
            certId: [''],
            isActive: [false],
            issuingBodyName: [''],
            issuingBodyLogo: [''],
            issuedDate: ['']
        });
    }
    EditCertificationShellComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.myCert$.subscribe({
            next: function (value) {
                if (value) {
                    console.log(value);
                    _this.myCert = value;
                    _this.setControls(value);
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error occured getting the user's current Certification from store in Education's Certification Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed getting user's Current Certification from ngrx store in Education's Certification Edit Shell component");
            }
        });
        this.initiateControls();
        this.monitorControlChanges();
    };
    EditCertificationShellComponent.prototype.initiateControls = function () {
        this.certNameAbstractControl = this.certificationForm.get('certName');
        this.certIdAbstractControl = this.certificationForm.get('certId');
        this.isActiveAbstractControl = this.certificationForm.get('isActive');
        this.issuingBodyNameAbstractControl = this.certificationForm.get('issuingBodyName');
        this.issuingBodyLogoAbstractControl = this.certificationForm.get('issuingBodyLogo');
        this.issuedDateAbstractControl = this.certificationForm.get('issuedDate');
    };
    EditCertificationShellComponent.prototype.setControls = function (cert) {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.certNameAbstractControl) === null || _a === void 0 ? void 0 : _a.setValue(cert.certName);
        (_b = this.certIdAbstractControl) === null || _b === void 0 ? void 0 : _b.setValue(cert.certId);
        (_c = this.isActiveAbstractControl) === null || _c === void 0 ? void 0 : _c.setValue(cert.isActive);
        (_d = this.issuingBodyNameAbstractControl) === null || _d === void 0 ? void 0 : _d.setValue(cert.issuingBody_Name);
        (_e = this.issuingBodyLogoAbstractControl) === null || _e === void 0 ? void 0 : _e.setValue(cert.issuingBody_Logo);
        (_f = this.issuedDateAbstractControl) === null || _f === void 0 ? void 0 : _f.setValue(cert.issuedDate);
    };
    EditCertificationShellComponent.prototype.monitorControlChanges = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        (_a = this.certNameAbstractControl) === null || _a === void 0 ? void 0 : _a.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.certificationShellStore.dispatch(new CertificationActions.SetCurrentCertificationCertNameFromCertShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Certification CertName in Education's Certification Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating  user's Current Certification CertName in ngrx store in Education's Certification Edit Shell component");
            }
        });
        (_b = this.certIdAbstractControl) === null || _b === void 0 ? void 0 : _b.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.certificationShellStore.dispatch(new CertificationActions.SetCurrentCertificationIdFromCertShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Certification IsActive in Education's Certification Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating user's Current Certification IsActive in ngrx store in Education's Certification Edit Shell component");
            }
        });
        (_c = this.isActiveAbstractControl) === null || _c === void 0 ? void 0 : _c.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.certificationShellStore.dispatch(new CertificationActions.SetCurrentCertificationIsActiveFromCertShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Certification IsActive in Education's Certification Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating  user's Current Certification IsActive in ngrx store in Education's Certification Edit Shell component");
            }
        });
        (_d = this.issuingBodyNameAbstractControl) === null || _d === void 0 ? void 0 : _d.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.certificationShellStore.dispatch(new CertificationActions.SetCurrentCertificationIssuingBodyNameFromCertShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Certification Issuing Body Name in Education's Certification Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating  user's Current Certification Issuing Body Name in ngrx store in Education's Certification Edit Shell component");
            }
        });
        (_e = this.issuingBodyLogoAbstractControl) === null || _e === void 0 ? void 0 : _e.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.certificationShellStore.dispatch(new CertificationActions.SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Certification Issuing Body Logo in Education's Certification Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating  user's Current Certification Issuing Body Logo in ngrx store in Education's Certification Edit Shell component");
            }
        });
        (_f = this.issuedDateAbstractControl) === null || _f === void 0 ? void 0 : _f.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.certificationShellStore.dispatch(new CertificationActions.SetCurrentCertificationIssuedDateFromCertShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Certification Issued Date in Education's Certification Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating  user's Current Certification Issued Date in ngrx store in Education's Certification Edit Shell component");
            }
        });
    };
    EditCertificationShellComponent.prototype.getClass = function () {
        return this.controllerClass;
    };
    EditCertificationShellComponent.prototype.processNewLogoUrlRt = function (returnUrl) {
        var _a;
        (_a = this.issuingBodyLogoAbstractControl) === null || _a === void 0 ? void 0 : _a.setValue(returnUrl);
        this.certificationShellStore.dispatch(new CertificationActions.SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt(returnUrl));
    };
    EditCertificationShellComponent.prototype.deleteFromDB = function (value) {
        this.certificationShellStore.dispatch(new CertificationActions.DeleteCertificationToDB());
        this.dialogRef.close();
        11111;
    };
    EditCertificationShellComponent.prototype.resetChanges = function (value) {
        this.certificationShellStore.dispatch(new CertificationActions.ResetCurrentCertificationToOriginal());
    };
    EditCertificationShellComponent.prototype.saveToDB = function (value) {
        console.log('go');
        this.certificationShellStore.dispatch(new CertificationActions.UpdateCertificationToDB());
        this.dialogRef.close();
    };
    EditCertificationShellComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-certification-shell',
            templateUrl: './edit-certification-shell.component.html',
            styleUrls: ['./edit-certification-shell.component.scss']
        })
    ], EditCertificationShellComponent);
    return EditCertificationShellComponent;
}());
exports.EditCertificationShellComponent = EditCertificationShellComponent;
