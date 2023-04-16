import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProblemSet } from '../problemset';

@Injectable({
  providedIn: 'root'
})
export class ProblemsetService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getProblemSetsByClassroomId(classroomId: number): Observable<ProblemSet[]>{
    return this.http.get<ProblemSet[]>("http://localhost:8080//problemsets/classroom/" + classroomId);
  }

  getProblemSetById(problemsetId: number): Observable<ProblemSet>{
    return this.http.get<ProblemSet>("http://localhost:8080/problemsets/" + problemsetId);
  }

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
}
