"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var shared_module_1 = require("./shared/shared.module");
var header_component_1 = require("./header/header.component");
var pages_module_1 = require("./pages/pages.module");
var router_1 = require("@angular/router");
var dialog_1 = require("@angular/material/dialog");
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
var store_devtools_1 = require("@ngrx/store-devtools");
var environment_1 = require("src/environments/environment");
var user_module_1 = require("./user/user.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, header_component_1.HeaderComponent],
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                shared_module_1.SharedModule,
                store_1.StoreModule.forRoot({}),
                effects_1.EffectsModule.forRoot([]),
                store_devtools_1.StoreDevtoolsModule.instrument({
                    name: 'App Demo DevTools',
                    maxAge: 25,
                    logOnly: environment_1.environment.production
                }),
                pages_module_1.PagesModule,
                user_module_1.UserModule
            ],
            exports: [header_component_1.HeaderComponent],
            // entryComponents: [ProjectCardComponent, EditProjectComponent],
            providers: [
                { provide: dialog_1.MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
