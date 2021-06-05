"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViewCertComponent = void 0;
var core_1 = require("@angular/core");
var CertificationActions = require("../state/certification-shell.actions");
var edit_certification_shell_component_1 = require("../edit-certification-shell/edit-certification-shell.component");
var ViewCertComponent = /** @class */ (function () {
    function ViewCertComponent(certificationShellStore, dialog) {
        this.certificationShellStore = certificationShellStore;
        this.dialog = dialog;
    }
    ViewCertComponent.prototype.ngOnInit = function () {
    };
    ViewCertComponent.prototype.editCert = function () {
        // Set myCert to current Certifiation
        this.certificationShellStore.dispatch(new CertificationActions.SetCurrentCertificationFromViewCert(this.myCert));
        // start edit dialog
        var dialogRef = this.dialog.open(edit_certification_shell_component_1.EditCertificationShellComponent, {
            panelClass: 'custom-modalbox2'
        });
    };
    __decorate([
        core_1.Input()
    ], ViewCertComponent.prototype, "myCert");
    ViewCertComponent = __decorate([
        core_1.Component({
            selector: 'app-view-cert',
            templateUrl: './view-cert.component.html',
            styleUrls: ['./view-cert.component.scss']
        })
    ], ViewCertComponent);
    return ViewCertComponent;
}());
exports.ViewCertComponent = ViewCertComponent;
