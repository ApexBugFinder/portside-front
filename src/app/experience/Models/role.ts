import { Guid } from "guid-typescript";
import { editState } from "src/app/shared/models/shared";

export interface Role {
    id: string;
    experienceID: string;
    myRole: string;
    myTitle: string;
    editState?: string;
    stateHistory?: string[];
}
export const defaultRole: Role = {
    id: Guid.create().toString(),
    experienceID: '',
    myRole: 'Seeding',
    myTitle: 'Lead Seeder',
    editState: editState.ADD
    


}