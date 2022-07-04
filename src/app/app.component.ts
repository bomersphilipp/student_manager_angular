import {Component, OnInit} from "@angular/core";
import {Allocation} from './allocation/allocation';
import {AllocationService} from './allocation/allocation.service';
import {Employment} from './employment/employment';
import {EmploymentService} from './employment/employment.service';
import {FileService} from "./file/file.service";
import {OrderType} from './project/order-type.enum';
import {Project} from './project/project';
import {ProjectService} from './project/project.service';
import {Student} from './student/student';
import {StudentService} from './student/student.service';

/**
 * main class / start page
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  /**
   * TODO: Add sorting and searching variables to URL (f.ex. for bookmarking, or sharing links)
   */

  /**
   * TODO: Add a search algorithm
   */

    // Website title
  title = "Project Manager"

  showTable: boolean = false;

  // Includes lists with database content
  projects?: Project[];
  Allocations?: Allocation[];
  students?: Student[];
  employments?: Employment[];

  // Specific entities: edit
  // New entity: create
  // undefined: do nothing
  currentProject?: Project;
  currentEmployment?: Employment;
  currentAllocation?: Allocation;
  currentStudent?: Student;

  uploadFile: boolean = false;

  sortProject: OrderType = OrderType.BEGIN_ASC;

  sortStudent: OrderType = OrderType.NAME_ASC;

  // Dependency injection: services are accessible from all components
  constructor(
    public projectService: ProjectService,
    public AllocationService: AllocationService,
    public studentService: StudentService,
    public employmentService: EmploymentService,
    public fileService: FileService
  ) {
  }

  // Tasks to do on initialization

  ngOnInit() {
    this.reload();
  }

  /**
   * Updates all entity lists
   */
  reload() {
    this.AllocationService.getAllocations().subscribe((AllocationList?: Allocation[]) => this.Allocations = AllocationList);
    this.projectService.getProjects().subscribe((projectList?: Project[]) => {
      this.projects = projectList;
      this.orderProject(this.sortProject);
    });
    this.employmentService.getEmployments().subscribe((employmentList?: Employment[]) => this.employments = employmentList);
    this.studentService.getStudents().subscribe((studentList?: Student[]) => this.students = studentList);
  }

  getUploadFile() {
    return this.uploadFile;
  }

  setUploadFile() {
    this.uploadFile = !this.uploadFile;
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
    this.currentProject = project;
  }

  /**
   * Getter for open/close project dialog
   * @returns Project
   */
  getCurrentProject(): Project | undefined {
    return this.currentProject;
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
    this.currentEmployment = employment;
  }

  /**
   * Getter for open/close employment dialog
   * @returns Employment
   */
  getCurrentEmployment(): Employment | undefined {
    return this.currentEmployment;
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
   */
  setCurrentAllocation(allocation: Allocation | undefined) {
    this.currentAllocation = allocation;
  }

  /**
   * Getter for open/close allocation dialog
   * @returns Allocation
   */
  getCurrentAllocation(): Allocation | undefined {
    return this.currentAllocation;
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
    this.currentStudent = student;
  }

  /**
   * Getter for open/close student dialog
   * @returns Student
   */
  getCurrentStudent(): Student | undefined {
    return this.currentStudent;
  }

  /**
   * Returns a new student for usage in html
   * @returns new Allocation
   */
  newStudent(): Student {
    return new Student();
  }

  /**
   * Adds ability to call sorting methods from html file (protected usage OrderTypes)
   * @param begin = true / end = false
   * @param desc = true / asc = false
   * @param byName = true / byDate = false
   */
  orderProjectHelper(begin: boolean, desc: boolean, byName: boolean) {
    if (!desc && byName) {
      this.orderProject(OrderType.NAME_ASC);
    } else if (desc && byName) {
      this.orderProject(OrderType.NAME_DESC);
    } else if (begin && desc) {
      this.orderProject(OrderType.BEGIN_DESC);
    } else if (begin && !desc) {
      this.orderProject(OrderType.BEGIN_ASC);
    } else if (!begin && desc) {
      this.orderProject(OrderType.END_DESC);
    } else if (!begin && !desc) {
      this.orderProject(OrderType.END_ASC);
    }
  }

  /**
   * Orders projects by starting date, end date, or name; both asc or dsc
   */
  orderProject(orderType: OrderType) {

    // Saves current order type
    this.sortProject = orderType;

    if (this.projects) {

      // Sort projects
      this.projects = this.projects.sort((project1, project2) => {
        switch (orderType) {
          case OrderType.NAME_DESC:
            return project2.name.localeCompare(project1.name);
          case OrderType.NAME_ASC:
            return project1.name.localeCompare(project2.name);
          case OrderType.BEGIN_DESC:
            return new Date(project2.period.begin).getTime() - new Date(project1.period.begin).getTime();
          case OrderType.BEGIN_ASC:
            return new Date(project1.period.begin).getTime() - new Date(project2.period.begin).getTime();
          case OrderType.END_DESC:
            return new Date(project2.period.end).getTime() - new Date(project1.period.end).getTime();
          case OrderType.END_ASC:
            return new Date(project1.period.end).getTime() - new Date(project2.period.end).getTime();
          default:
            return 1;
        }
      });
    }
  }

  /**
   * Access to change order type in frontend
   * @param begin = true; end = false
   * @param desc = true; asc = false
   * @param byName =true; byDate = false
   */
  orderStudentHelper(begin: boolean, desc: boolean, byName: boolean) {
    if (byName) {
      if (desc) {
        this.sortStudent = OrderType.NAME_DESC;
      } else {
        this.sortStudent = OrderType.NAME_ASC;
      }
    } else if (begin) {
      if (desc) {
        this.sortStudent = OrderType.BEGIN_DESC;
      } else {
        this.sortStudent = OrderType.BEGIN_ASC;
      }
    } else {
      if (desc) {
        this.sortStudent = OrderType.END_DESC;
      } else {
        this.sortStudent = OrderType.END_ASC;
      }
    }

    this.reload();
  }

  /**
   * Returns the sorted student allocations
   * @returns Allocation[] sorted by this.sortStudent
   * @param project to find allocations for
   */
  getAllocationsByProject(project: Project): Allocation[] {

    let allocationList: Allocation[] | undefined = this.Allocations?.filter(allocation => allocation.project.id == project.id);

    return allocationList ? allocationList.sort((alloc1, alloc2) => {
      if (alloc1.period && alloc2.period && alloc1.student?.firstName && alloc2.student?.firstName) {
        switch (this.sortStudent) {

          // Sorts students by ascending beginning date
          case OrderType.BEGIN_ASC:
            return new Date(alloc1.period.begin).getTime() - new Date(alloc2.period.begin).getTime();

          // Sorts students by descending beginning date
          case OrderType.BEGIN_DESC:
            return new Date(alloc2.period.begin).getTime() - new Date(alloc1.period.begin).getTime();

          // Sorts students by ascending ending date
          case OrderType.END_ASC:
            return new Date(alloc1.period.end).getTime() - new Date(alloc2.period.end).getTime();

          // Sorts students by descending ending date
          case OrderType.END_DESC:
            return new Date(alloc2.period.end).getTime() - new Date(alloc1.period.end).getTime();

          // Sorts students by ascending name and beginning date
          case OrderType.NAME_ASC:
            if (alloc1.student.id == alloc2.student.id) {
              return new Date(alloc1.period.begin).getTime() - new Date(alloc2.period.begin).getTime();
            }
            return alloc1.student.firstName.localeCompare(alloc2.student.firstName);

          // Sorts students by descending name and beginning date
          case OrderType.NAME_DESC:
            if (alloc1.student.id == alloc2.student.id) {
              return new Date(alloc2.period.begin).getTime() - new Date(alloc1.period.begin).getTime();
            }
            return alloc2.student.firstName.localeCompare(alloc1.student.firstName);
        }
      }
      return 1;
    }) : [];
  }
}
