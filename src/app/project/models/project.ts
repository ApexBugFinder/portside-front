import { ProjectLink } from './projectLink';
import { ProjectRequirement } from './projectRequirement';


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

