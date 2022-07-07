import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmploymentComponent} from './employment.component';
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe('EmploymentComponent', () => {
    let component: EmploymentComponent;
    let fixture: ComponentFixture<EmploymentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule, AppRoutingModule],
            declarations: [EmploymentComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(EmploymentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
