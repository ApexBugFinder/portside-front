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
exports.certificationReducer = void 0;
var certification_1 = require("../../Models/certification/certification");
var certification_shell_actions_1 = require("./certification-shell.actions");
var initialState = {
    originalCertification: certification_1.defaultCert,
    id: '',
    projectCreatorID: '',
    certName: '',
    certId: '',
    isActive: false,
    issuingBody_Name: '',
    issuingBody_Logo: '',
    issuedDate: new Date(2021, 4, 12),
    error: ''
};
function certificationReducer(state, action) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case certification_shell_actions_1.CertificationActionTypes.SET_ORIGINAL_CERTIFICATION_from_CERT_EFFECTS:
            return __assign(__assign({}, state), { originalCertification: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, certName: action.payload.certName, certId: action.payload.certId, isActive: action.payload.isActive, issuingBody_Name: action.payload.issuingBody_Name, issuingBody_Logo: action.payload.issuingBody_Logo, issuedDate: action.payload.issuedDate });
        // case CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_CERT_EFFECTS:
        //   return {
        //     ...state,
        //    id: action.payload.id,
        //     projectCreatorID: action.payload.projectCreatorID,
        //     certName: action.payload.certName,
        //     certId: action.payload.certId as string,
        //     isActive: action.payload.isActive,
        //     issuingBody_Name: action.payload.issuingBody_Name,
        //     issuingBody_Logo: action.payload.issuingBody_Logo,
        //     issuedDate: action.payload.issuedDate,
        //   };
        case certification_shell_actions_1.CertificationActionTypes.SET_ORIGINAL_CERTIFICATION_from_VIEWCERT_COMPONENT:
            return __assign(__assign({}, state), { originalCertification: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, certName: action.payload.certName, certId: action.payload.certId, isActive: action.payload.isActive, issuingBody_Name: action.payload.issuingBody_Name, issuingBody_Logo: action.payload.issuingBody_Logo, issuedDate: action.payload.issuedDate });
        case certification_shell_actions_1.CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_VIEWCERT_COMPONENT
            || certification_shell_actions_1.CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_CERT_EFFECTS
            || certification_shell_actions_1.CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_EDUCATION_CPT:
            return __assign(__assign({}, state), { id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, certName: action.payload.certName, certId: action.payload.certId, isActive: action.payload.isActive, issuingBody_Name: action.payload.issuingBody_Name, issuingBody_Logo: action.payload.issuingBody_Logo, issuedDate: action.payload.issuedDate });
        case certification_shell_actions_1.CertificationActionTypes.SET_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { id: action.payload });
        case certification_shell_actions_1.CertificationActionTypes.SET_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { projectCreatorID: action.payload });
        case certification_shell_actions_1.CertificationActionTypes.SET_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { certName: action.payload });
        case certification_shell_actions_1.CertificationActionTypes.SET_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { isActive: action.payload });
        case certification_shell_actions_1.CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { issuingBody_Name: action.payload });
        case certification_shell_actions_1.CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { issuingBody_Logo: action.payload });
        case certification_shell_actions_1.CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { issuedDate: action.payload });
        // CLEAR
        case certification_shell_actions_1.CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_SAVE
            || certification_shell_actions_1.CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE
            || certification_shell_actions_1.CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_DELETE:
            return __assign(__assign({}, state), { originalCertification: initialState.originalCertification, id: initialState.id, projectCreatorID: initialState.projectCreatorID, certName: initialState.certName, certId: initialState.certId, isActive: initialState.isActive, issuingBody_Name: initialState.issuingBody_Name, issuingBody_Logo: initialState.issuingBody_Logo, issuedDate: initialState.issuedDate });
        // case CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE:
        //   return {
        //     ...state,
        //     originalCertification: initialState.originalCertification,
        //     id: initialState.id,
        //     projectCreatorID: initialState.projectCreatorID,
        //     certName: initialState.certName,
        //     certId: initialState.certId,
        //     isActive: initialState.isActive,
        //     issuingBody_Name: initialState.issuingBody_Name,
        //     issuingBody_Logo: initialState.issuingBody_Logo,
        //     issuedDate: initialState.issuedDate,
        //   };
        // case CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_DELETE:
        //   return {
        //     ...state,
        //     originalCertification: initialState.originalCertification,
        //     id: initialState.id,
        //     projectCreatorID: initialState.projectCreatorID,
        //     certName: initialState.certName,
        //     certId: initialState.certId,
        //     isActive: initialState.isActive,
        //     issuingBody_Name: initialState.issuingBody_Name,
        //     issuingBody_Logo: initialState.issuingBody_Logo,
        //     issuedDate: initialState.issuedDate,
        //   };
        case certification_shell_actions_1.CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_SAVE
            || certification_shell_actions_1.CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE
            || certification_shell_actions_1.CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_DELETE:
            return __assign(__assign({}, state), { originalCertification: initialState.originalCertification, id: initialState.id, projectCreatorID: initialState.projectCreatorID, certName: initialState.certName, certId: initialState.certId, isActive: initialState.isActive, issuingBody_Name: initialState.issuingBody_Name, issuingBody_Logo: initialState.issuingBody_Logo, issuedDate: initialState.issuedDate });
        // case
        //   return {
        //     ...state,
        //     originalCertification: initialState.originalCertification,
        //     id: initialState.id,
        //     projectCreatorID: initialState.projectCreatorID,
        //     certName: initialState.certName,
        //     certId: initialState.certId,
        //     isActive: initialState.isActive,
        //     issuingBody_Name: initialState.issuingBody_Name,
        //     issuingBody_Logo: initialState.issuingBody_Logo,
        //     issuedDate: initialState.issuedDate,
        //   };
        // case
        //   return {
        //     ...state,
        //     originalCertification: initialState.originalCertification,
        //     id: initialState.id,
        //     projectCreatorID: initialState.projectCreatorID,
        //     certName: initialState.certName,
        //     certId: initialState.certId,
        //     isActive: initialState.isActive,
        //     issuingBody_Name: initialState.issuingBody_Name,
        //     issuingBody_Logo: initialState.issuingBody_Logo,
        //     issuedDate: initialState.issuedDate,
        //   };
        case certification_shell_actions_1.CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { id: initialState.id });
        case certification_shell_actions_1.CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { projectCreatorID: initialState.projectCreatorID });
        case certification_shell_actions_1.CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { certName: initialState.certName });
        case certification_shell_actions_1.CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { isActive: initialState.isActive });
        case certification_shell_actions_1.CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { issuingBody_Name: initialState.issuingBody_Name });
        case certification_shell_actions_1.CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { issuingBody_Logo: initialState.issuingBody_Logo });
        case certification_shell_actions_1.CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { issuedDate: initialState.issuedDate });
        case certification_shell_actions_1.CertificationActionTypes.RESET_CURRENT_CERTIFICATION_FROM_CERT_SHELL_EDIT_CPT:
            return __assign(__assign({}, state), { id: (_a = state.originalCertification) === null || _a === void 0 ? void 0 : _a.id, projectCreatorID: (_b = state.originalCertification) === null || _b === void 0 ? void 0 : _b.projectCreatorID, certName: (_c = state.originalCertification) === null || _c === void 0 ? void 0 : _c.certName, certId: (_d = state.originalCertification) === null || _d === void 0 ? void 0 : _d.certId, isActive: (_e = state.originalCertification) === null || _e === void 0 ? void 0 : _e.isActive, issuingBody_Name: (_f = state.originalCertification) === null || _f === void 0 ? void 0 : _f.issuingBody_Name, issuingBody_Logo: (_g = state.originalCertification) === null || _g === void 0 ? void 0 : _g.issuingBody_Logo, issuedDate: (_h = state.originalCertification) === null || _h === void 0 ? void 0 : _h.issuedDate });
        // TO DB
        // LOAD
        case certification_shell_actions_1.CertificationActionTypes.LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL_SUCCESS:
            if (action.payload.length > 0) {
                return __assign(__assign({}, state), { originalCertification: action.payload[0], id: action.payload[0].id, projectCreatorID: action.payload[0].projectCreatorID, certName: action.payload[0].certName, certId: action.payload[0].certId, isActive: action.payload[0].isActive, issuingBody_Name: action.payload[0].issuingBody_Name, issuingBody_Logo: action.payload[0].issuingBody_Logo, issuedDate: action.payload[0].issuedDate });
            }
            else {
                return __assign({}, state);
            }
        // LOADING ACTION WiLL BE PUSHED TO ENTITy DATA
        case certification_shell_actions_1.CertificationActionTypes.LOAD_CERTIFICATIONS_FROM_on_PAGESHELL_DB_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        // CREATE
        case certification_shell_actions_1.CertificationActionTypes.SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS:
            return __assign(__assign({}, state), { originalCertification: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, certName: action.payload.certName, isActive: action.payload.isActive, issuingBody_Name: action.payload.issuingBody_Name, issuingBody_Logo: action.payload.issuingBody_Logo, issuedDate: action.payload.issuedDate });
        case certification_shell_actions_1.CertificationActionTypes.SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        // UPDATE
        case certification_shell_actions_1.CertificationActionTypes.UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS:
            return __assign(__assign({}, state), { originalCertification: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, certName: action.payload.certName, certId: action.payload.certId, isActive: action.payload.isActive, issuingBody_Name: action.payload.issuingBody_Name, issuingBody_Logo: action.payload.issuingBody_Logo, issuedDate: action.payload.issuedDate });
        case certification_shell_actions_1.CertificationActionTypes.UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        // DELETE
        case certification_shell_actions_1.CertificationActionTypes.DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS:
            return __assign(__assign({}, state), { originalCertification: action.payload, id: action.payload.id, projectCreatorID: action.payload.projectCreatorID, certName: action.payload.certName, certId: action.payload.certId, isActive: action.payload.isActive, issuingBody_Name: action.payload.issuingBody_Name, issuingBody_Logo: action.payload.issuingBody_Logo, issuedDate: action.payload.issuedDate });
        case certification_shell_actions_1.CertificationActionTypes.DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL:
            return __assign(__assign({}, state), { error: action.payload });
        default:
            return state;
    }
}
exports.certificationReducer = certificationReducer;
