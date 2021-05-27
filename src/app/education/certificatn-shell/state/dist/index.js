"use strict";
exports.__esModule = true;
exports.getCurrentCertificationIssuedDate = exports.getCurrentCertificationIssuingBodyLogo = exports.getCurrentCertificationIssuingBodyName = exports.getCurrentCertificationIsActive = exports.getCurrentCertificationCertName = exports.getCurrentCertificationProjectCreator = exports.getCurrentCertificationId = exports.getCurrentCertification = exports.getOrginalCertification = void 0;
var store_1 = require("@ngrx/store");
var state_1 = require("../../state");
exports.getOrginalCertification = store_1.createSelector(state_1.selectCertificationShellState, function (state) { return state.originalCertification; });
exports.getCurrentCertification = store_1.createSelector(state_1.selectCertificationShellState, function (state) {
    return {
        id: state.id,
        projectCreatorID: state.projectCreatorID,
        certName: state.certName,
        isActive: state.isActive,
        issuingBody_Name: state.issuingBody_Name,
        issuingBody_Logo: state.issuingBody_Logo,
        issuedDate: state.issuedDate
    };
});
exports.getCurrentCertificationId = store_1.createSelector(state_1.selectCertificationShellState, function (state) { return state.id; });
exports.getCurrentCertificationProjectCreator = store_1.createSelector(state_1.selectCertificationShellState, function (state) { return state.projectCreatorID; });
exports.getCurrentCertificationCertName = store_1.createSelector(state_1.selectCertificationShellState, function (state) { return state.certName; });
exports.getCurrentCertificationIsActive = store_1.createSelector(state_1.selectCertificationShellState, function (state) { return state.isActive; });
exports.getCurrentCertificationIssuingBodyName = store_1.createSelector(state_1.selectCertificationShellState, function (state) { return state.issuingBody_Name; });
exports.getCurrentCertificationIssuingBodyLogo = store_1.createSelector(state_1.selectCertificationShellState, function (state) { return state.issuingBody_Logo; });
exports.getCurrentCertificationIssuedDate = store_1.createSelector(state_1.selectCertificationShellState, function (state) { return state.issuedDate; });
