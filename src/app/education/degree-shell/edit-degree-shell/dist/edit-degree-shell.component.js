"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditDegreeShellComponent = void 0;
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var operators_1 = require("rxjs/operators");
// NGRX
var fromDegreeShell = require("../state");
var degreeActions = require("../state/degree-shell.actions");
var EditDegreeShellComponent = /** @class */ (function () {
    function EditDegreeShellComponent(fb, degreeShellStore, dialogRef) {
        this.fb = fb;
        this.degreeShellStore = degreeShellStore;
        this.dialogRef = dialogRef;
        this.degreeForm = this.fb.group({
            degreeName: [''],
            degreeType: [''],
            minor: [''],
            institution: [''],
            city: [''],
            state: [''],
            graduationYear: [''],
            isGraduated: [false]
        });
        this.myDegree$ = this.degreeShellStore.pipe(store_1.select(fromDegreeShell.getCurrentDegree));
    }
    EditDegreeShellComponent.prototype.ngOnInit = function () {
        this.initiateControls();
        this.monitorControls();
    };
    EditDegreeShellComponent.prototype.initiateControls = function () {
        this.degreeNameAbstractControl = this.degreeForm.get('degreeName');
        this.degreeTypeAbstractControl = this.degreeForm.get('degreeType');
        this.minorAbstractControl = this.degreeForm.get('minor');
        this.institutionAbstractControl = this.degreeForm.get('institution');
        this.cityAbstractControl = this.degreeForm.get('city');
        this.stateAbstractControl = this.degreeForm.get('state');
        this.graduationYearAbstractControl = this.degreeForm.get('graduationYear');
        this.isGraduatedAbstractControl = this.degreeForm.get('isGraduated');
    };
    EditDegreeShellComponent.prototype.monitorControls = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = this.degreeTypeAbstractControl) === null || _a === void 0 ? void 0 : _a.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.degreeShellStore.dispatch(new degreeActions.SetCurrentDegreeDegreeTypeFromDegreeShellEditCpt(value));
                }
            },
            error: function (err) { return console.log("OOps sorry, error while updating user's current Degree Type in Education's Degree Edit Shell component: ", err); },
            complete: function () {
                return console.log("Completed updating user's Current Degree Type  in ngrx store in Education's Degree Edit Shell component");
            }
        });
        (_b = this.degreeNameAbstractControl) === null || _b === void 0 ? void 0 : _b.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    console.log('new value: ', value);
                    _this.degreeShellStore.dispatch(new degreeActions.SetCurrentDegreeDegreeNameFromDegreeShellEditCpt(value));
                }
            },
            error: function (err) { return console.log("OOps sorry, error while updating user's current Degree Name in Education's Degree Edit Shell component: ", err); },
            complete: function () {
                return console.log("Completed updating user's Current Degree Name  in ngrx store in Education's Degree Edit Shell component");
            }
        });
        (_c = this.minorAbstractControl) === null || _c === void 0 ? void 0 : _c.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.degreeShellStore.dispatch(new degreeActions.SetCurrentDegreeMinorFromDegreeShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Degree Minor in Education's Degree Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating user's Current Degree Minor in ngrx store in Education's Degree Edit Shell component");
            }
        });
        (_d = this.institutionAbstractControl) === null || _d === void 0 ? void 0 : _d.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.degreeShellStore.dispatch(new degreeActions.SetCurrentDegreeInstitutionFromDegreeShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Degree Institution in Education's Degree Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating user's Current Degree Institution  in ngrx store in Education's Degree Edit Shell component");
            }
        });
        (_e = this.cityAbstractControl) === null || _e === void 0 ? void 0 : _e.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.degreeShellStore.dispatch(new degreeActions.SetCurrentDegreeCityFromDegreeShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Degree City in Education's Degree Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating user's Current Degree City  in ngrx store in Education's Degree Edit Shell component");
            }
        });
        (_f = this.stateAbstractControl) === null || _f === void 0 ? void 0 : _f.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.degreeShellStore.dispatch(new degreeActions.SetCurrentDegreeStateDegreeShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Degree State in Education's Degree Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating user's Current Degree State in ngrx store in Education's Degree Edit Shell component");
            }
        });
        (_g = this.graduationYearAbstractControl) === null || _g === void 0 ? void 0 : _g.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.degreeShellStore.dispatch(new degreeActions.SetCurrentDegreeGraduationYrFromDegreeShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Degree Graduation Year in Education's Degree Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating user's Current Degree Graduation Year in ngrx store in Education's Degree Edit Shell component");
            }
        });
        (_h = this.isGraduatedAbstractControl) === null || _h === void 0 ? void 0 : _h.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                if (value) {
                    _this.degreeShellStore.dispatch(new degreeActions.SetCurrentDegreeIsGraduatedFromDegreeShellEditCpt(value));
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error while updating user's current Degree IsGraduated in Education's Degree Edit Shell component: ", err);
            },
            complete: function () {
                return console.log("Completed updating user's Current Degree IsGraduated in ngrx store in Education's Degree Edit Shell component");
            }
        });
    };
    EditDegreeShellComponent.prototype.saveToDB = function (value) {
        if (value == 'Save Current')
            this.degreeShellStore.dispatch(new degreeActions.UpdateDegreeToDB());
        this.dialogRef.close();
    };
    EditDegreeShellComponent.prototype.resetChanges = function (value) {
        if (value == 'Reset Current')
            this.degreeShellStore.dispatch(new degreeActions.ResetCurrentDegreeToOriginal());
    };
    EditDegreeShellComponent.prototype.deleteFromDB = function (value) {
        if (value == 'Delete Current')
            this.degreeShellStore.dispatch(new degreeActions.DeleteDegreeToDB());
        this.dialogRef.close();
    };
    EditDegreeShellComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-degree-shell',
            templateUrl: './edit-degree-shell.component.html',
            styleUrls: ['./edit-degree-shell.component.scss']
        })
    ], EditDegreeShellComponent);
    return EditDegreeShellComponent;
}());
exports.EditDegreeShellComponent = EditDegreeShellComponent;
