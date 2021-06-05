"use strict";
exports.__esModule = true;
exports.ResetCurrentCertificationToOriginal = exports.DeleteCertificationToDBFail = exports.DeleteCertificationToDBSuccess = exports.DeleteCertificationToDB = exports.UpdateCertificationToDBFail = exports.UpdateCertificationToDBSuccess = exports.UpdateCertificationToDB = exports.SaveCertificationToDBFail = exports.SaveCertificationToDBSuccess = exports.SaveCertificationToDB = exports.LoadCertificationsByProjectCreatorIDFromDBFail = exports.LoadCertificationsByProjectCreatorIDFromDBSuccess = exports.LoadCertificationsByProjectCreatorIDFromDB = exports.ClearCurrentCertificationIssuedDateFromCertShellEdit = exports.ClearCurrentCertificationIssuingBodyLogoFromCertShellEdit = exports.ClearCurrentCertificationIssuingBodyNameFromCertShellEdit = exports.ClearCurrentCertificationIsActiveFromCertShellEdit = exports.ClearCurrentCertificationCertNameFromCertShellEdit = exports.ClearCurrentCertificationProjectCreatorIDFromCertShellEdit = exports.ClearCurrentCertificationIdFromCertShellEdit = exports.ClearCurrentCertificationFromCertEffectsDelete = exports.ClearOriginalCertificationFromCertEffectsDelete = exports.ClearCurrentCertificationFromCertEffectsUpdate = exports.ClearOriginalCertificationFromCertEffectsUpdate = exports.ClearCurrentCertificationFromCertEffectsSave = exports.ClearOriginalCertificationFromCertEffectsSave = exports.SetCurrentCertificationIssuedDateFromCertShellEditCpt = exports.SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt = exports.SetCurrentCertificationIssuingBodyNameFromCertShellEditCpt = exports.SetCurrentCertificationIsActiveFromCertShellEditCpt = exports.SetCurrentCertificationCertNameFromCertShellEditCpt = exports.SetCurrentCertificationProjectCreatorIDFromCertShellEditCpt = exports.SetCurrentCertificationIdFromCertShellEditCpt = exports.SetCurrentCertificationFromCertEffects = exports.SetOriginalCertificationFromCertEffects = exports.SetCurrentCertificationFromEducationCPT = exports.SetCurrentCertificationFromViewCert = exports.SetOriginalCertificationFromViewCert = exports.CertificationActionTypes = void 0;
// ACTION ORIGINS
// load from db: from PageShell Component
// Save Update & Delete: from CertShellEdit Component acTIONbUTTONS
// Reset: from CertShellEdit Component
// Set Original & Current: from Cert Component
// Clear from CertifcationEffects-Save, Upate, Delete
var CertificationActionTypes;
(function (CertificationActionTypes) {
    // PAGE SHELL COMPONENT (3)
    CertificationActionTypes["LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL"] = "[CERTIFICATION PAGE] LOAD CERTIFICATIONS FROM DB";
    CertificationActionTypes["LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL_SUCCESS"] = "[CERTIFICATION PAGE] LOAD CERTIFICATIONS FROM DB SUCCESSFULL";
    CertificationActionTypes["LOAD_CERTIFICATIONS_FROM_on_PAGESHELL_DB_FAIL"] = "[CERTIFICATION PAGE] LOAD CERTIFICATIONS FROM DB FAILED";
    // CERTSHELL EDIT COMPONENT (9)
    CertificationActionTypes["SAVE_CERTIFICATION_TO_DB_from_CertShellEdit"] = "[CERTIFICATION] SAVE EDIT CERTIFICATION TO DB FROM CERTIFICATION SHELL EDIT";
    CertificationActionTypes["SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS"] = "[CERTIFICATION] SAVE EDIT CERTIFICATION TO DB  ON CERTIFICATION SHELL EDIT WAS SUCCESSFULL";
    CertificationActionTypes["SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL"] = "[CERTIFICATION] SAVE EDIT CERTIFICATION  ON CERTIFICATION SHELL EDIT TO DB FAILED";
    CertificationActionTypes["UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit"] = "[CERTIFICATION] UPDATE EDIT CERTIFICATION TO DB";
    CertificationActionTypes["UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS"] = "[CERTIFICATION] UPDATE EDIT CERTIFICATION TO DB WAS SUCCESSFULL";
    CertificationActionTypes["UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL"] = "[CERTIFICATION] UPDATE EDIT CERTIFICATION TO DB FAILED";
    CertificationActionTypes["DELETE_CERTIFICATION_TO_DB_from_CertShellEdit"] = "[CERTIFICATION] DELETE EDIT CERTIFICATION TO DB";
    CertificationActionTypes["DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS"] = "[CERTIFICATION] DELETE EDIT CERTIFICATION TO DB WAS SUCCESSFULL";
    CertificationActionTypes["DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL"] = "[CERTIFICATION] DELETE EDIT CERTIFICATION TO DB FAILED";
    // FROM VIEWCERT COMPONENT PRE LOAD CERTIFICATION EDIT SHELL (2)
    CertificationActionTypes["SET_ORIGINAL_CERTIFICATION_from_VIEWCERT_COMPONENT"] = "[CERTIFICATION] SET ORIGINAL CERTIFICATIONS";
    CertificationActionTypes["SET_CURRENT_CERTIFICATION_from_VIEWCERT_COMPONENT"] = "[CERTIFICATION] SET CURRENT CERTIFICATIONS";
    // FROM VIEWCERT COMPONENT FROM CERTIFICAITON EFFECTS (2)
    CertificationActionTypes["SET_ORIGINAL_CERTIFICATION_from_CERT_EFFECTS"] = "[CERTIFICATION] SET ORIGINAL CERTIFICATIONS";
    CertificationActionTypes["SET_CURRENT_CERTIFICATION_from_CERT_EFFECTS"] = "[CERTIFICATION] SET CURRENT CERTIFICATIONS";
    // FROM EDUCATION COMPONENT
    CertificationActionTypes["SET_ORIGINAL_CERTIFICATION_from_EDUCATION_CPT"] = "[CERTIFICATION] SET ORIGINAL CERTIFICATIONS FROM EDUCATION COMPONENT";
    CertificationActionTypes["SET_CURRENT_CERTIFICATION_from_EDUCATION_CPT"] = "[CERTIFICATION] SET CURRENT CERTIFICATIONS FROM EDUCATION COMPONENT";
    // SET FROM CERTIFICATION EDIT SHELL (7)
    CertificationActionTypes["SET_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] SET CERTIFICATION ID FROM CERTICATION SHELL EDIT CPT";
    CertificationActionTypes["SET_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] SET CERTIFICATION PROJECT CREATOR ID FROM CERTICATION SHELL EDIT CPT";
    CertificationActionTypes["SET_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] SET CERTIFICATION CERT_NAME FROM CERTICATION SHELL EDIT CPT";
    CertificationActionTypes["SET_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] SET CERTIFICATION IS_ACTIVE FROM CERTICATION SHELL EDIT CPT";
    CertificationActionTypes["SET_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] SET CERTIFICATION ISSUINGBODY_NAME FROM CERTICATION SHELL EDIT CPT";
    CertificationActionTypes["SET_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] SET CERTIFICATION ISSUINGBODY_LOGO FROM CERTICATION SHELL EDIT CPT";
    CertificationActionTypes["SET_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] SET CERTIFICATION COMPLETE DATE FROM CERTICATION SHELL EDIT CPT";
    // CLEAR FROM EFFECTS -SAVE UPDATE DELETE (6)
    CertificationActionTypes["CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_SAVE"] = "[CERTIFICATION] LEAR ORIGINAL CERTIFICATIONS FROM CERTIFCATION EFFECTS SAVE";
    CertificationActionTypes["CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_SAVE"] = "[CERTIFICATION] CLEAR CURRENT CERTIFICATIONS FROM CERTIFCATION EFFECTS SAVE";
    CertificationActionTypes["CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE"] = "[CERTIFICATION] LEAR ORIGINAL CERTIFICATIONS FROM CERTIFCATION EFFECTS UPDATE";
    CertificationActionTypes["CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE"] = "[CERTIFICATION] CLEAR CURRENT CERTIFICATIONSFROM CERTIFCATION EFFECTS UPDATE";
    CertificationActionTypes["CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_DELETE"] = "[CERTIFICATION] LEAR ORIGINAL CERTIFICATIONS FROM CERTIFCATION EFFECTS DELETE";
    CertificationActionTypes["CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_DELETE"] = "[CERTIFICATION] CLEAR CURRENT CERTIFICATIONS FROM CERTIFCATION EFFECTS DELETE";
    // CLEAR EDIT SHELL PROPERTIES (7)
    CertificationActionTypes["CLEAR_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] CLEAR CERTIFICATION ID FROM CERTIFICATION SHELL EDIT CPT";
    CertificationActionTypes["CLEAR_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] CLEAR CERTIFICATION PROJECT CREATOR ID FROM CERTIFICATION SHELL EDIT CPT";
    CertificationActionTypes["CLEAR_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] CLEAR CERTIFICATION CERT_NAME FROM CERTIFICATION SHELL EDIT CPT";
    CertificationActionTypes["CLEAR_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] CLEAR CERTIFICATION IS_ACTIVE FROM CERTIFICATION SHELL EDIT CPT";
    CertificationActionTypes["CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] CLEAR  CERTIFICATION ISSUINGBODY_NAME FROM CERTIFICATION SHELL EDIT CPT";
    CertificationActionTypes["CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] CLEAR CERTIFICATION START DATE FROM CERTIFICATION SHELL EDIT CPT";
    CertificationActionTypes["CLEAR_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] CLEAR CERTIFICATION COMPLETE DATE FROM CERTIFICATION SHELL EDIT CPT";
    // UPDATE (1)
    CertificationActionTypes["RESET_CURRENT_CERTIFICATION_FROM_CERT_SHELL_EDIT_CPT"] = "[CURRENT CERTIFICATION] RESETS CURRENT CERTIFICATION BACK TO ORIGINAL PROJECT FROM CERTIFICATION SHELL EDIT CPT";
})(CertificationActionTypes = exports.CertificationActionTypes || (exports.CertificationActionTypes = {}));
// TOTAL = 37
// SET ACTIONS
// FROM VIEW CERTICATION COMPONENT (2)
var SetOriginalCertificationFromViewCert = /** @class */ (function () {
    function SetOriginalCertificationFromViewCert(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_ORIGINAL_CERTIFICATION_from_VIEWCERT_COMPONENT;
    }
    return SetOriginalCertificationFromViewCert;
}());
exports.SetOriginalCertificationFromViewCert = SetOriginalCertificationFromViewCert;
var SetCurrentCertificationFromViewCert = /** @class */ (function () {
    function SetCurrentCertificationFromViewCert(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_VIEWCERT_COMPONENT;
    }
    return SetCurrentCertificationFromViewCert;
}());
exports.SetCurrentCertificationFromViewCert = SetCurrentCertificationFromViewCert;
var SetCurrentCertificationFromEducationCPT = /** @class */ (function () {
    function SetCurrentCertificationFromEducationCPT(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_EDUCATION_CPT;
    }
    return SetCurrentCertificationFromEducationCPT;
}());
exports.SetCurrentCertificationFromEducationCPT = SetCurrentCertificationFromEducationCPT;
// FROM CERTIFCATION EFFECTS (2)
var SetOriginalCertificationFromCertEffects = /** @class */ (function () {
    function SetOriginalCertificationFromCertEffects(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_ORIGINAL_CERTIFICATION_from_CERT_EFFECTS;
    }
    return SetOriginalCertificationFromCertEffects;
}());
exports.SetOriginalCertificationFromCertEffects = SetOriginalCertificationFromCertEffects;
var SetCurrentCertificationFromCertEffects = /** @class */ (function () {
    function SetCurrentCertificationFromCertEffects(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_CERT_EFFECTS;
    }
    return SetCurrentCertificationFromCertEffects;
}());
exports.SetCurrentCertificationFromCertEffects = SetCurrentCertificationFromCertEffects;
// SET FROM CERTICATION EDIT SHELL (7)
var SetCurrentCertificationIdFromCertShellEditCpt = /** @class */ (function () {
    function SetCurrentCertificationIdFromCertShellEditCpt(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT;
    }
    return SetCurrentCertificationIdFromCertShellEditCpt;
}());
exports.SetCurrentCertificationIdFromCertShellEditCpt = SetCurrentCertificationIdFromCertShellEditCpt;
var SetCurrentCertificationProjectCreatorIDFromCertShellEditCpt = /** @class */ (function () {
    function SetCurrentCertificationProjectCreatorIDFromCertShellEditCpt(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT;
    }
    return SetCurrentCertificationProjectCreatorIDFromCertShellEditCpt;
}());
exports.SetCurrentCertificationProjectCreatorIDFromCertShellEditCpt = SetCurrentCertificationProjectCreatorIDFromCertShellEditCpt;
var SetCurrentCertificationCertNameFromCertShellEditCpt = /** @class */ (function () {
    function SetCurrentCertificationCertNameFromCertShellEditCpt(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT;
    }
    return SetCurrentCertificationCertNameFromCertShellEditCpt;
}());
exports.SetCurrentCertificationCertNameFromCertShellEditCpt = SetCurrentCertificationCertNameFromCertShellEditCpt;
var SetCurrentCertificationIsActiveFromCertShellEditCpt = /** @class */ (function () {
    function SetCurrentCertificationIsActiveFromCertShellEditCpt(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT;
    }
    return SetCurrentCertificationIsActiveFromCertShellEditCpt;
}());
exports.SetCurrentCertificationIsActiveFromCertShellEditCpt = SetCurrentCertificationIsActiveFromCertShellEditCpt;
var SetCurrentCertificationIssuingBodyNameFromCertShellEditCpt = /** @class */ (function () {
    function SetCurrentCertificationIssuingBodyNameFromCertShellEditCpt(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT;
    }
    return SetCurrentCertificationIssuingBodyNameFromCertShellEditCpt;
}());
exports.SetCurrentCertificationIssuingBodyNameFromCertShellEditCpt = SetCurrentCertificationIssuingBodyNameFromCertShellEditCpt;
var SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt = /** @class */ (function () {
    function SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT;
    }
    return SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt;
}());
exports.SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt = SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt;
var SetCurrentCertificationIssuedDateFromCertShellEditCpt = /** @class */ (function () {
    function SetCurrentCertificationIssuedDateFromCertShellEditCpt(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT;
    }
    return SetCurrentCertificationIssuedDateFromCertShellEditCpt;
}());
exports.SetCurrentCertificationIssuedDateFromCertShellEditCpt = SetCurrentCertificationIssuedDateFromCertShellEditCpt;
// CLEAR FROM EFFECTS SAVE UPDATE DELETE LOAD (6)
var ClearOriginalCertificationFromCertEffectsSave = /** @class */ (function () {
    function ClearOriginalCertificationFromCertEffectsSave() {
        this.type = CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_SAVE;
    }
    return ClearOriginalCertificationFromCertEffectsSave;
}());
exports.ClearOriginalCertificationFromCertEffectsSave = ClearOriginalCertificationFromCertEffectsSave;
var ClearCurrentCertificationFromCertEffectsSave = /** @class */ (function () {
    function ClearCurrentCertificationFromCertEffectsSave() {
        this.type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_SAVE;
    }
    return ClearCurrentCertificationFromCertEffectsSave;
}());
exports.ClearCurrentCertificationFromCertEffectsSave = ClearCurrentCertificationFromCertEffectsSave;
var ClearOriginalCertificationFromCertEffectsUpdate = /** @class */ (function () {
    function ClearOriginalCertificationFromCertEffectsUpdate() {
        this.type = CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE;
    }
    return ClearOriginalCertificationFromCertEffectsUpdate;
}());
exports.ClearOriginalCertificationFromCertEffectsUpdate = ClearOriginalCertificationFromCertEffectsUpdate;
var ClearCurrentCertificationFromCertEffectsUpdate = /** @class */ (function () {
    function ClearCurrentCertificationFromCertEffectsUpdate() {
        this.type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE;
    }
    return ClearCurrentCertificationFromCertEffectsUpdate;
}());
exports.ClearCurrentCertificationFromCertEffectsUpdate = ClearCurrentCertificationFromCertEffectsUpdate;
var ClearOriginalCertificationFromCertEffectsDelete = /** @class */ (function () {
    function ClearOriginalCertificationFromCertEffectsDelete() {
        this.type = CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_DELETE;
    }
    return ClearOriginalCertificationFromCertEffectsDelete;
}());
exports.ClearOriginalCertificationFromCertEffectsDelete = ClearOriginalCertificationFromCertEffectsDelete;
var ClearCurrentCertificationFromCertEffectsDelete = /** @class */ (function () {
    function ClearCurrentCertificationFromCertEffectsDelete() {
        this.type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_DELETE;
    }
    return ClearCurrentCertificationFromCertEffectsDelete;
}());
exports.ClearCurrentCertificationFromCertEffectsDelete = ClearCurrentCertificationFromCertEffectsDelete;
// CLEAR FROM CERT EDIT ShELL (7)
var ClearCurrentCertificationIdFromCertShellEdit = /** @class */ (function () {
    function ClearCurrentCertificationIdFromCertShellEdit() {
        this.type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT;
    }
    return ClearCurrentCertificationIdFromCertShellEdit;
}());
exports.ClearCurrentCertificationIdFromCertShellEdit = ClearCurrentCertificationIdFromCertShellEdit;
var ClearCurrentCertificationProjectCreatorIDFromCertShellEdit = /** @class */ (function () {
    function ClearCurrentCertificationProjectCreatorIDFromCertShellEdit() {
        this.type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT;
    }
    return ClearCurrentCertificationProjectCreatorIDFromCertShellEdit;
}());
exports.ClearCurrentCertificationProjectCreatorIDFromCertShellEdit = ClearCurrentCertificationProjectCreatorIDFromCertShellEdit;
var ClearCurrentCertificationCertNameFromCertShellEdit = /** @class */ (function () {
    function ClearCurrentCertificationCertNameFromCertShellEdit() {
        this.type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT;
    }
    return ClearCurrentCertificationCertNameFromCertShellEdit;
}());
exports.ClearCurrentCertificationCertNameFromCertShellEdit = ClearCurrentCertificationCertNameFromCertShellEdit;
var ClearCurrentCertificationIsActiveFromCertShellEdit = /** @class */ (function () {
    function ClearCurrentCertificationIsActiveFromCertShellEdit() {
        this.type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT;
    }
    return ClearCurrentCertificationIsActiveFromCertShellEdit;
}());
exports.ClearCurrentCertificationIsActiveFromCertShellEdit = ClearCurrentCertificationIsActiveFromCertShellEdit;
var ClearCurrentCertificationIssuingBodyNameFromCertShellEdit = /** @class */ (function () {
    function ClearCurrentCertificationIssuingBodyNameFromCertShellEdit() {
        this.type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT;
    }
    return ClearCurrentCertificationIssuingBodyNameFromCertShellEdit;
}());
exports.ClearCurrentCertificationIssuingBodyNameFromCertShellEdit = ClearCurrentCertificationIssuingBodyNameFromCertShellEdit;
var ClearCurrentCertificationIssuingBodyLogoFromCertShellEdit = /** @class */ (function () {
    function ClearCurrentCertificationIssuingBodyLogoFromCertShellEdit() {
        this.type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT;
    }
    return ClearCurrentCertificationIssuingBodyLogoFromCertShellEdit;
}());
exports.ClearCurrentCertificationIssuingBodyLogoFromCertShellEdit = ClearCurrentCertificationIssuingBodyLogoFromCertShellEdit;
var ClearCurrentCertificationIssuedDateFromCertShellEdit = /** @class */ (function () {
    function ClearCurrentCertificationIssuedDateFromCertShellEdit() {
        this.type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT;
    }
    return ClearCurrentCertificationIssuedDateFromCertShellEdit;
}());
exports.ClearCurrentCertificationIssuedDateFromCertShellEdit = ClearCurrentCertificationIssuedDateFromCertShellEdit;
// TO DB
// LOAD (3)
var LoadCertificationsByProjectCreatorIDFromDB = /** @class */ (function () {
    function LoadCertificationsByProjectCreatorIDFromDB(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL;
    }
    return LoadCertificationsByProjectCreatorIDFromDB;
}());
exports.LoadCertificationsByProjectCreatorIDFromDB = LoadCertificationsByProjectCreatorIDFromDB;
var LoadCertificationsByProjectCreatorIDFromDBSuccess = /** @class */ (function () {
    function LoadCertificationsByProjectCreatorIDFromDBSuccess(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL_SUCCESS;
    }
    return LoadCertificationsByProjectCreatorIDFromDBSuccess;
}());
exports.LoadCertificationsByProjectCreatorIDFromDBSuccess = LoadCertificationsByProjectCreatorIDFromDBSuccess;
var LoadCertificationsByProjectCreatorIDFromDBFail = /** @class */ (function () {
    function LoadCertificationsByProjectCreatorIDFromDBFail(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.LOAD_CERTIFICATIONS_FROM_on_PAGESHELL_DB_FAIL;
    }
    return LoadCertificationsByProjectCreatorIDFromDBFail;
}());
exports.LoadCertificationsByProjectCreatorIDFromDBFail = LoadCertificationsByProjectCreatorIDFromDBFail;
// SAVE (3)
var SaveCertificationToDB = /** @class */ (function () {
    function SaveCertificationToDB() {
        this.type = CertificationActionTypes.SAVE_CERTIFICATION_TO_DB_from_CertShellEdit;
    }
    return SaveCertificationToDB;
}());
exports.SaveCertificationToDB = SaveCertificationToDB;
var SaveCertificationToDBSuccess = /** @class */ (function () {
    function SaveCertificationToDBSuccess(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS;
    }
    return SaveCertificationToDBSuccess;
}());
exports.SaveCertificationToDBSuccess = SaveCertificationToDBSuccess;
var SaveCertificationToDBFail = /** @class */ (function () {
    function SaveCertificationToDBFail(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL;
    }
    return SaveCertificationToDBFail;
}());
exports.SaveCertificationToDBFail = SaveCertificationToDBFail;
// UPDATE (3)
var UpdateCertificationToDB = /** @class */ (function () {
    function UpdateCertificationToDB() {
        this.type = CertificationActionTypes.UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit;
    }
    return UpdateCertificationToDB;
}());
exports.UpdateCertificationToDB = UpdateCertificationToDB;
var UpdateCertificationToDBSuccess = /** @class */ (function () {
    function UpdateCertificationToDBSuccess(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS;
    }
    return UpdateCertificationToDBSuccess;
}());
exports.UpdateCertificationToDBSuccess = UpdateCertificationToDBSuccess;
var UpdateCertificationToDBFail = /** @class */ (function () {
    function UpdateCertificationToDBFail(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL;
    }
    return UpdateCertificationToDBFail;
}());
exports.UpdateCertificationToDBFail = UpdateCertificationToDBFail;
// DELETE (3)
var DeleteCertificationToDB = /** @class */ (function () {
    function DeleteCertificationToDB() {
        this.type = CertificationActionTypes.DELETE_CERTIFICATION_TO_DB_from_CertShellEdit;
    }
    return DeleteCertificationToDB;
}());
exports.DeleteCertificationToDB = DeleteCertificationToDB;
var DeleteCertificationToDBSuccess = /** @class */ (function () {
    function DeleteCertificationToDBSuccess(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS;
    }
    return DeleteCertificationToDBSuccess;
}());
exports.DeleteCertificationToDBSuccess = DeleteCertificationToDBSuccess;
var DeleteCertificationToDBFail = /** @class */ (function () {
    function DeleteCertificationToDBFail(payload) {
        this.payload = payload;
        this.type = CertificationActionTypes.DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL;
    }
    return DeleteCertificationToDBFail;
}());
exports.DeleteCertificationToDBFail = DeleteCertificationToDBFail;
// RESET (1)
var ResetCurrentCertificationToOriginal = /** @class */ (function () {
    function ResetCurrentCertificationToOriginal() {
        this.type = CertificationActionTypes.RESET_CURRENT_CERTIFICATION_FROM_CERT_SHELL_EDIT_CPT;
    }
    return ResetCurrentCertificationToOriginal;
}());
exports.ResetCurrentCertificationToOriginal = ResetCurrentCertificationToOriginal;
