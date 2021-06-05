"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var helperFunctions_1 = require("src/app/helpers/helperFunctions");
var Constants_1 = require("src/app/helpers/Constants");
var operators_1 = require("rxjs/operators");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.ctlrName = 'projectcreator/';
        this.apiRt = Constants_1.Constants.apiRoot;
        this.apiAddress = this.apiRt + this.ctlrName;
        this.clientRt = Constants_1.Constants.clientRoot;
    }
    UserService.prototype.getUserInfo = function (userName) {
        this.hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [
            this.apiRt,
            this.apiAddress,
            this.clientRt,
        ])
            .set('Access-Control-Allow-Methods', ['GET'])
            .set('content-type', 'application/json');
        var address = this.apiAddress + 'username/' + userName;
        helperFunctions_1.printServiceInfo(address, userName, this.hdrs);
        return this.http.get(address, { headers: this.hdrs }).pipe(operators_1.timeout(2000), operators_1.map(function (userState) {
            console.log('User\'s Info: ', userState);
            return userState;
        }));
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
