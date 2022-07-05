import {TestBed} from '@angular/core/testing';

import {AllocationService} from './allocation.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AllocationService', () => {
    let service: AllocationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(AllocationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
