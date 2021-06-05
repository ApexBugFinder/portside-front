"use strict";
exports.__esModule = true;
exports.selectExperienceShellState = exports.selectExperienceEntityDataState = exports.selectExperienceModuleState = exports.experienceReducers = void 0;
var store_1 = require("@ngrx/store");
var fromExperienceData = require("./state/experience.reducer");
var fromExperienceShell = require("./experience-shell/state/experience-shell.reducer");
exports.experienceReducers = {
    experienceData: fromExperienceData.reducer,
    experienceShell: fromExperienceShell.experienceReducer
};
exports.selectExperienceModuleState = store_1.createFeatureSelector('experienceState');
exports.selectExperienceEntityDataState = store_1.createSelector(exports.selectExperienceModuleState, function (state) { return state.experienceData; });
exports.selectExperienceShellState = store_1.createSelector(exports.selectExperienceModuleState, function (state) { return state.experienceShell; });
