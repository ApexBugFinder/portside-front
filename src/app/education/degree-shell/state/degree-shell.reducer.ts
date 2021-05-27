import { Constants } from "src/app/helpers/Constants";
import { Degree, defaultDegree } from "../../Models/degree/degree";
import * as fromDegreeShell from './degree-shell.reducer';
import * as fromDegreeRoot from '../../state';

import { DegreeActionTypes, DegreeActions  } from './degree-shell.actions';

export interface DegreeShellState {
  originalDegree: Degree | undefined;
  id: string;
  projectCreatorID: string;
  degreeName: string;
  degreeType?: string;
  minor?: string;
  institution?: string;
  city?: string;
  state?: string;
  graduationYear?: Date;
  isGraduated?: boolean;
  error: string;
}

const initialState: DegreeShellState = {
  originalDegree: defaultDegree,
  id: '',
  projectCreatorID: '',
degreeName: '',
degreeType: '',
error: ''
};

export function degreeReducer(state = initialState, action: DegreeActions): DegreeShellState {
    switch (action.type) {
      case DegreeActionTypes.SET_ORIGINAL_DEGREE_from_DEGREE_EFFECTS:
        return {
          ...state,
          originalDegree: action.payload,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          degreeName: action.payload.degreeName,
          degreeType: action.payload.degreeType,
          minor: action.payload.minor,
          institution: action.payload.institution,
          city: action.payload.city,
          state: action.payload.state,
          graduationYear: action.payload.graduationYear,
          isGraduated: action.payload.isGraduated,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_from_DEGREE_EFFECTS:
        return {
          ...state,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          degreeName: action.payload.degreeName,
          degreeType: action.payload.degreeType,
          minor: action.payload.minor,
          institution: action.payload.institution,
          city: action.payload.city,
          state: action.payload.state,
          graduationYear: action.payload.graduationYear,
          isGraduated: action.payload.isGraduated,
        };
      case DegreeActionTypes.SET_ORIGINAL_DEGREE_from_VIEWDEGREE_COMPONENT:
        return {
          ...state,
          originalDegree: action.payload,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          degreeName: action.payload.degreeName,
          degreeType: action.payload.degreeType,
          minor: action.payload.minor,
          institution: action.payload.institution,
          city: action.payload.city,
          state: action.payload.state,
          graduationYear: action.payload.graduationYear,
          isGraduated: action.payload.isGraduated,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_from_VIEWDEGREE_COMPONENT:
        return {
          ...state,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          degreeName: action.payload.degreeName,
          degreeType: action.payload.degreeType,
          minor: action.payload.minor,
          institution: action.payload.institution,
          city: action.payload.city,
          state: action.payload.state,
          graduationYear: action.payload.graduationYear,
          isGraduated: action.payload.isGraduated,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          id: action.payload,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          projectCreatorID: action.payload,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          degreeName: action.payload,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          minor: action.payload,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          institution: action.payload,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          city: action.payload,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          state: action.payload,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_GRADUATION_YR_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          graduationYear: action.payload,
        };
      case DegreeActionTypes.SET_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          state: action.payload,
        };

      // CLEAR
      case DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_SAVE:
        return {
          ...state,
          originalDegree: initialState.originalDegree,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          degreeName: initialState.degreeName,
          minor: initialState.minor,
          institution: initialState.institution,
          city: initialState.city,
          state: initialState.state,
        };
      case DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_UPDATE:
        return {
          ...state,
          originalDegree: initialState.originalDegree,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          degreeName: initialState.degreeName,
          minor: initialState.minor,
          institution: initialState.institution,
          city: initialState.city,
          state: initialState.state,
        };
      case DegreeActionTypes.CLEAR_ORIGINAL_DEGREE_FROM_DEGREE_EFFECTS_DELETE:
        return {
          ...state,
          originalDegree: initialState.originalDegree,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          degreeName: initialState.degreeName,
          minor: initialState.minor,
          institution: initialState.institution,
          city: initialState.city,
          state: initialState.state,
        };
      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_SAVE:
        return {
          ...state,
          originalDegree: initialState.originalDegree,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          degreeName: initialState.degreeName,
          minor: initialState.minor,
          institution: initialState.institution,
          city: initialState.city,
          state: initialState.state,
        };
      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_UPDATE:
        return {
          ...state,
          originalDegree: initialState.originalDegree,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          degreeName: initialState.degreeName,
          minor: initialState.minor,
          institution: initialState.institution,
          city: initialState.city,
          state: initialState.state,
        };
      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_FROM_DEGREE_EFFECTS_DELETE:
        return {
          ...state,
          originalDegree: initialState.originalDegree,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          degreeName: initialState.degreeName,
          minor: initialState.minor,
          institution: initialState.institution,
          city: initialState.city,
          state: initialState.state,
        };

      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_ID_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          id: initialState.id,
        };
      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_PROJECTCREATOR_ID_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          projectCreatorID: initialState.projectCreatorID,
        };
      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_DEGREE_NAME_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          degreeName: initialState.degreeName,
        };
      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_MINOR_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          minor: initialState.minor,
        };
      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_INSTITUTION_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          institution: initialState.institution,
        };
      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_CITY_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          city: initialState.city,
        };
      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          state: initialState.state,
        };

      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_isGRADUATED_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          isGraduated: initialState.isGraduated,
        };
      case DegreeActionTypes.CLEAR_CURRENT_DEGREE_STATE_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,
          graduationYear: initialState.graduationYear,
        };

      case DegreeActionTypes.RESET_CURRENT_DEGREE_FROM_DEGREE_SHELL_EDIT_CPT:
        return {
          ...state,

          id: state.originalDegree?.id as string,
          projectCreatorID: state.originalDegree?.projectCreatorID as string,
          degreeName: state.originalDegree?.degreeName as string,
          minor: state.originalDegree?.minor,
          institution: state.originalDegree?.institution,
          city: state.originalDegree?.city,
          state: state.originalDegree?.state,
          graduationYear: state.originalDegree?.graduationYear,
          isGraduated: state.originalDegree?.isGraduated
        };

      // TO DB
      // LOAD
      case DegreeActionTypes.LOAD_DEGREES_FROM_DB_on_PAGESHELL_SUCCESS:
        if (action.payload.length > 0) {
          return {
            ...state,
            originalDegree: action.payload[0],
            id: action.payload[0].id,
            projectCreatorID: action.payload[0].projectCreatorID,
            degreeName: action.payload[0].degreeName as string,
            degreeType: action.payload[0].degreeType,
            minor: action.payload[0].minor,
            institution: action.payload[0].institution,
            city: action.payload[0].city,
            state: action.payload[0].state,
            graduationYear: action.payload[0].graduationYear,
            isGraduated: action.payload[0].isGraduated,
          };
        } else {
          return {
            ...state,
          };
        }

      // LOADING ACTION WiLL BE PUSHED TO ENTITy DATA
      case DegreeActionTypes.LOAD_DEGREES_FROM_on_PAGESHELL_DB_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      // CREATE
      case DegreeActionTypes.SAVE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS:
        return {
          ...state,
          originalDegree: action.payload,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          degreeName: action.payload.degreeName as string,
          degreeType: action.payload.degreeType,
          minor: action.payload.minor,
          institution: action.payload.institution as string,
          city: action.payload.city,
          state: action.payload.state,
          graduationYear: action.payload.graduationYear,
          isGraduated: action.payload.isGraduated
        };
      case DegreeActionTypes.SAVE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      // UPDATE
      case DegreeActionTypes.UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS:
        return {
          ...state,
          originalDegree: action.payload,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          degreeName: action.payload.degreeName as string,
          degreeType: action.payload.degreeType,
          minor: action.payload.minor,
          institution: action.payload.institution as string,
          city: action.payload.city,
          state: action.payload.state,
          graduationYear: action.payload.graduationYear,
          isGraduated: action.payload.isGraduated,
        };
      case DegreeActionTypes.UPDATE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      // DELETE
      case DegreeActionTypes.DELETE_DEGREE_TO_DB_from_DegreeShellEdit_SUCCESS:
        return {
          ...state,
          originalDegree: action.payload,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          degreeName: action.payload.degreeName as string,
          degreeType: action.payload.degreeType,
          minor: action.payload.minor,
          institution: action.payload.institution as string,
          city: action.payload.city,
          state: action.payload.state,
          graduationYear: action.payload.graduationYear,
          isGraduated: action.payload.isGraduated,
        };
      case DegreeActionTypes.DELETE_DEGREE_TO_DB_from_DegreeShellEdit_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }

}
