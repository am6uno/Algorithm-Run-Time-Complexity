import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { Problem } from '../problem';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

/**
 * This is the service for the Problem class.
 */
export class ProblemService {
  
  /**
   * This is the constructor for the service.
   * @param http - the HTTP client for the service
   * @param _snackBar - used to deliver messages to the user
   */
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  /**
   * Retrieves all problems from the backend.
   * @returns The list of all problems.
   */
  getAllProblems(): Observable<Problem[]>{
    return this.http.get<Problem[]>("http://localhost:8080/problems").pipe(
      tap(
      {
        error: () => this._snackBar.open('Unable to get problems','X', {duration: 2000})
      }
      )
    );
  }

  /**
  *   Posts a problem to the backend.
  *   @param problem a problem.
  *   @returns a Problem Observable.
  **/
  addProblem(problem: Problem): Observable<Problem>{
    return this.http.post<Problem>("http://localhost:8080/problems", problem).pipe(
      tap(
      {
        next: () => this._snackBar.open(`Problem ${problem.name} Created`, 'X', {duration: 2000}),
        error: () => this._snackBar.open('Unable to Create Problem','X', {duration: 2000})
      }
      )
    );
  }

  /**
  *   Retrieves a problem from the backend with the specified Id.
  *   @param problemId The id of the problem to retrieve.
  *   @returns Returns an observable of the problem that it receives from the backend.
  **/
  getProblemById(problemId:number): Observable<Problem>{
    return this.http.get<Problem>("http://localhost:8080/problems/" + problemId);
  }

  /**
  *   Retrieves the problems from the backend with the specified setId.
  *   @param setId The id of the set that the problems belong to.
  *   @returns Returns an observable of the problem that it receives from the backend.
  **/
  getProblemBySetId(setId:number): Observable<Problem[]>{
    return this.http.get<Problem[]>("http://localhost:8080/set/problems/" + setId);
  }

  /**
  *   Deletes the problems from the backend with the specified problemId.
  *   @param problemId The id of the problem.
  *   @returns The result from the delete request.
  **/
  deleteProblem(problemId:number){
      return this.http.delete<Problem>("http://localhost:8080/problems/" + problemId);
  }

    /**
  *   Updates the problems with the specified problemId.
  *   @param problemId The id of the problem.
  *   @returns The result from the delete request.
  **/
  updateProblem(problemId:number, problem: Problem){
    return this.http.put<Problem>("http://localhost:8080/problems/" + problemId, problem);
  }
}
