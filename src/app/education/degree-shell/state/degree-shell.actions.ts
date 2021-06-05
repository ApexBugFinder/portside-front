import { Action } from '@ngrx/store';
import { Degree } from '../../Models/degree/degree';


// ACTION ORIGINS
// load from db: from PageShell Component

// Save Update & Delete: from DegreeShellEdit Component acTIONbUTTONS
// Reset: from DegreeShellEdit Component

// Set Original & Current: from Cert Component
// Clear from CertifcationEffects-Save, Upate, Delete



export enum DegreeActionTypes {
  // PAGE SHELL COMPONENT (3)
  LOAD_DEGREES_FROM_DB_on_PAGESHELL = '[DEGREE PAGE] LOAD DEGREES FROM DB',
  LOAD_DEGREES_FROM_DB_on_PAGESHELL_SUCCESS = '[DEGREE PAGE] LOAD DEGREES FROM DB SUCCESSFULL',
  LOAD_DEGREES_FROM_on_PAGESHELL_DB_FAIL = '[DEGREE PAGE] LOAD DEGREES FROM DB FAILED',

  // DEGREESHELL EDIT COMPONENT (9)
  SAVE_DEGREE_TO_DB_from_DegreeShellEdit = '[DEGREE] SAVE EDIT DEGREE TO DB FROM DEGREE SHELL EDIT',
  SAVE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS = '[DEGREE] SAVE EDIT DEGREE TO DB  ON DEGREE SHELL EDIT WAS SUCCESSFULL',
  SAVE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL = '[DEGREE] SAVE EDIT DEGREE  ON DEGREE SHELL EDIT TO DB FAILED',

  UPDATE_DEGREE_TO_DB_from_DegreeShellEdit = '[DEGREE] UPDATE EDIT DEGREE TO DB',
  UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS = '[DEGREE] UPDATE EDIT DEGREE TO DB WAS SUCCESSFULL',
  UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL = '[DEGREE] UPDATE EDIT DEGREE TO DB FAILED',

  DELETE_DEGREE_TO_DB_from_DegreeShellEdit = '[DEGREE] DELETE EDIT DEGREE TO DB',
  DELETE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS = '[DEGREE] DELETE EDIT DEGREE TO DB WAS SUCCESSFULL',
  DELETE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL = '[DEGREE] DELETE EDIT DEGREE TO DB FAILED',

  // FROM VIEWDEGREE COMPONENT PRE LOAD DEGREE EDIT SHELL (2)
  SET_ORIGINAL_DEGREE_from_VIEWDEGREE_COMPONENT = '[DEGREE] SET ORIGINAL DEGREES',
  SET_CURRENT_DEGREE_from_VIEWDEGREE_COMPONENT = '[DEGREE] SET CURRENT DEGREES',

  // FROM VIEWDEGREE COMPONENT FROM DEGREEIFICAITON EFFECTS (2)
  SET_ORIGINAL_DEGREE_from_DEGREE_EFFECTS = '[DEGREE] SET ORIGINAL DEGREES',
  SET_CURRENT_DEGREE_from_DEGREE_EFFECTS = '[DEGREE] SET CURRENT DEGREES',

  // FROM EDUCATION COMPONENT SET CURRENT
  SET_CURRENT_DEGREE_from_EDUCATION_CPT = '[DEGREE] SET CURRENT DEGREES FROM EDUCATION CPT',

  // SET FROM DEGREE EDIT SHELL (7)
  SET_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] SET DEGREE ID FROM DEGREE SHELL EDIT CPT',
  SET_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] SET DEGREE PROJECT CREATOR ID FROM DEGREE SHELL EDIT CPT',
  SET_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] SET DEGREE DEGREE_NAME FROM DEGREE SHELL EDIT CPT',
  SET_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] SET DEGREE MINOR FROM DEGREE SHELL EDIT CPT',
  SET_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] SET DEGREE INSTITUTION FROM DEGREE SHELL EDIT CPT',
  SET_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] SET DEGREE CITY FROM DEGREE SHELL EDIT CPT',
  SET_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] SET DEGREE COMPLETE DATE FROM DEGREE SHELL EDIT CPT',
  SET_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] SET DEGREE GRADUATION YEAR FROM DEGREE SHELL EDIT CPT',
  SET_CURRENT_DEGREE_isGRADUATED_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] SET DEGREE IS GRADUATED FROM DEGREE SHELL EDIT CPT',
  SET_CURRENT_DEGREE_DEGREE_TYPE_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] SET DEGREE TYPE FROM DEGREE SHELL EDIT CPT',

  // CLEAR FROM EFFECTS -SAVE UPDATE DELETE (6)
  CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_SAVE = '[DEGREE] LEAR ORIGINAL DEGREES FROM DEGREE EFFECTS SAVE',
  CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_SAVE = '[DEGREE] CLEAR CURRENT DEGREES FROM DEGREE EFFECTS SAVE',

  CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_UPDATE = '[DEGREE] LEAR ORIGINAL DEGREES FROM DEGREEEFFECTS UPDATE',
  CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_UPDATE = '[DEGREE] CLEAR CURRENT DEGREESFROM DEGREEEFFECTS UPDATE',

  CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_DELETE = '[DEGREE] LEAR ORIGINAL DEGREES FROM DEGREE EFFECTS DELETE',
  CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_DELETE = '[DEGREE] CLEAR CURRENT DEGREES FROM DEGREE EFFECTS DELETE',

  // CLEAR EDIT SHELL PROPERTIES (7)
  CLEAR_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] CLEAR DEGREE ID FROM DEGREE SHELL EDIT CPT',
  CLEAR_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] CLEAR DEGREE PROJECT CREATOR ID FROM DEGREE SHELL EDIT CPT',
  CLEAR_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] CLEAR DEGREE DEGREE_NAME FROM DEGREE SHELL EDIT CPT',
  CLEAR_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] CLEAR DEGREE MINOR FROM DEGREE SHELL EDIT CPT',
  CLEAR_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] CLEAR  DEGREE INSTITUTION FROM DEGREE SHELL EDIT CPT',
  CLEAR_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] CLEAR DEGREE START DATE FROM DEGREE SHELL EDIT CPT',
  CLEAR_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] CLEAR DEGREE COMPLETE DATE FROM DEGREE SHELL EDIT CPT',
  CLEAR_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] CLEAR DEGREE GRADUATION YEAR FROM DEGREE SHELL EDIT CPT',
  CLEAR_CURRENT_DEGREE_isGRADUATED_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] CLEAR DEGREE IS GRADUATED FROM DEGREE SHELL EDIT CPT',
  CLEAR_CURRENT_DEGREE_DEGREE_TYPE_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] CLEAR DEGREE DEGREE TYPE FROM DEGREE SHELL EDIT CPT',
  // UPDATE (1)

  RESET_CURRENT_DEGREE_FROM_DEGREE_SHELL_EDIT_CPT = '[CURRENT DEGREE] RESETS CURRENT DEGREE BACK TO ORIGINAL PROJECT FROM DEGREE SHELL EDIT CPT',
}
// TOTAL = 37

// SET ACTIONS

// FROM VIEW DEGREE COMPONENT (2)
export class SetOriginalDegreeFromViewDegree implements Action {
    readonly type = DegreeActionTypes.SET_ORIGINAL_DEGREE_from_VIEWDEGREE_COMPONENT;
    constructor(public payload: Degree) { }
}


export class SetCurrentDegreeFromViewDegree implements Action {
  readonly type =
    DegreeActionTypes.SET_CURRENT_DEGREE_from_VIEWDEGREE_COMPONENT;
  constructor(public payload: Degree) {}
}


// FROM DEGREEEFFECTS (2)
export class SetOriginalDegreeFromDegreeEffects implements Action {
  readonly type =
    DegreeActionTypes.SET_ORIGINAL_DEGREE_from_DEGREE_EFFECTS;
  constructor(public payload: Degree) {}
}

export class SetCurrentDegreeFromDegreeEffects implements Action {
  readonly type =
    DegreeActionTypes.SET_CURRENT_DEGREE_from_DEGREE_EFFECTS;
  constructor(public payload: Degree) {}
}

// SET FROM DEGREE FROM EDUCATION CPT
export class SetCurrentDegreeFromEducationCPT implements Action {
  readonly type = DegreeActionTypes.SET_CURRENT_DEGREE_from_EDUCATION_CPT;
  constructor(public payload: Degree) {}
}

// SET FROM DEGREE EDIT SHELL (9)
export class SetCurrentDegreeIdFromDegreeShellEditCpt implements Action {
    readonly type = DegreeActionTypes.SET_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT;
    constructor(public payload: string) {}
}

export class SetCurrentDegreeProjectCreatorIDFromDegreeShellEditCpt implements Action {
    readonly type = DegreeActionTypes.SET_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT;
    constructor(public payload: string) {}
}

export class SetCurrentDegreeDegreeNameFromDegreeShellEditCpt implements Action {
    readonly type = DegreeActionTypes.SET_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT;
    constructor(public payload: string) { }
}

export class SetCurrentDegreeDegreeTypeFromDegreeShellEditCpt implements Action {
  readonly type  = DegreeActionTypes.SET_CURRENT_DEGREE_DEGREE_TYPE_FROM_DEGREE_SHELL_EDIT_CPT;
  constructor(public payload: string) {}
}
export class SetCurrentDegreeMinorFromDegreeShellEditCpt implements Action {
    readonly type = DegreeActionTypes.SET_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT;
    constructor(public payload: string) {}
}

export class SetCurrentDegreeInstitutionFromDegreeShellEditCpt implements Action {
    readonly type = DegreeActionTypes.SET_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT;
    constructor(public payload: string) {}
}

export class SetCurrentDegreeCityFromDegreeShellEditCpt implements Action {
    readonly type = DegreeActionTypes.SET_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT;
    constructor(public payload: string) {}
}

export class SetCurrentDegreeStateDegreeShellEditCpt implements Action {
    readonly type = DegreeActionTypes.SET_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT;
    constructor(public payload: string) {}
}


export class SetCurrentDegreeGraduationYrFromDegreeShellEditCpt
  implements Action
{
  readonly type =
    DegreeActionTypes.SET_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT;
  constructor(public payload: Date) {}
}

export class SetCurrentDegreeIsGraduatedFromDegreeShellEditCpt
  implements Action
{
  readonly type =
    DegreeActionTypes.SET_CURRENT_DEGREE_isGRADUATED_FROM_DEGREE_SHELL_EDIT_CPT;
  constructor(public payload: boolean) {}
}





// CLEAR FROM EFFECTS SAVE UPDATE DELETE LOAD (6)

export class ClearOriginalDegreeFromDegreeEffectsSave implements Action {
    readonly type = DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_SAVE;

}

export class ClearCurrentDegreeFromDegreeEffectsSave implements Action {
    readonly type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_SAVE;

}

export class ClearOriginalDegreeFromDegreeEffectsUpdate implements Action {
  readonly type = DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_UPDATE;
}

export class ClearCurrentDegreeFromDegreeEffectsUpdate implements Action {
  readonly type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_UPDATE;
}

export class ClearOriginalDegreeFromDegreeEffectsDelete implements Action {
  readonly type = DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_DELETE;
}

export class ClearCurrentDegreeFromDegreeEffectsDelete implements Action {
  readonly type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_DELETE;
}






// CLEAR FROM DEGREE EDIT ShELL (9)

export class ClearCurrentDegreeIdFromDegreeShellEdit implements Action {
    readonly type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT;

}

export class ClearCurrentDegreeProjectCreatorIDFromDegreeShellEdit implements Action {
    readonly type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT;

}

export class ClearCurrentDegreeDegreeNameFromDegreeShellEdit implements Action {
    readonly type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT;

}

export class ClearCurrentDegreeDegreeTypeFromDegreeShellEditCpt
  implements Action
{
  readonly type =
    DegreeActionTypes.CLEAR_CURRENT_DEGREE_DEGREE_TYPE_FROM_DEGREE_SHELL_EDIT_CPT;

}
export class ClearCurrentDegreeMinorDegreeShellEdit implements Action {
    readonly type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT;

}

export class ClearCurrentDegreeInstitutionFromDegreeShellEdit implements Action {
    readonly type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT;

}

export class ClearCurrentDegreeCityFromDegreeShellEdit implements Action {
    readonly type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT;

}

export class ClearCurrentDegreeStateFromDegreeShellEdit implements Action {
    readonly type = DegreeActionTypes.CLEAR_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT;

}

export class ClearCurrentDegreeGraduationYrFromDegreeShellEditCpt
  implements Action
{
  readonly type =
    DegreeActionTypes.CLEAR_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT;
  constructor(public payload: string) {}
}

export class ClearCurrentDegreeIsGraduatedFromDegreeShellEditCpt
  implements Action
{
  readonly type =
    DegreeActionTypes.CLEAR_CURRENT_DEGREE_isGRADUATED_FROM_DEGREE_SHELL_EDIT_CPT;
  constructor(public payload: string) {}
}






// TO DB
// LOAD (3)
export class LoadDegreesByProjectCreatorIDFromDB implements Action {
    readonly type = DegreeActionTypes.LOAD_DEGREES_FROM_DB_on_PAGESHELL;
    constructor(public payload: string) {}
}

export class LoadDegreesByProjectCreatorIDFromDBSuccess implements Action {
    readonly type = DegreeActionTypes.LOAD_DEGREES_FROM_DB_on_PAGESHELL_SUCCESS;
    constructor(public payload: Degree[]) {}
}

export class LoadDegreesByProjectCreatorIDFromDBFail implements Action {
  readonly type =
    DegreeActionTypes.LOAD_DEGREES_FROM_on_PAGESHELL_DB_FAIL;
  constructor(public payload: string) {}
}

// SAVE (3)
export class SaveDegreeToDB implements Action {
  readonly type =
    DegreeActionTypes.SAVE_DEGREE_TO_DB_from_DegreeShellEdit;
}

export class SaveDegreeToDBSuccess implements Action {
  readonly type =
    DegreeActionTypes.SAVE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS;
  constructor(public payload: Degree) {}
}

export class SaveDegreeToDBFail implements Action {
  readonly type =
    DegreeActionTypes.SAVE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL;
  constructor(public payload: string) {}
}

// UPDATE (3)
export class UpdateDegreeToDB implements Action {
  readonly type =
    DegreeActionTypes.UPDATE_DEGREE_TO_DB_from_DegreeShellEdit;
}

export class UpdateDegreeToDBSuccess implements Action {
  readonly type =
    DegreeActionTypes.UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS;
  constructor(public payload: Degree) {}
}

export class UpdateDegreeToDBFail implements Action {
  readonly type =
    DegreeActionTypes.UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL;
  constructor(public payload: string) {}
}

// DELETE (3)
export class DeleteDegreeToDB implements Action {
  readonly type =
    DegreeActionTypes.DELETE_DEGREE_TO_DB_from_DegreeShellEdit;
}

export class DeleteDegreeToDBSuccess implements Action {
  readonly type =
    DegreeActionTypes.DELETE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS;
  constructor(public payload: Degree) {}
}

export class DeleteDegreeToDBFail implements Action {
  readonly type =
    DegreeActionTypes.DELETE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL;
  constructor(public payload: string) {}
}

// RESET (1)

export class ResetCurrentDegreeToOriginal implements Action {
    readonly type = DegreeActionTypes.RESET_CURRENT_DEGREE_FROM_DEGREE_SHELL_EDIT_CPT;
}

// TOTAL  = (37)

export type DegreeActions =
  // FROM VIEW DEGREE COMPONENT (2)
  | SetOriginalDegreeFromViewDegree
  | SetCurrentDegreeFromViewDegree

  // FROM DEGREEEFFECTS (2)
  | SetOriginalDegreeFromDegreeEffects
  | SetCurrentDegreeFromDegreeEffects


  // FROM EDUCATION CPT (1)
  | SetCurrentDegreeFromEducationCPT
  
  // SET FROM DEGREE EDIT SHELL (7)
  | SetCurrentDegreeIdFromDegreeShellEditCpt
  | SetCurrentDegreeProjectCreatorIDFromDegreeShellEditCpt
  | SetCurrentDegreeDegreeNameFromDegreeShellEditCpt
  | SetCurrentDegreeDegreeTypeFromDegreeShellEditCpt
  | SetCurrentDegreeMinorFromDegreeShellEditCpt
  | SetCurrentDegreeInstitutionFromDegreeShellEditCpt
  | SetCurrentDegreeCityFromDegreeShellEditCpt
  | SetCurrentDegreeStateDegreeShellEditCpt
  | SetCurrentDegreeIsGraduatedFromDegreeShellEditCpt
  | SetCurrentDegreeGraduationYrFromDegreeShellEditCpt

  // CLEAR FROM CERT EDIT ShELL (7)
  | ClearCurrentDegreeIdFromDegreeShellEdit
  | ClearCurrentDegreeProjectCreatorIDFromDegreeShellEdit
  | ClearCurrentDegreeDegreeNameFromDegreeShellEdit
  | ClearCurrentDegreeDegreeTypeFromDegreeShellEditCpt
  | ClearCurrentDegreeMinorDegreeShellEdit
  | ClearCurrentDegreeInstitutionFromDegreeShellEdit
  | ClearCurrentDegreeCityFromDegreeShellEdit
  | ClearCurrentDegreeStateFromDegreeShellEdit
  | ClearCurrentDegreeIsGraduatedFromDegreeShellEditCpt
  | ClearCurrentDegreeGraduationYrFromDegreeShellEditCpt
  | ResetCurrentDegreeToOriginal

  // CLEAR FROM EFFECTS SAVE UPDATE DELETE LOAD (6)
  | ClearOriginalDegreeFromDegreeEffectsSave
  | ClearCurrentDegreeFromDegreeEffectsSave
  | ClearOriginalDegreeFromDegreeEffectsUpdate
  | ClearCurrentDegreeFromDegreeEffectsUpdate
  | ClearOriginalDegreeFromDegreeEffectsDelete
  | ClearCurrentDegreeFromDegreeEffectsDelete

  // TO DB
  // LOAD (3)
  | LoadDegreesByProjectCreatorIDFromDB
  | LoadDegreesByProjectCreatorIDFromDBSuccess
  | LoadDegreesByProjectCreatorIDFromDBFail

  // SAVE (3)
  | SaveDegreeToDB
  | SaveDegreeToDBSuccess
  | SaveDegreeToDBFail

  // UPDATE (3)
  | UpdateDegreeToDB
  | UpdateDegreeToDBSuccess
  | UpdateDegreeToDBFail

  // DELETE (3)
  | DeleteDegreeToDB
  | DeleteDegreeToDBSuccess
  | DeleteDegreeToDBFail;
