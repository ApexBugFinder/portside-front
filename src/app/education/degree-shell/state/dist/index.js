"use strict";
exports.__esModule = true;
exports.getCurrentDegreeIsGraduated = exports.getCurrentDegreeGraduationYr = exports.getCurrentDegreeState = exports.getCurrentDegreeCity = exports.getCurrentDegreeInstitution = exports.getCurrentDegreeMinor = exports.getCurrentDegreeDegreeType = exports.getCurrentDegreeDegreeName = exports.getCurrentDegreeProjectCreator = exports.getCurrentDegreeId = exports.getCurrentDegree = exports.getOrginalDegree = void 0;
var store_1 = require("@ngrx/store");
var state_1 = require("../../state");
exports.getOrginalDegree = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.originalDegree; });
exports.getCurrentDegree = store_1.createSelector(state_1.selectDegreeShellState, function (state) {
    return {
        id: state.id,
        projectCreatorID: state.projectCreatorID,
        degreeName: state.degreeName,
        minor: state.minor,
        institution: state.institution,
        city: state.city,
        state: state.state,
        graduationYear: state.graduationYear,
        isGraduated: state.isGraduated
    };
});
exports.getCurrentDegreeId = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.id; });
exports.getCurrentDegreeProjectCreator = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.projectCreatorID; });
exports.getCurrentDegreeDegreeName = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.degreeName; });
exports.getCurrentDegreeDegreeType = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.degreeType; });
exports.getCurrentDegreeMinor = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.minor; });
exports.getCurrentDegreeInstitution = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.institution; });
exports.getCurrentDegreeCity = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.city; });
exports.getCurrentDegreeState = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.state; });
exports.getCurrentDegreeGraduationYr = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.graduationYear; });
exports.getCurrentDegreeIsGraduated = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.isGraduated; });
