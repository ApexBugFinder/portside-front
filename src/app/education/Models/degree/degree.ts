import { Constants } from "src/app/helpers/Constants";

export interface Degree {
    id: string;
    projectCreatorID: string;
    degreeName: string;
    degreeType?: string;
    minor?: string;
    institution?: string;
    city?: string;
    state?: string;
    graduationYear?: Date;
    isGraduated?: boolean;


}

export const defaultDegree: Degree = {
    id: '',
    projectCreatorID: '',
    degreeName: 'Default Degree'
}
