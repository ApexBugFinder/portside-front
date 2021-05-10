export interface Project {
  id?: string;
  projectCreatorID?: string;
  projectName?: string;
  started?: Date;
  completed?: Date;
  description?: string;
  banner?: string;
  smallBanner?: string;
  published?: boolean;
  projectRequirements?: ProjectRequirement[] | undefined;
  projectLinks?: ProjectLink[] | undefined;
}
export interface ProjectLink {
  id?: string;
  link?: string;
  service?: string;
  projectID?: string;
}

export const defaultProjectLink: ProjectLink = {
  id: 'defaultProjectLink1',
  link: 'defaultLink',
  service: 'default',
  projectID: 'defaultLink'
};

export enum editState {
  OK = 'ok',
  REMOVE = 'remove',
  ADD = 'add'
}
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

export const defaultProject: Project = {
  id: '',
  projectName: 'Default',
  projectCreatorID: '',
  started: new Date(2021, 0o1, 0o1),
  completed: new Date(2021, 0o2, 0o1),
  description: 'Default Project',
  smallBanner: '',
  banner: '',
  published: false,
  projectRequirements: [],
  projectLinks: [],
};

export enum linkview  {

  'GIT'= 'git',
  'SITE' = 'site',
  'NONE' = 'none'

}