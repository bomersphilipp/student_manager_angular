import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {Period} from "../period/period";
import {Project} from './project';

/**
 * Project component
 */
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  // Creates an empty project to access and edit in formulary
  project: Project = new Project;

  // Fetches validation issues
  error: any;

  // Dependency injection
  constructor(
    // appComponent needs to be public to access it in html
    public appComponent: AppComponent,
  ) {
  }

  // Project initialization
  ngOnInit(): void {

    // Declares class attributes by fetching von appComponent
    const currentProject: Project | undefined = this.appComponent.getCurrentProject();
    if (currentProject) {
      this.project = currentProject;
      if (!currentProject?.period) {
        this.project.period = new Period;
      }
    } else {
      this.closeProject();
    }
  }

  /**
   * Saves the new project and period in database
   */
  saveProject(): void {
    if (this.project) {
      if (this.project.id == undefined) {
        // Safe new project
        this.appComponent.projectService.addProject(this.project).subscribe({
          // Closes dialog
          complete: () => this.closeProject(),
          error: (error: any) => this.error = error
        });
      } else {
        // Updates project
        this.appComponent.projectService.editProject(this.project).subscribe({
          // Closes dialog
          complete: () => this.closeProject(),
          error: (error: any) => this.error = error
        });
      }
    }
  }

  /**
   * Deletes a project
   */
  deleteProject(): void {
    this.appComponent.projectService.deleteProject(this.project).subscribe(() => {
      this.closeProject();
    });
  }

  /**
   * Returns to the start page (appComponent)
   */
  closeProject(): void {
    // Reloads all projects
    this.appComponent.fetchProjects();
    // Closes project dialog
    this.appComponent.setCurrentProject(undefined);
  }
}

