import { Certification } from "src/app/education/Models/certification/certification";
import { Degree } from "src/app/education/Models/degree/degree";
import { Experience } from "src/app/experience/Models/experience";
import { Project } from "src/app/project/models/project";

export interface User {
  userId: string;
  username: string;
}

export interface UserState {
  userId: string,
  projects: Project[],
  experiences: Experience[],
  Degrees: Degree[],
  Certifications: Certification[]
}