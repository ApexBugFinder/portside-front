import { Action } from '@ngrx/store';
import { Project, ProjectLink, ProjectRequirement } from '../../project';
import { EditShellComponent } from '../edit-shell.component';

export enum EditProjectActionTypes {
    SET_ORIGINALPROJECT = '[EDIT PROJECT] SET ORIGINAL PROJECT',
    SET_EDITPROJECT = '[EDIT PROJECT] SET EDIT PROJECT',
    SET_EDITPROJECT_ID = '[EDIT PROJECT] SET EDIT PROJECT ID',
    SET_EDITPROJECT_PROJECTCREATOR_ID = '[EDIT PROJECT] SET EDIT PROJECT PROJECT CREATOR ID',
    SET_EDITPROJECT_PROJECTNAME = '[EDIT PROJECT] SET EDIT PROJECT PROJECT_NAME',
    SET_EDITPROJECT_STARTED = '[EDIT PROJECT] SET EDIT PROJECT START DATE',
    SET_EDITPROJECT_COMPLETED = '[EDIT PROJECT] SET EDIT PROJECT COMPLETE DATE',
    SET_EDITPROJECT_DESCRIPTION = '[EDIT PROJECT] SET EDIT PROJECT DESCRIPTION',
    SET_EDITPROJECT_BANNER = '[EDIT PROJECT] SET EDIT PROJECT BIG BANNER',
    SET_EDITPROJECT_SMALL_BANNER = '[EDIT PROJECT] SET EDIT PROJECT SMALL BANNER',
    SET_EDITPROJECT_PUBLISHED= '[EDIT PROJECT] SET EDIT PROJECT IS_PUBLISHED',
    SET_EDITPROJECT_PROJECT_REQUIREMENTS = '[EDIT PROJECT] SET EDIT PROJECT PROJECT REQUIREMENTS',
    SET_EDITPROJECT_PROJECT_LINKS = '[EDIT PROJECT] SET EDIT PROJECT PROJECT LINKS',
    
    

    CLEAR_ORIGINALPROJECT = '[EDIT PROJECT] CLEAR ORIGINAL PROJECT',
    CLEAR_EDITPROJECT = '[EDIT PROJECT] CLEAR EDIT PROJECT',
    CLEAR_EDITPROJECT_ID = '[EDIT PROJECT] CLEAR EDIT PROJECT ID',
    CLEAR_EDITPROJECT_PROJECTCREATOR_ID = '[EDIT PROJECT] CLEAR EDIT PROJECT PROJECT CREATOR ID',
    CLEAR_EDITPROJECT_PROJECTNAME = '[EDIT PROJECT] CLEAR EDIT PROJECT PROJECT_NAME',
    CLEAR_EDITPROJECT_STARTED = '[EDIT PROJECT] CLEAR EDIT PROJECT START DATE',
    CLEAR_EDITPROJECT_COMPLETED = '[EDIT PROJECT] CLEAR EDIT PROJECT COMPLETE DATE',
    CLEAR_EDITPROJECT_DESCRIPTION = '[EDIT PROJECT] CLEAR EDIT PROJECT DESCRIPTION',
    CLEAR_EDITPROJECT_BANNER = '[EDIT PROJECT] CLEAR EDIT PROJECT BIG BANNER',
    CLEAR_EDITPROJECT_SMALL_BANNER = '[EDIT PROJECT] CLEAR EDIT PROJECT SMALL BANNER',
    CLEAR_EDITPROJECT_PUBLISHED= '[EDIT PROJECT] CLEAR EDIT PROJECT IS_PUBLISHED',
    CLEAR_EDITPROJECT_PROJECT_REQUIREMENTS = '[EDIT PROJECT] CLEAR EDIT PROJECT PROJECT REQUIREMENTS',
    CLEAR_EDITPROJECT_PROJECT_LINKS = '[EDIT PROJECT] CLEAR EDIT PROJECT PROJECT LINKS',


    UPDATE_EDITPROJECT = '[EDIT PROJECT] UPDATE EDIT PROJECT',
    UPDATE_EDITPROJECT_ID = '[EDIT PROJECT] UPDATE EDIT PROJECT ID',
    UPDATE_EDITPROJECT_PROJECTCREATOR_ID = '[EDIT PROJECT] UPDATE EDIT PROJECT PROJECT CREATOR ID',
    
    UPDATE_EDITPROJECT_STARTED = '[EDIT PROJECT] UPDATE EDIT PROJECT START DATE',
    UPDATE_EDITPROJECT_COMPLETED = '[EDIT PROJECT] UPDATE EDIT PROJECT COMPLETE DATE',
    UPDATE_EDITPROJECT_DESCRIPTION = '[EDIT PROJECT] UPDATE EDIT PROJECT DESCRIPTION',
    UPDATE_EDITPROJECT_BANNER = '[EDIT PROJECT] UPDATE EDIT PROJECT BIG BANNER',
    UPDATE_EDITPROJECT_SMALL_BANNER = '[EDIT PROJECT] UPDATE EDIT PROJECT SMALL BANNER',
    UPDATE_EDITPROJECT_PUBLISHED= '[EDIT PROJECT] UPDATE EDIT PROJECT IS_PUBLISHED',
    UPDATE_EDITPROJECT_PROJECT_REQUIREMENTS = '[EDIT PROJECT] UPDATE EDIT PROJECT PROJECT REQUIREMENTS',
    UPDATE_EDITPROJECT_PROJECT_LINKS = '[EDIT PROJECT] UPDATE EDIT PROJECT PROJECT LINKS',
    
    RESET_EDIT_PROJECT = '[EDIT PROJECT] RESETS EDIT PROJECT BACK TO ORIGINAL PROJECT'
   


}

// SET ACTIONS
export class SetOriginalProject implements Action {
    readonly type = EditProjectActionTypes.SET_ORIGINALPROJECT;
    constructor(public payload: Project) {}
}
export class SetEditProject implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT;
    constructor(public payload: Project) {}
}
export class SetEditProjectId implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_ID;
    constructor(public payload: string) {}
}
export class SetEditProjectProjectCreatorID implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_PROJECTCREATOR_ID;
    constructor(public payload: string) {}
}
export class SetEditProjectProjectName implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_PROJECTNAME;
    constructor(public payload: string) {}
}
export class SetEditProjectStartDate implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_STARTED;
    constructor(public payload: Date) {}
}
export class SetEditProjectCompleteDate implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_COMPLETED;
    constructor(public payload: Date) {}
}
export class SetEditProjectDescription implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_DESCRIPTION;
    constructor(public payload: string) {}
}
export class SetEditProjectBigBanner implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_BANNER;
    constructor(public payload: string) {}
}
export class SetEditProjectSmallBanner implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_SMALL_BANNER;
    constructor(public payload: string) {}
}
export class SetEditProjectIsPublished implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_PUBLISHED;
    constructor(public payload: boolean) {}
}
export class SetEditProjectProjectRequirements implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_PROJECT_REQUIREMENTS;
    constructor(public payload: ProjectRequirement[]) {}
}

export class SetEditProjectProjectLinks implements Action {
    readonly type = EditProjectActionTypes.SET_EDITPROJECT_PROJECT_LINKS;
    constructor(public payload: ProjectLink[]) {}
}

// CLEAR ACTIONS
export class ClearOriginalProject implements Action {
    readonly type = EditProjectActionTypes.CLEAR_ORIGINALPROJECT;
    
}
export class ClearEditProjectId implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_ID;
    
}
export class ClearEditProjectProjectCreatorID implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_PROJECTCREATOR_ID;
    
}
export class ClearEditProjectProjectName implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_PROJECTNAME;

}
export class ClearEditProjectStartDate implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_STARTED;
    
}
export class ClearEditProjectCompleteDate implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_COMPLETED;
    
}
export class ClearEditProjectDescription implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_DESCRIPTION;
  
}
export class ClearEditProjectBigBanner implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_BANNER;
   
}
export class ClearEditProjectSmallBanner implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_SMALL_BANNER;
   
}
export class ClearEditProjectIsPublished implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_PUBLISHED;
   
}
export class ClearEditProjectProjectRequirements implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_PROJECT_REQUIREMENTS;
    
}
export class ClearEditProjectProjectLinks implements Action {
    readonly type = EditProjectActionTypes.CLEAR_EDITPROJECT_PROJECT_LINKS;
   
}



// UPDATE ACTIONS

export class UpdateEditProjectId implements Action {
    readonly type = EditProjectActionTypes.UPDATE_EDITPROJECT_ID;
    constructor(public payload: string) {}
}
export class UpdateEditProjectProjectCreatorID implements Action {
    readonly type = EditProjectActionTypes.UPDATE_EDITPROJECT_PROJECTCREATOR_ID;
    constructor(public payload: string) {}
}
export class UpdateEditProjectStartDate implements Action {
    readonly type = EditProjectActionTypes.UPDATE_EDITPROJECT_STARTED;
    constructor(public payload: Date) {}
}
export class UpdateEditProjectCompleteDate implements Action {
    readonly type = EditProjectActionTypes.UPDATE_EDITPROJECT_COMPLETED;
    constructor(public payload: Date) {}
}
export class UpdateEditProjectDescription implements Action {
    readonly type = EditProjectActionTypes.UPDATE_EDITPROJECT_DESCRIPTION;
    constructor(public payload: string) {}
}
export class UpdateEditProjectBigBanner implements Action {
    readonly type = EditProjectActionTypes.UPDATE_EDITPROJECT_BANNER;
    constructor(public payload: string) {}
}
export class UpdateEditProjectSmallBanner implements Action {
    readonly type = EditProjectActionTypes.UPDATE_EDITPROJECT_SMALL_BANNER;
    constructor(public payload: string) {}
}
export class UpdateEditProjectIsPublished implements Action {
    readonly type = EditProjectActionTypes.UPDATE_EDITPROJECT_PUBLISHED;
    constructor(public payload: boolean) {}
}
export class UpdateEditProjectProjectRequirements implements Action {
    readonly type = EditProjectActionTypes.UPDATE_EDITPROJECT_PROJECT_REQUIREMENTS;
    constructor(public payload: ProjectRequirement[]) {}
}

export class UpdateEditProjectProjectLinks implements Action {
    readonly type = EditProjectActionTypes.UPDATE_EDITPROJECT_PROJECT_LINKS;
    constructor(public payload: ProjectLink[]) {}
}

export class ResetEditProject implements Action {
    readonly type = EditProjectActionTypes.RESET_EDIT_PROJECT;

}
export type EditProjectActions = SetOriginalProject
                            // SET EDIT_PROJECT
                            |   SetEditProject
                            |   SetEditProjectId
                            |   SetEditProjectProjectCreatorID
                            |   SetEditProjectProjectName
                            |   SetEditProjectStartDate
                            |   SetEditProjectCompleteDate
                            |   SetEditProjectDescription
                            |   SetEditProjectBigBanner
                            |   SetEditProjectSmallBanner
                            |   SetEditProjectIsPublished
                            |   SetEditProjectProjectRequirements
                            |   SetEditProjectProjectLinks
                            // CLEAR EDIT_PROJECT
                            |   ClearEditProjectId
                            |   ClearEditProjectProjectCreatorID
                            |   ClearEditProjectProjectName
                            |   ClearEditProjectStartDate
                            |   ClearEditProjectCompleteDate
                            |   ClearEditProjectDescription
                            |   ClearEditProjectBigBanner
                            |   ClearEditProjectSmallBanner
                            |   ClearEditProjectIsPublished
                            |   ClearEditProjectProjectRequirements
                            |   ClearEditProjectProjectLinks
                             
                            // UPDATE EDIT_PROJECT
                            |   UpdateEditProjectId
                            |   UpdateEditProjectProjectCreatorID
                            |   UpdateEditProjectStartDate
                            |   UpdateEditProjectCompleteDate
                            |   UpdateEditProjectDescription
                            |   UpdateEditProjectBigBanner
                            |   UpdateEditProjectSmallBanner
                            |   UpdateEditProjectIsPublished
                            |   UpdateEditProjectProjectRequirements
                            |   UpdateEditProjectProjectLinks

                            |   ResetEditProject
                            ;