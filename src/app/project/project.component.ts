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
        this.project = this.appComponent.getCurrentProject() || this.appComponent.newProject();
        this.project.period = this.appComponent.getCurrentProject()?.period || new Period();
    }

    /**
     * Saves the new project and period in database
     */
    saveProject(): void {

        // Checks if project is set
        if (this.project) {

            // Checks if project exists in database
            if (this.project.id == undefined) {

                // Saves new project
                this.appComponent.projectService.addProject(this.project).subscribe({

                    // Closes dialog
                    complete: () => this.closeProject(),

                    // Fetches issues
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
        this.appComponent.projectService.deleteProject(this.project).subscribe({
            complete: () => this.closeProject(),
            error: (error: any) => this.error = error
        });
    }

    /**
     * Returns to the start page (appComponent)
     */
    closeProject(): void {

        // Closes project dialog
        this.appComponent.setCurrentProject(undefined)
    }
}

