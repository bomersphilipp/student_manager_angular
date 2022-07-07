import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AllocationComponent} from './allocation.component';
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe('AllocationComponent', () => {
    let component: AllocationComponent;
    let fixture: ComponentFixture<AllocationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppModule, AppRoutingModule],
            declarations: [AllocationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(AllocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
