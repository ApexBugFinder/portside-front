import { Certification } from "../../education/Models/certification/certification";
import { Degree } from "../../education/Models/degree/degree";
import { Experience } from "../../experience/Models/experience";
import { Project } from "../../project/models/project";

export interface User {
  id: string;
  username: string;
  email: string;
  userPicUrl: string;
}

export interface UserState {
  id: string,
  projects: Project[],
  experiences: Experience[],
  degrees: Degree[],
  certifications: Certification[],
  username: string,
  email: string,
  userPicUrl: string

}
export const defaultUserState: UserState = {
  id: '',
  projects: [],
  experiences: [],
  degrees: [],
  certifications: [],
  username: '',
  email: '',
  userPicUrl: ''

}
export interface ViewUserMatDialogData {
  user: UserState;
}
