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
    const currentStudent: Student | undefined = this.appComponent.getCurrentStudent();
    if (currentStudent) {
      this.student = currentStudent;
      this.student.employment = currentStudent.employment || new Employment();
    } else {
      this.closeStudent();
    }
  }

  /**
   * Saves the new student database
   */
  saveStudent(): void {
    if (this.student) {
      if (this.student.id == undefined) {

        // Saves new student
        this.appComponent.studentService.addStudent(this.student).subscribe({
          next: (student: Student) => this.student = student,
          complete: () => this.closeStudent(),
          error: (error: any) => this.error = error
        });
      } else {

        // Updates student
        this.appComponent.studentService.editStudent(this.student).subscribe({
          next: (student: Student) => this.student = student,
          complete: () => this.closeStudent(),
          error: (error: any) => this.error = error
        });
      }
    }
  }


  /**
   * Deletes a student
   */
  deleteStudent(): void {
    this.appComponent.studentService.deleteStudent(this.student).subscribe({
      complete: () => this.closeStudent(),
      error: (error: any) => this.error = error
    });
  }

  /**
   * Returns to the start page (appComponent)
   */
  closeStudent(): void {

    // Reloads all students
    this.appComponent.fetchStudents();

    // Closes project dialog
    this.appComponent.setCurrentStudent(undefined);

    const allocation = this.appComponent.getCurrentAllocation();

    if (allocation) {
      allocation.student = this.student || new Student;
      this.appComponent.setCurrentAllocation(allocation);
    }
  }
}
