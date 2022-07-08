import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PeriodComponent} from "./period/period.component";
import {EmploymentComponent} from "./employment/employment.component";
import {ProjectComponent} from "./project/project.component";
import {StudentComponent} from "./student/student.component";
import {AllocationComponent} from "./allocation/allocation.component";
import {FileComponent} from "./file/file.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

@NgModule({
    imports: [RouterModule.forRoot(
        [
            {
                path: '',
                component: PeriodComponent,
                pathMatch: 'full'
            },
            {
                path: 'period',
                component: PeriodComponent
            },
            {
                path: 'employment',
                component: EmploymentComponent
            },
            {
                path: 'project',
                component: ProjectComponent
            },
            {
                path: 'student',
                component: StudentComponent
            },
            {
                path: 'allocation',
                component: AllocationComponent
            },
            {
                path: 'file',
                component: FileComponent
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ]
    )],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
