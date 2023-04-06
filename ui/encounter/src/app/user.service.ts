import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from './teacher';
import { Observable, tap } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  user: any;

  updateUser(userDetails: any, role: string){
    this.user = {
      firstName: userDetails.given_name,
      lastName: userDetails.family_name,
      email: userDetails.email,
      role: role,
    }
  }

  addTeacher(teacher: Teacher): Observable<Teacher>{
    return this.http.post<Teacher>("http://localhost:8080/teachers", teacher)
  }

  getTeacherByEmail(email: string): Observable<Teacher>{
    return this.http.get<Teacher>("http://localhost:8080/teachers/email/" + email)
  }

  getStudentByEmail(email: string): Observable<Teacher>{
    return this.http.get<Teacher>("http://localhost:8080/students/email/" + email)
  }

  addStudent(student: Student): Observable<Student>{
    return this.http.post<Student>("http://localhost:8080/students", student)
  }

}
