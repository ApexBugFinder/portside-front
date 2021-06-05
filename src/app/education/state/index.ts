import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromRoot from '../../state/app.state';
import * as
fromDegreeData
 from
'../Models/degree/state/degree.reducer';
import * as fromDegreeShell from '../degree-shell/state/degree-shell.reducer';


import * as fromCertData from '../Models/certification/state/cerfication.reducer';
import * as fromCertShell from '../certificatn-shell/state/certification-shell.reducer';

import { EducationModule } from '../education.module';

export interface EducationModuleState {
   degreeData: fromDegreeData.State,
  degreeShell: fromDegreeShell.DegreeShellState,

   certData: fromCertData.State,
   certShell: fromCertShell.CertificationShellState
 }

 export interface State extends fromRoot.State {
  educationModule: EducationModuleState
 }

 export const educationReducers: ActionReducerMap<EducationModuleState, any> =
 {
   degreeData: fromDegreeData.reducer,
   degreeShell: fromDegreeShell.degreeReducer,
   certData: fromCertData.reducer,
   certShell: fromCertShell.certificationReducer

 }

export const selectEducationModuleState = createFeatureSelector<EducationModuleState>('educationState');


// HOOKS FOR SUB STATE
export const
selectDegreeEntityDataState = createSelector
(
  selectEducationModuleState,
  (state: EducationModuleState) => state.degreeData
);

export const selectDegreeShellState = createSelector (
  selectEducationModuleState,
  (state: EducationModuleState) => state.degreeShell
);
export const selectCertificationEntityDataState = createSelector(
  selectEducationModuleState,
  (state: EducationModuleState) => state.certData
);


export const selectCertificationShellState = createSelector (
  selectEducationModuleState,
  (state: EducationModuleState) => state.certShell
);



