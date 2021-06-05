"use strict";
exports.__esModule = true;
exports.selectAll = exports.selectCurrentCertification = exports.selectCurrentCertificationId = exports.selectCertificationsTotal = exports.selectAllCertifications = exports.selectCertificationEntities = exports.selectCertificationIds = void 0;
var state_1 = require("../../../state");
var store_1 = require("@ngrx/store");
exports.selectCertificationIds = store_1.createSelector(state_1.selectCertificationEntityDataState, function (state) { return state.ids; });
exports.selectCertificationEntities = store_1.createSelector(state_1.selectCertificationEntityDataState, function (state) { return state.entities; });
exports.selectAllCertifications = store_1.createSelector(state_1.selectCertificationEntityDataState, function (state) { return Object.values(state.entities); });
exports.selectCertificationsTotal = store_1.createSelector(state_1.selectCertificationEntityDataState, function (state) { return Object.values(state.entities).length; });
exports.selectCurrentCertificationId = store_1.createSelector(state_1.selectCertificationEntityDataState, function (state) { return state.selectedCertificationId; });
exports.selectCurrentCertification = store_1.createSelector(exports.selectCertificationEntities, exports.selectCurrentCertificationId, function (certificationEntities, certificationId) {
    return Object.values(certificationEntities).find(function (i) { return (i === null || i === void 0 ? void 0 : i.id) == certificationId; });
});
exports.selectAll = store_1.createSelector(state_1.selectCertificationEntityDataState, function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.ids) === null || _a === void 0 ? void 0 : _a.map(function (id) { return state === null || state === void 0 ? void 0 : state.entities[id]; }); });
