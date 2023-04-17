import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Classroom} from "../classroom";
import {Student} from "../student";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {

  }

  getAllClassRooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>("http://localhost:8080/classrooms").pipe(
      tap({
        error:() => this._snackBar.open('Unable to get classrooms', 'X', {duration:2000})
      }
      )
    );
  }

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

  getClassroomById(classroomId: number): Observable<Classroom> {
    return this.http.get<Classroom> ("http://localhost:8080/classrooms/" + classroomId)
  }

  getClassroomsByTeacherEmail(teacherEmail: string): Observable<any> {
    console.log(teacherEmail);
    return this.http.get<Classroom[]>(`http://localhost:8080/classrooms?email=${teacherEmail}`)
  }

  addStudentToClassroom(classroom: Classroom, student: Student): void {
    const classroom_id = classroom.id;
    const student_id = student.id;
    const url = `http://localhost:8080/classrooms/${classroom_id}/students/${student_id}`

    this.http.post(url, null).pipe(
      tap(
        {
          next:() => this._snackBar.open(`Classroom ${classroom.name} updated`, "X", {duration:2000}),
          error:() => this._snackBar.open('Unable to add student', 'X', {duration:2000})
        }
      )
    );

  }

  removeStudentFromClassroom(classroom: Classroom, student:Student): void {
    const classroom_id = classroom.id;
    const student_id = student.id;
    const url = `http://localhost:8080/classrooms/${classroom_id}/students/${student_id}`

    this.http.post(url, null).pipe(
      tap(
        {
          next:() => this._snackBar.open(`Classroom ${classroom.name} Updated (Delete Student)`, "X", {duration:2000}),
          error:() => this._snackBar.open('Unable to remove student', 'X', {duration:2000})
        }
      )
    );
  }
}
