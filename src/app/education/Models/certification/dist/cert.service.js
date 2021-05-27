"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CertService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var Constants_1 = require("../../../helpers/Constants");
var CertService = /** @class */ (function () {
    function CertService(http) {
        this.http = http;
        this.ctlrName = 'certifications/';
        this.apiRt = Constants_1.Constants.apiRoot;
        this.apiAddress = this.apiRt + this.ctlrName;
        this.hdrs = new http_1.HttpHeaders();
        this.userID = Constants_1.Constants.userID;
        this.clientRt = Constants_1.Constants.clientRoot;
    }
    // CREATE CERTIFCATION
    CertService.prototype.createItem = function (item) {
        this.hdrs = new http_1.HttpHeaders();
        var address = this.apiAddress + "new";
        this.hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants_1.Constants.clientRoot])
            .set('Access-Control-Allow-Methods', ['PUT', 'POST', 'DELETE', 'GET'])
            .set('content-type', 'application/json');
        this.printServiceInfo(address, item, this.hdrs);
        return this.http.post(address, item, { headers: this.hdrs }).pipe(operators_1.timeout(2000), operators_1.map(function (newCertification) {
            console.log('New Certification added to DB: ', newCertification);
            return newCertification;
        }));
    };
    // READ ALL CertificationS BY USER
    CertService.prototype.readAll = function (id) {
        var address = 'all/' + Constants_1.Constants.userID;
        var urlAddress = this.apiAddress + address;
        this.hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants_1.Constants.clientRoot])
            .set('Access-Control-Allow-Methods', 'GET')
            .set('content-type', 'application/json');
        this.printServiceInfo(urlAddress, id, this.hdrs);
        return this.http.get(urlAddress, { headers: this.hdrs })
            .pipe(operators_1.timeout(2000), operators_1.map(function (usersCertifications) {
            console.log('User\'s Certifications Found:  ' + usersCertifications);
            return usersCertifications;
        }));
    };
    // GET Certification BY ID
    CertService.prototype.readItem = function (id) {
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
    //  UPDATE Certification
    CertService.prototype.updateItem = function (item) {
        var urlAddress = this.apiAddress + item.id;
        item.projectCreatorID = Constants_1.Constants.userID;
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
    // DELETE Certification
    CertService.prototype.deleteItem = function (id) {
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
    CertService.prototype.printServiceInfo = function (address, payload, httpHrd) {
        console.log('urlAddress: ', address);
        console.log('HEADERS:', httpHrd);
        console.log('payload: ', payload);
    };
    CertService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CertService);
    return CertService;
}());
exports.CertService = CertService;
