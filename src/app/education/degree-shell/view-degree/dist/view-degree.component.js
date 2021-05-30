"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViewDegreeComponent = void 0;
var core_1 = require("@angular/core");
var DegreeActions = require("../state/degree-shell.actions");
var edit_degree_shell_component_1 = require("../edit-degree-shell/edit-degree-shell.component");
var ViewDegreeComponent = /** @class */ (function () {
    function ViewDegreeComponent(degreeShellStore, dialog) {
        this.degreeShellStore = degreeShellStore;
        this.dialog = dialog;
    }
    ViewDegreeComponent.prototype.ngOnInit = function () {
        console.log(this.myDegree.degreeName);
    };
    ViewDegreeComponent.prototype.editDegree = function () {
        // set current Degree
        this.degreeShellStore.dispatch(new DegreeActions.SetCurrentDegreeFromViewDegree(this.myDegree));
        var dialogRef = this.dialog.open(edit_degree_shell_component_1.EditDegreeShellComponent, {
            panelClass: 'custom-modalbox2'
        });
    };
    __decorate([
        core_1.Input()
    ], ViewDegreeComponent.prototype, "myDegree");
    ViewDegreeComponent = __decorate([
        core_1.Component({
            selector: 'app-view-degree',
            templateUrl: './view-degree.component.html',
            styleUrls: ['./view-degree.component.scss']
        })
    ], ViewDegreeComponent);
    return ViewDegreeComponent;
}());
exports.ViewDegreeComponent = ViewDegreeComponent;
