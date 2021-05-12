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

  export enum linkview  {

    'GIT'= 'git',
    'SITE' = 'site',
    'NONE' = 'none'
  
  }