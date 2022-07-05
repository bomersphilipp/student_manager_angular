import {TestBed} from '@angular/core/testing';

import {EmploymentService} from './employment.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('EmploymentService', () => {
    let service: EmploymentService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(EmploymentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
