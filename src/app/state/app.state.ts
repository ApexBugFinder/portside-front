import { EducationModuleState } from "../education/state";
import { ExperienceModuleState } from "../experience";

import { ProjectModuleState } from "../project/state";
import { UserModuleState } from "../user";

export interface State {
    userModuleState: UserModuleState
    // projects: ProjectModuleState;
    // experienceState: ExperienceModuleState;
    // educationState: EducationModuleState;

}
