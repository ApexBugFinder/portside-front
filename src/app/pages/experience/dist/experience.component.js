"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExperienceComponent = void 0;
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var experience_1 = require("src/app/experience/Models/experience");
var store_1 = require("@ngrx/store");
var fromExperienceData = require("../../experience/state");
var fromExperienceShell = require("../../experience/experience-shell/state");
var experienceShellActions = require("../../experience/experience-shell/state/experience-shell.actions");
var edit_modal_shell_component_1 = require("src/app/experience/editModal/edit-modal-shell/edit-modal-shell.component");
var make_guid_1 = require("../../helpers/make-guid");
var fromShared = require("../../shared/state");
var ExperienceComponent = /** @class */ (function () {
    function ExperienceComponent(experienceService, experienceDataStore, dialog, sharedStore, experienceShellStore) {
        this.experienceService = experienceService;
        this.experienceDataStore = experienceDataStore;
        this.dialog = dialog;
        this.sharedStore = sharedStore;
        this.experienceShellStore = experienceShellStore;
        this.first = false;
        this.focalPoint = 0;
        this.focusedAt = 0;
        this.faAnchor = free_solid_svg_icons_1.faAnchor;
        this.pageClass = "Experience";
        this.userID$ = this.sharedStore.pipe(store_1.select(fromShared.getUserId));
        this.experienceData$ = this.experienceDataStore.pipe(store_1.select(fromExperienceData.selectAllExperiences));
        this.currentExperience$ = this.experienceShellStore.pipe(store_1.select(fromExperienceShell.getCurrentExperience));
        this.experienceDataTotal$ = this.experienceDataStore.pipe(store_1.select(fromExperienceData.selectExperiencesTotal));
    }
    ExperienceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pageClass = 'Experience';
        this.currentExperience$.subscribe({
            next: function (value) {
                var _a, _b;
                _this.currentExperience = value;
                console.log('currentExperience is: ', value);
                console.log('experienceDatat: ', _this.experienceData);
                if (_this.currentExperience && (((_a = _this.experienceData) === null || _a === void 0 ? void 0 : _a.length) > 0))
                    _this.focusedAt = (_b = _this.experienceData) === null || _b === void 0 ? void 0 : _b.findIndex(function (i) { return (i === null || i === void 0 ? void 0 : i.id) == _this.currentExperience.id; });
                console.log('my new focal point: ', _this.focusedAt);
                console.log('My current experience on Component Page', value);
            },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience from store in Experiences component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experiences from ngrx store in Experiences component'); }
        });
        this.userID$.subscribe({
            next: function (value) {
                if (value) {
                    _this.userID = value;
                }
            },
            error: function (err) {
                return console.log("OOps sorry, error occured getting the user's ID from Shared State store in  Experience component:", err);
            },
            complete: function () {
                return console.log("Completed getting user's ID ngrx Shared State store in Experience component");
            }
        });
        this.experienceData$.subscribe({
            next: function (value) {
                _this.experienceData = (value);
                _this.focusExperience();
                console.log('My experiences called from DB into experiences Component Page', value);
                return value;
            },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s experiences from store in Experiences component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Experiences from ngrx store in Experiences component'); }
        });
        this.experienceDataTotal$.subscribe({
            next: function (value) {
                _this.experienceDataTotal = (value);
                console.log('Total Number of experiences called from DB into NGRX state into experiences Component Page', value);
                return value;
            },
            error: function (err) { return console.log('OOps sorry, error occured getting the Total of user\'s Experiences from store in Experiences component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Experiences from ngrx store inExperiences component'); }
        });
    };
    ExperienceComponent.prototype.createExperience = function () {
        // SET CURRENT EXPERIENCE AS DEFAULT EXPERIENCE
        // GET DEFAULT EXPERIENCE
        var newExp = JSON.parse(JSON.stringify(experience_1.defaultExperience));
        // CREATE  NEW ID WITH 'new-' PREFIX
        newExp.id = JSON.stringify((new make_guid_1.MakeGuid()).id);
        newExp.projectCreatorID = this.userID;
        this.experienceShellStore.dispatch(new experienceShellActions.SetOriginalExperience(newExp));
        this.experienceShellStore.dispatch(new experienceShellActions.SaveExperienceToDB);
        // OPEN DIALOG OF EDIT MODAL SHELL
        var dialogRef = this.dialog.open(edit_modal_shell_component_1.EditModalShellComponent, {
            width: '980px',
            panelClass: 'custom-modalbox'
        });
    };
    ExperienceComponent.prototype.focusExperience = function () {
        if (this.currentExperience.id === '' && this.experienceData.length > 0) {
            var focalPoint = 0;
            this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(this.experienceData[focalPoint]));
        }
    };
    ExperienceComponent.prototype.upOneExperience = function () {
        var _this = this;
        console.log(this.currentExperience);
        // GET INDEX NUMBER OF CURRENT EXPERIENCE
        console.log('the experienceData: ', this.experienceData);
        var focusedAtLocal = this.experienceData.findIndex(function (i) { return (i === null || i === void 0 ? void 0 : i.id) == _this.currentExperience.id; });
        console.log('index number of current Experience: ', focusedAtLocal);
        // CHECK TO TO SEE IF INDEX NUMBER IS LAST NUMBER
        var dataArrayLength = this.experienceData.length;
        console.log('what is the length of data array: ', this.experienceData.length);
        if (focusedAtLocal < (this.experienceData.length - 1)) {
            // ADD ONE TO INDEX NUMBER
            focusedAtLocal++;
            console.log('focused new value: ', focusedAtLocal);
            console.log('new Experience from experienceData: ', this.experienceData[focusedAtLocal]);
            // GET EXPERIENCE WITH INDENTICAL INDEX NUMBER
            this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(this.experienceData[focusedAtLocal]));
        }
    };
    ExperienceComponent.prototype.downOneExperience = function () {
        var _this = this;
        console.log('current experience is: ', this.currentExperience);
        // GET INDEX NUMBER OF CURRENT EXPERIENCE
        console.log('the experienceData: ', this.experienceData);
        var focusedAtLocal = this.experienceData.findIndex(function (i) { return (i === null || i === void 0 ? void 0 : i.id) == _this.currentExperience.id; });
        console.log('index number of current Experience: ', focusedAtLocal);
        // CHECK TO TO SEE IF INDEX NUMBER IS LAST NUMBER
        var dataArrayLength = this.experienceData.length;
        console.log('what is the length of data array: ', this.experienceData.length);
        if (focusedAtLocal >= 1) {
            // SUBTRACT ONE TO INDEX NUMBER
            focusedAtLocal--;
            console.log('focused new value: ', focusedAtLocal);
            // GET EXPERIENCE WITH INDENTICAL INDEX NUMBER
            this.experienceShellStore.dispatch(new experienceShellActions.SetCurrentExperience(this.experienceData[focusedAtLocal]));
        }
    };
    ExperienceComponent = __decorate([
        core_1.Component({
            selector: 'app-experience',
            templateUrl: './experience.component.html',
            styleUrls: ['./experience.component.scss']
        })
    ], ExperienceComponent);
    return ExperienceComponent;
}());
exports.ExperienceComponent = ExperienceComponent;
