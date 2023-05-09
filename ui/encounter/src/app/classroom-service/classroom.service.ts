import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Classroom} from "../classroom";
import {Student} from "../student";

@Injectable({
  providedIn: 'root',
})

/**
 * The service module for Classrooms
 */
export class ClassroomService {

  /**
   * The constructor for this service, contains info for the http client and a snack bar
   * @param http - the client for performing HTTP requests
   * @param _snackBar - used for providing messages to the user
   */
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }

  /**
   * Returns all the classrooms from the pipe.
   * @returns the list of classrooms, presents an error message if classrooms are unable to be obtained.
   */
  getAllClassRooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>("http://localhost:8080/classrooms").pipe(
      tap({
        error:() => this._snackBar.open('Unable to get classrooms', 'X', {duration:2000})
      }
      )
    );
  }

  /**
   * This method adds a classroom to the backend.
   * @param classroom the classroom to be added
   * @returns the post request.
   */
  addClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>("http://localhost:8080/classrooms", classroom).pipe(
      tap(
        {
        next:() => this._snackBar.open(`Classroom ${classroom.name} Created`, "X", {duration:2000}),
        error:() => this._snackBar.open('Unable to create classroom', 'X', {duration:2000})
        }
      )
    );
  }

  /**
   * This method returns a classroom by id from the backend.
   * @param classroomId - the id of the classroom.
   * @returns the get request from the backend.
   */
  getClassroomById(classroomId: number): Observable<Classroom> {
    return this.http.get<Classroom> ("http://localhost:8080/classrooms/" + classroomId)
  }

  /**
   * This method returns all the classrooms associated with a teacher's email from the backend. 
   * @param teacherEmail - the email of the teacher
   * @returns the get request from the backend.
   */
  getClassroomsByTeacherEmail(teacherEmail: string): Observable<any> {
    return this.http.get<Classroom[]>(`http://localhost:8080/classrooms/email/${teacherEmail}`)
  }

  /**
   * This method updates a classroom in the backend with new information.
   * @param classroom - the information to be added
   * @returns the put request from the backend
   */
  updateClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>("http://localhost:8080/classrooms/", classroom);
  }

  /**
   * This method adds a student to a classroom in the backennd
   * @param access_code - the access code for the classroom
   * @param classroom - the classroom to be added to
   * @param student_id - the id of the student to be added
   * @returns the put request from the backend.
   */
  addStudentToClassroom(access_code: string, classroom: Classroom, student_id: number): any {
    const url = `http://localhost:8080/classrooms/addStudent/${classroom.id}/${student_id}`
      if (access_code === classroom.access_code) {
        return this.http.put(url, null)
      }
  }

  /**
   * This method removes a student from the backend.
   * @param classroom - the classroom the student is being removed from
   * @param student_id - the student being removed
   * @returns the put request from the backend.
   */
  removeStudent(classroom: Classroom, student_id: number){
      return this.http.put(
        `http://localhost:8080/classrooms/removeStudent/${classroom.id}/${student_id}`,
        classroom
      ).subscribe()
  }
}
