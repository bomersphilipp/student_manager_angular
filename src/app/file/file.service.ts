import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


/**
 * File service
 */
@Injectable({
  providedIn: 'root'
})
export class FileService {

  fileUrl: string;

  /**
   * Sets the API URL
   * @param http dependency injection
   */
  constructor(private http: HttpClient) {
    this.fileUrl = '/api/file/';
  }

  /**
   * Upload xlsx file to push values into database
   * @param file .xlsx file
   * @returns string with report
   */
  upload(file: File): Observable<string> {

    // Adds file to Request
    const formData: FormData = new FormData();
    formData.append('file', file);

    // Sends request
    return this.http.post<string>(this.fileUrl, formData);
  }
}
