import {Component, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Classroom} from "../classroom";
import {Teacher} from "../teacher";
import {ClassroomService} from "../classroom-service/classroom.service";
import {UserService} from "../user.service";
import {Student} from "../student";
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {StudentService} from "../student-service/student.service";

/**
 * This is the compnent for teacher Classroom creation.
 */
@Component({
  selector: 'app-classroom-creation',
  templateUrl: './classroom-creation.component.html',
  styleUrls: ['./classroom-creation.component.css']
})

/**
 * The main class for classroom creation.
 */
export class ClassroomCreationComponent {
  refreshClassrooms$ = new BehaviorSubject<boolean>(true)
  id?: number = 1
  name: string = ''
  length: number
  access_code: string = ''
  teacher: Teacher
  teacherEmail: string
  teacherClassrooms?: Classroom[]
  enrolled_students: any = undefined
  student_list?: Student[]
  view_student: boolean = false;
  newclass: Classroom

  /**
   * This is the constructor for the component. 
   * @param userService - userService object to be used for retrieving teacher data
   * @param classroomService - used to fetch classrooms
   * @param studentService - used to fetch students
   * @param router - used to route to the proper classroom
   * @param route - the route being used
   * @param _snackBar - used for message dispatching
   */
  constructor(private userService: UserService, private classroomService: ClassroomService,
              private studentService: StudentService, private router: Router,
              private route:ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  /**
   * The method being called when the component is initialized. Retrieves the list of students, the teacher for the classroom,
   * and each classroom associated with the teacher.
   */
  ngOnInit(): void {

    this.studentService.getStudents()
      .subscribe(students => {
        this.student_list = students;
      });
    this.userService.getTeacherByEmail(this.userService.user.teacherEmail).subscribe({next:teacher =>
      this.teacher = teacher})
    this.teacher = {
      first_name: this.userService.user.first_name,
      last_name: this.userService.user.last_name,
      teacherEmail: this.userService.user.teacherEmail,
    }
    this.teacherEmail = this.userService.user.teacherEmail

    this.classroomService.getClassroomsByTeacherEmail(this.teacherEmail).subscribe({
      next: data=>{
      this.teacherClassrooms = data
      },
      error: () => {
        this._snackBar.open('Cannot Fetch Classrooms', 'X', {duration: 2000});
      }
    })
  }

  /**
   * Generates a random 8 digit code for classroom enrollment. Not secure.
   * @param length - the length of the code, shortened to 8 later on
   * @returns a random 8 digit access code.
   */
  generateAccessCode = function (length = 10) {
    return Math.random().toString(36).substring(2, length);
  }

  /**
   * Sets the input for an event
   * @param event - the event to grab text from
   */
  setTitleInput(event: any){
    this.name = event.target.innerText;
    this.length = this.name.length;
  }
  /**
   * A boolean method: if this form has input, it is complete
   * @returns If the form is complete
   */
  formComplete() {
    if (this.length > 0) {
      return true;
    }
    return false;
  }

  /**
   * This method checks if a classroom name is unique.
   * @returns true if the classroom name is unique, false if not
   */
  checkUniqueClassroomName(){
    // @ts-ignore
    var classroom_names = this.teacherClassrooms.map(t=>t.name)
    for (let name of classroom_names){
      if (this.name == name){
        return false
      }
    }
    return true
  }

  /**
   * This method returns all students.
   */
  getAllStudents(): void {
    this.view_student = true;
  }

  /**
   * This method adds a student to a classroom.
   */
  addStudentTest(): void {
    // @ts-ignore
    // @ts-ignore
 this.classroomService.addStudentToClassroom(
    // @ts-ignore
      this.teacherClassrooms[0].access_code, this.teacherClassrooms[0], 1
    ).subscribe()
  }

  /**
   * This method creates the classroom if the form has been completed and the classroom name is unique.
   */
  submitClassroom() {
    if (!this.formComplete()) {
      this._snackBar.open('Form Incomplete','X', {duration: 2000})
    }
    else if(!this.checkUniqueClassroomName()){
      this._snackBar.open('Classroom name not unique','X', {duration: 2000})
    }
    else {
      const newClassroom: Classroom = {
        name: this.name,
        access_code: this.generateAccessCode(),
        teacher: this.teacher,
        enrolled_students: [],

      }
      this.classroomService.addClassroom(newClassroom).subscribe(
classroom => this.teacherClassrooms?.push(classroom)
      );
    }

  }
}