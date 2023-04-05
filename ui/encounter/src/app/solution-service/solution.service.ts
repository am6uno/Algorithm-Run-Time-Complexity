import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solution } from '../solution';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private http: HttpClient) { }

  addSolution(solution: Solution): Observable<Solution>{
    return this.http.post<Solution>("http://localhost:8080/solutions", solution);
  }
}
