"use strict";
exports.__esModule = true;
exports.getUsername = exports.getIsLoading = exports.getUserId = exports.selectSharedModuleState = void 0;
var store_1 = require("@ngrx/store");
exports.selectSharedModuleState = store_1.createFeatureSelector('sharedState');
exports.getUserId = store_1.createSelector(exports.selectSharedModuleState, function (state) { return state.userID; });
exports.getIsLoading = store_1.createSelector(exports.selectSharedModuleState, function (state) { return state.isLoading; });
exports.getUsername = store_1.createSelector(exports.selectSharedModuleState, function (state) { return state.username; });
