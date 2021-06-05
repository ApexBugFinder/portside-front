"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EducationComponent = void 0;
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var add_education_component_1 = require("src/app/education/add-education/add-education.component");
var edit_certification_shell_component_1 = require("src/app/education/certificatn-shell/edit-certification-shell/edit-certification-shell.component");
var edit_degree_shell_component_1 = require("src/app/education/degree-shell/edit-degree-shell/edit-degree-shell.component");
var certification_1 = require("src/app/education/Models/certification/certification");
var degree_1 = require("src/app/education/Models/degree/degree");
var make_guid_1 = require("src/app/helpers/make-guid");
var certificationActions = require("../../education/certificatn-shell/state/certification-shell.actions");
var degreeShellActions = require("../../education/degree-shell/state/degree-shell.actions");
var fromShared = require("../../shared/state");
var EducationComponent = /** @class */ (function () {
    function EducationComponent(dialog, degreeShellStore, sharedStore, certificationShellStore) {
        this.dialog = dialog;
        this.degreeShellStore = degreeShellStore;
        this.sharedStore = sharedStore;
        this.certificationShellStore = certificationShellStore;
        this.pageClass = "Education";
        this.userID$ = this.sharedStore.pipe(store_1.select(fromShared.getUserId));
    }
    EducationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userID$.subscribe({
            next: function (value) {
                if (value) {
                    _this.userID = value;
                }
            },
            error: function (err) { return console.log('OOps sorry, error occured getting the user\'s ID from Shared State store in Education component:', err); },
            complete: function () { return console.log('Completed getting user\'s ID ngrx Shared State store in Education component'); }
        });
    };
    EducationComponent.prototype.createEducation = function () {
        var _this = this;
        var dialogRef = this.dialog.open(add_education_component_1.AddEducationComponent, {
            panelClass: 'custom-modalbox2'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('result returned from dialog is: ', result);
            if (result === 'certification') {
                // Create new  Cert
                var newCert = JSON.parse(JSON.stringify(certification_1.defaultCert));
                newCert.id = new make_guid_1.MakeGuid().id.toString();
                newCert.projectCreatorID = _this.userID;
                _this.certificationShellStore.dispatch(new certificationActions.SetCurrentCertificationFromEducationCPT(newCert));
                _this.certificationShellStore.dispatch(new certificationActions.SaveCertificationToDB());
                var dialogRef2 = _this.dialog.open(edit_certification_shell_component_1.EditCertificationShellComponent, {
                    panelClass: 'custom-modalbox2'
                });
            }
            if (result == 'degree') {
                // Create new Degree
                var newDegree = JSON.parse(JSON.stringify(degree_1.defaultDegree));
                newDegree.id = new make_guid_1.MakeGuid().id.toString();
                newDegree.projectCreatorID = _this.userID;
                _this.degreeShellStore.dispatch(new degreeShellActions.SetCurrentDegreeFromEducationCPT(newDegree));
                _this.degreeShellStore.dispatch(new degreeShellActions.SaveDegreeToDB());
                var dialogRef3 = _this.dialog.open(edit_degree_shell_component_1.EditDegreeShellComponent, {
                    panelClass: 'custom-modalbox2'
                });
            }
        });
    };
    EducationComponent = __decorate([
        core_1.Component({
            selector: 'app-education',
            templateUrl: './education.component.html',
            styleUrls: ['./education.component.scss']
        })
    ], EducationComponent);
    return EducationComponent;
}());
exports.EducationComponent = EducationComponent;
