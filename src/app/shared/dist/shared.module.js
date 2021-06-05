"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var material_module_1 = require("./material.module");
var flex_layout_1 = require("@angular/flex-layout");
var angular_fontawesome_1 = require("@fortawesome/angular-fontawesome");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var edit_action_buttons_component_1 = require("./edit-action-buttons/edit-action-buttons.component");
var store_1 = require("@ngrx/store");
// import { sharedReducers } from './state';
var shared_reducer_1 = require("./state/shared-reducer");
var effects_1 = require("@ngrx/effects");
var shared_effects_1 = require("./state/shared-effects");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [edit_action_buttons_component_1.EditActionButtonsComponent],
            imports: [
                common_1.CommonModule,
                material_module_1.MaterialModule,
                flex_layout_1.FlexLayoutModule,
                router_1.RouterModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                angular_fontawesome_1.FontAwesomeModule,
                store_1.StoreModule.forFeature('sharedState', shared_reducer_1.sharedReducer),
                effects_1.EffectsModule.forFeature([shared_effects_1.SharedEffects])
            ],
            exports: [
                common_1.CommonModule,
                material_module_1.MaterialModule,
                flex_layout_1.FlexLayoutModule,
                angular_fontawesome_1.FontAwesomeModule,
                router_1.RouterModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                edit_action_buttons_component_1.EditActionButtonsComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
