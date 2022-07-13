import {TestBed} from "@angular/core/testing";

import {FileService} from "./file.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe("FileService", () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, AppRoutingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(FileService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
