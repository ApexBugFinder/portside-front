"use strict";
exports.__esModule = true;
exports.selectCertificationShellState = exports.selectCertificationEntityDataState = exports.selectDegreeShellState = exports.selectDegreeEntityDataState = exports.selectEducationModuleState = exports.educationReducers = void 0;
var store_1 = require("@ngrx/store");
var fromDegreeData = require("../Models/degree/state/degree.reducer");
var fromDegreeShell = require("../degree-shell/state/degree-shell.reducer");
var fromCertData = require("../Models/certification/state/cerfication.reducer");
var fromCertShell = require("../certificatn-shell/state/certification-shell.reducer");
exports.educationReducers = {
    degreeData: fromDegreeData.reducer,
    degreeShell: fromDegreeShell.degreeReducer,
    certData: fromCertData.reducer,
    certShell: fromCertShell.certificationReducer
};
exports.selectEducationModuleState = store_1.createFeatureSelector('educationState');
// HOOKS FOR SUB STATE
exports.selectDegreeEntityDataState = store_1.createSelector(exports.selectEducationModuleState, function (state) { return state.degreeData; });
exports.selectDegreeShellState = store_1.createSelector(exports.selectEducationModuleState, function (state) { return state.degreeShell; });
exports.selectCertificationEntityDataState = store_1.createSelector(exports.selectEducationModuleState, function (state) { return state.certData; });
exports.selectCertificationShellState = store_1.createSelector(exports.selectEducationModuleState, function (state) { return state.certShell; });
