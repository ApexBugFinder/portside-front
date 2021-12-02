import {editState} from '../../shared/models/shared';

export interface ProjectRequirement {
    id: string;
    projectID: string ;
    requirement: string ;
    editState?: string ;
    stateHistory?: [string] ;
  }
  export const defaultProjectRequirement: ProjectRequirement = {
    id: 'defaultProjectReq1',
    projectID: 'defaultProjectReq1',
    stateHistory: [editState.OK],
    editState: editState.OK,
    requirement: 'default'
  };