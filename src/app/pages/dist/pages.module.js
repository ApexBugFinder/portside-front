"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagesModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var pages_routing_module_1 = require("./pages-routing.module");
var home_component_1 = require("./home/home.component");
var project_component_1 = require("./project/project.component");
var education_component_1 = require("./education/education.component");
var experience_component_1 = require("./experience/experience.component");
var page_shell_component_1 = require("./page-shell/page-shell.component");
var shared_module_1 = require("../shared/shared.module");
var project_module_1 = require("../project/project.module");
var forms_1 = require("@angular/forms");
var action_buttons_component_1 = require("./action-buttons/action-buttons.component");
var experience_module_1 = require("../experience/experience.module");
var education_module_1 = require("../education/education.module");
var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        core_1.NgModule({
            declarations: [
                home_component_1.HomeComponent,
                project_component_1.ProjectComponent,
                education_component_1.EducationComponent,
                experience_component_1.ExperienceComponent,
                page_shell_component_1.PageShellComponent,
                action_buttons_component_1.ActionButtonsComponent
            ],
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, pages_routing_module_1.PagesRoutingModule, shared_module_1.SharedModule, project_module_1.ProjectModule, experience_module_1.ExperienceModule, education_module_1.EducationModule],
            exports: [
                home_component_1.HomeComponent,
                project_component_1.ProjectComponent,
                education_component_1.EducationComponent,
                experience_component_1.ExperienceComponent,
                page_shell_component_1.PageShellComponent,
                action_buttons_component_1.ActionButtonsComponent
            ]
        })
    ], PagesModule);
    return PagesModule;
}());
exports.PagesModule = PagesModule;
