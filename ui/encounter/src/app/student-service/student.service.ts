import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';

import { Student } from '../student';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Classroom} from "../classroom";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentUrl = 'http://18.117.164.173:8080/students';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  // Get all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('http://18.117.164.173:8080/students').pipe(
      tap(
        {error: () => this._snackBar.open('Unable to get problems','X', {duration: 2000})}
      )
    );
  }

  // Get a student by ID
  getStudent(id: number): Observable<Student> {
    const url = `${this.studentUrl}/${id}`;
    return this.http.get<Student>(url);
  }

  // Create a new student
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentUrl, student);
  }

  // Update a student
  updateStudent(student: Student): Observable<Student> {
    const url = `${this.studentUrl}/${student.id}`;
    return this.http.put<Student>(url, student);
  }

  // Delete a student
  deleteStudent(id: number): Observable<void> {
    const url = `${this.studentUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getEnrollment(student_id: number): Observable<Classroom[]> {
    const url = `${this.studentUrl}/${student_id}/classrooms`
    return this.http.get<Classroom[]>(url)
  }
}
