import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Classroom} from "../classroom";
import {Student} from "../student";

@Injectable({
  providedIn: 'root',
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
    return this.http.put<Classroom>("http://localhost:8080/classrooms/", classroom);
  }

  // addStudentToClassroom(classroom: Classroom, student:Student): void {
  //   console.log(classroom);
  //   console.log(student);
  //   console.log("TYPE: " + typeof classroom.enrolled_students)
  //   let student_list = classroom.enrolled_students as Student[]
  //   student_list.push(student);
  //   classroom.enrolled_students = student_list
  //   // classroom.enrolled_students.add(student);
  //
  //   this.updateClassroom(classroom);
  //   console.log(classroom);
  // }

  addStudent(access_code: string, classroom: Classroom, student_id: number){
      if (access_code === classroom.access_code) {
        return this.http.put<Classroom>(
          `http://localhost:8080/classrooms/addStudent/${classroom.id}/${student_id}`,
          classroom
        )
      }
  }
  removeStudent(classroom: Classroom, student_id: number){
      return this.http.put(
        `http://localhost:8080/classrooms/removeStudent/${classroom.id}/${student_id}`,
        classroom
      )
  }
}
