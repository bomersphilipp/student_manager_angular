import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {Period} from "../period/period";
import {Student} from "../student/student";
import {Allocation} from './allocation';
import {Project} from "../project/project";

/**
 * Allocation component
 */
@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.css']
})
export class AllocationComponent implements OnInit {

  // Creates an empty allocation to access and edit in formulary
  allocation: Allocation = new Allocation;

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
    const currentAllocation: Allocation | undefined = this.appComponent.getCurrentAllocation();
    if (currentAllocation) {
      this.allocation = currentAllocation;
      this.allocation.student = currentAllocation.student || new Student();
      this.allocation.period = currentAllocation.period || new Period();
    } else {
      this.closeAllocation();
    }
  }

  /**
   * Saves the new allocation in database
   */
  saveAllocation(): void {
    const currentProject: Project | undefined = this.appComponent.getCurrentProject()
    this.allocation.project = currentProject || this.allocation.project;
    if (this.allocation) {
      if (this.allocation.id == undefined) {

        // Saves new allocation
        this.appComponent.AllocationService.addAllocation(this.allocation).subscribe({

          // Closes dialog
          complete: () => this.closeAllocation(),

          // Fetches validation issues
          error: error => this.error = error
        });
      } else {

        // update allocation
        this.appComponent.AllocationService.editAllocation(this.allocation).subscribe({

          // closes dialog
          complete: () => this.closeAllocation(),

          // fetches validation issues
          error: error => this.error = error
        });
      }
    }
  }

  /**
   * Deletes an allocation
   */
  deleteAllocation(): void {
    this.appComponent.AllocationService.deleteAllocation(this.allocation).subscribe({

      // closes dialog
      complete: () => this.closeAllocation(),

      // fetches validation issues
      error: error => this.error = error
    });
  }

  /**
   * Returns to the start page (appComponent)
   */
  closeAllocation(): void {

    // reloads all lists
    this.appComponent.fetchAllocations();

    // closes project dialog
    this.appComponent.setCurrentAllocation(undefined);
    this.appComponent.setCurrentProject(undefined);
  }
}
