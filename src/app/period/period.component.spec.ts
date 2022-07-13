import {ComponentFixture, TestBed} from "@angular/core/testing";

import {PeriodComponent} from "./period.component";
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe("PeriodComponent", () => {
  let component: PeriodComponent;
  let fixture: ComponentFixture<PeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule],
      declarations: [PeriodComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
