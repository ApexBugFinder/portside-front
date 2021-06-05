"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImgSrcDirective = void 0;
var core_1 = require("@angular/core");
var ImgSrcDirective = /** @class */ (function () {
    function ImgSrcDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        console.log('from Directive: ', this.appImgSrc);
        this.el.nativeElement.style.backgroundImage = this.appImgSrc;
    }
    ImgSrcDirective.prototype.ngDoCheck = function () {
        if (this.appImgSrc) {
            this.src = this.appImgSrc;
            console.log('img src directive url: ', this.src);
            this.el.nativeElement.style.display = 'block';
            this.renderer.addClass(this.el.nativeElement, 'showMe');
        }
        else {
            this.el.nativeElement.style.display = 'none';
        }
    };
    __decorate([
        core_1.Input()
    ], ImgSrcDirective.prototype, "appImgSrc");
    __decorate([
        core_1.HostBinding('src')
    ], ImgSrcDirective.prototype, "src");
    ImgSrcDirective = __decorate([
        core_1.Directive({
            selector: '[appImgSrc]'
        })
    ], ImgSrcDirective);
    return ImgSrcDirective;
}());
exports.ImgSrcDirective = ImgSrcDirective;
