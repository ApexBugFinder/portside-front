export interface ProjectLink {
    id?: string;
    link?: string;
    service?: string;
    projectID?: string;
    title?: string;
    description?: string;
  }

  export const defaultProjectLink: ProjectLink = {
    id: 'defaultProjectLink1',
    link: 'defaultLink',
    service: 'default',
    projectID: 'defaultLink',
    title: 'defaultTitle',
    description: 'defaultDescription'
  };

  export enum linkview  {

    'GIT'= 'git',
    'SITE' = 'site',
    'NONE' = 'none'

  }