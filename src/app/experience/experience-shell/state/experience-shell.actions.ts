import { Action } from '@ngrx/store';
import { Experience } from '../../Models/experience';
import { Role } from '../../Models/role';

export enum ExperienceActionTypes {

    LOAD_EXPERIENCES_FROM_DB = '[EXPERIENCE PAGE] LOAD EXPERIENCES FROM DB',
    LOAD_EXPERIENCES_FROM_DB_SUCCESS = '[EXPERIENCE PAGE] LOAD EXPERIENCES FROM DB SUCCESSFULL',
    LOAD_EXPERIENCES_FROM_DB_FAIL = '[EXPERIENCE PAGE] LOAD EXPERIENCES FROM DB FAILED',

    SAVE_EXPERIENCE_TO_DB = '[EXPERIENCE] SAVE EDIT EXPERIENCE TO DB',
    SAVE_EXPERIENCE_TO_DB_SUCCESS = '[EXPERIENCE] SAVE EDIT EXPERIENCE TO DB WAS SUCCESSFULL',
    SAVE_EXPERIENCE_TO_DB_FAIL = '[EXPERIENCE] SAVE EDIT EXPERIENCE TO DB FAILED',

    UPDATE_EXPERIENCE_TO_DB = '[EXPERIENCE] UPDATE EDIT EXPERIENCE TO DB',
    UPDATE_EXPERIENCE_TO_DB_SUCCESS = '[EXPERIENCE] UPDATE EDIT EXPERIENCE TO DB WAS SUCCESSFULL',
    UPDATE_EXPERIENCE_TO_DB_FAIL = '[EXPERIENCE] UPDATE EDIT EXPERIENCE TO DB FAILED',


    DELETE_EXPERIENCE_TO_DB = '[EXPERIENCE] DELETE EDIT EXPERIENCE TO DB',
    DELETE_EXPERIENCE_TO_DB_SUCCESS = '[EXPERIENCE] DELETE EDIT EXPERIENCE TO DB WAS SUCCESSFULL',
    DELETE_EXPERIENCE_TO_DB_FAIL = '[EXPERIENCE] DELETE EDIT EXPERIENCE TO DB FAILED',


    SET_ORIGINALPROJECT = '[EXPERIENCE] SET ORIGINAL EXPERIENCES',
    SET_CURRENT_EXPERIENCE = '[EXPERIENCE] SET CURRENT EXPERIENCES',
    
    SET_CURRENT_EXPERIENCE_ID = '[CURRENT EXPERIENCE] SET EXPERIENCE ID',
    SET_CURRENT_EXPERIENCE_PROJECTCREATOR_ID = '[CURRENT EXPERIENCE] SET EXPERIENCE PROJECT CREATOR ID',
    SET_CURRENT_EXPERIENCE_COMPANY = '[CURRENT EXPERIENCE] SET EXPERIENCE COMPANY',
    SET_CURRENT_EXPERIENCE_TITLE = '[CURRENT EXPERIENCE] SET EXPERIENCE TITLE',
    SET_CURRENT_EXPERIENCE_LOGO_URL = '[CURRENT EXPERIENCE] SET EXPERIENCE LOGO_URL',
    SET_CURRENT_EXPERIENCE_STARTED = '[CURRENT EXPERIENCE] SET EXPERIENCE START DATE',
    SET_CURRENT_EXPERIENCE_COMPLETED = '[CURRENT EXPERIENCE] SET EXPERIENCE COMPLETE DATE',
    SET_CURRENT_EXPERIENCE_CITY = '[CURRENT EXPERIENCE] SET EXPERIENCE CITY',
    SET_CURRENT_EXPERIENCE_STATE = '[CURRENT EXPERIENCE] SET EXPERIENCE STATE',
    SET_CURRENT_EXPERIENCE_ROLES = '[CURRENT EXPERIENCE] SET EXPERIENCE ROLES',


    // CLEAR
    CLEAR_ORIGINALPROJECT = '[EXPERIENCE] LEAR ORIGINAL EXPERIENCES',
    CLEAR_CURRENT_EXPERIENCE = '[EXPERIENCE] CLEAR CURRENT EXPERIENCES',
    
    CLEAR_CURRENT_EXPERIENCE_ID = '[CURRENT EXPERIENCE] CLEAR EXPERIENCE ID',
    CLEAR_CURRENT_EXPERIENCE_PROJECTCREATOR_ID = '[CURRENT EXPERIENCE] CLEAR EXPERIENCE PROJECT CREATOR ID',
    CLEAR_CURRENT_EXPERIENCE_COMPANY = '[CURRENT EXPERIENCE] CLEAR EXPERIENCE COMPANY',
    CLEAR_CURRENT_EXPERIENCE_TITLE = '[CURRENT EXPERIENCE] CLEAR EXPERIENCE TITLE',
    CLEAR_CURRENT_EXPERIENCE_LOGO_URL = '[CURRENT EXPERIENCE] CLEAR  EXPERIENCE LOGO_URL',
    CLEAR_CURRENT_EXPERIENCE_STARTED = '[CURRENT EXPERIENCE] CLEAR EXPERIENCE START DATE',
    CLEAR_CURRENT_EXPERIENCE_COMPLETED = '[CURRENT EXPERIENCE] CLEAR EXPERIENCE COMPLETE DATE',
    CLEAR_CURRENT_EXPERIENCE_CITY = '[CURRENT EXPERIENCE] CLEAR EXPERIENCE CITY',
    CLEAR_CURRENT_EXPERIENCE_STATE = '[CURRENT EXPERIENCE] CLEAR EXPERIENCE STATE',
    CLEAR_CURRENT_EXPERIENCE_ROLES = '[CURRENT EXPERIENCE] CLEAR EXPERIENCE ROLES',
    


    // UPDATE
  
    
    RESET_CURRENT_EXPERIENCE = '[CURRENT EXPERIENCE] RESETS CURRENT EXPERIENCE BACK TO ORIGINAL PROJECT'
}


// SET ACTIONS

export class SetOriginalExperience implements Action {
    readonly type = ExperienceActionTypes.SET_ORIGINALPROJECT;
    constructor(public payload: Experience) { }
}

export class SetCurrentExperience implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE;
    constructor(public payload: Experience) {}
}

export class SetCurrentExperienceId implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE_ID;
    constructor(public payload: string) {}
}

export class SetCurrentExperienceProjectCreatorID implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE_PROJECTCREATOR_ID;
    constructor(public payload: string) {}
}

export class SetCurrentExperienceCompany implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE_COMPANY;
    constructor(public payload: string) { }
}

export class SetCurrentExperienceTitle implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE_TITLE;
    constructor(public payload: string) {}
}

export class SetCurrentExperienceLogoUrl implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE_LOGO_URL;
    constructor(public payload: string) {}
}

export class SetCurrentExperienceStarted implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE_STARTED;
    constructor(public payload: Date) {}
}

export class SetCurrentExperienceCompleted implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE_COMPLETED;
    constructor(public payload: Date) {}
}

export class SetCurrentExperienceCity implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE_CITY;
    constructor(public payload: string) {}
}

export class SetCurrentExperienceState implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE_STATE;
    constructor(public payload: string) {}
}

export class SetCurrentExperienceRoles implements Action {
    readonly type = ExperienceActionTypes.SET_CURRENT_EXPERIENCE_ROLES;
    constructor(public payload: Role[]) {}
}

// SET CLEAR

export class ClearOriginalExperience implements Action {
    readonly type = ExperienceActionTypes.CLEAR_ORIGINALPROJECT;
    
}

export class ClearCurrentExperience implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE;
    
}

export class ClearCurrentExperienceId implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_ID;
    
}

export class ClearCurrentExperienceProjectCreatorID implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_PROJECTCREATOR_ID;
    
}

export class ClearCurrentExperienceCompany implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_COMPANY;
    
}

export class ClearCurrentExperienceTitle implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_TITLE;
    
}

export class ClearCurrentExperienceLogoUrl implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_LOGO_URL;
    
}

export class ClearCurrentExperienceStarted implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_STARTED;
    
}

export class ClearCurrentExperienceCompleted implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_COMPLETED;
    
}

export class ClearCurrentExperienceCity implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_CITY;
    
}

export class ClearCurrentExperienceState implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_STATE;
    
}
export class ClearCurrentExperienceRoles implements Action {
    readonly type = ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_ROLES;
    
}


// TO DB
// LOAD
export class LoadExperiencesByProjectCreatorIDFromDB implements Action {
    readonly type = ExperienceActionTypes.LOAD_EXPERIENCES_FROM_DB;
    constructor(public payload: string) {}
}

export class LoadExperiencesByProjectCreatorIDFromDBSuccess implements Action {
    readonly type = ExperienceActionTypes.LOAD_EXPERIENCES_FROM_DB_SUCCESS;
    constructor(public payload: Experience[]) {}
}

export class LoadExperiencesByProjectCreatorIDFromDBFail implements Action {
    readonly type = ExperienceActionTypes.LOAD_EXPERIENCES_FROM_DB_FAIL;
    constructor(public payload: string) {}
}

// SAVE
export class SaveExperienceToDB implements Action {
    readonly type = ExperienceActionTypes.SAVE_EXPERIENCE_TO_DB;
}

export class SaveExperienceToDBSuccess implements Action {
    readonly type = ExperienceActionTypes.SAVE_EXPERIENCE_TO_DB_SUCCESS;
    constructor(public payload: Experience) {}
}

export class SaveExperienceToDBFail implements Action {
    readonly type = ExperienceActionTypes.SAVE_EXPERIENCE_TO_DB_FAIL;
    constructor(public payload: string) {}
}

// UPDATE
export class UpdateExperienceToDB implements Action {
    readonly type = ExperienceActionTypes.UPDATE_EXPERIENCE_TO_DB;
}

export class UpdateExperienceToDBSuccess implements Action {
    readonly type = ExperienceActionTypes.UPDATE_EXPERIENCE_TO_DB_SUCCESS;
    constructor(public payload: Experience) {}
}

export class UpdateExperienceToDBFail implements Action {
    readonly type = ExperienceActionTypes.UPDATE_EXPERIENCE_TO_DB_FAIL;
    constructor(public payload: string) {}
}

// DELETE
export class DeleteExperienceToDB implements Action {
    readonly type = ExperienceActionTypes.DELETE_EXPERIENCE_TO_DB;
}

export class DeleteExperienceToDBSuccess implements Action {
    readonly type = ExperienceActionTypes.DELETE_EXPERIENCE_TO_DB_SUCCESS;
    constructor(public payload: Experience) {}
}

export class DeleteExperienceToDBFail implements Action {
    readonly type = ExperienceActionTypes.DELETE_EXPERIENCE_TO_DB_FAIL;
    constructor(public payload: string) {}
}

// RESET

export class ResetCurrentExperienceToOriginal implements Action {
    readonly type = ExperienceActionTypes.RESET_CURRENT_EXPERIENCE;
}


export type ExperienceActions = SetOriginalExperience
                            |   SetCurrentExperience
                            |   SetCurrentExperienceId
                            |   SetCurrentExperienceProjectCreatorID
                            |   SetCurrentExperienceCompany
                            |   SetCurrentExperienceTitle
                            |   SetCurrentExperienceLogoUrl
                            |   SetCurrentExperienceStarted
                            |   SetCurrentExperienceCompleted
                            |   SetCurrentExperienceCity
                            |   SetCurrentExperienceState
                            |   SetCurrentExperienceRoles

                            |   ClearOriginalExperience
                            |   ClearCurrentExperience
                            |   ClearCurrentExperienceId
                            |   ClearCurrentExperienceProjectCreatorID
                            |   ClearCurrentExperienceCompany
                            |   ClearCurrentExperienceTitle
                            |   ClearCurrentExperienceLogoUrl
                            |   ClearCurrentExperienceStarted
                            |   ClearCurrentExperienceCompleted
                            |   ClearCurrentExperienceCity
                            |   ClearCurrentExperienceState
                            |   ClearCurrentExperienceRoles

                            |   ResetCurrentExperienceToOriginal

                            // TO DB
                            |   SaveExperienceToDB
                            |   SaveExperienceToDBSuccess
                            |   SaveExperienceToDBFail
                               
                            |   UpdateExperienceToDB
                            |   UpdateExperienceToDBSuccess
                            |   UpdateExperienceToDBFail

                            |   DeleteExperienceToDB
                            |   DeleteExperienceToDBSuccess
                            |   DeleteExperienceToDBFail

                            |   LoadExperiencesByProjectCreatorIDFromDB
                            |   LoadExperiencesByProjectCreatorIDFromDBSuccess
                            |   LoadExperiencesByProjectCreatorIDFromDBFail

                            
                            ;