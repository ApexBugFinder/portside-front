export interface Project {
  id: string;
  projectCreatorID: string;
  projectName: string;
  started: Date;
  completed: Date;
  description: string;
  banner: string;
  published: boolean;
  projectRequirements: ProjectRequirement[];
  projectLinks: ProjectLink[];
}
export interface ProjectLink {
  id: string;
}

export interface ProjectRequirement {
  id: string;
  projectID: string;
  requirement: string;
}
export const defaultProject: Project = {
  id: '',
  projectName: '',
  projectCreatorID: '',
  started: new Date(2021, 0o1, 0o1),
  completed: new Date(2021, 0o2, 0o1),
  description: 'Default Project',
  banner: '',
  published: false,
  projectRequirements: [],
  projectLinks: [],
};
