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

  updateClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>("http://localhost:8080/classrooms/", classroom);
  }

  addStudentToClassroom(classroom: Classroom, student:Student): void {
    classroom.enrolled_students.concat(student);

    this.updateClassroom(classroom);
  }

  removeStudentFromClassroom(classroom: Classroom, student:Student): void {

    const student_id = student.id;
    classroom.enrolled_students = classroom.enrolled_students
      .filter(student => student_id !== student.id );

    this.updateClassroom(classroom);






  }
}
