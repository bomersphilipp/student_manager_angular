import {Component} from "@angular/core";
import {AppComponent} from "../app.component";
import {Project} from "../project/project";
import {Student} from "../student/student";
import {Allocation} from "../allocation/allocation";
import {OrderType} from "../enum/order-type.enum";


/**
 * Period component
 */
@Component({
  selector: "app-period",
  templateUrl: "./period.component.html",
  styleUrls: ["./period.component.css"]
})
export class PeriodComponent {

  // Dependency injection
  constructor(
    // appComponent needs to be public to access it in html
    public appComponent: AppComponent
  ) {
  }

  /**
   * Retuns all unique students from a specific project
   * @param project with students
   */
  getStudentsByProject(project: Project): (Student | undefined)[] {

    // Finds allocations by project and student
    return this.appComponent.getAllocationsByProject(project).map((allocation: Allocation) => allocation.student)
      // Only includes each student one time
      .filter((student1: Student | undefined, index: number, array: (Student | undefined)[]) =>
        index === array.findIndex((student2) =>
          student2?.id === student1?.id
        ));
  }

  /**
   * Returns all allocations from a specific student in a specific project
   * @param student to get allocations from
   * @param project to get allocations from
   */
  getAllocationsByStudentAndProject(student: Student, project: Project): Allocation[] {
    return this.appComponent.getAllocationsByProject(project).filter((allocation: Allocation) => allocation.student?.id === student.id);
  }


  /**
   * Access to change order type in frontend
   * @param begin = true; end = false
   * @param desc = true; asc = false
   * @param byName = true; byDate = false
   */
  orderStudentHelper(begin: boolean, desc: boolean, byName: boolean): void {
    this.appComponent.currentProjectCache = -1;

    if (byName) {
      this.appComponent.orderStudent(desc
        ? OrderType.NAME_DESC.valueOf()
        : OrderType.NAME_ASC.valueOf());
    } else if (begin) {
      this.appComponent.orderStudent(desc
        ? OrderType.BEGIN_DESC.valueOf()
        : OrderType.BEGIN_ASC.valueOf());
    } else {
      this.appComponent.orderStudent(desc
        ? OrderType.END_DESC.valueOf()
        : OrderType.END_ASC.valueOf());
    }
  }

  /**
   * Adds ability to call sorting methods from html file (cannot call OrderTypes there)
   * @param begin = true / end = false
   * @param desc = true / asc = false
   * @param byName = true / byDate = false
   */
  orderProjectHelper(begin: boolean, desc: boolean, byName: boolean): void {
    this.appComponent.currentProjectCache = -1;

    if (byName) {
      if (desc) {
        this.appComponent.orderProject(OrderType.NAME_DESC.valueOf());
      } else {
        this.appComponent.orderProject(OrderType.NAME_ASC.valueOf());
      }
    } else if (begin) {
      if (desc) {
        this.appComponent.orderProject(OrderType.BEGIN_DESC.valueOf());
      } else {
        this.appComponent.orderProject(OrderType.BEGIN_ASC.valueOf());
      }
    } else {
      if (desc) {
        this.appComponent.orderProject(OrderType.END_DESC.valueOf());
      } else {
        this.appComponent.orderProject(OrderType.END_ASC.valueOf());
      }
    }
  }

}
