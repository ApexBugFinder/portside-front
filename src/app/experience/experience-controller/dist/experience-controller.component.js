"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExperienceControllerComponent = void 0;
// Core IMports
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
// NGRX STATE
var fromExperienceData = require("../state");
var fromExperienceShell = require("../experience-shell/state");
var experienceShellActions = require("../experience-shell/state/experience-shell.actions");
var ExperienceControllerComponent = /** @class */ (function () {
    function ExperienceControllerComponent(experienceDataStore, experienceShellStore) {
        this.experienceDataStore = experienceDataStore;
        this.experienceShellStore = experienceShellStore;
        this.faAnchor = free_solid_svg_icons_1.faAnchor;
        //  Actions
        // *********
        // I need to set the current experience for the experience Shell ☑️
        // Calculations
        // ***********
        // I need to calculate next and previous experience☑️
        this.focusedAt = 0;
        this.experienceData$ = this.experienceDataStore.pipe(store_1.select(fromExperienceData.selectAllExperiences));
        this.experienceDataTotal$ = this.experienceDataStore.pipe(store_1.select(fromExperienceData.selectExperiencesTotal));
        this.experienceShellCurrentExperience$ = this.experienceShellStore.pipe(store_1.select(fromExperienceShell.getCurrentExperience));
    }
    ExperienceControllerComponent.prototype.ngOnInit = function () {
        var _this = this;
        // EXPERIENCE_DATA []
        this.experienceData$.subscribe({
            next: function (value) {
                _this.experienceData = value;
                // this.setFocalPoint();
            },
            error: function (err) {
                return console.log('OOps, sorry it looks like there was problem when getting the experienceData array from the ExperienceData Store in the Experience Controller', err);
            },
            complete: function () {
                return console.log('Completed getting the experienceData array in the ExperienceController component');
            }
        });
        // CURRENT EXPERIENCE
        this.experienceShellCurrentExperience$.subscribe({
            next: function (value) {
                // GET current Experience
                if (value != undefined) {
                    _this.currentExperience = value;
                    _this.setFocalPoint();
                }
            },
            error: function (err) {
                return console.log('OOps, sorry it looks like there was problem when getting the Current Experience from the ExperienceShell in the Experience Controller', err);
            },
            complete: function () {
                return console.log('Completed getting the current Experience from the experienceShell Store in the ExperienceController component');
            }
        });
        // EXPERIENCE DATA TOTAL
        this.experienceDataTotal$.subscribe({
            next: function (value) {
                _this.experienceDataTotal = value;
                // this.updateFocalPoint();
            },
            error: function (err) {
                return console.log('OOps, sorry something went wrong when getting the experience');
            },
            complete: function () {
                return console.log('Completed getting the experienceData total in the experience Controller component');
            }
        });
    };
    // SETS FORM FIELD WITH CURRENT EXPERIENCE INDEX + 1
    ExperienceControllerComponent.prototype.setFocalPoint = function () {
        var _this = this;
        var _a, _b;
        console.log('My old focalPoint is: ', this.focusedAt);
        // if the curent Experience has been assigned and the the experienceData has loaded
        // then get focal point
        if (this.currentExperience && ((_a = this.experienceData) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            this.focusedAt = (_b = this.experienceData) === null || _b === void 0 ? void 0 : _b.findIndex(function (i) { var _a; return (i === null || i === void 0 ? void 0 : i.id) === ((_a = _this.currentExperience) === null || _a === void 0 ? void 0 : _a.id); });
        }
        else {
            this.focusedAt = 0;
        }
        // SET the form value for current
        this.printInfo();
        console.log('My new focalPoint is: ', this.focusedAt);
    };
    ExperienceControllerComponent.prototype.updateFocalPoint = function () {
        var _this = this;
        if (this.currentExperience && this.experienceData.length > 0) {
            console.log('Current focalPoint: ', this.focusedAt);
            this.printInfo();
            this.focusedAt = this.experienceData.findIndex(function (i) { var _a; return (i === null || i === void 0 ? void 0 : i.id) === ((_a = _this.currentExperience) === null || _a === void 0 ? void 0 : _a.id); });
        }
    };
    ExperienceControllerComponent.prototype.nextExperience = function () {
        var _this = this;
        this.printInfo();
        var focalLocal = this.experienceData.findIndex(function (i) { var _a; return (i === null || i === void 0 ? void 0 : i.id) === ((_a = _this.currentExperience) === null || _a === void 0 ? void 0 : _a.id); });
        console.log('index number of current Experience: ', focalLocal);
        var dataArrayLength = this.experienceData.length;
        // IF FOCAL POINT INCREASE IS NOT OUT OF BOUNDS
        if (focalLocal < this.experienceData.length - 1) {
            focalLocal++;
            console.log('focused new value', focalLocal);
            var currExp = this.experienceData[focalLocal];
            console.log('new Experience is : ', currExp);
            // SET NEW  CURRENT EXPERIENCE
            this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(currExp));
        }
    };
    ExperienceControllerComponent.prototype.previousExperience = function () {
        var _this = this;
        this.printInfo();
        var focusedAtLocal = this.experienceData.findIndex(function (i) { var _a; return (i === null || i === void 0 ? void 0 : i.id) == ((_a = _this.currentExperience) === null || _a === void 0 ? void 0 : _a.id); });
        console.log('index number of current Experience: ', focusedAtLocal);
        // CHECK TO TO SEE IF INDEX NUMBER IS LAST NUMBER
        var dataArrayLength = this.experienceData.length;
        console.log('what is the length of data array: ', dataArrayLength);
        if (focusedAtLocal >= 1) {
            // SUBTRACT ONE TO INDEX NUMBER
            focusedAtLocal--;
            console.log('focused new value: ', focusedAtLocal);
            // GET EXPERIENCE WITH INDENTICAL INDEX NUMBER
            this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(this.experienceData[focusedAtLocal]));
        }
    };
    // HELPERS
    ExperienceControllerComponent.prototype.printInfo = function () {
        console.log('My new current Experience is: ', this.currentExperience);
        console.log('My experienceData array: ', this.experienceData);
        console.log('Current Experience Index Value is: ', this.focusedAt);
    };
    ExperienceControllerComponent = __decorate([
        core_1.Component({
            selector: 'app-experience-controller',
            templateUrl: './experience-controller.component.html',
            styleUrls: ['./experience-controller.component.scss']
        })
    ], ExperienceControllerComponent);
    return ExperienceControllerComponent;
}());
exports.ExperienceControllerComponent = ExperienceControllerComponent;
