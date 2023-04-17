import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Classroom} from "../classroom";
import {Teacher} from "../teacher";
import {ClassroomService} from "../classroom-service/classroom.service";
import {UserService} from "../user.service";
import {Student} from "../student";
import {BehaviorSubject, Observable, switchMap} from "rxjs";

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

  constructor(private userService: UserService, private classroomService: ClassroomService, private router: Router, private route:ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService;
    this.userService.getTeacherByEmail(this.userService.user.email).subscribe({
    next:(teacher) => {
      this.teacher = teacher;
      this.teacherEmail = teacher.teacherEmail;
      this.name= '';
      // this.name= this.teacher.first_name + " " + this.teacher.last_name + "'s Classroom";
    },
      error: () => {
        this._snackBar.open('Could not fetch teacher','X', {duration: 2000});
      }
    })
    this.classroomService.getClassroomsByTeacherEmail(this.userService.user.email).subscribe({
      next: data=>{
      this.teacherClassrooms = data
      },
      error: () => {
        this._snackBar.open('Cannot Fetch Classrooms', 'X', {duration: 2000});
      }
    })
  }

  /** Generates a random 8 digit code for classroom enrollment. Not secure. */
  generateAccessCode = function (length = 10) {
    return Math.random().toString(36).substring(2, length);
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
        enrolled_students: this.enrolled_students
      }
      this.classroomService.addClassroom(newClassroom).subscribe();
      this._snackBar.open('Classroom added','X', {duration: 2000})
      this.router.navigateByUrl('/',{skipLocationChange: true}).then(
        () => {this.router.navigate([this.router.url])}
      )
    }
  }
}






