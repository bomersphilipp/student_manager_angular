import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectComponent} from './project.component';
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe('ProjectComponent', () => {
    let component: ProjectComponent;
    let fixture: ComponentFixture<ProjectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule, AppRoutingModule],
            declarations: [ProjectComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
