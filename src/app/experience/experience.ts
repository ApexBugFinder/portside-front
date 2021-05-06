import { Constants } from '../helpers/Constants';

export interface Experience {
    id: string;
    projectCreatorID: string;
    company?: string;
    title?: string;
    logoUrl?: string;
    started?: Date;
    completed?: Date;
    City?: string;
    State?: string;
    myRoles?: Role[];
}

export interface Role {
    id: string;
    experienceID: string;
    myRole: string;
}
export const defaultExperience: Experience = {
    id: '1234',
    projectCreatorID: Constants.userID,
    company: 'default company',
    title: 'Default Title'
}