import { createSelector } from '@ngrx/store';
import { selectCertificationEntityDataState, selectCertificationShellState  } from '../../state';
import * as fromRoot from '../../../state/app.state';
import * as fromCertificationShell from './certification-shell.reducer';
import * as fromCertificationsRoot from '../../Models/certification/state/cerfication.reducer';


export interface CertificationShellState extends fromCertificationsRoot.State {
    certificationShell: fromCertificationShell.CertificationShellState;
}

export const getOrginalCertification = createSelector(
    selectCertificationShellState,
    state => state.originalCertification
);



export const getCurrentCertification = createSelector(
    selectCertificationShellState,
    state => {
        return {
            id: state.id,
            projectCreatorID: state.projectCreatorID,
            certID: state.certID,
            certName: state.certName,
            isActive: state.isActive,
            issuingBody_Name: state.issuingBody_Name,
            issuingBody_Logo: state.issuingBody_Logo,
            issuedDate: state.issuedDate
        };
    }
);

export const getCurrentCertificationId = createSelector(
    selectCertificationShellState,
    state => state.id
);

export const getCurrentCertificationCertId = createSelector(
  selectCertificationShellState,
  (state) => state.certID
);

export const getCurrentCertificationProjectCreator = createSelector(
    selectCertificationShellState,
    state => state.projectCreatorID
);

export const getCurrentCertificationCertName = createSelector(
    selectCertificationShellState,
    state => state.certName
);

export const getCurrentCertificationIsActive = createSelector(
    selectCertificationShellState,
    state => state.isActive
);

export const getCurrentCertificationIssuingBodyName = createSelector(
    selectCertificationShellState,
    state => state.issuingBody_Name
);

export const getCurrentCertificationIssuingBodyLogo = createSelector(
    selectCertificationShellState,
    state => state.issuingBody_Logo
);

export const getCurrentCertificationIssuedDate = createSelector(
    selectCertificationShellState,
    state => state.issuedDate
);


