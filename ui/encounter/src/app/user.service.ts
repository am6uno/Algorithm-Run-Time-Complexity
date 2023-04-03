import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from './teacher';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  user: any;

  addTeacher(teacher: Teacher): Observable<Teacher>{
    return this.http.post<Teacher>("http://localhost:8080/teachers", teacher)
  }

  getTeacherByEmail(email: string): Observable<Teacher>{
    return this.http.get<Teacher>("http://localhost:8080/teachers/email/" + email)
  }

}
