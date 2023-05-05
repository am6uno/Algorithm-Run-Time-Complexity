import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solution } from '../solution';
import { Problem } from '../problem';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http: HttpClient) { }

  /**
  *   Sends a Post request with a solution to the backend.
  *   @param solution a solution from a student.
  *   @returns a Solution Observable.
  **/
  addSolution(solution: Solution): Observable<Solution>{
    return this.http.post<Solution>("http://18.117.164.173:8080/solutions", solution);
  }

  /**
  *   Sends a Post request with a solution to the backend.
  *   @param solution a solution from a student.
  *   @returns a Solution Observable.
  **/
  getSolutionByProblemId(problemId: number){
    return this.http.get<Solution[]>("http://18.117.164.173:8080/solutions/problem/" + problemId);
  }
}
