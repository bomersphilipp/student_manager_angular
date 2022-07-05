import {Component} from '@angular/core';
import {AppComponent} from "../app.component";
import {Project} from "../project/project";
import {Student} from "../student/student";
import {Allocation} from "../allocation/allocation";


/**
 * Period component
 */
@Component({
    selector: 'app-period',
    templateUrl: './period.component.html',
    styleUrls: ['./period.component.css']
})
export class PeriodComponent {

    showTable: boolean = false;

    // Dependency injection
    constructor(
        // appComponent needs to be public to access it in html
        public appComponent: AppComponent,
    ) {
    }

    /**
     * Retuns all unique students from a specific project
     * @param project with students
     */
    getStudentsByProject(project: Project): (Student | undefined)[] {
        return this.appComponent.getAllocationsByProject(project).map((allocation: Allocation) => allocation.student)
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

}
