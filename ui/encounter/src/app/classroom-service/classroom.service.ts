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
    return this.http.get<Classroom[]>("http://18.117.164.173:8080/classrooms").pipe(
      tap({
        error:() => this._snackBar.open('Unable to get classrooms', 'X', {duration:2000})
      }
      )
    );
  }

  addClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>("http://18.117.164.173:8080/classrooms", classroom).pipe(
      tap(
        {
        next:() => this._snackBar.open(`Classroom ${classroom.name} Created`, "X", {duration:2000}),
        error:() => this._snackBar.open('Unable to create classroom', 'X', {duration:2000})
        }
      )
    );
  }

  getClassroomById(classroomId: number): Observable<Classroom> {
    return this.http.get<Classroom> ("http://18.117.164.173:8080/classrooms/" + classroomId)
  }

  getClassroomsByTeacherEmail(teacherEmail: string): Observable<any> {
    return this.http.get<Classroom[]>(`http://18.117.164.173:8080/classrooms/email/${teacherEmail}`)
  }

  updateClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>(`http://18.117.164.173:8080/classrooms/${classroom.id}`, classroom).pipe(
      tap(
        {
          next: () => this._snackBar.open(`Classroom: ${classroom.name} was Updated`, 'X', {duration: 2000}),
          error: () => this._snackBar.open('Unable to update Classroom','X', {duration: 2000})}
      )
    );
  }

  addStudentToClassroom(access_code: string, classroom: Classroom, student_id: number): any {
    const url = `http://18.117.164.173:8080/classrooms/addStudent/${classroom.id}/${student_id}`
    return this.http.put(url, null)
  }

  getClassroomByAccessCode(access_code: string): Observable<any> {
    const url = `http://18.117.164.173:8080/classrooms/code/${access_code}`
    return this.http.get<Classroom>(url)
  }

  removeStudent(classroom: Classroom, student_id: number){
      return this.http.put(
        `http://18.117.164.173:8080/classrooms/removeStudent/${classroom.id}/${student_id}`,
        classroom
      ).subscribe()
  }

  deleteClassroom(classroom_id: number) {
    return this.http.delete<Classroom>("http://18.117.164.173:8080/classrooms/" + classroom_id).subscribe()
  }
}
