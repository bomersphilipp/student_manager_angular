import {Period} from "../period/period";
import {Project} from "../project/project";
import {Student} from "../student/student";

/**
 * Allocation entity
 */
export class Allocation {
    // ID is optional for creating new projects
    id?: number;
    project!: Project;
    period?: Period;
    student?: Student;
}
