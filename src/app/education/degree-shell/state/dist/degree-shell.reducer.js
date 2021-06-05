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
exports.degreeReducer = void 0;
var degree_1 = require("../../Models/degree/degree");
var degree_shell_actions_1 = require("./degree-shell.actions");
var initialState = {
    originalDegree: degree_1.defaultDegree,
    id: '',
    projectCreatorID: '',
    degreeName: '',
    degreeType: '',
    error: ''
};
function degreeReducer(state, action) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case degree_shell_actions_1.DegreeActionTypes.SET_ORIGINAL_DEGREE_from_DEGREE_EFFECTS:
            return __assign(__assign({}, state), { originalDegree: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, degreeName: action.payload.degreeName, degreeType: action.payload.degreeType, minor: action.payload.minor, institution: action.payload.institution, city: action.payload.city, state: action.payload.state, graduationYear: action.payload.graduationYear, isGraduated: action.payload.isGraduated });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_from_DEGREE_EFFECTS:
            return __assign(__assign({}, state), { id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, degreeName: action.payload.degreeName, degreeType: action.payload.degreeType, minor: action.payload.minor, institution: action.payload.institution, city: action.payload.city, state: action.payload.state, graduationYear: action.payload.graduationYear, isGraduated: action.payload.isGraduated });
        case degree_shell_actions_1.DegreeActionTypes.SET_ORIGINAL_DEGREE_from_VIEWDEGREE_COMPONENT:
            return __assign(__assign({}, state), { originalDegree: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, degreeName: action.payload.degreeName, degreeType: action.payload.degreeType, minor: action.payload.minor, institution: action.payload.institution, city: action.payload.city, state: action.payload.state, graduationYear: action.payload.graduationYear, isGraduated: action.payload.isGraduated });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_from_VIEWDEGREE_COMPONENT:
            return __assign(__assign({}, state), { id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, degreeName: action.payload.degreeName, degreeType: action.payload.degreeType, minor: action.payload.minor, institution: action.payload.institution, city: action.payload.city, state: action.payload.state, graduationYear: action.payload.graduationYear, isGraduated: action.payload.isGraduated });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { id: action.payload });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { projectCreatorID: action.payload });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { degreeName: action.payload });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_DEGREE_TYPE_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { degreeType: action.payload });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { minor: action.payload });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { institution: action.payload });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { city: action.payload });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { state: action.payload });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { graduationYear: action.payload });
        case degree_shell_actions_1.DegreeActionTypes.SET_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { state: action.payload });
        // CLEAR
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_SAVE:
            return __assign(__assign({}, state), { originalDegree: initialState.originalDegree, id: initialState.id, projectCreatorID: initialState.projectCreatorID, degreeName: initialState.degreeName, minor: initialState.minor, institution: initialState.institution, city: initialState.city, state: initialState.state });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_UPDATE:
            return __assign(__assign({}, state), { originalDegree: initialState.originalDegree, id: initialState.id, projectCreatorID: initialState.projectCreatorID, degreeName: initialState.degreeName, minor: initialState.minor, institution: initialState.institution, city: initialState.city, state: initialState.state });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_DELETE:
            return __assign(__assign({}, state), { originalDegree: initialState.originalDegree, id: initialState.id, projectCreatorID: initialState.projectCreatorID, degreeName: initialState.degreeName, minor: initialState.minor, institution: initialState.institution, city: initialState.city, state: initialState.state });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_SAVE:
            return __assign(__assign({}, state), { originalDegree: initialState.originalDegree, id: initialState.id, projectCreatorID: initialState.projectCreatorID, degreeName: initialState.degreeName, minor: initialState.minor, institution: initialState.institution, city: initialState.city, state: initialState.state });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_UPDATE:
            return __assign(__assign({}, state), { originalDegree: initialState.originalDegree, id: initialState.id, projectCreatorID: initialState.projectCreatorID, degreeName: initialState.degreeName, minor: initialState.minor, institution: initialState.institution, city: initialState.city, state: initialState.state });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_DELETE:
            return __assign(__assign({}, state), { originalDegree: initialState.originalDegree, id: initialState.id, projectCreatorID: initialState.projectCreatorID, degreeName: initialState.degreeName, minor: initialState.minor, institution: initialState.institution, city: initialState.city, state: initialState.state });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { id: initialState.id });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { projectCreatorID: initialState.projectCreatorID });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { degreeName: initialState.degreeName });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { minor: initialState.minor });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { institution: initialState.institution });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { city: initialState.city });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { state: initialState.state });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_isGRADUATED_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { isGraduated: initialState.isGraduated });
        case degree_shell_actions_1.DegreeActionTypes.CLEAR_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { graduationYear: initialState.graduationYear });
        case degree_shell_actions_1.DegreeActionTypes.RESET_CURRENT_DEGREE_FROM_DEGREE_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { id: (_a = state.originalDegree) === null || _a === void 0 ? void 0 : _a.id, projectCreatorID: (_b = state.originalDegree) === null || _b === void 0 ? void 0 : _b.projectCreatorID, degreeName: (_c = state.originalDegree) === null || _c === void 0 ? void 0 : _c.degreeName, minor: (_d = state.originalDegree) === null || _d === void 0 ? void 0 : _d.minor, institution: (_e = state.originalDegree) === null || _e === void 0 ? void 0 : _e.institution, city: (_f = state.originalDegree) === null || _f === void 0 ? void 0 : _f.city, state: (_g = state.originalDegree) === null || _g === void 0 ? void 0 : _g.state, graduationYear: (_h = state.originalDegree) === null || _h === void 0 ? void 0 : _h.graduationYear, isGraduated: (_j = state.originalDegree) === null || _j === void 0 ? void 0 : _j.isGraduated });
        // TO DB
        // LOAD
        case degree_shell_actions_1.DegreeActionTypes.LOAD_DEGREES_FROM_DB_on_PAGESHELL_SUCCESS:
            if (action.payload.length > 0) {
                return __assign(__assign({}, state), { originalDegree: action.payload[0], id: action.payload[0].id, projectCreatorID: action.payload[0].projectCreatorID, degreeName: action.payload[0].degreeName, degreeType: action.payload[0].degreeType, minor: action.payload[0].minor, institution: action.payload[0].institution, city: action.payload[0].city, state: action.payload[0].state, graduationYear: action.payload[0].graduationYear, isGraduated: action.payload[0].isGraduated });
            }
            else {
                return __assign({}, state);
            }
        // LOADING ACTION WiLL BE PUSHED TO ENTITy DATA
        case degree_shell_actions_1.DegreeActionTypes.LOAD_DEGREES_FROM_on_PAGESHELL_DB_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        // CREATE
        case degree_shell_actions_1.DegreeActionTypes.SAVE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS:
            return __assign(__assign({}, state), { originalDegree: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, degreeName: action.payload.degreeName, degreeType: action.payload.degreeType, minor: action.payload.minor, institution: action.payload.institution, city: action.payload.city, state: action.payload.state, graduationYear: action.payload.graduationYear, isGraduated: action.payload.isGraduated });
        case degree_shell_actions_1.DegreeActionTypes.SAVE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        // UPDATE
        case degree_shell_actions_1.DegreeActionTypes.UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS:
            return __assign(__assign({}, state), { originalDegree: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, degreeName: action.payload.degreeName, degreeType: action.payload.degreeType, minor: action.payload.minor, institution: action.payload.institution, city: action.payload.city, state: action.payload.state, graduationYear: action.payload.graduationYear, isGraduated: action.payload.isGraduated });
        case degree_shell_actions_1.DegreeActionTypes.UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        // DELETE
        case degree_shell_actions_1.DegreeActionTypes.DELETE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS:
            return __assign(__assign({}, state), { originalDegree: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, degreeName: action.payload.degreeName, degreeType: action.payload.degreeType, minor: action.payload.minor, institution: action.payload.institution, city: action.payload.city, state: action.payload.state, graduationYear: action.payload.graduationYear, isGraduated: action.payload.isGraduated });
        case degree_shell_actions_1.DegreeActionTypes.DELETE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        default:
            return state;
    }
}
exports.degreeReducer = degreeReducer;
