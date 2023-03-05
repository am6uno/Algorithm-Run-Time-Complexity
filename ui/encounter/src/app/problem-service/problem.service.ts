import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Problem } from '../problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http: HttpClient) {
  }

  /**
   * Retrieves all problems from the backend.
   * @returns The list of all problems.
   */
  getAllProblems(): Observable<Problem[]>{
    return this.http.get<Problem[]>("http://localhost:8080/problems")
  }
}
