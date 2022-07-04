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
  ngOnInit() {

    // Declares class attributes by fetching von appComponent
    const currentStudent = this.appComponent.getCurrentStudent();
    if (currentStudent) {
      this.student = currentStudent;
      if (!currentStudent.employment) {
        this.student.employment = new Employment();
      }
    } else {
      this.closeStudent();
    }
  }

  /**
   * Saves the new student database
   */
  saveStudent() {
    if (this.student) {
      if (this.student.id == undefined) {
        // Save new student
        this.appComponent.studentService.addStudent(this.student).subscribe({
          next: student => this.student = student,
          complete: () => this.closeStudent(),
          error: error => this.error = error
        });
      } else {
        // Updates student
        this.appComponent.studentService.editStudent(this.student).subscribe({
          next: student => this.student = student,
          complete: () => this.closeStudent(),
          error: error => this.error = error
        });
      }
    }
  }

  /**
   * Deletes a student
   */
  deleteStudent() {
    this.appComponent.studentService.deleteStudent(this.student).subscribe(() => {
      this.closeStudent();
    });
  }

  /**
   * Returns to the start page (appComponent)
   */
  closeStudent() {
    // Reloads all students
    this.appComponent.fetchStudents();
    // Closes project dialog
    this.appComponent.setCurrentStudent(undefined);

    const Allocation = this.appComponent.getCurrentAllocation();
    if (Allocation) {
      Allocation.student = this.student ? this.student : new Student;
      this.appComponent.setCurrentAllocation(Allocation);
    }
  }
}
