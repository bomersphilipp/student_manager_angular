import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {Employment} from './employment';

/**
 * Employment component
 */
@Component({
    selector: 'app-employment',
    templateUrl: './employment.component.html',
    styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {

    // Creates an empty employment to access and edit in formula
    employment: Employment = new Employment;

    // Fetches validation issues
    error: any;

    // Dependency injection
    constructor(
        // appComponent needs to be public to access it in html
        public appComponent: AppComponent,
    ) {
    }

    /**
     * Employment initialization
     */
    ngOnInit(): void {

        // Declares class attributes by fetching von appComponent
        this.employment = this.appComponent.getCurrentEmployment() || this.appComponent.newEmployment();
    }

    /**
     * Saves the new employment in database
     */
    saveEmployment(): void {

        // Checks if employment exists
        if (this.employment) {

            // Checks if employment exists in database
            if (this.employment.id == undefined) {

                // Saves new employment and closes dialog
                this.appComponent.employmentService.addEmployment(this.employment).subscribe({

                    // Closes dialog
                    complete: () => this.closeEmployment(),

                    // Fetches validation issues
                    error: (error: any) => this.error = error
                });
            } else {

                // Updates employment
                this.appComponent.employmentService.editEmployment(this.employment).subscribe({

                    // Closes dialog
                    complete: () => this.closeEmployment(),

                    // Fetches validation issues
                    error: (error: any) => this.error = error
                });
            }
        }
    }

    /**
     * Deletes an employment
     */
    deleteEmployment(): void {

        // Deletes employment
        this.appComponent.employmentService.deleteEmployment(this.employment).subscribe({

            // Closes dialog
            complete: () => this.closeEmployment(),

            // Fetches validation issues
            error: (error: any) => this.error = error
        });
    }

    /**
     * Returns to the start page (appComponent)
     */
    closeEmployment(): void {

        // Closes project dialog
        this.appComponent.setCurrentEmployment(undefined);

    }
}
