import { Project,   defaultProject  } from '../../models/project';

import { EditProjectActions, EditProjectActionTypes } from './edit-project.actions';

import { ProjectLink,  defaultProjectLink } from '../../models/projectLink';
import { ProjectRequirement, defaultProjectRequirement } from '../../models/projectRequirement';
import { getEditProjectBigBanner } from '.';


export interface EditProjectState {
    originalProject?: Project | undefined;
    id?: string;
    projectCreatorID?: string;
    projectName?: string;
    started?: Date;
    completed?: Date;
    description?: string;
    banner?: string;
    // smallBanner?: string;
    published?: boolean;
    projectRequirements?: ProjectRequirement[ ];
    projectLinks?: ProjectLink[];
    error?: string;

}

const initialState: EditProjectState = {
  originalProject: defaultProject,
  id: "1234",
  projectCreatorID: "1234",
  projectName: "1234",
  started: new Date(2021, 0o1, 0o1),
  completed: new Date(2021, 0o1, 0o1),
  description: "1234",
  banner: 'https://firebasestorage.googleapis.com/v0/b/portfolio-a7105.appspot.com/o/defaults%2Fsite%2FAsset%203.svg?alt=media&token=489a99e5-166c-454b-8702-fd19b14f3336',

  published: false,
  projectRequirements: [defaultProjectRequirement],
  projectLinks: [defaultProjectLink],
  error: "",
};

export function editProjectReducer(state = initialState, action: EditProjectActions): EditProjectState {
    switch (action.type) {
        // SET ACTIONS
        case EditProjectActionTypes.SET_ORIGINALPROJECT:
            return {
                ...state,
                originalProject: action.payload,
                id: action.payload.id,
                projectCreatorID: action.payload.projectCreatorID,
                projectName: action.payload.projectName,
                started: action.payload.started,
                completed: action.payload.completed,
                description: action.payload.description,
                banner: action.payload.banner,
                // smallBanner: action.payload.smallBanner,
                published: action.payload.published,
                projectRequirements: action.payload.projectRequirements,
                projectLinks: action.payload.projectLinks



            };
        case EditProjectActionTypes.SET_EDITPROJECT:
            return {
                ...state,
                id: action.payload.id,
                projectCreatorID: action.payload.projectCreatorID,
                projectName: action.payload.projectName,
                started: action.payload.started,
                completed: action.payload.completed,
                description: action.payload.description,
                banner: action.payload.banner,
                // smallBanner: action.payload.smallBanner,
                published: action.payload.published,
                projectRequirements: action.payload.projectRequirements,
                projectLinks: action.payload.projectLinks
            };

        case EditProjectActionTypes.SET_EDITPROJECT_ID:
            return {
                ...state,
                id: action.payload
            };
        case EditProjectActionTypes.SET_EDITPROJECT_PROJECTCREATOR_ID:
            return {
                ...state,
                projectCreatorID: action.payload
            };
        case EditProjectActionTypes.SET_EDITPROJECT_PROJECTNAME:
            return {
                ...state,
                projectName: action.payload
            };
        case EditProjectActionTypes.SET_EDITPROJECT_STARTED:
            return {
                ...state,
                started: action.payload
            };
        case EditProjectActionTypes.SET_EDITPROJECT_COMPLETED:
            return {
                ...state,
                completed: action.payload
            };
        case EditProjectActionTypes.SET_EDITPROJECT_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            };
        case EditProjectActionTypes.SET_EDITPROJECT_BANNER:
            return {
                ...state,
                banner: action.payload
            };
        // case EditProjectActionTypes.SET_EDITPROJECT_SMALL_BANNER:
        //     return {
        //         ...state,
        //         smallBanner: action.payload
        //     };
        case EditProjectActionTypes.SET_EDITPROJECT_PUBLISHED:
            return {
                ...state,
                published: action.payload
            };
        case EditProjectActionTypes.SET_EDITPROJECT_PROJECT_REQUIREMENTS:
            return {
                ...state,
                projectRequirements: action.payload
            };
        case EditProjectActionTypes.SET_EDITPROJECT_PROJECT_LINKS:
            return {
                ...state,
                projectLinks: action.payload
            };




        // UPDATE ACTIONS
        case EditProjectActionTypes.UPDATE_EDITPROJECT_ID:
            return {
                ...state,
                id: action.payload
            };
        case EditProjectActionTypes.UPDATE_EDITPROJECT_PROJECTCREATOR_ID:
            return {
                ...state,
                projectCreatorID: action.payload
            };
        case EditProjectActionTypes.UPDATE_EDITPROJECT_STARTED:
            return {
                ...state,
                started: action.payload
            };
        case EditProjectActionTypes.UPDATE_EDITPROJECT_COMPLETED:
            return {
                ...state,
                completed: action.payload
            };
        case EditProjectActionTypes.UPDATE_EDITPROJECT_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            };
        case EditProjectActionTypes.UPDATE_EDITPROJECT_BANNER:
            return {
                ...state,
                banner: action.payload
            };

        case EditProjectActionTypes.UPDATE_EDITPROJECT_PUBLISHED:
            return {
                ...state,
                published: action.payload
            };
        case EditProjectActionTypes.UPDATE_EDITPROJECT_PROJECT_REQUIREMENTS_SUCCESS:
        case EditProjectActionTypes.LOAD_PROJECT_REQS_FROM_DB_SUCCESS:
        case EditProjectActionTypes.SAVE_EDITPROJECT_PROJECT_REQUIREMENTS_SUCCESS:
        case EditProjectActionTypes.DELETE_EDITPROJECT_PROJECT_REQUIREMENTS_SUCCESS:
            return {
                ...state,
                projectRequirements: action.payload as ProjectRequirement []
            };

        case EditProjectActionTypes.UPDATE_EDITPROJECT_PROJECT_REQUIREMENTS_FAIL:
        case EditProjectActionTypes.SAVE_EDITPROJECT_PROJECT_REQUIREMENTS_FAIL:
        case EditProjectActionTypes.LOAD_PROJECT_REQS_FROM_DB_FAIL:
        case EditProjectActionTypes.DELETE_EDITPROJECT_PROJECT_REQUIREMENTS_FAIL:
        case EditProjectActionTypes.UPDATE_EDITPROJECT_PROJECT_LinkS_FAIL:
        case EditProjectActionTypes.SAVE_EDITPROJECT_PROJECT_LinkS_FAIL:
        case EditProjectActionTypes.DELETE_EDITPROJECT_PROJECT_LinkS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case EditProjectActionTypes.UPDATE_EDITPROJECT_PROJECT_Links_SUCCESS:
        case EditProjectActionTypes.SAVE_EDITPROJECT_PROJECT_Links_SUCCESS:
        case EditProjectActionTypes.DELETE_EDITPROJECT_PROJECT_Links_SUCCESS:
            return {
                ...state,
                projectLinks: action.payload
            };




        // CLEAR ACTIONS
        case EditProjectActionTypes.CLEAR_EDITPROJECT_ID:
            return {
                ...state,
                id: ''
            };
        case EditProjectActionTypes.CLEAR_EDITPROJECT_PROJECTCREATOR_ID:
            return {
                ...state,
                projectCreatorID: initialState.projectCreatorID
            };
        case EditProjectActionTypes.CLEAR_EDITPROJECT_PROJECTNAME:
            return {
                ...state,
                projectName: initialState.projectName
            };
        case EditProjectActionTypes.CLEAR_EDITPROJECT_STARTED:
            return {
                ...state,
                started: initialState.started
            };
        case EditProjectActionTypes.CLEAR_EDITPROJECT_COMPLETED:
            return {
                ...state,
                completed: initialState.completed
            };
        case EditProjectActionTypes.CLEAR_EDITPROJECT_DESCRIPTION:
            return {
                ...state,
                description: initialState.description
            };
        case EditProjectActionTypes.CLEAR_EDITPROJECT_BANNER:
            return {
                ...state,
                banner: initialState.banner
            };
        // case EditProjectActionTypes.CLEAR_EDITPROJECT_SMALL_BANNER:
        //     return {
        //         ...state,
        //         smallBanner: initialState.smallBanner
        //     };
        case EditProjectActionTypes.CLEAR_EDITPROJECT_PUBLISHED:
            return {
                ...state,
                published: initialState.published
            };
        case EditProjectActionTypes.CLEAR_EDITPROJECT_PROJECT_REQUIREMENTS:
            return {
                ...state,
                projectRequirements: initialState.projectRequirements
            };
        case EditProjectActionTypes.CLEAR_EDITPROJECT_PROJECT_LINKS:
            return {
                ...state,
                projectLinks: initialState.projectLinks
            };


        case EditProjectActionTypes.RESET_EDIT_PROJECT:
            return {
                ...state,
                id: state.originalProject?.id,
                projectCreatorID: state.originalProject?.projectCreatorID,
                started: state.originalProject?.started,
                completed: state.originalProject?.completed,
                description: state.originalProject?.description,
                banner: state.originalProject?.banner,
                // smallBanner: state.originalProject?.smallBanner,
                published: state.originalProject?.published,
                projectRequirements: state.originalProject?.projectRequirements,
                projectLinks: state.originalProject?.projectLinks
            };

        case EditProjectActionTypes.LOAD_PROJECTS_FROM_DB_SUCCESS:
            return {
                ...state,
                // It adds the Projects through a second action to the Projects State to the NGRX entity
            };

        case EditProjectActionTypes.LOAD_PROJECTS_FROM_DB_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case EditProjectActionTypes.SAVE_EDITPROJECT_TO_DB_SUCCESS:
            return {
                ...state,
                originalProject: action.payload,
                id: action.payload.id,
                projectCreatorID: action.payload.projectCreatorID,
                projectName: action.payload.projectName,
                started: action.payload.started,
                completed: action.payload.completed,
                description: action.payload.description,
                banner: action.payload.banner,
                // smallBanner: action.payload.smallBanner,
                published: action.payload.published,
                projectRequirements: action.payload.projectRequirements,
                projectLinks: action.payload.projectLinks
            };
        case EditProjectActionTypes.SAVE_EDITPROJECT_TO_DB_FAIL:
            return {
                    ...state,
                    error: action.payload
            };
        case EditProjectActionTypes.UPDATE_EDITPROJECT_TO_DB_SUCCESS:
            return {

                ...state,
                originalProject: action.payload,
                id: action.payload.id,
                projectCreatorID: action.payload.projectCreatorID,
                projectName: action.payload.projectName,
                started: action.payload.started,
                completed: action.payload.completed,
                description: action.payload.description,
                banner: action.payload.banner,
                // smallBanner: action.payload.smallBanner,
                published: action.payload.published,
                projectRequirements: action.payload.projectRequirements,
                projectLinks: action.payload.projectLinks
            };

        case EditProjectActionTypes.UPDATE_EDITPROJECT_TO_DB_FAIL:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

