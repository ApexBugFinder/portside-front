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
exports.reducer = exports.initialState = exports.adapter = exports.sortByName = exports.sortByDateStarted = exports.selectedCertificationId = void 0;
var entity_1 = require("@ngrx/entity");
var store_1 = require("@ngrx/store");
var CertificationActions = require("./certification.actions");
function selectedCertificationId(a) {
    return a.id;
}
exports.selectedCertificationId = selectedCertificationId;
function sortByDateStarted(a, b) {
    var _a, _b;
    var compare = ((_a = a.issuedDate) === null || _a === void 0 ? void 0 : _a.valueOf()) - ((_b = b.issuedDate) === null || _b === void 0 ? void 0 : _b.valueOf());
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
function sortByName(a, b) {
    var compare = a.certName.localeCompare(b.certName);
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
exports.sortByName = sortByName;
exports.adapter = entity_1.createEntityAdapter({
    selectId: selectedCertificationId,
    sortComparer: sortByName
});
exports.initialState = exports.adapter.getInitialState({
    selectedCertificationId: '',
    ids: [],
    entities: {}
});
var certificationReducer = store_1.createReducer(exports.initialState, store_1.on(CertificationActions.addCertification, function (state, _a) {
    var Certification = _a.Certification;
    return exports.adapter.addOne(Certification, state);
}), store_1.on(CertificationActions.setCertification, function (state, _a) {
    var Certification = _a.Certification;
    return exports.adapter.setOne(Certification, state);
}), store_1.on(CertificationActions.upsertCertification, function (state, _a) {
    var Certification = _a.Certification;
    return exports.adapter.upsertOne(Certification, state);
}), store_1.on(CertificationActions.addCertifications, function (state, _a) {
    var Certifications = _a.Certifications;
    return exports.adapter.addMany(Certifications, state);
}), store_1.on(CertificationActions.upsertCertifications, function (state, _a) {
    var Certifications = _a.Certifications;
    return exports.adapter.upsertMany(Certifications, state);
}), store_1.on(CertificationActions.updateCertification, function (state, _a) {
    var update = _a.update;
    return exports.adapter.updateOne(update, state);
}), store_1.on(CertificationActions.updateCertifications, function (state, _a) {
    var updates = _a.updates;
    return exports.adapter.updateMany(updates, state);
}), store_1.on(CertificationActions.mapCertification, function (state, _a) {
    var entityMap = _a.entityMap;
    return exports.adapter.mapOne(entityMap, state);
}), store_1.on(CertificationActions.mapCertifications, function (state, _a) {
    var entityMap = _a.entityMap;
    return exports.adapter.map(entityMap, state);
}), store_1.on(CertificationActions.deleteCertification, function (state, _a) {
    var id = _a.id;
    return exports.adapter.removeOne(id, state);
}), store_1.on(CertificationActions.deleteCertifications, function (state, _a) {
    var ids = _a.ids;
    return exports.adapter.removeMany(ids, state);
}), store_1.on(CertificationActions.deleteCertificationsByPredicate, function (state, _a) {
    var predicate = _a.predicate;
    return exports.adapter.removeMany(predicate, state);
}), store_1.on(CertificationActions.loadCertifications, function (state, _a) {
    var Certifications = _a.Certifications;
    return exports.adapter.setAll(Certifications, state);
}), store_1.on(CertificationActions.clearCertifications, function (state) {
    return exports.adapter.removeAll(__assign(__assign({}, state), { selectedCertificationId: '' }));
}));
function reducer(state, action) {
    return certificationReducer(state, action);
}
exports.reducer = reducer;
