import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { Problem } from '../problem';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

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
}
