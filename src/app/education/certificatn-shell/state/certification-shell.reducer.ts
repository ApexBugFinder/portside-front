import { Constants } from "src/app/helpers/Constants";
import { Certification, defaultCert } from "../../Models/certification/certification";
import * as fromCertificationShell from './certification-shell.reducer';
import * as fromCertificationRoot from '../../state';

import { CertificationActionTypes, CertificationActions  } from './certification-shell.actions';

export interface CertificationShellState {
  originalCertification: Certification | undefined;
  id: string;
  projectCreatorID: string;
  certName: string;
  isActive?: boolean;
  issuingBody_Name?: string;
  issuingBody_Logo?: string;
  issuedDate: Date;
  error: string;
}

const initialState: CertificationShellState = {
  originalCertification: defaultCert,
  id: '',
  projectCreatorID: '',
  certName: '',
  isActive: false,
  issuingBody_Name: '',
  issuingBody_Logo: '',
  issuedDate: new Date(2021, 4, 12),
  error: ''
};

export function certificationReducer(state = initialState, action: CertificationActions): CertificationShellState {
    switch (action.type) {
      case CertificationActionTypes.SET_ORIGINAL_CERTIFICATION_from_CERT_EFFECTS:
        return {
          ...state,
          originalCertification: action.payload,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          certName: action.payload.certName,
          isActive: action.payload.isActive,
          issuingBody_Name: action.payload.issuingBody_Name,
          issuingBody_Logo: action.payload.issuingBody_Logo,
          issuedDate: action.payload.issuedDate,
        };
      case CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_CERT_EFFECTS:
        return {
          ...state,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          certName: action.payload.certName,
          isActive: action.payload.isActive,
          issuingBody_Name: action.payload.issuingBody_Name,
          issuingBody_Logo: action.payload.issuingBody_Logo,
          issuedDate: action.payload.issuedDate,
        };
      case CertificationActionTypes.SET_ORIGINAL_CERTIFICATION_from_VIEWCERT_COMPONENT:
        return {
          ...state,
          originalCertification: action.payload,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          certName: action.payload.certName,
          isActive: action.payload.isActive,
          issuingBody_Name: action.payload.issuingBody_Name,
          issuingBody_Logo: action.payload.issuingBody_Logo,
          issuedDate: action.payload.issuedDate,
        };
      case CertificationActionTypes.SET_CURRENT_CERTIFICATION_from_VIEWCERT_COMPONENT:
        return {
          ...state,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          certName: action.payload.certName,
          isActive: action.payload.isActive,
          issuingBody_Name: action.payload.issuingBody_Name,
          issuingBody_Logo: action.payload.issuingBody_Logo,
          issuedDate: action.payload.issuedDate,
        };
      case CertificationActionTypes.SET_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          id: action.payload,
        };
      case CertificationActionTypes.SET_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          projectCreatorID: action.payload,
        };
      case CertificationActionTypes.SET_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          certName: action.payload,
        };
      case CertificationActionTypes.SET_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          isActive: action.payload,
        };
      case CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          issuingBody_Name: action.payload,
        };
      case CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          issuingBody_Logo: action.payload,
        };
      case CertificationActionTypes.SET_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          issuedDate: action.payload,
        };

      // CLEAR
      case CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_SAVE:
        return {
          ...state,
          originalCertification: initialState.originalCertification,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          certName: initialState.certName,
          isActive: initialState.isActive,
          issuingBody_Name: initialState.issuingBody_Name,
          issuingBody_Logo: initialState.issuingBody_Logo,
          issuedDate: initialState.issuedDate,
        };
      case CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE:
        return {
          ...state,
          originalCertification: initialState.originalCertification,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          certName: initialState.certName,
          isActive: initialState.isActive,
          issuingBody_Name: initialState.issuingBody_Name,
          issuingBody_Logo: initialState.issuingBody_Logo,
          issuedDate: initialState.issuedDate,
        };
      case CertificationActionTypes.CLEAR_ORIGINAL_CERTIFICATION_FROM_CERT_EFFECTS_DELETE:
        return {
          ...state,
          originalCertification: initialState.originalCertification,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          certName: initialState.certName,
          isActive: initialState.isActive,
          issuingBody_Name: initialState.issuingBody_Name,
          issuingBody_Logo: initialState.issuingBody_Logo,
          issuedDate: initialState.issuedDate,
        };
      case CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_SAVE:
        return {
          ...state,
          originalCertification: initialState.originalCertification,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          certName: initialState.certName,
          isActive: initialState.isActive,
          issuingBody_Name: initialState.issuingBody_Name,
          issuingBody_Logo: initialState.issuingBody_Logo,
          issuedDate: initialState.issuedDate,
        };
      case CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_UPDATE:
        return {
          ...state,
          originalCertification: initialState.originalCertification,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          certName: initialState.certName,
          isActive: initialState.isActive,
          issuingBody_Name: initialState.issuingBody_Name,
          issuingBody_Logo: initialState.issuingBody_Logo,
          issuedDate: initialState.issuedDate,
        };
      case CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_FROM_CERT_EFFECTS_DELETE:
        return {
          ...state,
          originalCertification: initialState.originalCertification,
          id: initialState.id,
          projectCreatorID: initialState.projectCreatorID,
          certName: initialState.certName,
          isActive: initialState.isActive,
          issuingBody_Name: initialState.issuingBody_Name,
          issuingBody_Logo: initialState.issuingBody_Logo,
          issuedDate: initialState.issuedDate,
        };

      case CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ID_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          id: initialState.id,
        };
      case CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_PROJECTCREATOR_ID_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          projectCreatorID: initialState.projectCreatorID,
        };
      case CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_CERT_NAME_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          certName: initialState.certName,
        };
      case CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_IS_ACTIVE_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          isActive: initialState.isActive,
        };
      case CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_NAME_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          issuingBody_Name: initialState.issuingBody_Name,
        };
      case CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUINGBODY_LOGO_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          issuingBody_Logo: initialState.issuingBody_Logo,
        };
      case CertificationActionTypes.CLEAR_CURRENT_CERTIFICATION_ISSUED_DATE_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,
          issuedDate: initialState.issuedDate,
        };

      case CertificationActionTypes.RESET_CURRENT_CERTIFICATION_FROM_CERT_SHELL_EDIT_CPT:
        return {
          ...state,

          id: state.originalCertification?.id as string,
          projectCreatorID: state.originalCertification
            ?.projectCreatorID as string,
          certName: state.originalCertification?.certName as string,
          isActive: state.originalCertification?.isActive,
          issuingBody_Name: state.originalCertification?.issuingBody_Name,
          issuingBody_Logo: state.originalCertification?.issuingBody_Logo,
          issuedDate: state.originalCertification?.issuedDate as Date,
        };

      // TO DB
      // LOAD
      case CertificationActionTypes.LOAD_CERTIFICATIONS_FROM_DB_on_PAGESHELL_SUCCESS:
        if (action.payload.length > 0) {
          return {
            ...state,
            originalCertification: action.payload[0],
            id: action.payload[0].id,
            projectCreatorID: action.payload[0].projectCreatorID,
            certName: action.payload[0].certName as string,
            isActive: action.payload[0].isActive,
            issuingBody_Name: action.payload[0].issuingBody_Name,
            issuingBody_Logo: action.payload[0].issuingBody_Logo,
            issuedDate: action.payload[0].issuedDate as Date,
          };
        } else {
          return {
            ...state,
          };
        }

      // LOADING ACTION WiLL BE PUSHED TO ENTITy DATA
      case CertificationActionTypes.LOAD_CERTIFICATIONS_FROM_on_PAGESHELL_DB_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      // CREATE
      case CertificationActionTypes.SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS:
        return {
          ...state,
          originalCertification: action.payload,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          certName: action.payload.certName as string,
          isActive: action.payload.isActive,
          issuingBody_Name: action.payload.issuingBody_Name as string,
          issuingBody_Logo: action.payload.issuingBody_Logo,
          issuedDate: action.payload.issuedDate as Date,
        };
      case CertificationActionTypes.SAVE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      // UPDATE
      case CertificationActionTypes.UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS:
        return {
          ...state,
          originalCertification: action.payload,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          certName: action.payload.certName as string,
          isActive: action.payload.isActive,
          issuingBody_Name: action.payload.issuingBody_Name as string,
          issuingBody_Logo: action.payload.issuingBody_Logo,
          issuedDate: action.payload.issuedDate as Date,
        };
      case CertificationActionTypes.UPDATE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      // DELETE
      case CertificationActionTypes.DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_SUCCESS:
        return {
          ...state,
          originalCertification: action.payload,
          id: action.payload.id,
          projectCreatorID: action.payload.projectCreatorID,
          certName: action.payload.certName as string,
          isActive: action.payload.isActive,
          issuingBody_Name: action.payload.issuingBody_Name as string,
          issuingBody_Logo: action.payload.issuingBody_Logo,
          issuedDate: action.payload.issuedDate as Date,
        };
      case CertificationActionTypes.DELETE_CERTIFICATION_TO_DB_from_CertShellEdit_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }

}
