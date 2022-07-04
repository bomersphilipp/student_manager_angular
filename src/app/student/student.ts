import {Employment} from "../employment/employment";

/**
 * Student entity
 */
export class Student {
  // id is optional for creating new projects
  id?: number;
  firstName!: string;
  lastName!: string;
  employment!: Employment;
}
