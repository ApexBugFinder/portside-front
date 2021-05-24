import { Constants } from "src/app/helpers/Constants";

export interface Certification {
    id: string;
    projectCreatorID: string;
    certName: string;
    isActive?: boolean;
    issuingBody_Name?: string;
    issuingBody_Logo?: string;

}

export const defaultCert: Certification = {
    id: '1234',
    projectCreatorID: Constants.userID,
    certName: 'Default Cert'
}
