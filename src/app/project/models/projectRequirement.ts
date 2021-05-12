import {editState} from '../../shared/models/shared';

export interface ProjectRequirement {
    id: string | undefined;
    projectID: string | undefined;
    requirement: string  | undefined;
    editState: string  | undefined;
    stateHistory: [string]  | undefined;
  }
  export const defaultProjectRequirement: ProjectRequirement = {
    id: 'defaultProjectReq1',
    projectID: 'defaultProjectReq1',
    stateHistory: [editState.OK],
    editState: editState.OK,
    requirement: 'default'
  };