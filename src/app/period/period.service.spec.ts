import {TestBed} from '@angular/core/testing';

import {PeriodService} from './period.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";

describe('PeriodService', () => {
    let service: PeriodService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, AppRoutingModule, HttpClientTestingModule],
        });
        service = TestBed.inject(PeriodService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
