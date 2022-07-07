import {Component, OnInit} from "@angular/core";
import {AppComponent} from "../app.component";
import {Period} from "../period/period";
import {Allocation} from './allocation';
import {Project} from "../project/project";

/**
 * Allocation component
 */
@Component({
    selector: 'app-allocation',
    templateUrl: './allocation.component.html',
    styleUrls: ['./allocation.component.css'],
})
export class AllocationComponent implements OnInit {

    // Creates an empty allocation to access and edit in formulary
    allocation: Allocation = new Allocation();

    // Fetches validation issues
    error: any;

    // Dependency injection
    constructor(
        // appComponent needs to be public to access it in html
        public appComponent: AppComponent,
    ) {
    }

    /**
     * allocation initialization
     */
    ngOnInit(): void {

        // Declares class attributes by fetching von appComponent
        this.allocation = this.appComponent.getCurrentAllocation() || this.appComponent.newAllocation();
        this.allocation.student = this.appComponent.getCurrentAllocation()?.student || this.appComponent.newStudent();
        this.allocation.period = this.appComponent.getCurrentAllocation()?.period || new Period();
    }

    /**
     * Saves the new allocation in database
     */
    saveAllocation(): void {

        // If a project is existing in path take this one, otherwise do not change the project
        const currentProject: Project | undefined = this.appComponent.getCurrentProject()
        this.allocation.project = currentProject || this.allocation.project;

        // Checks if allocation exists
        if (this.allocation) {

            // Checks if allocation exists in database
            if (this.allocation.id == undefined) {

                // Saves new allocation
                this.appComponent.AllocationService.addAllocation(this.allocation).subscribe({

                    // Closes dialog
                    complete: () => this.closeAllocation(),

                    // Fetches validation issues
                    error: error => this.error = error
                });
            } else {

                // Updates allocation and closes dialog
                this.appComponent.AllocationService.editAllocation(this.allocation).subscribe({

                    // Closes dialog
                    complete: () => this.closeAllocation(),

                    // Fetches validation issues
                    error: error => this.error = error
                });
            }
        }
    }

    /**
     * Deletes an allocation
     */
    deleteAllocation(): void {

        // Deletes allocation
        this.appComponent.AllocationService.deleteAllocation(this.allocation).subscribe({

            // Closes dialog
            complete: () => this.closeAllocation(),

            // Fetches validation issues
            error: error => this.error = error
        });
    }

    /**
     * Returns to the start page (appComponent)
     */
    closeAllocation(): void {

        // closes project dialog
        this.appComponent.setCurrentAllocation(undefined, undefined);
    }
}
