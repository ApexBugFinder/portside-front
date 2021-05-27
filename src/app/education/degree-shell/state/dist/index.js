"use strict";
exports.__esModule = true;
exports.getCurrentDegreeIsGraduated = exports.getCurrentDegreeGraduationYr = exports.getCurrentDegreeState = exports.getCurrentDegreeCity = exports.getCurrentDegreeInstitution = exports.getCurrentDegreeMinor = exports.getCurrentDegreeDegreeType = exports.getCurrentDegreeDegreeName = exports.getCurrentDegreeProjectCreator = exports.getCurrentDegreeId = exports.getCurrentDegree = exports.getOrginalDegree = void 0;
var store_1 = require("@ngrx/store");
var state_1 = require("../../state");
exports.getOrginalDegree = store_1.createSelector(state_1.selectDegreeShellState, function (state) { return state.originalDegree; });
exports.getCurrentDegree = store_1.createSelector(state_1.selectDegreeShellState, function (state) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return {
        id: (_a = state.originalDegree) === null || _a === void 0 ? void 0 : _a.id,
        projectCreatorID: (_b = state.originalDegree) === null || _b === void 0 ? void 0 : _b.projectCreatorID,
        degreeName: (_c = state.originalDegree) === null || _c === void 0 ? void 0 : _c.degreeName,
        minor: (_d = state.originalDegree) === null || _d === void 0 ? void 0 : _d.minor,
        institution: (_e = state.originalDegree) === null || _e === void 0 ? void 0 : _e.institution,
        city: (_f = state.originalDegree) === null || _f === void 0 ? void 0 : _f.city,
        state: (_g = state.originalDegree) === null || _g === void 0 ? void 0 : _g.state,
        graduationYear: (_h = state.originalDegree) === null || _h === void 0 ? void 0 : _h.graduationYear,
        isGraduated: (_j = state.originalDegree) === null || _j === void 0 ? void 0 : _j.isGraduated
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
