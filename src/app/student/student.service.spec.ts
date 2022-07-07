import {TestBed} from '@angular/core/testing';

import {StudentService} from './student.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe('StudentService', () => {
    let service: StudentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, AppRoutingModule, HttpClientTestingModule],
        });
        service = TestBed.inject(StudentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
