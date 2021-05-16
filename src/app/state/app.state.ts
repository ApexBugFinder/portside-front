import { ExperienceModuleState } from "../experience";
import { EditProjectState } from "../project/edit/state/edit-project.reducer";
import { ProjectModuleState } from "../project/state";

export interface State {
    // editProject: EditProjectState;
    projects: ProjectModuleState;
    experienceState: ExperienceModuleState;

}