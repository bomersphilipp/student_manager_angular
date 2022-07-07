import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {Employment} from '../employment/employment';
import {Student} from './student';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

    // Creates an empty student to access and edit in formulary
    student: Student = new Student;

    // Fetches validation issues
    error: any;

    // Dependency injection
    constructor(
        // appComponent needs to be public to access it in html
        public appComponent: AppComponent,
    ) {
    }

    /**
     * Student initialization
     */
    ngOnInit(): void {

        // Declares class attributes by fetching von appComponent
        this.student = this.appComponent.getCurrentStudent() || this.appComponent.newStudent();
        this.student.employment = this.appComponent.getCurrentStudent()?.employment || new Employment();
    }

    /**
     * Saves the new student database
     */
    saveStudent(): void {

        // Checks if student exists
        if (this.student) {

            // Checks if student exists in database
            if (this.student.id == undefined) {

                // Saves new student
                this.appComponent.studentService.addStudent(this.student).subscribe({

                    // Closes Dialog
                    complete: () => this.closeStudent(),

                    // Fetches issues
                    error: (error: any) => this.error = error
                });
            } else {

                // Updates student
                this.appComponent.studentService.editStudent(this.student).subscribe({

                    // Closes dialog
                    complete: () => this.closeStudent(),

                    // Fetches issues
                    error: (error: any) => this.error = error
                });
            }
        }
    }


    /**
     * Deletes a student
     */
    deleteStudent(): void {

        // Deletes student
        this.appComponent.studentService.deleteStudent(this.student).subscribe({

            // Closes dialog
            complete: () => this.closeStudent(),

            // Fetches issues
            error: (error: any) => this.error = error
        });
    }

    /**
     * Returns to the start page (appComponent)
     */
    closeStudent(): void {

        // Closes project dialog
        this.appComponent.setCurrentStudent(undefined);
    }
}
