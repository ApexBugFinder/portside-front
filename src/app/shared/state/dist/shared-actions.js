"use strict";
exports.__esModule = true;
exports.LoadUserStateFail = exports.LoadUserStateSuccess = exports.LoadUserState = exports.SetUsername = exports.SetUserId = exports.SharedActionTypes = void 0;
var SharedActionTypes;
(function (SharedActionTypes) {
    SharedActionTypes["SET_USER_ID"] = "[SHARED EFFECTS] SET USER ID FROM SHARE EFFECTS";
    SharedActionTypes["SET_USERNAME"] = "[USER COMPONENT] SET USERNAME FROM USER COMPONENT";
    SharedActionTypes["LOAD_USERSTATE"] = "[SHARED EFFECTS] LOAD USER STATE FROM USER COMPONENT";
    SharedActionTypes["LOAD_USERSTATE_SUCCESS"] = "[SHARED EFFECTS] LOAD USER STATE FROM USER COMPONENT====> SUCCESS";
    SharedActionTypes["LOAD_USERSTATE_FAIL"] = "[SHARED EFFECTS] LOAD USER STATE FROM USER COMPONENT====> FAIL";
    SharedActionTypes["CLEAR_USER_ID"] = "[AUTH MODULE] CLEAR USER ID FROM AUTH MODULE";
})(SharedActionTypes = exports.SharedActionTypes || (exports.SharedActionTypes = {}));
// USER COMPONENT
var SetUserId = /** @class */ (function () {
    function SetUserId(payload) {
        this.payload = payload;
        this.type = SharedActionTypes.SET_USER_ID;
    }
    return SetUserId;
}());
exports.SetUserId = SetUserId;
var SetUsername = /** @class */ (function () {
    function SetUsername(payload) {
        this.payload = payload;
        this.type = SharedActionTypes.SET_USERNAME;
    }
    return SetUsername;
}());
exports.SetUsername = SetUsername;
// SHARED EFFECTS
var LoadUserState = /** @class */ (function () {
    function LoadUserState(payload) {
        this.payload = payload;
        this.type = SharedActionTypes.LOAD_USERSTATE;
    }
    return LoadUserState;
}());
exports.LoadUserState = LoadUserState;
var LoadUserStateSuccess = /** @class */ (function () {
    function LoadUserStateSuccess(payload) {
        this.payload = payload;
        this.type = SharedActionTypes.LOAD_USERSTATE_SUCCESS;
    }
    return LoadUserStateSuccess;
}());
exports.LoadUserStateSuccess = LoadUserStateSuccess;
var LoadUserStateFail = /** @class */ (function () {
    function LoadUserStateFail(payload) {
        this.payload = payload;
        this.type = SharedActionTypes.LOAD_USERSTATE_FAIL;
    }
    return LoadUserStateFail;
}());
exports.LoadUserStateFail = LoadUserStateFail;
