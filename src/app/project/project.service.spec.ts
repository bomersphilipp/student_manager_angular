import {TestBed} from "@angular/core/testing";

import {ProjectService} from "./project.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe("ProjectService", () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
