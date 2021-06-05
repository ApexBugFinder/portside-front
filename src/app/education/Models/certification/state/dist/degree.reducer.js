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
exports.reducer = exports.initialState = exports.adapter = exports.sortByDateStarted = exports.selectedDegreeId = void 0;
var entity_1 = require("@ngrx/entity");
var store_1 = require("@ngrx/store");
var DegreeActions = require("./certification.actions");
function selectedDegreeId(a) {
    return a.id;
}
exports.selectedDegreeId = selectedDegreeId;
function sortByDateStarted(a, b) {
    var _a, _b;
    var compare = ((_a = a.graduationYear) === null || _a === void 0 ? void 0 : _a.valueOf()) - ((_b = b.graduationYear) === null || _b === void 0 ? void 0 : _b.valueOf());
    if (compare > 1) {
        return 1;
    }
    else if (compare < 1) {
        return -1;
    }
    else {
        return 0;
    }
}
exports.sortByDateStarted = sortByDateStarted;
exports.adapter = entity_1.createEntityAdapter({
    selectId: selectedDegreeId,
    sortComparer: sortByDateStarted
});
exports.initialState = exports.adapter.getInitialState({
    selectedDegreeId: '',
    ids: [],
    entities: {}
});
var degreeReducer = store_1.createReducer(exports.initialState, store_1.on(DegreeActions.addDegree, function (state, _a) {
    var Degree = _a.Degree;
    return exports.adapter.addOne(Degree, state);
}), store_1.on(DegreeActions.setDegree, function (state, _a) {
    var Degree = _a.Degree;
    return exports.adapter.setOne(Degree, state);
}), store_1.on(DegreeActions.upsertDegree, function (state, _a) {
    var Degree = _a.Degree;
    return exports.adapter.upsertOne(Degree, state);
}), store_1.on(DegreeActions.addDegrees, function (state, _a) {
    var Degrees = _a.Degrees;
    return exports.adapter.addMany(Degrees, state);
}), store_1.on(DegreeActions.upsertDegrees, function (state, _a) {
    var Degrees = _a.Degrees;
    return exports.adapter.upsertMany(Degrees, state);
}), store_1.on(DegreeActions.updateDegree, function (state, _a) {
    var update = _a.update;
    return exports.adapter.updateOne(update, state);
}), store_1.on(DegreeActions.updateDegrees, function (state, _a) {
    var updates = _a.updates;
    return exports.adapter.updateMany(updates, state);
}), store_1.on(DegreeActions.mapDegree, function (state, _a) {
    var entityMap = _a.entityMap;
    return exports.adapter.mapOne(entityMap, state);
}), store_1.on(DegreeActions.mapDegrees, function (state, _a) {
    var entityMap = _a.entityMap;
    return exports.adapter.map(entityMap, state);
}), store_1.on(DegreeActions.deleteDegree, function (state, _a) {
    var id = _a.id;
    return exports.adapter.removeOne(id, state);
}), store_1.on(DegreeActions.deleteDegrees, function (state, _a) {
    var ids = _a.ids;
    return exports.adapter.removeMany(ids, state);
}), store_1.on(DegreeActions.deleteDegreesByPredicate, function (state, _a) {
    var predicate = _a.predicate;
    return exports.adapter.removeMany(predicate, state);
}), store_1.on(DegreeActions.loadDegrees, function (state, _a) {
    var Degrees = _a.Degrees;
    return exports.adapter.setAll(Degrees, state);
}), store_1.on(DegreeActions.clearDegrees, function (state) {
    return exports.adapter.removeAll(__assign(__assign({}, state), { selectedDegreeId: '' }));
}));
function reducer(state, action) {
    return degreeReducer(state, action);
}
exports.reducer = reducer;
