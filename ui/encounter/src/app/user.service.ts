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
  /**
  * Holds the information of the current logged in user.
  **/
  user: any;
  userDetails: any;

  /**
  *   updates the user information
  *   @param userDetails the user details from keycloak.
  *   @param role the user role specifying if they are a teacher or a student.
  **/
  updateUser(userObject: any, role: string){
    this.user = userObject;
    if(this.user){
      this.user.role = role;
    }
  }

  /**
  *   Posts a teacher to the backend.
  *   @param teacher a teacher.
  *   @returns an Teacher Observable.
  **/
  addTeacher(teacher: Teacher): Observable<Teacher>{
    return this.http.post<Teacher>("http://localhost:8080/teachers", teacher)
  }

  /**
  *   Gets a teacher by email from the backend.
  *   @param email the email of the teacher.
  *   @returns a Teacher Observable.
  **/
  getTeacherByEmail(email: string): Observable<Teacher>{
    return this.http.get<Teacher>("http://localhost:8080/teachers/email/" + email)
  }

  /**
  *   Gets a student by email from the backend.
  *   @param email the email of the student.
  *   @returns a Student Observable.
  **/
  getStudentByEmail(email: string): Observable<Student>{
    return this.http.get<Student>("http://localhost:8080/students/email/" + email)
  }

    /**
    *   Posts a teacher to the backend.
    *   @param student the student being added to the backend.
    *   @returns a Student Observable.
    **/
  addStudent(student: Student): Observable<Student>{
    return this.http.post<Student>("http://localhost:8080/students", student)
  }

}
