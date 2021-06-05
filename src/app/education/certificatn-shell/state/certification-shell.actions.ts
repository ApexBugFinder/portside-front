import { Action } from '@ngrx/store';
import { Certification } from '../../Models/certification/certification';


// ACTION ORIGINS
// load from db: from PageShell Component

// Save Update & Delete: from CertShellEdit Component acTIONbUTTONS
// Reset: from CertShellEdit Component

// Set Original & Current: from Cert Component
// Clear from CertifcationEffects-Save, Upate, Delete



export enum CertificationActionTypes {
  // PAGE SHELL COMPONENT (3)
  LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL = '[CERTIFICATION PAGE] LOAD CERTIFICATIONS FROM DB',
  LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL_SUCCESS = '[CERTIFICATION PAGE] LOAD CERTIFICATIONS FROM DB SUCCESSFULL',
  LOAD_CERTIFICATIONS_FROM_on_PAGESHELL_DB_FAIL = '[CERTIFICATION PAGE] LOAD CERTIFICATIONS FROM DB FAILED',

  // CERTSHELL EDIT COMPONENT (9)
  SAVE_CERTIFICATION_TO_DB_from_CertShellEdit = '[CERTIFICATION] SAVE EDIT CERTIFICATION TO DB FROM CERTIFICATION SHELL EDIT',
  SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS = '[CERTIFICATION] SAVE EDIT CERTIFICATION TO DB  ON CERTIFICATION SHELL EDIT WAS SUCCESSFULL',
  SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL = '[CERTIFICATION] SAVE EDIT CERTIFICATION  ON CERTIFICATION SHELL EDIT TO DB FAILED',

  UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit = '[CERTIFICATION] UPDATE EDIT CERTIFICATION TO DB',
  UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS = '[CERTIFICATION] UPDATE EDIT CERTIFICATION TO DB WAS SUCCESSFULL',
  UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL = '[CERTIFICATION] UPDATE EDIT CERTIFICATION TO DB FAILED',

  DELETE_CERTIFICATION_TO_DB_from_CertShellEdit = '[CERTIFICATION] DELETE EDIT CERTIFICATION TO DB',
  DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS = '[CERTIFICATION] DELETE EDIT CERTIFICATION TO DB WAS SUCCESSFULL',
  DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL = '[CERTIFICATION] DELETE EDIT CERTIFICATION TO DB FAILED',

  // FROM VIEWCERT COMPONENT PRE LOAD CERTIFICATION EDIT SHELL (2)
  SET_ORIGINAL_CERTIFICATION_from_VIEWCERT_COMPONENT = '[CERTIFICATION] SET ORIGINAL CERTIFICATIONS',
  SET_CURRENT_CERTIFICATION_from_VIEWCERT_COMPONENT = '[CERTIFICATION] SET CURRENT CERTIFICATIONS',

  // FROM VIEWCERT COMPONENT FROM CERTIFICAITON EFFECTS (2)
  SET_ORIGINAL_CERTIFICATION_from_CERT_EFFECTS = '[CERTIFICATION] SET ORIGINAL CERTIFICATIONS',
  SET_CURRENT_CERTIFICATION_from_CERT_EFFECTS = '[CERTIFICATION] SET CURRENT CERTIFICATIONS',

  // FROM EDUCATION COMPONENT
  SET_ORIGINAL_CERTIFICATION_from_EDUCATION_CPT = '[CERTIFICATION] SET ORIGINAL CERTIFICATIONS FROM EDUCATION COMPONENT',
  SET_CURRENT_CERTIFICATION_from_EDUCATION_CPT = '[CERTIFICATION] SET CURRENT CERTIFICATIONS FROM EDUCATION COMPONENT',

  // SET FROM CERTIFICATION EDIT SHELL (7)
  SET_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] SET CERTIFICATION ID FROM CERTICATION SHELL EDIT CPT',
  SET_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] SET CERTIFICATION PROJECT CREATOR ID FROM CERTICATION SHELL EDIT CPT',
  SET_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] SET CERTIFICATION CERT_NAME FROM CERTICATION SHELL EDIT CPT',
  SET_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] SET CERTIFICATION IS_ACTIVE FROM CERTICATION SHELL EDIT CPT',
  SET_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] SET CERTIFICATION ISSUINGBODY_NAME FROM CERTICATION SHELL EDIT CPT',
  SET_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] SET CERTIFICATION ISSUINGBODY_LOGO FROM CERTICATION SHELL EDIT CPT',
  SET_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] SET CERTIFICATION COMPLETE DATE FROM CERTICATION SHELL EDIT CPT',

  // CLEAR FROM EFFECTS -SAVE UPDATE DELETE (6)
  CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_SAVE = '[CERTIFICATION] LEAR ORIGINAL CERTIFICATIONS FROM CERTIFCATION EFFECTS SAVE',
  CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_SAVE = '[CERTIFICATION] CLEAR CURRENT CERTIFICATIONS FROM CERTIFCATION EFFECTS SAVE',

  CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE = '[CERTIFICATION] LEAR ORIGINAL CERTIFICATIONS FROM CERTIFCATION EFFECTS UPDATE',
  CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE = '[CERTIFICATION] CLEAR CURRENT CERTIFICATIONSFROM CERTIFCATION EFFECTS UPDATE',

  CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_DELETE = '[CERTIFICATION] LEAR ORIGINAL CERTIFICATIONS FROM CERTIFCATION EFFECTS DELETE',
  CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_DELETE = '[CERTIFICATION] CLEAR CURRENT CERTIFICATIONS FROM CERTIFCATION EFFECTS DELETE',

  // CLEAR EDIT SHELL PROPERTIES (7)
  CLEAR_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] CLEAR CERTIFICATION ID FROM CERTIFICATION SHELL EDIT CPT',
  CLEAR_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] CLEAR CERTIFICATION PROJECT CREATOR ID FROM CERTIFICATION SHELL EDIT CPT',
  CLEAR_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] CLEAR CERTIFICATION CERT_NAME FROM CERTIFICATION SHELL EDIT CPT',
  CLEAR_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] CLEAR CERTIFICATION IS_ACTIVE FROM CERTIFICATION SHELL EDIT CPT',
  CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] CLEAR  CERTIFICATION ISSUINGBODY_NAME FROM CERTIFICATION SHELL EDIT CPT',
  CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] CLEAR CERTIFICATION START DATE FROM CERTIFICATION SHELL EDIT CPT',
  CLEAR_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] CLEAR CERTIFICATION COMPLETE DATE FROM CERTIFICATION SHELL EDIT CPT',

  // UPDATE (1)

  RESET_CURRENT_CERTIFICATION_FROM_CERT_SHELL_EDIT_CPT = '[CURRENT CERTIFICATION] RESETS CURRENT CERTIFICATION BACK TO ORIGINAL PROJECT FROM CERTIFICATION SHELL EDIT CPT',
}
// TOTAL = 37

// SET ACTIONS

// FROM VIEW CERTICATION COMPONENT (2)
export class SetOriginalCertificationFromViewCert implements Action {
    readonly type = CertificationActionTypes.SET_ORIGINAL_CERTIFICATION_from_VIEWCERT_COMPONENT;
    constructor(public payload: Certification) { }
}


export class SetCurrentCertificationFromViewCert implements Action {
  readonly type =
    CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_VIEWCERT_COMPONENT;
  constructor(public payload: Certification) {}
}

export class SetCurrentCertificationFromEducationCPT implements Action {
  readonly type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_EDUCATION_CPT;
  constructor(public payload: Certification) {}
}

// FROM CERTIFCATION EFFECTS (2)
export class SetOriginalCertificationFromCertEffects implements Action {
  readonly type =
    CertificationActionTypes.SET_ORIGINAL_CERTIFICATION_from_CERT_EFFECTS;
  constructor(public payload: Certification) {}
}

export class SetCurrentCertificationFromCertEffects implements Action {
  readonly type =
    CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_CERT_EFFECTS;
  constructor(public payload: Certification) {}
}



// SET FROM CERTICATION EDIT SHELL (7)
export class SetCurrentCertificationIdFromCertShellEditCpt implements Action {
    readonly type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT;
    constructor(public payload: string) {}
}

export class SetCurrentCertificationProjectCreatorIDFromCertShellEditCpt implements Action {
    readonly type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT;
    constructor(public payload: string) {}
}

export class SetCurrentCertificationCertNameFromCertShellEditCpt implements Action {
    readonly type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT;
    constructor(public payload: string) { }
}

export class SetCurrentCertificationIsActiveFromCertShellEditCpt implements Action {
    readonly type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT;
    constructor(public payload: boolean) {}
}

export class SetCurrentCertificationIssuingBodyNameFromCertShellEditCpt implements Action {
    readonly type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT;
    constructor(public payload: string) {}
}

export class SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt implements Action {
    readonly type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT;
    constructor(public payload: string) {}
}

export class SetCurrentCertificationIssuedDateFromCertShellEditCpt implements Action {
    readonly type = CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT;
    constructor(public payload: Date) {}
}








// CLEAR FROM EFFECTS SAVE UPDATE DELETE LOAD (6)

export class ClearOriginalCertificationFromCertEffectsSave implements Action {
    readonly type = CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_SAVE;

}

export class ClearCurrentCertificationFromCertEffectsSave implements Action {
    readonly type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_SAVE;

}

export class ClearOriginalCertificationFromCertEffectsUpdate implements Action {
  readonly type = CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE;
}

export class ClearCurrentCertificationFromCertEffectsUpdate implements Action {
  readonly type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE;
}

export class ClearOriginalCertificationFromCertEffectsDelete implements Action {
  readonly type = CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_DELETE;
}

export class ClearCurrentCertificationFromCertEffectsDelete implements Action {
  readonly type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_DELETE;
}






// CLEAR FROM CERT EDIT ShELL (7)

export class ClearCurrentCertificationIdFromCertShellEdit implements Action {
    readonly type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT;

}

export class ClearCurrentCertificationProjectCreatorIDFromCertShellEdit implements Action {
    readonly type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT;

}

export class ClearCurrentCertificationCertNameFromCertShellEdit implements Action {
    readonly type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT;

}

export class ClearCurrentCertificationIsActiveFromCertShellEdit implements Action {
    readonly type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT;

}

export class ClearCurrentCertificationIssuingBodyNameFromCertShellEdit implements Action {
    readonly type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT;

}

export class ClearCurrentCertificationIssuingBodyLogoFromCertShellEdit implements Action {
    readonly type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT;

}

export class ClearCurrentCertificationIssuedDateFromCertShellEdit implements Action {
    readonly type = CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT;

}







// TO DB
// LOAD (3)
export class LoadCertificationsByProjectCreatorIDFromDB implements Action {
    readonly type = CertificationActionTypes.LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL;
    constructor(public payload: string) {}
}

export class LoadCertificationsByProjectCreatorIDFromDBSuccess implements Action {
    readonly type = CertificationActionTypes.LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL_SUCCESS;
    constructor(public payload: Certification[]) {}
}

export class LoadCertificationsByProjectCreatorIDFromDBFail implements Action {
  readonly type =
    CertificationActionTypes.LOAD_CERTIFICATIONS_FROM_on_PAGESHELL_DB_FAIL;
  constructor(public payload: string) {}
}

// SAVE (3)
export class SaveCertificationToDB implements Action {
  readonly type =
    CertificationActionTypes.SAVE_CERTIFICATION_TO_DB_from_CertShellEdit
    ;
}

export class SaveCertificationToDBSuccess implements Action {
  readonly type =
    CertificationActionTypes.SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS;
  constructor(public payload: Certification) {}
}

export class SaveCertificationToDBFail implements Action {
  readonly type =
    CertificationActionTypes.SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL;
  constructor(public payload: string) {}
}

// UPDATE (3)
export class UpdateCertificationToDB implements Action {
  readonly type =
    CertificationActionTypes.UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit;
}

export class UpdateCertificationToDBSuccess implements Action {
  readonly type =
    CertificationActionTypes.UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS;
  constructor(public payload: Certification) {}
}

export class UpdateCertificationToDBFail implements Action {
  readonly type =
    CertificationActionTypes.UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL;
  constructor(public payload: string) {}
}

// DELETE (3)
export class DeleteCertificationToDB implements Action {
  readonly type =
    CertificationActionTypes.DELETE_CERTIFICATION_TO_DB_from_CertShellEdit;
}

export class DeleteCertificationToDBSuccess implements Action {
  readonly type =
    CertificationActionTypes.DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS;
  constructor(public payload: Certification) {}
}

export class DeleteCertificationToDBFail implements Action {
  readonly type =
    CertificationActionTypes.DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL;
  constructor(public payload: string) {}
}

// RESET (1)

export class ResetCurrentCertificationToOriginal implements Action {
    readonly type = CertificationActionTypes.RESET_CURRENT_CERTIFICATION_FROM_CERT_SHELL_EDIT_CPT;
}

// TOTAL  = (37)

export type CertificationActions =
  // FROM VIEW CERTICATION COMPONENT (2)
  | SetOriginalCertificationFromViewCert
  | SetCurrentCertificationFromViewCert

  // FROM CERTIFCATION EFFECTS (2)
  | SetOriginalCertificationFromCertEffects
  | SetCurrentCertificationFromCertEffects

  // FROM EDUCATION COMPONENT
  | SetCurrentCertificationFromEducationCPT
  
  // SET FROM CERTICATION EDIT SHELL (7)
  | SetCurrentCertificationIdFromCertShellEditCpt
  | SetCurrentCertificationProjectCreatorIDFromCertShellEditCpt
  | SetCurrentCertificationCertNameFromCertShellEditCpt
  | SetCurrentCertificationIsActiveFromCertShellEditCpt
  | SetCurrentCertificationIssuingBodyNameFromCertShellEditCpt
  | SetCurrentCertificationIssuingBodyLogoFromCertShellEditCpt
  | SetCurrentCertificationIssuedDateFromCertShellEditCpt

  // CLEAR FROM CERT EDIT ShELL (7)
  | ClearCurrentCertificationIdFromCertShellEdit
  | ClearCurrentCertificationProjectCreatorIDFromCertShellEdit
  | ClearCurrentCertificationCertNameFromCertShellEdit
  | ClearCurrentCertificationIsActiveFromCertShellEdit
  | ClearCurrentCertificationIssuingBodyNameFromCertShellEdit
  | ClearCurrentCertificationIssuingBodyLogoFromCertShellEdit
  | ClearCurrentCertificationIssuedDateFromCertShellEdit
  | ResetCurrentCertificationToOriginal

  // CLEAR FROM EFFECTS SAVE UPDATE DELETE LOAD (6)
  | ClearOriginalCertificationFromCertEffectsSave
  | ClearCurrentCertificationFromCertEffectsSave
  | ClearOriginalCertificationFromCertEffectsUpdate
  | ClearCurrentCertificationFromCertEffectsUpdate
  | ClearOriginalCertificationFromCertEffectsDelete
  | ClearCurrentCertificationFromCertEffectsDelete

  // TO DB
  // LOAD (3)
  | LoadCertificationsByProjectCreatorIDFromDB
  | LoadCertificationsByProjectCreatorIDFromDBSuccess
  | LoadCertificationsByProjectCreatorIDFromDBFail

  // SAVE (3)
  | SaveCertificationToDB
  | SaveCertificationToDBSuccess
  | SaveCertificationToDBFail

  // UPDATE (3)
  | UpdateCertificationToDB
  | UpdateCertificationToDBSuccess
  | UpdateCertificationToDBFail

  // DELETE (3)
  | DeleteCertificationToDB
  | DeleteCertificationToDBSuccess
  | DeleteCertificationToDBFail
  ;
