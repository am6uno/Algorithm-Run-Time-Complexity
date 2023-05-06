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
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-classroom-creation',
  templateUrl: './classroom-creation.component.html',
  styleUrls: ['./classroom-creation.component.css']
})
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
  dialog: MatDialog
  showChild: any


  constructor(private userService: UserService, private classroomService: ClassroomService,
              private studentService: StudentService, private router: Router,
              private route:ActivatedRoute, private _snackBar: MatSnackBar) {
  }

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
      this.showChild = Array(this.teacherClassrooms?.length).fill(true)
      },
      error: () => {
        this._snackBar.open('Cannot Fetch Classrooms', 'X', {duration: 2000});
      }
    })
  }

  /** Generates a random 8 digit code for classroom enrollment. Not secure. */
  generateAccessCode = function (length = 10) {
    return Math.random().toString(36).substring(2, length).toUpperCase();
  }

  setTitleInput(event: any){
    this.name = event.target.innerText;
    this.length = this.name.length;
  }
  formComplete() {
    if (this.length > 0) {
      return true;
    }
    return false;
  }

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

  getAllStudents(): void {
    this.view_student = true;
  }

  addStudentTest(): void {
    // @ts-ignore
    // @ts-ignore
 this.classroomService.addStudentToClassroom(
    // @ts-ignore
      this.teacherClassrooms[0].access_code, this.teacherClassrooms[0], 1
    ).subscribe()
  }


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
        accessCode: this.generateAccessCode(),
        teacher: this.teacher,
        enrolled_students: [],

      }
      this.classroomService.addClassroom(newClassroom).subscribe(
classroom => this.teacherClassrooms?.push(classroom),
        this.showChild.push(true)
      );
    }

  }
  onChildRemove(index: number) {
    this.showChild[index] = false;
  }
}






