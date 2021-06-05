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
exports.reducer = exports.initialState = exports.adapter = exports.sortByDateStarted = exports.selectedExperienceId = void 0;
var entity_1 = require("@ngrx/entity");
var ExperienceActions = require("./experience.actions");
var store_1 = require("@ngrx/store");
function selectedExperienceId(a) {
    return a.id;
}
exports.selectedExperienceId = selectedExperienceId;
function sortByDateStarted(a, b) {
    var _a, _b;
    var compare = ((_a = a.started) === null || _a === void 0 ? void 0 : _a.valueOf()) - ((_b = b.started) === null || _b === void 0 ? void 0 : _b.valueOf());
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
    selectId: selectedExperienceId,
    sortComparer: sortByDateStarted
});
exports.initialState = exports.adapter.getInitialState({
    selectedExperienceId: '',
    ids: [],
    entities: {}
});
var experienceReducer = store_1.createReducer(exports.initialState, store_1.on(ExperienceActions.addExperience, function (state, _a) {
    var experience = _a.experience;
    return exports.adapter.addOne(experience, state);
}), store_1.on(ExperienceActions.setExperience, function (state, _a) {
    var experience = _a.experience;
    return exports.adapter.setOne(experience, state);
}), store_1.on(ExperienceActions.upsertExperience, function (state, _a) {
    var experience = _a.experience;
    return exports.adapter.upsertOne(experience, state);
}), store_1.on(ExperienceActions.addExperiences, function (state, _a) {
    var experiences = _a.experiences;
    return exports.adapter.addMany(experiences, state);
}), store_1.on(ExperienceActions.upsertExperiences, function (state, _a) {
    var experiences = _a.experiences;
    return exports.adapter.upsertMany(experiences, state);
}), store_1.on(ExperienceActions.updateExperience, function (state, _a) {
    var update = _a.update;
    return exports.adapter.updateOne(update, state);
}), store_1.on(ExperienceActions.updateExperiences, function (state, _a) {
    var updates = _a.updates;
    return exports.adapter.updateMany(updates, state);
}), store_1.on(ExperienceActions.mapExperience, function (state, _a) {
    var entityMap = _a.entityMap;
    return exports.adapter.mapOne(entityMap, state);
}), store_1.on(ExperienceActions.mapExperiences, function (state, _a) {
    var entityMap = _a.entityMap;
    return exports.adapter.map(entityMap, state);
}), store_1.on(ExperienceActions.deleteExperience, function (state, _a) {
    var id = _a.id;
    return exports.adapter.removeOne(id, state);
}), store_1.on(ExperienceActions.deleteExperiences, function (state, _a) {
    var ids = _a.ids;
    return exports.adapter.removeMany(ids, state);
}), store_1.on(ExperienceActions.deleteExperiencesByPredicate, function (state, _a) {
    var predicate = _a.predicate;
    return exports.adapter.removeMany(predicate, state);
}), store_1.on(ExperienceActions.loadExperiences, function (state, _a) {
    var experiences = _a.experiences;
    return exports.adapter.setAll(experiences, state);
}), store_1.on(ExperienceActions.clearExperiences, function (state) {
    return exports.adapter.removeAll(__assign(__assign({}, state), { selectedExperienceId: '' }));
}));
function reducer(state, action) {
    return experienceReducer(state, action);
}
exports.reducer = reducer;
//
