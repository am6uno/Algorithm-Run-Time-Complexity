import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';

import { Student } from '../student';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

/**
 * This is the service for the Student class.
 */
export class StudentService {
  private studentUrl = 'http://localhost:8080/students';

  /**
   * The constructor for the service.
   * @param http - the HTTP client 
   * @param _snackBar - for delivering messages to users
   */
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  /**
   * Makes a get request to return all students
   * @returns a get request for all Student objects
   */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('http://localhost:8080/students').pipe(
      tap(
        {error: () => this._snackBar.open('Unable to get problems','X', {duration: 2000})}
      )
    );
  }

  // Get a student by ID
  /**
   * Retrieves a Student by its id.
   * @param id - the Student object's id
   * @returns a get request for a student object
   */
  getStudent(id: number): Observable<Student> {
    const url = `${this.studentUrl}/${id}`;
    return this.http.get<Student>(url);
  }

  /**
   * This method creates a student and adds it to the backend.
   * @param student - the Student object to add
   * @returns the post request to the backend.
   */
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentUrl, student);
  }

  /**
   * This method updates a student object with new information.
   * @param student - the new data to be updated
   * @returns a put request to the backend.
   */
  updateStudent(student: Student): Observable<Student> {
    const url = `${this.studentUrl}/${student.id}`;
    return this.http.put<Student>(url, student);
  }

  /**
   * This method deletes a student from the backend.
   * @param id - the id of the Student to be deleted.
   * @returns a delete request to the backend.
   */
  deleteStudent(id: number): Observable<void> {
    const url = `${this.studentUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
