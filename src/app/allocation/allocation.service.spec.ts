import {TestBed} from "@angular/core/testing";

import {AllocationService} from "./allocation.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe("AllocationService", () => {
  let service: AllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AllocationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
