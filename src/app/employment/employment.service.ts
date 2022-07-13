import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Employment} from "./employment";

/**
 * Employment Service
 */
@Injectable({
  providedIn: "any"
})
export class EmploymentService {

  // Request must be in JSON type to communicate with Spring API
  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  employmentUrl: string;

  /**
   * Sets the API URL
   * @param http dependency injection
   */
  constructor(private http: HttpClient) {
    this.employmentUrl = "/api/employment/";
  }

  /**
   * Gets all employments
   * @returns Observable<Employment[]>
   */
  public getEmployments(): Observable<Employment[]> {
    return this.http.get<Employment[]>(this.employmentUrl);
  }

  /**
   * Gets employment by ID
   * @returns Observable<Employment>
   * @param id
   */
  public getEmployment(id: number): Observable<Employment> {
    return this.http.get<Employment>(this.employmentUrl + id)
  }

  /**
   * Creates a new Employment
   * @returns Observable<Employment>
   * @param employment
   */
  public addEmployment(employment: Employment): Observable<Employment> {
    return this.http.put<Employment>(this.employmentUrl, employment, this.httpOptions);
  }

  /**
   * Deletes an Employment
   * @returns Observable<Employment>
   * @param employment
   */
  public deleteEmployment(employment: Employment): Observable<Employment> {
    return this.http.delete<Employment>(this.employmentUrl + employment.id);
  }

  /**
   * Updates an Employment
   * @returns Observable<Employment>
   * @param employment
   */
  public editEmployment(employment: Employment): Observable<Employment> {
    return this.http.patch<Employment>(this.employmentUrl, employment, this.httpOptions);
  }
}
