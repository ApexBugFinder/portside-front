"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditActionButtonsComponent = void 0;
var core_1 = require("@angular/core");
var EditActionButtonsComponent = /** @class */ (function () {
    function EditActionButtonsComponent() {
        this.save = new core_1.EventEmitter();
        this.reset = new core_1.EventEmitter();
        this["delete"] = new core_1.EventEmitter();
    }
    EditActionButtonsComponent.prototype.ngOnInit = function () { };
    EditActionButtonsComponent.prototype.deleteFromDB = function () {
        var message = 'Delete Current';
        this["delete"].emit(message);
    };
    EditActionButtonsComponent.prototype.resetChanges = function () {
        var message = 'Reset Current';
        this.reset.emit(message);
    };
    EditActionButtonsComponent.prototype.saveToDB = function () {
        var message = 'Save Current';
        this.save.emit(message);
    };
    __decorate([
        core_1.Output()
    ], EditActionButtonsComponent.prototype, "save");
    __decorate([
        core_1.Output()
    ], EditActionButtonsComponent.prototype, "reset");
    __decorate([
        core_1.Output()
    ], EditActionButtonsComponent.prototype, "delete");
    EditActionButtonsComponent = __decorate([
        core_1.Component({
            selector: 'app-edit-action-buttons',
            templateUrl: './edit-action-buttons.component.html',
            styleUrls: ['./edit-action-buttons.component.scss']
        })
    ], EditActionButtonsComponent);
    return EditActionButtonsComponent;
}());
exports.EditActionButtonsComponent = EditActionButtonsComponent;
