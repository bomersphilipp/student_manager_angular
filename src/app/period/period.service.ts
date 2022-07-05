import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Period} from './period';

/**
 * Period service
 */
@Injectable({
    providedIn: 'root',
})
export class PeriodService {

    // Request must be in JSON type to communicate with Spring API
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    periodUrl: string;

    /**
     * Sets the API URL
     * @param http dependency injection
     */
    constructor(private http: HttpClient) {
        this.periodUrl = '/api/period/';
    }

    /**
     * Gets all periods
     * @returns Observable<Period[]>
     */
    public getPeriods(): Observable<Period[]> {
        return this.http.get<Period[]>(this.periodUrl);
    }

    /**
     * Gets period by ID
     * @returns Observable<Period>
     * @param id
     */
    public getPeriod(id: number): Observable<Period> {
        return this.http.get<Period>(this.periodUrl + id)
    }

    /**
     * Creates a new period
     * @param period
     * @returns Observable<Period>
     */
    public addPeriod(period: Period): Observable<Period> {
        return this.http.put<Period>(this.periodUrl, period, this.httpOptions);
    }

    /**
     * Deletes a period
     * @param period
     * @returns Observable<Period>
     */
    public deletePeriod(period: Period): Observable<Period> {
        return this.http.delete<Period>(this.periodUrl + period.id);
    }

    /**
     * Updates a period
     * @param period
     * @returns Observable<Period>
     */
    public editPeriod(period: Period): Observable<Period> {
        return this.http.patch<Period>(this.periodUrl, period, this.httpOptions);
    }
}
