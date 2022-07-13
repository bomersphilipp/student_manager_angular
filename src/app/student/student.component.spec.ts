import {ComponentFixture, TestBed} from "@angular/core/testing";

import {StudentComponent} from "./student.component";
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe("StudentComponent", () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule],
      declarations: [StudentComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
