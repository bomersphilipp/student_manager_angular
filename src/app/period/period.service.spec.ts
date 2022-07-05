import {TestBed} from '@angular/core/testing';

import {PeriodService} from './period.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PeriodService', () => {
    let service: PeriodService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(PeriodService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
