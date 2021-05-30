import { Constants } from "src/app/helpers/Constants";

export interface Certification {
    id: string;
    projectCreatorID: string;
    certName: string;
    certId?: string;
    isActive?: boolean;
    issuingBody_Name?: string;
    issuingBody_Logo?: string;
    issuedDate: Date;
}

export const defaultCert: Certification = {
    id: '1234',
    projectCreatorID: Constants.userID,
    certName: 'Default Cert',
    issuedDate: new Date(2021, 4, 12)
}
