"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImageService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var ImageService = /** @class */ (function () {
    function ImageService(storage, afs) {
        this.storage = storage;
        this.afs = afs;
    }
    // POST
    // SEND MEDIA TO ONLINE BUCKET STORAGE
    ImageService.prototype.uploadToFirebase = function (mediaToSend) {
        var _this = this;
        console.log('from the imageService uploadToFirebase Method:');
        // SET STORAGE LOCATION
        var myUploadPromise = new Promise(function (resolve, reject) {
            if (mediaToSend.fileToUpload !== null) {
                _this.mediaRef = _this.storage.ref(mediaToSend.mediaLocation);
                var task = _this.mediaRef.put(mediaToSend.fileToUpload);
                task.snapshotChanges().pipe(operators_1.timeout(2000), operators_1.finalize(function () { return _this.downloadURL = _this.mediaRef.getDownloadURL(); }))
                    .subscribe(function (val) {
                    val === null || val === void 0 ? void 0 : val.ref.getDownloadURL().then(function (url) {
                        mediaToSend.dloadUrl = url;
                        console.log('download url: ', url);
                        resolve(mediaToSend);
                    })["catch"](function (err) {
                        mediaToSend.error = err;
                        reject(mediaToSend);
                    });
                });
            }
        });
        return myUploadPromise;
    };
    ImageService.prototype.processFileInput = function (file) {
        var _this = this;
        var myFile = file === null || file === void 0 ? void 0 : file.item(0);
        var myProcessFilePromise = new Promise(function (resolve, reject) {
            if (_this.isImage(myFile)) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    resolve(event.target.result);
                };
                reader.readAsDataURL(myFile);
            }
            else {
                reject('File not a Picture');
            }
        });
        return myProcessFilePromise;
    };
    ImageService.prototype.isImage = function (file) {
        return (file === null || file === void 0 ? void 0 : file.type.split('/')[0]) === 'image';
    };
    ImageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ImageService);
    return ImageService;
}());
exports.ImageService = ImageService;
