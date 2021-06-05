"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DegreeShellComponent = void 0;
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var fromDegreeData = require("../Models/degree/state");
var DegreeShellComponent = /** @class */ (function () {
    function DegreeShellComponent(myDegreeStore) {
        this.myDegreeStore = myDegreeStore;
        this.myDegrees$ = this.myDegreeStore.pipe(store_1.select(fromDegreeData.selectAllDegrees));
    }
    DegreeShellComponent.prototype.ngOnInit = function () {
        this.myDegrees$.subscribe({
            next: function (value) {
                if (value)
                    console.log('HELLO', value);
            },
            error: function (err) { },
            complete: function () { }
        });
    };
    DegreeShellComponent = __decorate([
        core_1.Component({
            selector: 'app-degree-shell',
            templateUrl: './degree-shell.component.html',
            styleUrls: ['./degree-shell.component.scss']
        })
    ], DegreeShellComponent);
    return DegreeShellComponent;
}());
exports.DegreeShellComponent = DegreeShellComponent;
