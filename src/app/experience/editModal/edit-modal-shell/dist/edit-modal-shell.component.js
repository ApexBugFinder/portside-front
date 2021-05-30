"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditModalShellComponent = void 0;
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var fromExperienceShell = require("../../experience-shell/state");
var experienceShellActions = require("../../experience-shell/state/experience-shell.actions");
var operators_1 = require("rxjs/operators");
var shared_1 = require("src/app/shared/models/shared");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var EditModalShellComponent = /** @class */ (function () {
    function EditModalShellComponent(dialogRef, router, experienceDataStore, experienceEntityStore, fb) {
        this.dialogRef = dialogRef;
        this.router = router;
        this.experienceDataStore = experienceDataStore;
        this.experienceEntityStore = experienceEntityStore;
        this.fb = fb;
        this.faTrash = free_solid_svg_icons_1.faTrash;
        this.classe = 'Experiences';
        this.logoUrl = 'empty';
        this.originalExp$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getOrginalExperience));
        this.currentExp$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperience));
        this.company$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperienceCompany));
        this.title$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperienceTitle));
        this.started$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperienceStartDate));
        this.completed$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperienceCompleteDate));
        this.city$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperienceCity));
        this.state$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperienceState));
        this.roles$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperienceRoles));
        this.logoUrl$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperienceLogoUrl));
        this.id$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperienceId));
        this.projectCreatorID$ = this.experienceDataStore.pipe(store_1.select(fromExperienceShell.getCurrentExperienceProjectCreator));
        this.myExperienceForm = this.fb.group({
            id: [''],
            company: [''],
            title: [''],
            started: [''],
            completed: [''],
            city: [''],
            state: [''],
            roles: [''],
            logoUrl: [''],
            myRole: [''],
            myTitle: ['']
        });
    }
    EditModalShellComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.company$.subscribe({
            next: function (value) { return _this.company = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience Company Name from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experience Company Name from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.title$.subscribe({
            next: function (value) { return _this.title = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience job Title from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experience job Title from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.started$.subscribe({
            next: function (value) { return _this.started = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience Start Date from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experience Start Date from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.completed$.subscribe({
            next: function (value) { return _this.completed = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience Complete Date from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experience Complete Date from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.city$.subscribe({
            next: function (value) { return _this.city = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience\'s City from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experience\'s City from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.state$.subscribe({
            next: function (value) { return _this.state = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience\'s State from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experience\'s State from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.roles$.subscribe({
            next: function (value) { return _this.roles = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience\'s State from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experience\'s State from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.logoUrl$.subscribe({
            next: function (value) { return _this.logoUrl = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience logo Url from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experience logo Url from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.id$.subscribe({
            next: function (value) { return _this.experienceID = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience logo Url from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experience logo Url from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.originalExp$.subscribe({
            next: function (value) { return _this.originalExp = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s original experience from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s original Experience from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.currentExp$.subscribe({
            next: function (value) {
                if ((value === null || value === void 0 ? void 0 : value.id) !== '') {
                    _this.currentExp = value;
                }
            },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s original experience from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s original Experience from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.projectCreatorID$.subscribe({
            next: function (value) { return _this.projectCreatorID = value; },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s current experience project Creator ID from store in Experience\'s Edit Shell component: ', err); },
            complete: function () { return console.log('Completed getting user\'s Current Experience project CreatorID from ngrx store in Experience\'s Edit Shell component'); }
        });
        this.initiateControls();
        this.resetControls();
        this.monitorForControlChanges();
    };
    // PAGE ACTIONS
    // ******************************************
    // GET THE PAGE TYPE CLASS FOR THE PAGE ACTION BUTTONS COMPONENT
    EditModalShellComponent.prototype.getClass = function () {
        return this.classe;
    };
    // GET NEW LOGO URL AND SET IT TO THE CURRENT EXPERIENCE NGRX STORE DATA
    EditModalShellComponent.prototype.processNewLogoUrlRt = function (returnUrl) {
        console.log('New Logo url: ', returnUrl);
        this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceLogoUrl(returnUrl));
    };
    // ADD A ROLE TO THE STATE
    EditModalShellComponent.prototype.addRole = function () {
        var _a, _b, _c, _d, _e, _f;
        console.log((_a = this.myTitleAbstractControl) === null || _a === void 0 ? void 0 : _a.value);
        console.log((_b = this.myRoleAbstractControl) === null || _b === void 0 ? void 0 : _b.value);
        var newRole = {
            id: 'new',
            myRole: (_c = this.myRoleAbstractControl) === null || _c === void 0 ? void 0 : _c.value,
            myTitle: (_d = this.myTitleAbstractControl) === null || _d === void 0 ? void 0 : _d.value,
            experienceID: this.experienceID,
            editState: shared_1.editState.ADD,
            stateHistory: [shared_1.editState.ADD]
        };
        var newRoles = JSON.parse(JSON.stringify(this.roles));
        newRoles.push(newRole);
        console.log(newRoles);
        this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceRoles(newRoles));
        (_e = this.myRoleAbstractControl) === null || _e === void 0 ? void 0 : _e.setValue('');
        (_f = this.myTitleAbstractControl) === null || _f === void 0 ? void 0 : _f.setValue('');
    };
    // TOGGLE A ROLE FOR REMOVAL
    EditModalShellComponent.prototype.toggleRemoveRole = function (a) {
        var _a, _b, _c;
        // DO A DEEP COPY OF the Role because it is readonly because of NGRX
        var b = JSON.parse(JSON.stringify(a));
        if (b.stateHistory[0] === shared_1.editState.OK) {
            // TOGGLE STATE BETWEEN REMOVE AND OK
            // OK IS A ROLE FROM THE bACKEND, NOT CREATED THIS SESSION.
            b.editState = a.editState === shared_1.editState.OK ? shared_1.editState.REMOVE : shared_1.editState.OK;
        }
        else {
            // TOGGLE STATE BETWEEN REMOVE AND ADD
            // ADD STATE IS A ROLE THAT WAS CREATED IN THIS SESSION.
            b.editState = a.editState === shared_1.editState.ADD ? shared_1.editState.REMOVE : shared_1.editState.ADD;
        }
        // ADD to STATE History
        (_a = b.stateHistory) === null || _a === void 0 ? void 0 : _a.push(b.editState);
        console.log('pre roles: ', this.roles);
        console.log('new roles: ', b);
        // DROP AND REPlACE EDITED ROLE FROM THE STORE WITH UPDATED ROLE
        this.roles = (_b = this.roles) === null || _b === void 0 ? void 0 : _b.filter(function (i) { return i.id != b.id; });
        (_c = this.roles) === null || _c === void 0 ? void 0 : _c.push(b);
        console.log('updated roles: ', this.roles);
        this.updateRolesStore();
    };
    // UPDATE THE CURRENT ROLE STORE
    EditModalShellComponent.prototype.updateRolesStore = function () {
        this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceRoles(this.roles));
    };
    // RESET FORM
    EditModalShellComponent.prototype.resetChanges = function () {
        this.experienceDataStore.dispatch(new experienceShellActions.ResetCurrentExperienceToOriginal());
    };
    EditModalShellComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    EditModalShellComponent.prototype.getReqState = function (b) {
        switch (b) {
            case shared_1.editState.ADD:
                return 'markedForAdd';
            case shared_1.editState.REMOVE:
                return 'markedForRemoval';
            case shared_1.editState.OK:
                return 'unmarked';
            default:
                return 'unmarked';
        }
    };
    // SAVE TO DB
    EditModalShellComponent.prototype.saveToDB = function () {
        // UPDATE DB IF UPDATING
        this.experienceDataStore.dispatch(new experienceShellActions.UpdateExperienceToDB());
        // CLOSE DIALOG
        this.closeDialog();
        this.router.navigateByUrl('pages/experiences');
    };
    EditModalShellComponent.prototype.deleteFromDB = function () {
        this.experienceDataStore.dispatch(new experienceShellActions.DeleteExperienceToDB());
        // CLOSE DIALOG
        this.closeDialog();
    };
    // FORM HELPERS
    EditModalShellComponent.prototype.initiateControls = function () {
        this.companyAbstractControl = this.myExperienceForm.get('company');
        this.titleAbstractControl = this.myExperienceForm.get('title');
        this.startedAbstractControl = this.myExperienceForm.get('started');
        this.completedAbstractControl = this.myExperienceForm.get('completed');
        this.cityAbstractControl = this.myExperienceForm.get('city');
        this.stateAbstractControl = this.myExperienceForm.get('state');
        this.rolesAbstractControl = this.myExperienceForm.get('roles');
        this.logoUrlAbstractControl = this.myExperienceForm.get('logoUrl');
        this.myRoleAbstractControl = this.myExperienceForm.get('myRole');
        this.myTitleAbstractControl = this.myExperienceForm.get('myTitle');
    };
    EditModalShellComponent.prototype.resetControls = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = this.companyAbstractControl) === null || _a === void 0 ? void 0 : _a.setValue(this.company);
        (_b = this.titleAbstractControl) === null || _b === void 0 ? void 0 : _b.setValue(this.title);
        (_c = this.startedAbstractControl) === null || _c === void 0 ? void 0 : _c.setValue(this.started);
        (_d = this.completedAbstractControl) === null || _d === void 0 ? void 0 : _d.setValue(this.completed);
        (_e = this.cityAbstractControl) === null || _e === void 0 ? void 0 : _e.setValue(this.city);
        (_f = this.stateAbstractControl) === null || _f === void 0 ? void 0 : _f.setValue(this.state);
        (_g = this.rolesAbstractControl) === null || _g === void 0 ? void 0 : _g.setValue(this.roles);
        (_h = this.logoUrlAbstractControl) === null || _h === void 0 ? void 0 : _h.setValue(this.logoUrl);
    };
    EditModalShellComponent.prototype.monitorForControlChanges = function () {
        var _this = this;
        var _a, _b, _c, _d, _e, _f;
        (_a = this.companyAbstractControl) === null || _a === void 0 ? void 0 : _a.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                console.log('new title:', value);
                _this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceCompany(value));
            },
            error: function (err) { return console.log(); },
            complete: function () { return console.log(); }
        });
        (_b = this.titleAbstractControl) === null || _b === void 0 ? void 0 : _b.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                _this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceTitle(value));
            },
            error: function (err) { return console.log(); },
            complete: function () { return console.log(); }
        });
        (_c = this.startedAbstractControl) === null || _c === void 0 ? void 0 : _c.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                _this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceStarted(value));
            },
            error: function (err) { return console.log(); },
            complete: function () { return console.log(); }
        });
        (_d = this.completedAbstractControl) === null || _d === void 0 ? void 0 : _d.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                _this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceCompleted(value));
            },
            error: function (err) { return console.log(); },
            complete: function () { return console.log(); }
        });
        (_e = this.cityAbstractControl) === null || _e === void 0 ? void 0 : _e.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                _this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceCity(value));
            },
            error: function (err) { return console.log(); },
            complete: function () { return console.log(); }
        });
        (_f = this.stateAbstractControl) === null || _f === void 0 ? void 0 : _f.valueChanges.pipe(operators_1.debounceTime(500), operators_1.distinctUntilChanged()).subscribe({
            next: function (value) {
                _this.experienceDataStore.dispatch(new experienceShellActions.SetCurrentExperienceState(value));
            },
            error: function (err) { return console.log(); },
            complete: function () { return console.log(); }
        });
    };
    EditModalShellComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-modal-shell',
            templateUrl: './edit-modal-shell.component.html',
            styleUrls: ['./edit-modal-shell.component.scss']
        })
    ], EditModalShellComponent);
    return EditModalShellComponent;
}());
exports.EditModalShellComponent = EditModalShellComponent;
