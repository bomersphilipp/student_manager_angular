import {Component, OnInit} from "@angular/core";
import {Allocation} from "./allocation/allocation";
import {AllocationService} from "./allocation/allocation.service";
import {Employment} from "./employment/employment";
import {EmploymentService} from "./employment/employment.service";
import {FileService} from "./file/file.service";
import {OrderType} from "./enum/order-type.enum";
import {Project} from "./project/project";
import {ProjectService} from "./project/project.service";
import {Student} from "./student/student";
import {StudentService} from "./student/student.service";
import {ActivatedRoute, Router, Scroll} from "@angular/router";
import {filter} from "rxjs";
import {ViewportScroller} from "@angular/common";

/**
 * main class / start page
 */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  /**
   * TODO: Add a search algorithm
   */

    // Website title
  title = "Project Manager"

  // Includes lists with database content
  projects?: Project[];
  allocations?: Allocation[];
  students?: Student[];
  employments?: Employment[];

  // Query parameters
  currentProjectId: number | undefined;
  currentEmploymentId: number | undefined;
  currentAllocationId: number | undefined;
  currentStudentId: number | undefined;

  // Selected order
  currentProjectOrder: number | undefined;
  currentStudentOrder: number | undefined;
  currentProjectOrderBackUp: number = 0;
  currentStudentOrderBackUp: number = 0;

  // Dependency injection: services are accessible from all components
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public projectService: ProjectService,
    public AllocationService: AllocationService,
    public studentService: StudentService,
    public employmentService: EmploymentService,
    public fileService: FileService,
    private viewportScroller: ViewportScroller
  ) {
    this.route.queryParams
      .subscribe(params => {
          this.currentProjectId = Number(params["projectId"]) || undefined;
          this.currentEmploymentId = Number(params["employmentId"]) || undefined;
          this.currentAllocationId = Number(params["allocationId"]) || undefined;
          this.currentStudentId = Number(params["studentId"]) || undefined;
          this.currentProjectOrder = Number(params["projectOrder"]) || this.currentProjectOrderBackUp;
          this.currentStudentOrder = Number(params["studentOrder"]) || this.currentStudentOrderBackUp;
        }
      );

    /**
     * Angular anchor scrolling does not work as expected.
     * Therefore, we use a manual scrolling.
     * https://stackblitz.com/edit/solution-anchor-scrolling?file=src%2Fapp%2Fapp.component.ts
     */
    viewportScroller.setOffset([0, 50]);
    this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e) => {
      if (!(e instanceof Scroll) || e.anchor) {
        // anchor navigation
        /* setTimeout is the core line to solve the solution */
        setTimeout(() => {
          if ((!(e instanceof Scroll) || e.anchor != null) && e instanceof Scroll && e.anchor != null) {
            viewportScroller.scrollToAnchor(e.anchor);
          }
        })
      } else {
        // backward navigation
        viewportScroller.scrollToPosition(e.position || [0, 0]);
      }
    });
  }

  ngOnInit(): void {

    // Load all database entries on initialization
    this.reload();
  }

  /**
   * Updates all entity lists
   */
  reload(): void {
    this.fetchAllocations();
    this.fetchProjects();
    this.fetchEmployments();
    this.fetchStudents()
  }

  /**
   * Fetches allocations and saves them locally
   */
  fetchAllocations(): void {
    this.AllocationService.getAllocations().subscribe((AllocationList?: Allocation[]) => this.allocations = AllocationList);
  }

  /**
   * Fetches projects and saves them locally
   */
  fetchProjects(): void {
    this.projectService.getProjects().subscribe((projectList?: Project[]) => {
      this.projects = projectList;
      this.orderProject(this.currentProjectOrder || 1);
    });
  }

  /**
   * Fetches employments and saves them locally
   */
  fetchEmployments(): void {
    this.employmentService.getEmployments().subscribe((employmentList?: Employment[]) => this.employments = employmentList);
  }

  /**
   * Fetches students and saves them locally
   */
  fetchStudents(): void {
    this.studentService.getStudents().subscribe((studentList?: Student[]) => this.students = studentList);
  }

  /**
   * Gets all projects
   * @returns Project[] | undefined
   */
  getProjects(): Project[] | undefined {
    return this.projects;
  }

  /**
   * Gets all students
   * @returns Student[] | undefined
   */
  getStudents(): Student[] | undefined {
    return this.students;
  }

  /**
   * Gets all employments
   * @returns Employment[] | undefined
   */
  getEmployments(): Employment[] | undefined {
    return this.employments;
  }

  /**
   * Setter for open/close project dialog
   * @param project Project
   */
  setCurrentProject(project: Project | undefined) {

    // If project is not set, return to homepage
    if (project == undefined) {
      this.reload();
      this.router.navigate(["/"], {fragment: "" + this.getCurrentProject()?.id});
    } else {

      // Otherwise edit or create a project
      this.router.navigate(["/project"], {
        queryParams: {
          projectId: project.id
        }
      });
    }
  }

  /**
   * Getter for open/close project dialog
   * @returns Project
   */
  getCurrentProject(): Project | undefined {
    return this.projects?.find(project => project.id == this.currentProjectId);
  }

  /**
   * Returns a new project for usage in html
   * @returns new Project
   */
  newProject(): Project {
    return new Project();
  }

  /**
   * Setter for open/close employment dialog
   * @param employment Employment
   */
  setCurrentEmployment(employment: Employment | undefined) {

    // If employment is not set, return to student page
    if (employment == undefined) {
      this.reload();
      this.router.navigate(["/student"], {
        queryParams: {
          allocationId: this.getCurrentAllocation()?.id,
          projectId: this.getCurrentProject()?.id,
          studentId: this.getCurrentStudent()?.id
        }
      });
    } else {

      // Otherwise edit or create a student
      this.router.navigate(["/employment"], {
        queryParams: {
          allocationId: this.getCurrentAllocation()?.id,
          projectId: this.getCurrentProject()?.id,
          studentId: this.getCurrentStudent()?.id,
          employmentId: employment?.id
        }
      });
    }

  }

  /**
   * Getter for open/close employment dialog
   * @returns Employment
   */
  getCurrentEmployment(): Employment | undefined {
    return this.employments?.find(employment => employment.id == this.currentEmploymentId);
  }

  /**
   * Returns a new employment for usage in html
   * @returns new Employment
   */
  newEmployment(): Employment {
    return new Employment();
  }

  /**
   * Setter for open/close allocation dialog
   * @param allocation of allocation
   * @param project of allocation
   */
  setCurrentAllocation(allocation: Allocation | undefined, project: Project | undefined) {

    // If allocation is not set, return to homepage
    if (allocation == undefined) {
      this.reload();
      // Returns to the edited/created project
      this.router.navigate(["/"], {fragment: "" + this.getCurrentProject()?.id});
    } else {

      // Otherwise edit or create an allocation
      this.router.navigate(["/allocation"], {
        queryParams: {
          allocationId: allocation?.id,
          projectId: project?.id
        }
      });
    }
  }

  /**
   * Getter for open/close allocation dialog
   * @returns Allocation
   */
  getCurrentAllocation(): Allocation | undefined {
    return this.allocations?.find(allocation => allocation.id == this.currentAllocationId);
  }

  /**
   * Returns a new allocation for usage in html
   * @returns new Allocation
   */
  newAllocation(): Allocation {
    return new Allocation();
  }

  /**
   * Setter for open/close student dialog
   * @param student
   */
  setCurrentStudent(student: Student | undefined) {

    // If student is not set, return to allocation page
    if (student == undefined) {
      this.reload();
      this.router.navigate(["/allocation"], {
        queryParams: {
          projectId: this.getCurrentProject()?.id,
          allocationId: this.getCurrentAllocation()?.id,
        }
      });
    } else {

      // Otherwise edit or create a student
      this.router.navigate(["/student"], {
        queryParams: {
          studentId: student.id,
          projectId: this.getCurrentProject()?.id,
          allocationId: this.getCurrentAllocation()?.id
        }
      });
    }
  }


  /**
   * Getter for open/close student dialog
   * @returns Student
   */
  getCurrentStudent(): Student | undefined {
    return this.students?.find(student => student.id == this.currentStudentId);
  }

  /**
   * Returns a new student for usage in html
   * @returns new Allocation
   */
  newStudent(): Student {
    return new Student();
  }


  orderStudent(orderType: number) {
    // Saves current order type
    this.router.navigate([], {
      fragment: "" + this.getCurrentProject()?.id,
      queryParams: {
        projectOrder: this.currentProjectOrder || this.currentProjectOrderBackUp,
        studentOrder: orderType
      }
    });

    this.currentStudentOrderBackUp = orderType;
  }

  /**
   * Orders projects by starting date, end date, or name; both asc or dsc
   */
  orderProject(orderType: number): void {

    // Saves current order type
    this.router.navigate([], {
      fragment: "" + this.getCurrentProject()?.id,
      queryParams: {
        projectOrder: orderType,
        studentOrder: this.currentStudentOrder || this.currentStudentOrderBackUp
      }
    });

    this.currentProjectOrderBackUp = orderType;

    // Sort projects
    this.projects = this.projects?.sort((project1: Project, project2: Project) => {
      switch (orderType) {
        case OrderType.NAME_DESC.valueOf():
          return project2.name.localeCompare(project1.name);
        case OrderType.NAME_ASC.valueOf():
          return project1.name.localeCompare(project2.name);
        case OrderType.BEGIN_DESC.valueOf():
          return new Date(project2.period.begin).getTime() - new Date(project1.period.begin).getTime();
        case OrderType.BEGIN_ASC.valueOf():
          return new Date(project1.period.begin).getTime() - new Date(project2.period.begin).getTime();
        case OrderType.END_DESC.valueOf():
          return new Date(project2.period.end).getTime() - new Date(project1.period.end).getTime();
        case OrderType.END_ASC.valueOf():
          return new Date(project1.period.end).getTime() - new Date(project2.period.end).getTime();
        default:
          return 1;
      }
    }) ?? [];
  }

  /**
   * Returns the sorted student allocations
   * @returns Allocation[] sorted by this.sortStudent
   * @param project to find allocations for
   */
  getAllocationsByProject(project: Project): Allocation[] {

    const allocationList: Allocation[] | undefined = this.allocations?.filter(allocation => allocation.project.id == project.id);

    return allocationList?.sort((alloc1: Allocation, alloc2: Allocation) => {
        if (alloc1.period && alloc2.period && alloc1.student?.firstName && alloc2.student?.firstName) {
          switch (this.currentStudentOrder) {

            // Sorts students by ascending beginning date
            case OrderType.BEGIN_ASC.valueOf():
              return new Date(alloc1.period.begin).getTime() - new Date(alloc2.period.begin).getTime();

            // Sorts students by descending beginning date
            case OrderType.BEGIN_DESC.valueOf():
              return new Date(alloc2.period.begin).getTime() - new Date(alloc1.period.begin).getTime();

            // Sorts students by ascending ending date
            case OrderType.END_ASC.valueOf():
              return new Date(alloc1.period.end).getTime() - new Date(alloc2.period.end).getTime();

            // Sorts students by descending ending date
            case OrderType.END_DESC.valueOf():
              return new Date(alloc2.period.end).getTime() - new Date(alloc1.period.end).getTime();

            // Sorts students by ascending name and beginning date
            case OrderType.NAME_ASC.valueOf():
              return alloc1.student.id == alloc2.student.id
                ? new Date(alloc1.period.begin).getTime() - new Date(alloc2.period.begin).getTime()
                : alloc1.student.firstName.localeCompare(alloc2.student.firstName);

            // Sorts students by descending name and beginning date
            case OrderType.NAME_DESC.valueOf():
              return alloc1.student.id == alloc2.student.id
                ? new Date(alloc2.period.begin).getTime() - new Date(alloc1.period.begin).getTime()
                : alloc2.student.firstName.localeCompare(alloc1.student.firstName);
          }
        }
        return 1;
      })
      ?? [];
  }
}
