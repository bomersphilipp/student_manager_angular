import {TestBed} from "@angular/core/testing";

import {EmploymentService} from "./employment.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe("EmploymentService", () => {
  let service: EmploymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(EmploymentService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
