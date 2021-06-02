"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.sharedReducer = void 0;
var shared_actions_1 = require("./shared-actions");
var initialState = {
    isLoading: false,
    userID: '',
    username: '',
    error: ''
};
function sharedReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case shared_actions_1.SharedActionTypes.SET_USER_ID
            || shared_actions_1.SharedActionTypes.LOAD_USERSTATE_SUCCESS:
            return __assign(__assign({}, state), { userID: action.payload });
        case shared_actions_1.SharedActionTypes.LOAD_USERSTATE_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        default:
            return state;
    }
}
exports.sharedReducer = sharedReducer;
