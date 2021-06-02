"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var Constants_1 = require("../helpers/Constants");
var store_1 = require("@ngrx/store");
var fromShare = require("../shared/state");
var ProjectService = /** @class */ (function () {
    function ProjectService(http, projectStore, shareStore) {
        var _this = this;
        this.http = http;
        this.projectStore = projectStore;
        this.shareStore = shareStore;
        this.shareStore.pipe(store_1.select(fromShare.getUserId)).subscribe(function (value) { return _this.userID = value; });
        this.ctlrName = 'projects/';
        this.apiRt = Constants_1.Constants.apiRoot;
        this.apiAddress = this.apiRt + this.ctlrName;
        this.hdrs = new http_1.HttpHeaders();
        this.clientRt = Constants_1.Constants.clientRoot;
    }
    // CREATE PROJECT
    ProjectService.prototype.createItem = function (item) {
        this.hdrs = new http_1.HttpHeaders();
        //  const urlAddress = this.apiAddress;
        var address = this.apiAddress + "new";
        var hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants_1.Constants.clientRoot])
            .set('Access-Control-Allow-Methods', ['PUT', 'POST', 'DELETE', 'GET'])
            .set('content-type', 'application/json');
        console.log('addresss: ', address);
        console.log('HEADERS: ', this.hdrs);
        console.log('item to send:', item);
        return this.http.post(address, item, { headers: hdrs }).pipe(operators_1.timeout(2000), operators_1.map(function (newProject) {
            console.log('New Project added to DB: ', newProject);
            return newProject;
        }));
    };
    // CREATE LINKS
    // READ ALL PROJECTS BY USER
    ProjectService.prototype.readAll = function (id) {
        var address = 'all/' + Constants_1.Constants.userID;
        var urlAddress = this.apiAddress + address;
        var hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants_1.Constants.clientRoot])
            .set('Access-Control-Allow-Methods', 'GET')
            .set('content-type', 'application/json');
        this.printServiceInfo(urlAddress, id, hdrs);
        return this.http.get(urlAddress, { headers: hdrs })
            .pipe(operators_1.timeout(2000), operators_1.map(function (usersProjects) {
            console.log('User\'s Projects Found:  ' + JSON.stringify(usersProjects));
            // this.projectStore.dispatch(projectActions.addProjects({projects: usersProjects}));
            usersProjects.forEach(function (up) {
                var _a;
                (_a = up === null || up === void 0 ? void 0 : up.projectRequirements) === null || _a === void 0 ? void 0 : _a.forEach(function (ij) {
                    var p = JSON.stringify(ij.editState);
                    console.log(p);
                    ij.stateHistory = [ij.editState];
                    console.log(ij.stateHistory);
                });
            });
            return usersProjects;
        }));
    };
    // GET PROJECT BY ID
    ProjectService.prototype.readItem = function (id) {
        var address = id;
        var urlAddress = this.apiAddress + address;
        this.hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [this.apiRt])
            .set('Access-Control-Allow-Methods', 'GET')
            .set('Access-Control-Allow-Headers', 'Content-Type')
            .set('content-type', 'application/json');
        this.printServiceInfo(urlAddress, id, this.hdrs);
        return this.http.get(urlAddress, { headers: this.hdrs }).pipe(operators_1.timeout(2000), operators_1.map(function (item) {
            console.log('Item Found: ' + item);
            return item;
        }));
    };
    //  UPDATE PROJECT
    ProjectService.prototype.updateItem = function (item) {
        var urlAddress = this.apiAddress + (item === null || item === void 0 ? void 0 : item.id);
        var hdrs = new http_1.HttpHeaders()
            .set('Access-Control-Allow-Origin', [this.apiRt, this.apiAddress, Constants_1.Constants.clientRoot])
            .set('Access-Control-Allow-Methods', ['PUT', 'POST', 'DELETE', 'GET'])
            .set('Access-Control-Allow-Headers', 'Content-Type')
            .set('content-type', 'application/json');
        this.printServiceInfo(urlAddress, item, hdrs);
        return this.http.put(urlAddress, item, { headers: hdrs }).pipe(operators_1.timeout(2000), operators_1.map(function (updatedItem) {
            console.log('Updated Item: ', updatedItem);
            return updatedItem;
        }));
    };
    // DELETE PROJECT
    ProjectService.prototype.deleteItem = function (id) {
        console.log('HELLO');
        var address = id;
        var urlAddress = this.apiAddress + id;
        this.hdrs = new http_1.HttpHeaders();
        this.hdrs.set('Access-Control-Allow-Origin', [this.apiRt])
            .set('Access-Control-Allow-Methods', 'DELETE')
            .set('Access-Control-Allow-Headers', 'Content-Type');
        this.printServiceInfo(urlAddress, id, this.hdrs);
        return this.http["delete"](urlAddress, { headers: this.hdrs }).pipe(operators_1.timeout(2000), operators_1.map(function (itemDeleted) {
            console.log('Item Deleted: ', itemDeleted);
            return itemDeleted;
        }));
    };
    ProjectService.prototype.printServiceInfo = function (address, payload, httpHrd) {
        console.log('urlAddress: ', address);
        console.log('HEADERS:', httpHrd);
        console.log('payload: ', payload);
    };
    ProjectService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
