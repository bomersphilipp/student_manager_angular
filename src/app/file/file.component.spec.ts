import {ComponentFixture, TestBed} from "@angular/core/testing";

import {FileComponent} from "./file.component";
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe("FileComponent", () => {
  let component: FileComponent;
  let fixture: ComponentFixture<FileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule],
      declarations: [FileComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
