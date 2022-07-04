import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

/**
 * Updated for lazy loading
 */
const routes: Routes = [
  {
    path: 'period',
    loadChildren: () => import('./period/period.component').then(m => m.PeriodComponent)
  },
  {
    path: 'employment',
    loadChildren: () => import('./employment/employment.component').then(m => m.EmploymentComponent)
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.component').then(m => m.ProjectComponent)
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.component').then(m => m.StudentComponent)
  },
  {
    path: 'allocation',
    loadChildren: () => import('./allocation/allocation.component').then(m => m.AllocationComponent)
  },
  {
    path: 'file',
    loadChildren: () => import('./file/file.component').then(m => m.FileComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
