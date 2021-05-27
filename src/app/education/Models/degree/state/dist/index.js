"use strict";
exports.__esModule = true;
exports.selectAll = exports.selectCurrentDegree = exports.selectCurrentDegreeId = exports.selectDegreesTotal = exports.selectAllDegrees = exports.selectDegreeEntities = exports.selectDegreeIds = void 0;
var state_1 = require("../../../state");
var store_1 = require("@ngrx/store");
exports.selectDegreeIds = store_1.createSelector(state_1.selectDegreeEntityDataState, function (state) { return state.ids; });
exports.selectDegreeEntities = store_1.createSelector(state_1.selectDegreeEntityDataState, function (state) { return state.entities; });
exports.selectAllDegrees = store_1.createSelector(state_1.selectDegreeEntityDataState, function (state) { return Object.values(state.entities); });
exports.selectDegreesTotal = store_1.createSelector(state_1.selectDegreeEntityDataState, function (state) { return Object.values(state.entities).length; });
exports.selectCurrentDegreeId = store_1.createSelector(state_1.selectDegreeEntityDataState, function (state) { return state.selectedDegreeId; });
exports.selectCurrentDegree = store_1.createSelector(exports.selectDegreeEntities, exports.selectCurrentDegreeId, function (degreeEntities, degreeId) {
    return Object.values(degreeEntities).find(function (i) { return (i === null || i === void 0 ? void 0 : i.id) == degreeId; });
});
exports.selectAll = store_1.createSelector(state_1.selectDegreeEntityDataState, function (state) { var _a; return (_a = state === null || state === void 0 ? void 0 : state.ids) === null || _a === void 0 ? void 0 : _a.map(function (id) { return state === null || state === void 0 ? void 0 : state.entities[id]; }); });
