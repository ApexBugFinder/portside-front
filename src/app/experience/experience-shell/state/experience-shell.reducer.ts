import { ConvertActionBindingResult } from "@angular/compiler/src/compiler_util/expression_converter";
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from "@angular/platform-browser-dynamic";
import { Constants } from "src/app/helpers/Constants";
import { Experience, defaultExperience } from "../../Models/experience";
import { defaultRole, Role } from "../../Models/role";
import { ExperienceActions, ExperienceActionTypes } from './experience-shell.actions';

export interface ExperienceShellState {
    originalExperience: Experience | undefined;
    id: string;
    projectCreatorID: string;
    company: string;
    title: string;
    logoUrl: string;
    started: Date;
    completed: Date;
    city?: string;
    state?: string;
    roles?: Role[];
    error?: string;

}

const initialState: ExperienceShellState = {
    originalExperience: defaultExperience,
    id: '',
    projectCreatorID: Constants.userID,
    company: '',
    title: '',
    logoUrl: '',
    started: new Date(2021, 0o1, 0o1),
    completed: new Date(2021, 0o1, 0o1),
    city: '',
    state: '',
    roles: [defaultRole],
    error: ''

}

export function experienceReducer(state = initialState, action: ExperienceActions): ExperienceShellState {
    switch(action.type) {
        case ExperienceActionTypes.SET_ORIGINALPROJECT:
            return {
                ...state,
                originalExperience: action.payload,
                id: action.payload.id,
                projectCreatorID: action.payload.projectCreatorID,
                company: action.payload.company as string,
                title: action.payload.title as string,
                logoUrl: action.payload.logoUrl as string,
                started: action.payload.started as Date,
                completed: action.payload.completed as Date,
                city: action.payload.city,
                state: action.payload.state,
                roles: action.payload.roles,
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE:
            return {
                ...state,
                id: action.payload.id,
                projectCreatorID: action.payload.projectCreatorID,
                company: action.payload.company as string,
                title: action.payload.title as string,
                logoUrl: action.payload.logoUrl as string,
                started: action.payload.started as Date,
                completed: action.payload.completed as Date,
                city: action.payload.city,
                state: action.payload.state,
                roles: action.payload.roles,
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE_ID:
            return {
                ...state,
                id: action.payload
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE_PROJECTCREATOR_ID:
            return {
                ...state,
                projectCreatorID: action.payload
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE_COMPANY:
            return {
                ...state,
                company: action.payload
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE_LOGO_URL:
            return {
                ...state,
                logoUrl: action.payload
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE_STARTED:
            return {
                ...state,
                started: action.payload
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE_COMPLETED:
            return {
                ...state,
                completed: action.payload
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE_CITY:
            return {
                ...state,
                city: action.payload
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE_STATE:
            return {
                ...state,
                state: action.payload
            };
        case ExperienceActionTypes.SET_CURRENT_EXPERIENCE_ROLES:
            return {
                ...state,
                roles: action.payload
            };


        // CLEAR
        case ExperienceActionTypes.CLEAR_ORIGINALPROJECT:
            return {
                ...state,
                originalExperience: initialState.originalExperience,
                id: initialState.id,
                projectCreatorID: initialState.projectCreatorID,
                company: initialState.company,
                title: initialState.title,
                logoUrl: initialState.logoUrl,
                started: initialState.started,
                completed: initialState.completed,
                city: initialState.city,
                state: initialState.state,
                roles: initialState.roles,
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE:
            return {
                ...state,
                id: initialState.id,
                projectCreatorID: initialState.projectCreatorID,
                company: initialState.company,
                title: initialState.title,
                logoUrl: initialState.logoUrl,
                started: initialState.started,
                completed: initialState.completed,
                city: initialState.city,
                state: initialState.state,
                roles: initialState.roles,
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_ID:
            return {
                ...state,
                id: initialState.id
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_PROJECTCREATOR_ID:
            return {
                ...state,
                projectCreatorID: initialState.projectCreatorID
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_COMPANY:
            return {
                ...state,
                company: initialState.company
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_TITLE:
            return {
                ...state,
                title: initialState.title
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_LOGO_URL:
            return {
                ...state,
                logoUrl: initialState.logoUrl
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_STARTED:
            return {
                ...state,
                started: initialState.started
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_COMPLETED:
            return {
                ...state,
                completed: initialState.completed
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_CITY:
            return {
                ...state,
                city: initialState.city
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_STATE:
            return {
                ...state,
                state: initialState.state
            };
        case ExperienceActionTypes.CLEAR_CURRENT_EXPERIENCE_ROLES:
            return {
                ...state,
                roles: initialState.roles
            };

        case ExperienceActionTypes.RESET_CURRENT_EXPERIENCE:
            return {
                ...state,
               
                id : state.originalExperience?.id as string,
                projectCreatorID: state.originalExperience?.projectCreatorID as string,
                company: state.originalExperience?.company as string,
                title: state.originalExperience?.title as string,
                logoUrl: state.originalExperience?.logoUrl as string,
                started: state.originalExperience?.started as Date,
                completed: state.originalExperience?.completed as Date,
                city: state.originalExperience?.city,
                state: state.originalExperience?.state,
                roles: state.originalExperience?.roles,
            }


        // TO DB
        // LOAD
        case ExperienceActionTypes.LOAD_EXPERIENCES_FROM_DB_SUCCESS:
            if(action.payload.length>0) {
                return {
                ...state,
                originalExperience: action.payload[0],
                id: action.payload[0].id,
                projectCreatorID: action.payload[0].projectCreatorID,
                company: action.payload[0].company as string,
                title: action.payload[0].title as string,
                logoUrl: action.payload[0].logoUrl as string,
                started: action.payload[0].started as Date,
                completed: action.payload[0].completed as Date,
                city: action.payload[0].city,
                state: action.payload[0].state,
                roles: action.payload[0].roles,
            };
            } else {
                return {
                    ...state
                };
            }
            
        // LOADING ACTION WiLL BE PUSHED TO ENTITy DATA
        case ExperienceActionTypes.LOAD_EXPERIENCES_FROM_DB_FAIL:
            return {
                ...state,
                error: action.payload
            };
        // CREATE
        case ExperienceActionTypes.SAVE_EXPERIENCE_TO_DB_SUCCESS:
            return {
                ...state,
                originalExperience: action.payload,
                id: action.payload.id,
                projectCreatorID: action.payload.projectCreatorID,
                company: action.payload.company as string,
                title: action.payload.title as string,
                logoUrl: action.payload.logoUrl as string,
                started: action.payload.started as Date,
                completed: action.payload.completed as Date,
                city: action.payload.city,
                state: action.payload.state,
                roles: action.payload.roles,
            };
        case ExperienceActionTypes.SAVE_EXPERIENCE_TO_DB_FAIL:
            return {
                ...state,
                error: action.payload
            };
        
        // UPDATE
        case ExperienceActionTypes.UPDATE_EXPERIENCE_TO_DB_SUCCESS:
            return {
                ...state,
                originalExperience: action.payload,
                id: action.payload.id,
                projectCreatorID: action.payload.projectCreatorID,
                company: action.payload.company as string,
                title: action.payload.title as string,
                logoUrl: action.payload.logoUrl as string,
                started: action.payload.started as Date,
                completed: action.payload.completed as Date,
                city: action.payload.city,
                state: action.payload.state,
                roles: action.payload.roles,
            };
        case ExperienceActionTypes.UPDATE_EXPERIENCE_TO_DB_FAIL:
            return {
                ...state,
                error: action.payload
            };
        // DELETE
        case ExperienceActionTypes.DELETE_EXPERIENCE_TO_DB_SUCCESS:
            return {
                ...state,
                originalExperience: action.payload,
                id: action.payload.id,
                projectCreatorID: action.payload.projectCreatorID,
                company: action.payload.company  as string,
                title: action.payload.title as string,
                logoUrl: action.payload.logoUrl as string,
                started: action.payload.started,
                completed: action.payload.completed as Date,
                city: action.payload.city,
                state: action.payload.state,
                roles: action.payload.roles,
            };
        case ExperienceActionTypes.DELETE_EXPERIENCE_TO_DB_FAIL:
            return {
                ...state,
                error: action.payload
            };


        default:
            return state;
        }

} 