import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Classroom} from "../classroom";
import {Teacher} from "../teacher";
import {ClassroomService} from "../classroom-service/classroom.service";
import {UserService} from "../user.service";
import {Student} from "../student";

@Component({
  selector: 'app-classroom-creation',
  templateUrl: './classroom-creation.component.html',
  styleUrls: ['./classroom-creation.component.css']
})
export class ClassroomCreationComponent {
  id?: number = 1
  name: string = ''
  access_code: string = ''
  teacher: Teacher
  teacherName: string = ''
  teacherEmail: string
  enrolled_students: Set<Student>

  constructor(private userService: UserService, private classroomService: ClassroomService, private router: Router, private route:ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService;
    this.userService.getTeacherByEmail(this.userService.user.email).subscribe({
    next:(teacher) => {
      this.teacher = teacher;
      this.teacherEmail = teacher.teacherEmail;
      this.teacherName = this.teacher.first_name + " " + this.teacher.last_name;
    },
      error: () => {
        this._snackBar.open('Could not fetch teacher','X', {duration: 2000});
      }
    })

  }

  /** Generates a random 8 digit code for classroom enrollment. Not secure. */
  generateAccessCode = function (length = 10) {
    return Math.random().toString(36).substring(2, length);
  }

  setTitleInput(event: any){
    this.name = event.target.innerText;
  }
  formComplete() {
    if (this.name.length > 0) {
      return true;
    }
    return false;
  }

  submitClassroom() {
    if (!this.formComplete()) {
      this._snackBar.open('Form Incomplete','X', {duration: 2000})
    }
    else {
      const newClassroom: Classroom = {
        name: this.name,
        access_code: this.generateAccessCode(),
        teacher: this.teacher,
        enrolled_students: this.enrolled_students
      }
      this.classroomService.addClassroom(newClassroom).subscribe()
    }
  }
}






