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
exports.experienceReducer = void 0;
var Constants_1 = require("src/app/helpers/Constants");
var experience_1 = require("../../Models/experience");
var role_1 = require("../../Models/role");
var certification_shell_actions_1 = require("./certification-shell.actions");
var initialState = {
    originalExperience: experience_1.defaultExperience,
    id: '',
    projectCreatorID: Constants_1.Constants.userID,
    company: '',
    title: '',
    logoUrl: '',
    started: new Date(2021, 1, 1),
    completed: new Date(2021, 1, 1),
    city: '',
    state: '',
    roles: [role_1.defaultRole],
    error: ''
};
function experienceReducer(state, action) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case certification_shell_actions_1.ExperienceActionTypes.SET_ORIGINALPROJECT:
            return __assign(__assign({}, state), { originalExperience: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, company: action.payload.company, title: action.payload.title, logoUrl: action.payload.logoUrl, started: action.payload.started, completed: action.payload.completed, city: action.payload.city, state: action.payload.state, roles: action.payload.roles });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE:
            return __assign(__assign({}, state), { id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, company: action.payload.company, title: action.payload.title, logoUrl: action.payload.logoUrl, started: action.payload.started, completed: action.payload.completed, city: action.payload.city, state: action.payload.state, roles: action.payload.roles });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE_ID:
            return __assign(__assign({}, state), { id: action.payload });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE_PROJECTCREATOR_ID:
            return __assign(__assign({}, state), { projectCreatorID: action.payload });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE_COMPANY:
            return __assign(__assign({}, state), { company: action.payload });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE_TITLE:
            return __assign(__assign({}, state), { title: action.payload });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE_LOGO_URL:
            return __assign(__assign({}, state), { logoUrl: action.payload });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE_STARTED:
            return __assign(__assign({}, state), { started: action.payload });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE_COMPLETED:
            return __assign(__assign({}, state), { completed: action.payload });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE_CITY:
            return __assign(__assign({}, state), { city: action.payload });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE_STATE:
            return __assign(__assign({}, state), { state: action.payload });
        case certification_shell_actions_1.ExperienceActionTypes.SET_CURRENT_EXPERIENCE_ROLES:
            return __assign(__assign({}, state), { roles: action.payload });
        // CLEAR
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_ORIGINALPROJECT:
            return __assign(__assign({}, state), { originalExperience: initialState.originalExperience, id: initialState.id, projectCreatorID: initialState.projectCreatorID, company: initialState.company, title: initialState.title, logoUrl: initialState.logoUrl, started: initialState.started, completed: initialState.completed, city: initialState.city, state: initialState.state, roles: initialState.roles });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE:
            return __assign(__assign({}, state), { id: initialState.id, projectCreatorID: initialState.projectCreatorID, company: initialState.company, title: initialState.title, logoUrl: initialState.logoUrl, started: initialState.started, completed: initialState.completed, city: initialState.city, state: initialState.state, roles: initialState.roles });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_ID:
            return __assign(__assign({}, state), { id: initialState.id });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_PROJECTCREATOR_ID:
            return __assign(__assign({}, state), { projectCreatorID: initialState.projectCreatorID });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_COMPANY:
            return __assign(__assign({}, state), { company: initialState.company });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_TITLE:
            return __assign(__assign({}, state), { title: initialState.title });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_LOGO_URL:
            return __assign(__assign({}, state), { logoUrl: initialState.logoUrl });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_STARTED:
            return __assign(__assign({}, state), { started: initialState.started });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_COMPLETED:
            return __assign(__assign({}, state), { completed: initialState.completed });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_CITY:
            return __assign(__assign({}, state), { city: initialState.city });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_STATE:
            return __assign(__assign({}, state), { state: initialState.state });
        case certification_shell_actions_1.ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_ROLES:
            return __assign(__assign({}, state), { roles: initialState.roles });
        case certification_shell_actions_1.ExperienceActionTypes.RESET_CURRENT_EXPERIENCE:
            return __assign(__assign({}, state), { id: (_a = state.originalExperience) === null || _a === void 0 ? void 0 : _a.id, projectCreatorID: (_b = state.originalExperience) === null || _b === void 0 ? void 0 : _b.projectCreatorID, company: (_c = state.originalExperience) === null || _c === void 0 ? void 0 : _c.company, title: (_d = state.originalExperience) === null || _d === void 0 ? void 0 : _d.title, logoUrl: (_e = state.originalExperience) === null || _e === void 0 ? void 0 : _e.logoUrl, started: (_f = state.originalExperience) === null || _f === void 0 ? void 0 : _f.started, completed: (_g = state.originalExperience) === null || _g === void 0 ? void 0 : _g.completed, city: (_h = state.originalExperience) === null || _h === void 0 ? void 0 : _h.city, state: (_j = state.originalExperience) === null || _j === void 0 ? void 0 : _j.state, roles: (_k = state.originalExperience) === null || _k === void 0 ? void 0 : _k.roles });
        // TO DB
        // LOAD
        case certification_shell_actions_1.ExperienceActionTypes.LOAD_EXPERIENCES_FROM_DB_SUCCESS:
            if (action.payload.length > 0) {
                return __assign(__assign({}, state), { originalExperience: action.payload[0], id: action.payload[0].id, projectCreatorID: action.payload[0].projectCreatorID, company: action.payload[0].company, title: action.payload[0].title, logoUrl: action.payload[0].logoUrl, started: action.payload[0].started, completed: action.payload[0].completed, city: action.payload[0].city, state: action.payload[0].state, roles: action.payload[0].roles });
            }
            else {
                return __assign({}, state);
            }
        // LOADING ACTION WiLL BE PUSHED TO ENTITy DATA
        case certification_shell_actions_1.ExperienceActionTypes.LOAD_EXPERIENCES_FROM_DB_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        // CREATE
        case certification_shell_actions_1.ExperienceActionTypes.SAVE_EXPERIENCE_TO_DB_SUCCESS:
            return __assign(__assign({}, state), { originalExperience: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, company: action.payload.company, title: action.payload.title, logoUrl: action.payload.logoUrl, started: action.payload.started, completed: action.payload.completed, city: action.payload.city, state: action.payload.state, roles: action.payload.roles });
        case certification_shell_actions_1.ExperienceActionTypes.SAVE_EXPERIENCE_TO_DB_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        // UPDATE
        case certification_shell_actions_1.ExperienceActionTypes.UPDATE_EXPERIENCE_TO_DB_SUCCESS:
            return __assign(__assign({}, state), { originalExperience: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, company: action.payload.company, title: action.payload.title, logoUrl: action.payload.logoUrl, started: action.payload.started, completed: action.payload.completed, city: action.payload.city, state: action.payload.state, roles: action.payload.roles });
        case certification_shell_actions_1.ExperienceActionTypes.UPDATE_EXPERIENCE_TO_DB_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        // DELETE
        case certification_shell_actions_1.ExperienceActionTypes.DELETE_EXPERIENCE_TO_DB_SUCCESS:
            return __assign(__assign({}, state), { originalExperience: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, company: action.payload.company, title: action.payload.title, logoUrl: action.payload.logoUrl, started: action.payload.started, completed: action.payload.completed, city: action.payload.city, state: action.payload.state, roles: action.payload.roles });
        case certification_shell_actions_1.ExperienceActionTypes.DELETE_EXPERIENCE_TO_DB_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        default:
            return state;
    }
}
exports.experienceReducer = experienceReducer;
