import { AngularFireStorageReference } from "@angular/fire/compat/storage";
import { Observable } from "rxjs";

export interface MediaFile {
    type?: string;
    filelist?: FileList;
    fileToUpload?: File;
    mediaLocation: string;
    dloadUrl: string;
    error?: string;

}
export const defaultMediaFile: MediaFile = {
    type: '',
    mediaLocation: '',
    dloadUrl: ''

}
export interface KeyValuePair {
    Key: string;
    Value: string;
}
