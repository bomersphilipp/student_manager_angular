import {Component, OnInit, SkipSelf} from '@angular/core';
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
        @SkipSelf() public appComponent: AppComponent,
    ) {
    }

    /**
     * Employment initialization
     */
    ngOnInit(): void {

        // Declares class attributes by fetching von appComponent
        const currentEmployment: Employment | undefined = this.appComponent.getCurrentEmployment();

        if (currentEmployment) {
            this.employment = currentEmployment;
        } else {
            this.closeEmployment();
        }
    }

    /**
     * Saves the new employment in database
     */
    saveEmployment(): void {

        if (this.employment) {
            if (this.employment.id == undefined) {

                // Saves new employment
                this.appComponent.employmentService.addEmployment(this.employment).subscribe({
                    next: (employment: Employment) => this.employment = employment,
                    complete: () => this.closeEmployment(),
                    error: (error: any) => this.error = error
                });
            } else {

                // Update employment
                this.appComponent.employmentService.editEmployment(this.employment).subscribe({
                    next: (employment: Employment) => this.employment = employment,
                    complete: () => this.closeEmployment(),
                    error: (error: any) => this.error = error
                });
            }
        }
    }

    /**
     * Deletes an employment
     */
    deleteEmployment(): void {
        this.appComponent.employmentService.deleteEmployment(this.employment).subscribe({
            complete: () => this.closeEmployment(),
            error: (error: any) => this.error = error
        });
    }

    /**
     * Returns to the start page (appComponent)
     */
    closeEmployment(): void {

        // Reloads all lists
        this.appComponent.fetchEmployments();

        // Closes project dialog
        this.appComponent.setCurrentEmployment(undefined);

        // Checks if currentStudent is set
        const student = this.appComponent.getCurrentStudent();

        if (student) {

            // If current student is set, add employment.
            // Use set employment or create an empty one
            student.employment = this.employment || new Employment;

            // Update current student with new employment
            this.appComponent.setCurrentStudent(student);
        }
    }
}
