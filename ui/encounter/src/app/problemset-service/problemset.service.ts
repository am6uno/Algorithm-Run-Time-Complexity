import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProblemSet } from '../problemset';

@Injectable({
  providedIn: 'root'
})

/**
 * The service for the ProblemSet object.
 */
export class ProblemsetService {

  /**
   * The constructor for the service.
   * @param http - the HTTP client for the service
   * @param _snackBar - used to deliver messages to the user
   */
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  /**
   * This method gets all the problem sets from the backend
   * @returns a get request for all problem sets.
   */
  getAllProblemSets(): Observable<ProblemSet[]>{
    return this.http.get<ProblemSet[]>("http://localhost:8080/problemsets");
  }

  /**
   * This method gets all the problemsets associated with a classroom.
   * @param classroomId - the id of the classroom 
   * @returns the get request for the problem sets.
   */
  getProblemSetsByClassroomId(classroomId: number): Observable<ProblemSet[]>{
    return this.http.get<ProblemSet[]>("http://localhost:8080/problemsets/classroom/" + classroomId);
  }

  /**
   * This method returns a problem set based on its id.
   * @param problemsetId - the id of the problem set to be returned
   * @returns a get request for a problem set
   */
  getProblemSetById(problemsetId: number): Observable<ProblemSet>{
    return this.http.get<ProblemSet>("http://localhost:8080/problemsets/" + problemsetId);
  }

  /**
   * This method adds a problem set to the backend.
   * @param problemset - the problem set to be added.
   * @returns the post request to the backend.
   */
  addProblemSet(problemset: ProblemSet): Observable<ProblemSet>{
    return this.http.post<ProblemSet>("http://localhost:8080/problemsets", problemset).pipe(
      tap(
      {
        next: () => this._snackBar.open(`Problem Set ${problemset.name} Created`, 'X', {duration: 2000}),
        error: () => this._snackBar.open('Unable to Create Problem Set','X', {duration: 2000})
      }
      )
    );
  }

  /**
   * This method updates a problem set in the backend.
   * @param problemset - the problemset data to be added
   * @param problemsetId - the problemset being updates
   * @returns a put request from the backend
   */
  updateProblemSet(problemset: ProblemSet, problemsetId: number): Observable<ProblemSet>{
    return this.http.put<ProblemSet>("http://localhost:8080/problemsets/" + problemsetId, problemset).pipe(
      tap(
      {
        next: () => this._snackBar.open(`Problem Set ${problemset.name} was Updated`, 'X', {duration: 2000}),
        error: () => this._snackBar.open('Unable to update Problem Set','X', {duration: 2000})
      }
      )
    );
  }

  /**
   * This method deletes a problem set from the backend
   * @param problemsetId - the id of the problem set to be deleted.
   * @returns a delete request from the backend.
   */
  deleteProblemSet(problemsetId: number): Observable<ProblemSet>{
    return this.http.delete<ProblemSet>("http://localhost:8080/problemsets/" + problemsetId);
  }
}
