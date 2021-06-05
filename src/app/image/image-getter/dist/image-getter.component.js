"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImageGetterComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var image_1 = require("../Models/image");
var ImageGetterComponent = /** @class */ (function () {
    function ImageGetterComponent(imageService, renderer) {
        this.imageService = imageService;
        this.renderer = renderer;
        this.mediaRtUrl = new core_1.EventEmitter();
    }
    ImageGetterComponent.prototype.ngOnInit = function () {
        console.log('ImageGetter Title: ', this.Title);
        console.log('ProjectID: ', this.docID);
        console.log('Project Creator', this.projectCreatorID);
        this.mediaToSendToDB = image_1.defaultMediaFile;
        console.log('Preview URL: ', this.preview);
    };
    ImageGetterComponent.prototype.handleFileInput = function (file) {
        var _this = this;
        var _a;
        var myFile = file;
        (_a = this.imageService.processFileInput(myFile)) === null || _a === void 0 ? void 0 : _a.then(function (value) {
            console.log(value);
            _this.mediaToSendToDB.filelist = myFile;
            _this.mediaToSendToDB.type = _this.Title;
            var expId = _this.docID;
            _this.mediaToSendToDB.fileToUpload = myFile === null || myFile === void 0 ? void 0 : myFile.item(0);
            _this.mediaToSendToDB.mediaLocation =
                'users/' +
                    _this.projectCreatorID +
                    '/' +
                    _this.typeOfClass +
                    '/' +
                    expId +
                    '/' +
                    _this.mediaToSendToDB.type;
            console.log(_this.mediaToSendToDB.mediaLocation);
            _this.imageService.uploadToFirebase(_this.mediaToSendToDB).then(function (value) {
                console.log('download URl returned: ', value);
                // Use ngrx instead of eventemitter
                // SET THUMBNAIL PREVIEW
                _this.thumbnailImg = document.getElementById('thumbnail');
                console.log(value.dloadUrl);
                var imgUrl = 'url(&quot;' + value + '&quot; )';
                _this.downloadUrl = value.dloadUrl;
                _this.mediaRtUrl.emit(value === null || value === void 0 ? void 0 : value.dloadUrl);
            });
        })["catch"](function (val) {
            rxjs_1.throwError(val);
        });
    };
    ImageGetterComponent.prototype.returnImageUrlToParentComponent = function (returnUrl) {
        console.log('Emitting result from image-getter', returnUrl);
        // this.mediaRtUrl.emit(returnUrl);
    };
    __decorate([
        core_1.Input()
    ], ImageGetterComponent.prototype, "Title");
    __decorate([
        core_1.Input()
    ], ImageGetterComponent.prototype, "docID");
    __decorate([
        core_1.Input()
    ], ImageGetterComponent.prototype, "preview");
    __decorate([
        core_1.Input()
    ], ImageGetterComponent.prototype, "projectCreatorID");
    __decorate([
        core_1.Input()
    ], ImageGetterComponent.prototype, "typeOfClass");
    __decorate([
        core_1.Output()
    ], ImageGetterComponent.prototype, "mediaRtUrl");
    ImageGetterComponent = __decorate([
        core_1.Component({
            selector: 'app-image-getter',
            templateUrl: './image-getter.component.html',
            styleUrls: ['./image-getter.component.scss']
        })
    ], ImageGetterComponent);
    return ImageGetterComponent;
}());
exports.ImageGetterComponent = ImageGetterComponent;
