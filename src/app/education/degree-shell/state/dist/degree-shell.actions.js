"use strict";
exports.__esModule = true;
exports.ResetCurrentDegreeToOriginal = exports.DeleteDegreeToDBFail = exports.DeleteDegreeToDBSuccess = exports.DeleteDegreeToDB = exports.UpdateDegreeToDBFail = exports.UpdateDegreeToDBSuccess = exports.UpdateDegreeToDB = exports.SaveDegreeToDBFail = exports.SaveDegreeToDBSuccess = exports.SaveDegreeToDB = exports.LoadDegreesByProjectCreatorIDFromDBFail = exports.LoadDegreesByProjectCreatorIDFromDBSuccess = exports.LoadDegreesByProjectCreatorIDFromDB = exports.ClearCurrentDegreeIsGraduatedFromDegreeShellEditCpt = exports.ClearCurrentDegreeGraduationYrFromDegreeShellEditCpt = exports.ClearCurrentDegreeStateFromDegreeShellEdit = exports.ClearCurrentDegreeCityFromDegreeShellEdit = exports.ClearCurrentDegreeInstitutionFromDegreeShellEdit = exports.ClearCurrentDegreeMinorDegreeShellEdit = exports.ClearCurrentDegreeDegreeTypeFromDegreeShellEditCpt = exports.ClearCurrentDegreeDegreeNameFromDegreeShellEdit = exports.ClearCurrentDegreeProjectCreatorIDFromDegreeShellEdit = exports.ClearCurrentDegreeIdFromDegreeShellEdit = exports.ClearCurrentDegreeFromDegreeEffectsDelete = exports.ClearOriginalDegreeFromDegreeEffectsDelete = exports.ClearCurrentDegreeFromDegreeEffectsUpdate = exports.ClearOriginalDegreeFromDegreeEffectsUpdate = exports.ClearCurrentDegreeFromDegreeEffectsSave = exports.ClearOriginalDegreeFromDegreeEffectsSave = exports.SetCurrentDegreeIsGraduatedFromDegreeShellEditCpt = exports.SetCurrentDegreeGraduationYrFromDegreeShellEditCpt = exports.SetCurrentDegreeStateDegreeShellEditCpt = exports.SetCurrentDegreeCityFromDegreeShellEditCpt = exports.SetCurrentDegreeInstitutionFromDegreeShellEditCpt = exports.SetCurrentDegreeMinorFromDegreeShellEditCpt = exports.SetCurrentDegreeDegreeTypeFromDegreeShellEditCpt = exports.SetCurrentDegreeDegreeNameFromDegreeShellEditCpt = exports.SetCurrentDegreeProjectCreatorIDFromDegreeShellEditCpt = exports.SetCurrentDegreeIdFromDegreeShellEditCpt = exports.SetCurrentDegreeFromDegreeEffects = exports.SetOriginalDegreeFromDegreeEffects = exports.SetCurrentDegreeFromViewDegree = exports.SetOriginalDegreeFromViewDegree = exports.DegreeActionTypes = void 0;
// ACTION ORIGINS
// load from db: from PageShell Component
// Save Update & Delete: from DegreeShellEdit Component acTIONbUTTONS
// Reset: from DegreeShellEdit Component
// Set Original & Current: from Cert Component
// Clear from CertifcationEffects-Save, Upate, Delete
var DegreeActionTypes;
(function (DegreeActionTypes) {
    // PAGE SHELL COMPONENT (3)
    DegreeActionTypes["LOAD_DEGREES_FROM_DB_on_PAGESHELL"] = "[DEGREE PAGE] LOAD DEGREES FROM DB";
    DegreeActionTypes["LOAD_DEGREES_FROM_DB_on_PAGESHELL_SUCCESS"] = "[DEGREE PAGE] LOAD DEGREES FROM DB SUCCESSFULL";
    DegreeActionTypes["LOAD_DEGREES_FROM_on_PAGESHELL_DB_FAIL"] = "[DEGREE PAGE] LOAD DEGREES FROM DB FAILED";
    // DEGREESHELL EDIT COMPONENT (9)
    DegreeActionTypes["SAVE_DEGREE_TO_DB_from_DegreeShellEdit"] = "[DEGREE] SAVE EDIT DEGREE TO DB FROM DEGREE SHELL EDIT";
    DegreeActionTypes["SAVE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS"] = "[DEGREE] SAVE EDIT DEGREE TO DB  ON DEGREE SHELL EDIT WAS SUCCESSFULL";
    DegreeActionTypes["SAVE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL"] = "[DEGREE] SAVE EDIT DEGREE  ON DEGREE SHELL EDIT TO DB FAILED";
    DegreeActionTypes["UPDATE_DEGREE_TO_DB_from_DegreeShellEdit"] = "[DEGREE] UPDATE EDIT DEGREE TO DB";
    DegreeActionTypes["UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS"] = "[DEGREE] UPDATE EDIT DEGREE TO DB WAS SUCCESSFULL";
    DegreeActionTypes["UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL"] = "[DEGREE] UPDATE EDIT DEGREE TO DB FAILED";
    DegreeActionTypes["DELETE_DEGREE_TO_DB_from_DegreeShellEdit"] = "[DEGREE] DELETE EDIT DEGREE TO DB";
    DegreeActionTypes["DELETE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS"] = "[DEGREE] DELETE EDIT DEGREE TO DB WAS SUCCESSFULL";
    DegreeActionTypes["DELETE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL"] = "[DEGREE] DELETE EDIT DEGREE TO DB FAILED";
    // FROM VIEWDEGREE COMPONENT PRE LOAD DEGREE EDIT SHELL (2)
    DegreeActionTypes["SET_ORIGINAL_DEGREE_from_VIEWDEGREE_COMPONENT"] = "[DEGREE] SET ORIGINAL DEGREES";
    DegreeActionTypes["SET_CURRENT_DEGREE_from_VIEWDEGREE_COMPONENT"] = "[DEGREE] SET CURRENT DEGREES";
    // FROM VIEWDEGREE COMPONENT FROM DEGREEIFICAITON EFFECTS (2)
    DegreeActionTypes["SET_ORIGINAL_DEGREE_from_DEGREE_EFFECTS"] = "[DEGREE] SET ORIGINAL DEGREES";
    DegreeActionTypes["SET_CURRENT_DEGREE_from_DEGREE_EFFECTS"] = "[DEGREE] SET CURRENT DEGREES";
    // SET FROM DEGREE EDIT SHELL (7)
    DegreeActionTypes["SET_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] SET DEGREE ID FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["SET_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] SET DEGREE PROJECT CREATOR ID FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["SET_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] SET DEGREE DEGREE_NAME FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["SET_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] SET DEGREE MINOR FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["SET_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] SET DEGREE INSTITUTION FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["SET_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] SET DEGREE CITY FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["SET_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] SET DEGREE COMPLETE DATE FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["SET_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] SET DEGREE GRADUATION YEAR FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["SET_CURRENT_DEGREE_isGRADUATED_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] SET DEGREE IS GRADUATED FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["SET_CURRENT_DEGREE_DEGREE_TYPE_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] SET DEGREE TYPE FROM DEGREE SHELL EDIT CPT";
    // CLEAR FROM EFFECTS -SAVE UPDATE DELETE (6)
    DegreeActionTypes["CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_SAVE"] = "[DEGREE] LEAR ORIGINAL DEGREES FROM DEGREE EFFECTS SAVE";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_SAVE"] = "[DEGREE] CLEAR CURRENT DEGREES FROM DEGREE EFFECTS SAVE";
    DegreeActionTypes["CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_UPDATE"] = "[DEGREE] LEAR ORIGINAL DEGREES FROM DEGREEEFFECTS UPDATE";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_UPDATE"] = "[DEGREE] CLEAR CURRENT DEGREESFROM DEGREEEFFECTS UPDATE";
    DegreeActionTypes["CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_DELETE"] = "[DEGREE] LEAR ORIGINAL DEGREES FROM DEGREE EFFECTS DELETE";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_DELETE"] = "[DEGREE] CLEAR CURRENT DEGREES FROM DEGREE EFFECTS DELETE";
    // CLEAR EDIT SHELL PROPERTIES (7)
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] CLEAR DEGREE ID FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] CLEAR DEGREE PROJECT CREATOR ID FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] CLEAR DEGREE DEGREE_NAME FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] CLEAR DEGREE MINOR FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] CLEAR  DEGREE INSTITUTION FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] CLEAR DEGREE START DATE FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] CLEAR DEGREE COMPLETE DATE FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] CLEAR DEGREE GRADUATION YEAR FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_isGRADUATED_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] CLEAR DEGREE IS GRADUATED FROM DEGREE SHELL EDIT CPT";
    DegreeActionTypes["CLEAR_CURRENT_DEGREE_DEGREE_TYPE_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] CLEAR DEGREE DEGREE TYPE FROM DEGREE SHELL EDIT CPT";
    // UPDATE (1)
    DegreeActionTypes["RESET_CURRENT_DEGREE_FROM_DEGREE_SHELL_EDIT_CPT"] = "[CURRENT DEGREE] RESETS CURRENT DEGREE BACK TO ORIGINAL PROJECT FROM DEGREE SHELL EDIT CPT";
})(DegreeActionTypes = exports.DegreeActionTypes || (exports.DegreeActionTypes = {}));
// TOTAL = 37
// SET ACTIONS
// FROM VIEW DEGREE COMPONENT (2)
var SetOriginalDegreeFromViewDegree = /** @class */ (function () {
    function SetOriginalDegreeFromViewDegree(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_ORIGINAL_DEGREE_from_VIEWDEGREE_COMPONENT;
    }
    return SetOriginalDegreeFromViewDegree;
}());
exports.SetOriginalDegreeFromViewDegree = SetOriginalDegreeFromViewDegree;
var SetCurrentDegreeFromViewDegree = /** @class */ (function () {
    function SetCurrentDegreeFromViewDegree(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_from_VIEWDEGREE_COMPONENT;
    }
    return SetCurrentDegreeFromViewDegree;
}());
exports.SetCurrentDegreeFromViewDegree = SetCurrentDegreeFromViewDegree;
// FROM DEGREEEFFECTS (2)
var SetOriginalDegreeFromDegreeEffects = /** @class */ (function () {
    function SetOriginalDegreeFromDegreeEffects(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_ORIGINAL_DEGREE_from_DEGREE_EFFECTS;
    }
    return SetOriginalDegreeFromDegreeEffects;
}());
exports.SetOriginalDegreeFromDegreeEffects = SetOriginalDegreeFromDegreeEffects;
var SetCurrentDegreeFromDegreeEffects = /** @class */ (function () {
    function SetCurrentDegreeFromDegreeEffects(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_from_DEGREE_EFFECTS;
    }
    return SetCurrentDegreeFromDegreeEffects;
}());
exports.SetCurrentDegreeFromDegreeEffects = SetCurrentDegreeFromDegreeEffects;
// SET FROM DEGREE EDIT SHELL (9)
var SetCurrentDegreeIdFromDegreeShellEditCpt = /** @class */ (function () {
    function SetCurrentDegreeIdFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return SetCurrentDegreeIdFromDegreeShellEditCpt;
}());
exports.SetCurrentDegreeIdFromDegreeShellEditCpt = SetCurrentDegreeIdFromDegreeShellEditCpt;
var SetCurrentDegreeProjectCreatorIDFromDegreeShellEditCpt = /** @class */ (function () {
    function SetCurrentDegreeProjectCreatorIDFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return SetCurrentDegreeProjectCreatorIDFromDegreeShellEditCpt;
}());
exports.SetCurrentDegreeProjectCreatorIDFromDegreeShellEditCpt = SetCurrentDegreeProjectCreatorIDFromDegreeShellEditCpt;
var SetCurrentDegreeDegreeNameFromDegreeShellEditCpt = /** @class */ (function () {
    function SetCurrentDegreeDegreeNameFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return SetCurrentDegreeDegreeNameFromDegreeShellEditCpt;
}());
exports.SetCurrentDegreeDegreeNameFromDegreeShellEditCpt = SetCurrentDegreeDegreeNameFromDegreeShellEditCpt;
var SetCurrentDegreeDegreeTypeFromDegreeShellEditCpt = /** @class */ (function () {
    function SetCurrentDegreeDegreeTypeFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_DEGREE_TYPE_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return SetCurrentDegreeDegreeTypeFromDegreeShellEditCpt;
}());
exports.SetCurrentDegreeDegreeTypeFromDegreeShellEditCpt = SetCurrentDegreeDegreeTypeFromDegreeShellEditCpt;
var SetCurrentDegreeMinorFromDegreeShellEditCpt = /** @class */ (function () {
    function SetCurrentDegreeMinorFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return SetCurrentDegreeMinorFromDegreeShellEditCpt;
}());
exports.SetCurrentDegreeMinorFromDegreeShellEditCpt = SetCurrentDegreeMinorFromDegreeShellEditCpt;
var SetCurrentDegreeInstitutionFromDegreeShellEditCpt = /** @class */ (function () {
    function SetCurrentDegreeInstitutionFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return SetCurrentDegreeInstitutionFromDegreeShellEditCpt;
}());
exports.SetCurrentDegreeInstitutionFromDegreeShellEditCpt = SetCurrentDegreeInstitutionFromDegreeShellEditCpt;
var SetCurrentDegreeCityFromDegreeShellEditCpt = /** @class */ (function () {
    function SetCurrentDegreeCityFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return SetCurrentDegreeCityFromDegreeShellEditCpt;
}());
exports.SetCurrentDegreeCityFromDegreeShellEditCpt = SetCurrentDegreeCityFromDegreeShellEditCpt;
var SetCurrentDegreeStateDegreeShellEditCpt = /** @class */ (function () {
    function SetCurrentDegreeStateDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return SetCurrentDegreeStateDegreeShellEditCpt;
}());
exports.SetCurrentDegreeStateDegreeShellEditCpt = SetCurrentDegreeStateDegreeShellEditCpt;
var SetCurrentDegreeGraduationYrFromDegreeShellEditCpt = /** @class */ (function () {
    function SetCurrentDegreeGraduationYrFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return SetCurrentDegreeGraduationYrFromDegreeShellEditCpt;
}());
exports.SetCurrentDegreeGraduationYrFromDegreeShellEditCpt = SetCurrentDegreeGraduationYrFromDegreeShellEditCpt;
var SetCurrentDegreeIsGraduatedFromDegreeShellEditCpt = /** @class */ (function () {
    function SetCurrentDegreeIsGraduatedFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SET_CURRENT_DEGREE_isGRADUATED_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return SetCurrentDegreeIsGraduatedFromDegreeShellEditCpt;
}());
exports.SetCurrentDegreeIsGraduatedFromDegreeShellEditCpt = SetCurrentDegreeIsGraduatedFromDegreeShellEditCpt;
// CLEAR FROM EFFECTS SAVE UPDATE DELETE LOAD (6)
var ClearOriginalDegreeFromDegreeEffectsSave = /** @class */ (function () {
    function ClearOriginalDegreeFromDegreeEffectsSave() {
        this.type = DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_SAVE;
    }
    return ClearOriginalDegreeFromDegreeEffectsSave;
}());
exports.ClearOriginalDegreeFromDegreeEffectsSave = ClearOriginalDegreeFromDegreeEffectsSave;
var ClearCurrentDegreeFromDegreeEffectsSave = /** @class */ (function () {
    function ClearCurrentDegreeFromDegreeEffectsSave() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_SAVE;
    }
    return ClearCurrentDegreeFromDegreeEffectsSave;
}());
exports.ClearCurrentDegreeFromDegreeEffectsSave = ClearCurrentDegreeFromDegreeEffectsSave;
var ClearOriginalDegreeFromDegreeEffectsUpdate = /** @class */ (function () {
    function ClearOriginalDegreeFromDegreeEffectsUpdate() {
        this.type = DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_UPDATE;
    }
    return ClearOriginalDegreeFromDegreeEffectsUpdate;
}());
exports.ClearOriginalDegreeFromDegreeEffectsUpdate = ClearOriginalDegreeFromDegreeEffectsUpdate;
var ClearCurrentDegreeFromDegreeEffectsUpdate = /** @class */ (function () {
    function ClearCurrentDegreeFromDegreeEffectsUpdate() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_UPDATE;
    }
    return ClearCurrentDegreeFromDegreeEffectsUpdate;
}());
exports.ClearCurrentDegreeFromDegreeEffectsUpdate = ClearCurrentDegreeFromDegreeEffectsUpdate;
var ClearOriginalDegreeFromDegreeEffectsDelete = /** @class */ (function () {
    function ClearOriginalDegreeFromDegreeEffectsDelete() {
        this.type = DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_DELETE;
    }
    return ClearOriginalDegreeFromDegreeEffectsDelete;
}());
exports.ClearOriginalDegreeFromDegreeEffectsDelete = ClearOriginalDegreeFromDegreeEffectsDelete;
var ClearCurrentDegreeFromDegreeEffectsDelete = /** @class */ (function () {
    function ClearCurrentDegreeFromDegreeEffectsDelete() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_DELETE;
    }
    return ClearCurrentDegreeFromDegreeEffectsDelete;
}());
exports.ClearCurrentDegreeFromDegreeEffectsDelete = ClearCurrentDegreeFromDegreeEffectsDelete;
// CLEAR FROM DEGREE EDIT ShELL (9)
var ClearCurrentDegreeIdFromDegreeShellEdit = /** @class */ (function () {
    function ClearCurrentDegreeIdFromDegreeShellEdit() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ClearCurrentDegreeIdFromDegreeShellEdit;
}());
exports.ClearCurrentDegreeIdFromDegreeShellEdit = ClearCurrentDegreeIdFromDegreeShellEdit;
var ClearCurrentDegreeProjectCreatorIDFromDegreeShellEdit = /** @class */ (function () {
    function ClearCurrentDegreeProjectCreatorIDFromDegreeShellEdit() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ClearCurrentDegreeProjectCreatorIDFromDegreeShellEdit;
}());
exports.ClearCurrentDegreeProjectCreatorIDFromDegreeShellEdit = ClearCurrentDegreeProjectCreatorIDFromDegreeShellEdit;
var ClearCurrentDegreeDegreeNameFromDegreeShellEdit = /** @class */ (function () {
    function ClearCurrentDegreeDegreeNameFromDegreeShellEdit() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ClearCurrentDegreeDegreeNameFromDegreeShellEdit;
}());
exports.ClearCurrentDegreeDegreeNameFromDegreeShellEdit = ClearCurrentDegreeDegreeNameFromDegreeShellEdit;
var ClearCurrentDegreeDegreeTypeFromDegreeShellEditCpt = /** @class */ (function () {
    function ClearCurrentDegreeDegreeTypeFromDegreeShellEditCpt() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_DEGREE_TYPE_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ClearCurrentDegreeDegreeTypeFromDegreeShellEditCpt;
}());
exports.ClearCurrentDegreeDegreeTypeFromDegreeShellEditCpt = ClearCurrentDegreeDegreeTypeFromDegreeShellEditCpt;
var ClearCurrentDegreeMinorDegreeShellEdit = /** @class */ (function () {
    function ClearCurrentDegreeMinorDegreeShellEdit() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ClearCurrentDegreeMinorDegreeShellEdit;
}());
exports.ClearCurrentDegreeMinorDegreeShellEdit = ClearCurrentDegreeMinorDegreeShellEdit;
var ClearCurrentDegreeInstitutionFromDegreeShellEdit = /** @class */ (function () {
    function ClearCurrentDegreeInstitutionFromDegreeShellEdit() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ClearCurrentDegreeInstitutionFromDegreeShellEdit;
}());
exports.ClearCurrentDegreeInstitutionFromDegreeShellEdit = ClearCurrentDegreeInstitutionFromDegreeShellEdit;
var ClearCurrentDegreeCityFromDegreeShellEdit = /** @class */ (function () {
    function ClearCurrentDegreeCityFromDegreeShellEdit() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ClearCurrentDegreeCityFromDegreeShellEdit;
}());
exports.ClearCurrentDegreeCityFromDegreeShellEdit = ClearCurrentDegreeCityFromDegreeShellEdit;
var ClearCurrentDegreeStateFromDegreeShellEdit = /** @class */ (function () {
    function ClearCurrentDegreeStateFromDegreeShellEdit() {
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ClearCurrentDegreeStateFromDegreeShellEdit;
}());
exports.ClearCurrentDegreeStateFromDegreeShellEdit = ClearCurrentDegreeStateFromDegreeShellEdit;
var ClearCurrentDegreeGraduationYrFromDegreeShellEditCpt = /** @class */ (function () {
    function ClearCurrentDegreeGraduationYrFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ClearCurrentDegreeGraduationYrFromDegreeShellEditCpt;
}());
exports.ClearCurrentDegreeGraduationYrFromDegreeShellEditCpt = ClearCurrentDegreeGraduationYrFromDegreeShellEditCpt;
var ClearCurrentDegreeIsGraduatedFromDegreeShellEditCpt = /** @class */ (function () {
    function ClearCurrentDegreeIsGraduatedFromDegreeShellEditCpt(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_isGRADUATED_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ClearCurrentDegreeIsGraduatedFromDegreeShellEditCpt;
}());
exports.ClearCurrentDegreeIsGraduatedFromDegreeShellEditCpt = ClearCurrentDegreeIsGraduatedFromDegreeShellEditCpt;
// TO DB
// LOAD (3)
var LoadDegreesByProjectCreatorIDFromDB = /** @class */ (function () {
    function LoadDegreesByProjectCreatorIDFromDB(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.LOAD_DEGREES_FROM_DB_on_PAGESHELL;
    }
    return LoadDegreesByProjectCreatorIDFromDB;
}());
exports.LoadDegreesByProjectCreatorIDFromDB = LoadDegreesByProjectCreatorIDFromDB;
var LoadDegreesByProjectCreatorIDFromDBSuccess = /** @class */ (function () {
    function LoadDegreesByProjectCreatorIDFromDBSuccess(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.LOAD_DEGREES_FROM_DB_on_PAGESHELL_SUCCESS;
    }
    return LoadDegreesByProjectCreatorIDFromDBSuccess;
}());
exports.LoadDegreesByProjectCreatorIDFromDBSuccess = LoadDegreesByProjectCreatorIDFromDBSuccess;
var LoadDegreesByProjectCreatorIDFromDBFail = /** @class */ (function () {
    function LoadDegreesByProjectCreatorIDFromDBFail(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.LOAD_DEGREES_FROM_on_PAGESHELL_DB_FAIL;
    }
    return LoadDegreesByProjectCreatorIDFromDBFail;
}());
exports.LoadDegreesByProjectCreatorIDFromDBFail = LoadDegreesByProjectCreatorIDFromDBFail;
// SAVE (3)
var SaveDegreeToDB = /** @class */ (function () {
    function SaveDegreeToDB() {
        this.type = DegreeActionTypes.SAVE_DEGREE_TO_DB_from_DegreeShellEdit;
    }
    return SaveDegreeToDB;
}());
exports.SaveDegreeToDB = SaveDegreeToDB;
var SaveDegreeToDBSuccess = /** @class */ (function () {
    function SaveDegreeToDBSuccess(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SAVE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS;
    }
    return SaveDegreeToDBSuccess;
}());
exports.SaveDegreeToDBSuccess = SaveDegreeToDBSuccess;
var SaveDegreeToDBFail = /** @class */ (function () {
    function SaveDegreeToDBFail(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.SAVE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL;
    }
    return SaveDegreeToDBFail;
}());
exports.SaveDegreeToDBFail = SaveDegreeToDBFail;
// UPDATE (3)
var UpdateDegreeToDB = /** @class */ (function () {
    function UpdateDegreeToDB() {
        this.type = DegreeActionTypes.UPDATE_DEGREE_TO_DB_from_DegreeShellEdit;
    }
    return UpdateDegreeToDB;
}());
exports.UpdateDegreeToDB = UpdateDegreeToDB;
var UpdateDegreeToDBSuccess = /** @class */ (function () {
    function UpdateDegreeToDBSuccess(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS;
    }
    return UpdateDegreeToDBSuccess;
}());
exports.UpdateDegreeToDBSuccess = UpdateDegreeToDBSuccess;
var UpdateDegreeToDBFail = /** @class */ (function () {
    function UpdateDegreeToDBFail(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL;
    }
    return UpdateDegreeToDBFail;
}());
exports.UpdateDegreeToDBFail = UpdateDegreeToDBFail;
// DELETE (3)
var DeleteDegreeToDB = /** @class */ (function () {
    function DeleteDegreeToDB() {
        this.type = DegreeActionTypes.DELETE_DEGREE_TO_DB_from_DegreeShellEdit;
    }
    return DeleteDegreeToDB;
}());
exports.DeleteDegreeToDB = DeleteDegreeToDB;
var DeleteDegreeToDBSuccess = /** @class */ (function () {
    function DeleteDegreeToDBSuccess(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.DELETE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS;
    }
    return DeleteDegreeToDBSuccess;
}());
exports.DeleteDegreeToDBSuccess = DeleteDegreeToDBSuccess;
var DeleteDegreeToDBFail = /** @class */ (function () {
    function DeleteDegreeToDBFail(payload) {
        this.payload = payload;
        this.type = DegreeActionTypes.DELETE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL;
    }
    return DeleteDegreeToDBFail;
}());
exports.DeleteDegreeToDBFail = DeleteDegreeToDBFail;
// RESET (1)
var ResetCurrentDegreeToOriginal = /** @class */ (function () {
    function ResetCurrentDegreeToOriginal() {
        this.type = DegreeActionTypes.RESET_CURRENT_DEGREE_FROM_DEGREE_SHELL_EDIT_CPT;
    }
    return ResetCurrentDegreeToOriginal;
}());
exports.ResetCurrentDegreeToOriginal = ResetCurrentDegreeToOriginal;
