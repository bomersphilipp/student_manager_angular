import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AllocationComponent} from './allocation/allocation.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmploymentComponent} from './employment/employment.component';
import {FileComponent} from './file/file.component';
import {PeriodComponent} from './period/period.component';
import {ProjectComponent} from './project/project.component';
import {StudentComponent} from './student/student.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        PeriodComponent,
        EmploymentComponent,
        ProjectComponent,
        StudentComponent,
        AllocationComponent,
        FileComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
