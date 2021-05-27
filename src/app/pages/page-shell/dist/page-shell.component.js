"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PageShellComponent = void 0;
var core_1 = require("@angular/core");
var editProjectActions = require("../../project/edit/state/edit-project.actions");
var experienceShellActions = require("../../experience/experience-shell/state/experience-shell.actions");
var Constants_1 = require("src/app/helpers/Constants");
var PageShellComponent = /** @class */ (function () {
    function PageShellComponent(editProjectStore, certicationShellStore, experienceShellStore) {
        this.editProjectStore = editProjectStore;
        this.certicationShellStore = certicationShellStore;
        this.experienceShellStore = experienceShellStore;
        this.editProjectStore.dispatch(new editProjectActions.LoadProjectsByProjectCreatorIDFromDB(Constants_1.Constants.userID));
        this.experienceShellStore.dispatch(new experienceShellActions.LoadExperiencesByProjectCreatorIDFromDB(Constants_1.Constants.userID));
    }
    PageShellComponent.prototype.ngOnInit = function () {
    };
    PageShellComponent = __decorate([
        core_1.Component({
            selector: 'app-page-shell',
            templateUrl: './page-shell.component.html',
            styleUrls: ['./page-shell.component.scss']
        })
    ], PageShellComponent);
    return PageShellComponent;
}());
exports.PageShellComponent = PageShellComponent;
