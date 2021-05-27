"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EducationModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var cert_service_1 = require("./Models/certification/cert.service");
var degree_service_1 = require("./Models/degree/degree.service");
var degree_shell_component_1 = require("./degree-shell/degree-shell.component");
var certificatn_shell_component_1 = require("./certificatn-shell/certificatn-shell.component");
var edit_certification_shell_component_1 = require("./certificatn-shell/edit-certification-shell/edit-certification-shell.component");
var edit_degree_shell_component_1 = require("./degree-shell/edit-degree-shell/edit-degree-shell.component");
var shared_module_1 = require("../shared/shared.module");
var store_1 = require("@ngrx/store");
var state_1 = require("./state");
var effects_1 = require("@ngrx/effects");
var certification_shell_effects_1 = require("./certificatn-shell/state/certification-shell.effects");
var view_cert_component_1 = require("./certificatn-shell/view-cert/view-cert.component");
var EducationModule = /** @class */ (function () {
    function EducationModule() {
    }
    EducationModule = __decorate([
        core_1.NgModule({
            declarations: [
                degree_shell_component_1.DegreeShellComponent,
                certificatn_shell_component_1.CertificatnShellComponent,
                edit_certification_shell_component_1.EditCertificationShellComponent,
                edit_degree_shell_component_1.EditDegreeShellComponent,
                view_cert_component_1.ViewCertComponent
            ],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                store_1.StoreModule.forFeature('educationState', state_1.educationReducers),
                effects_1.EffectsModule.forFeature([certification_shell_effects_1.CertificationShellEffects])
            ],
            exports: [],
            providers: [
                { provide: 'CERTIFICATION_SERVICE', useClass: cert_service_1.CertService },
                { provide: 'DEGREE_SERVICE', useClass: degree_service_1.DegreeService }
            ]
        })
    ], EducationModule);
    return EducationModule;
}());
exports.EducationModule = EducationModule;
