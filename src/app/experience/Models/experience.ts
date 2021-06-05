import { Guid } from 'guid-typescript';
import { Constants } from '../../helpers/Constants';
import { defaultRole, Role } from './role';

export interface Experience {
    id: string;
    projectCreatorID: string;
    company?: string;
    title?: string;
    logoUrl?: string;
    started: Date;
    completed?: Date;
    city?: string;
    state?: string;
    roles?: Role[];
    
}


export const defaultExperience: Experience = {
    id: 'new',
    projectCreatorID: Constants.userID,
    company: 'default company',
    title: 'Default Title',
    logoUrl: '',
    started: new Date(2021, 4, 12),
    completed: new Date(2021, 5, 2),
    city: 'San Diego',
    state: 'CA',
    roles: []
    
}