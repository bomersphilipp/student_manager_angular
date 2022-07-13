import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Project} from "./project";

@Injectable({
  providedIn: "any"
})
export class ProjectService {

  // Request must be in JSON type to communicate with Spring API
  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  projectUrl: string;

  /**
   * Sets the API URL
   * @param http dependency injection
   */
  constructor(private http: HttpClient) {
    this.projectUrl = "/api/project/";
  }

  /**
   * Gets all projects
   * @returns Observable<Project[]>
   */
  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }

  /**
   * Gets project by ID
   * @returns Observable<Project>
   * @param id
   */
  public getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.projectUrl + id)
  }

  /**
   * Creates a new project
   * @param project
   * @returns Observable<Project>
   */
  public addProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.projectUrl, project, this.httpOptions);
  }

  /**
   * Deletes a project
   * @param project
   * @returns Observable<Project>
   */
  public deleteProject(project: Project): Observable<Project> {
    return this.http.delete<Project>(this.projectUrl + project.id);
  }

  /**
   * Updates a project
   * @param project
   * @returns Observable<Project>
   */
  public editProject(project: Project): Observable<Project> {
    return this.http.patch<Project>(this.projectUrl, project, this.httpOptions);
  }
}
