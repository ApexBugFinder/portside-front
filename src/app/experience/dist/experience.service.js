"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExperienceService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var Constants_1 = require("../helpers/Constants");
var ExperienceService = /** @class */ (function () {
    function ExperienceService(http) {
        this.http = http;
        this.ctlrName = 'Experiences/';
        this.apiRt = Constants_1.Constants.apiRoot;
        this.apiAddress = this.apiRt + this.ctlrName;
        this.hdrs = new http_1.HttpHeaders();
        this.userID = Constants_1.Constants.userID;
        this.clientRt = Constants_1.Constants.clientRoot;
    }
    // CREATE EXPERIENCE
    ExperienceService.prototype.createItem = function (item) {
        this.hdrs = new http_1.HttpHeaders();
        var address = this.apiAddress + "new";
        console.log('item to send: ', item);
        var hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants_1.Constants.clientRoot])
            .set('Access-Control-Allow-Methods', ['PUT', 'POST',])
            .set('content-type', 'application/json');
        this.printServiceInfo(address, item, this.hdrs);
        return this.http.post(address, item, { headers: hdrs }).pipe(operators_1.timeout(2000), operators_1.map(function (newExperience) {
            console.log('New Experience added to DB: ', newExperience);
            return newExperience;
        }));
    };
    // READ ALL ExperienceS BY USER
    ExperienceService.prototype.readAll = function (id) {
        var address = 'all/' + this.userID;
        var urlAddress = this.apiAddress + address;
        this.hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants_1.Constants.clientRoot])
            .set('Access-Control-Allow-Methods', 'GET')
            .set('content-type', 'application/json');
        this.printServiceInfo(urlAddress, id, this.hdrs);
        return this.http.get(urlAddress, { headers: this.hdrs })
            .pipe(
        // timeout(3000),
        operators_1.map(function (usersExperiences) {
            console.log('User\'s Experiences Found:  ' + usersExperiences);
            usersExperiences.forEach(function (exp) {
                var _a;
                (_a = exp.roles) === null || _a === void 0 ? void 0 : _a.forEach(function (role) {
                    var p = JSON.stringify(role.editState);
                    role.stateHistory = [role.editState];
                });
            });
            return usersExperiences;
        }));
    };
    // GET Experience BY ID
    ExperienceService.prototype.readItem = function (id) {
        var address = id;
        var urlAddress = this.apiAddress + address;
        this.hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
            .set('Access-Control-Allow-Methods', 'GET')
            .set('Access-Control-Allow-Headers', 'Content-Type')
            .set('content-type', 'application/json');
        this.printServiceInfo(urlAddress, id, this.hdrs);
        return this.http.get(urlAddress, { headers: this.hdrs }).pipe(operators_1.timeout(2000), operators_1.map(function (item) {
            console.log('Item Found: ' + item);
            return item;
        }));
    };
    //  UPDATE Experience
    ExperienceService.prototype.updateItem = function (item) {
        var urlAddress = this.apiAddress + (item === null || item === void 0 ? void 0 : item.id);
        // item.projectCreatorID = Constants.userID as string;
        this.hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
            .set('Access-Control-Allow-Methods', ['PUT', 'POST', 'DELETE', 'GET'])
            .set('Access-Control-Allow-Headers', 'Content-Type')
            .set('content-type', 'application/json');
        this.printServiceInfo(urlAddress, item, this.hdrs);
        return this.http.put(urlAddress, item, { headers: this.hdrs }).pipe(operators_1.timeout(2000), operators_1.map(function (updatedItem) {
            console.log('Updated Item: ', updatedItem);
            return updatedItem;
        }));
    };
    // DELETE Experience
    ExperienceService.prototype.deleteItem = function (id) {
        var address = id;
        var urlAddress = this.apiAddress + id;
        this.hdrs = new http_1.HttpHeaders();
        this.hdrs.set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, this.clientRt])
            .set('Access-Control-Allow-Methods', 'DELETE')
            .set('Access-Control-Allow-Headers', 'Content-Type');
        this.printServiceInfo(urlAddress, id, this.hdrs);
        return this.http["delete"](urlAddress, { headers: this.hdrs }).pipe(operators_1.timeout(2000), operators_1.map(function (itemDeleted) {
            console.log('Item Deleted: ', itemDeleted);
            return itemDeleted;
        }));
    };
    ExperienceService.prototype.printServiceInfo = function (address, payload, httpHrd) {
        console.log('urlAddress: ', address);
        console.log('HEADERS:', httpHrd);
        console.log('payload: ', payload);
    };
    ExperienceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ExperienceService);
    return ExperienceService;
}());
exports.ExperienceService = ExperienceService;
