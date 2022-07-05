import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Student} from './student';

/**
 * Student service
 */
@Injectable({
    providedIn: 'root'
})
export class StudentService {

    // Request must be in JSON type to communicate with Spring API
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    studentUrl: string;

    /**
     * Sets the API URL
     * @param http dependency injection
     */
    constructor(private http: HttpClient) {
        this.studentUrl = '/api/student/';
    }

    /**
     * Gets all students
     * @returns Observable<Student[]>
     */
    public getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(this.studentUrl);
    }

    /**
     * Get student by ID
     * @returns Observable<Student>
     * @param id
     */
    public getStudent(id: number): Observable<Student> {
        return this.http.get<Student>(this.studentUrl + id)
    }

    /**
     * Creates a new student
     * @param student
     * @returns Observable<Student>
     */
    public addStudent(student: Student): Observable<Student> {
        return this.http.put<Student>(this.studentUrl, student, this.httpOptions);
    }

    /**
     * Deletes a student
     * @param student
     * @returns OObservable<Student>
     */
    public deleteStudent(student: Student): Observable<Student> {
        return this.http.delete<Student>(this.studentUrl + student.id);
    }

    /**
     * Updates a student
     * @param student
     * @returns Observable<Student>
     */
    public editStudent(student: Student): Observable<Student> {
        return this.http.patch<Student>(this.studentUrl, student, this.httpOptions);
    }
}
