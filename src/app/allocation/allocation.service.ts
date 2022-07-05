import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Allocation} from "./allocation";

/**
 * Allocation service
 */
@Injectable({
    providedIn: 'root'
})
export class AllocationService {

    // Request must be in JSON type to communicate with Spring API
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    AllocationUrl: string;

    /**
     * Sets the API URL
     * @param http dependency injection
     */
    constructor(private http: HttpClient) {
        this.AllocationUrl = '/api/allocation/';
    }

    /**
     * Gets all Allocations
     * @returns Observable<Allocation[]>
     */
    public getAllocations(): Observable<Allocation[]> {
        return this.http.get<Allocation[]>(this.AllocationUrl);
    }

    /**
     * Gets Allocation by ID
     * @returns Observable<Allocation>
     * @param id of allocation
     */
    public getAllocation(id: number): Observable<Allocation> {
        return this.http.get<Allocation>(this.AllocationUrl + id)
    }

    /**
     * Creates a new Allocation
     * @param Allocation
     * @returns Observable<Allocation>
     */
    public addAllocation(Allocation: Allocation): Observable<Allocation> {
        return this.http.put<Allocation>(this.AllocationUrl, Allocation, this.httpOptions);
    }

    /**
     * Deletes an Allocation
     * @param Allocation
     * @returns Observable<Allocation>
     */
    public deleteAllocation(Allocation: Allocation): Observable<Allocation> {
        return this.http.delete<Allocation>(this.AllocationUrl + Allocation.id);
    }

    /**
     * Updates an Allocation
     * @param Allocation
     * @returns Observable<Allocation>
     */
    public editAllocation(Allocation: Allocation): Observable<Allocation> {
        return this.http.patch<Allocation>(this.AllocationUrl, Allocation, this.httpOptions);
    }
}
