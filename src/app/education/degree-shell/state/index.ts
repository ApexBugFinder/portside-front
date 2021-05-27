import { createSelector } from '@ngrx/store';
import { selectDegreeEntityDataState, selectDegreeShellState  } from '../../state';
import * as fromRoot from '../../../state/app.state';
import * as fromDegreeShell from './degree-shell.reducer';
import * as fromDegreesRoot from '../../Models/certification/state/cerfication.reducer';


export interface DegreeShellState extends fromDegreesRoot.State {
    certificationShell: fromDegreeShell.DegreeShellState;
}

export const getOrginalDegree = createSelector(
    selectDegreeShellState,
    state => state.originalDegree
);



export const getCurrentDegree = createSelector(
    selectDegreeShellState,
    state => {
        return {
          id: state.originalDegree?.id as string,
          projectCreatorID: state.originalDegree?.projectCreatorID as string,
          degreeName: state.originalDegree?.degreeName as string,
          minor: state.originalDegree?.minor,
          institution: state.originalDegree?.institution,
          city: state.originalDegree?.city,
          state: state.originalDegree?.state,
          graduationYear: state.originalDegree?.graduationYear,
          isGraduated: state.originalDegree?.isGraduated,
        };
    }
);

export const getCurrentDegreeId = createSelector(
    selectDegreeShellState,
    state => state.id
);

export const getCurrentDegreeProjectCreator = createSelector(
    selectDegreeShellState,
    state => state.projectCreatorID
);

export const getCurrentDegreeDegreeName = createSelector(
    selectDegreeShellState,
    state => state.degreeName
);

export const getCurrentDegreeDegreeType = createSelector(
    selectDegreeShellState,
    state => state.degreeType
);

export const getCurrentDegreeMinor = createSelector(
    selectDegreeShellState,
    state => state.minor
);

export const getCurrentDegreeInstitution = createSelector(
    selectDegreeShellState,
    state => state.institution
);

export const getCurrentDegreeCity = createSelector(
  selectDegreeShellState,
  (state) => state.city
);

export const getCurrentDegreeState = createSelector(
  selectDegreeShellState,
  (state) => state.state
);

export const getCurrentDegreeGraduationYr = createSelector(
  selectDegreeShellState,
  (state) => state.graduationYear
);

export const getCurrentDegreeIsGraduated = createSelector(
  selectDegreeShellState,
  (state) => state.isGraduated
);
