import {Period} from "../period/period";

/**
 * Project entity
 */
export class Project {
  // ID is optional for creating new projects
  id?: number;
  name!: string;
  period!: Period;
}
