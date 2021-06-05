"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditProjectEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var operators_1 = require("rxjs/operators");
var store_1 = require("@ngrx/store");
var projectActions = require("../../state/project.actions");
var editProjectActions = require("./edit-project.actions");
var fromEditProject = require("./");
var rxjs_1 = require("rxjs");
var EditProjectEffects = /** @class */ (function () {
    function EditProjectEffects(actions$, editProjectStore, projectStore, projectService) {
        var _this = this;
        this.actions$ = actions$;
        this.editProjectStore = editProjectStore;
        this.projectStore = projectStore;
        this.projectService = projectService;
        this.SaveNewProject$ = effects_1.createEffect(function () { return _this.actions$.pipe(effects_1.ofType(editProjectActions.EditProjectActionTypes.SAVE_EDITPROJECT_TO_DB), operators_1.mergeMap(function (action) {
            return _this.projectService.createItem(_this.editProject)
                .pipe(operators_1.tap(function () { return console.log(_this.editProject); }), operators_1.tap(function (payload) { return console.log('NGRX EFFECT - Save EditProject To DB return payload from BackEnd', payload); }), operators_1.map(function (savedProject) { return (new editProjectActions.SaveEditProjectToDBSuccess(savedProject)); }), operators_1.catchError(function (err) { return rxjs_1.of(new editProjectActions.SaveEditProjectToDBFail(err)); }));
        })); });
        this.UpdateProject$ = effects_1.createEffect(function () { return _this.actions$.pipe(effects_1.ofType(editProjectActions.EditProjectActionTypes.UPDATE_EDITPROJECT_TO_DB), operators_1.mergeMap(function (action) {
            return _this.projectService.updateItem(_this.editProject)
                // this.projectService.updateItem(action.payload)
                .pipe(operators_1.tap(function (payload) { return console.log('NGRX EFFECT - Update EditProject To DB return payload from BackEnd', payload); }), operators_1.map(function (savedProject) {
                _this.projectStore.dispatch(projectActions.deleteProject({ id: savedProject.id }));
                _this.projectStore.dispatch(projectActions.setProject({ project: savedProject }));
                return new editProjectActions.UpdateEditProjectToDBSuccess(savedProject);
            }), operators_1.catchError(function (err) { return rxjs_1.of(new editProjectActions.UpdateEditProjectToDBFail(err)); }));
        })); });
        this.DeleteProject$ = effects_1.createEffect(function () { return _this.actions$.pipe(effects_1.ofType(editProjectActions.EditProjectActionTypes.DELETE_EDITPROJECT_TO_DB), operators_1.tap(function () { return console.log(_this.editProject); }), operators_1.mergeMap(function (action) {
            var _a;
            return _this.projectService.deleteItem((_a = _this.editProject) === null || _a === void 0 ? void 0 : _a.id)
                // this.projectService.deleteItem(action.payload)
                .pipe(operators_1.tap(function (payload) { return console.log('NGRX EFFECT - Delete EditProject to DB return payload', payload); }), operators_1.map(function (deletedProject) {
                _this.projectStore.dispatch(projectActions.deleteProject({ id: deletedProject.id }));
                return new editProjectActions.DeleteEditProjectToDBSuccess(deletedProject);
            }), operators_1.catchError(function (err) { return rxjs_1.of(new editProjectActions.DeleteEditProjectToDBFail(err)); }));
        })); });
        this.LoadProjectsFromDB$ = effects_1.createEffect(function () { return _this.actions$.pipe(effects_1.ofType(editProjectActions.EditProjectActionTypes.LOAD_PROJECTS_FROM_DB), operators_1.mergeMap(function (action) {
            return _this.projectService.readAll(action.payload)
                .pipe(operators_1.tap(function (payload) { return console.log('NGRX EFFECT - LOad User Projects from DB return payload', payload); }), operators_1.map(function (payload) {
                _this.projectStore.dispatch(projectActions.addProjects({ projects: payload }));
                return new editProjectActions.LoadProjectsByProjectCreatorIDFromDBSuccess(payload);
            }), operators_1.catchError(function (err) { return rxjs_1.of(new editProjectActions.LoadProjectsByProjectCreatorIDFromDBFail(err)); }));
        })); });
        this.editProject$ = this.editProjectStore.pipe(store_1.select(fromEditProject.getEditProject));
        this.editProject$.subscribe(function (value) { return _this.editProject = value; });
    }
    EditProjectEffects = __decorate([
        core_1.Injectable()
    ], EditProjectEffects);
    return EditProjectEffects;
}());
exports.EditProjectEffects = EditProjectEffects;
