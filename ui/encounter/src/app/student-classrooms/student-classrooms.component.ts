import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StudentService} from "../student-service/student.service";
import {ClassroomService} from "../classroom-service/classroom.service";
import {Teacher} from "../teacher";
import {Classroom} from "../classroom";


@Component({
  selector: 'app-student-classrooms',
  templateUrl: './student-classrooms.component.html',
  styleUrls: ['./student-classrooms.component.css']
})
export class StudentClassroomsComponent implements OnInit {
  classroom: Classroom
  access_code: string
  maxlength = 8
  teacher: Teacher
  student_id: number
  constructor(private authService: AuthService, protected userservice: UserService,
              private router: Router, private _snackBar: MatSnackBar, private studentservice:StudentService,
              private classroomservice: ClassroomService, private route:ActivatedRoute){}
  ngOnInit() {
    if(this.authService.getLoggedUser()) {

      if (!(this.userservice.user.role = 'student')) {
        this.router.navigate([''])
      }
      else {
        this.student_id = this.userservice.user.id
      }
    }
  }

  setCodeInput(event: any){
    this.access_code = event.target.innerText;
  }

  enforceMaxLength(event: any) {
    let element = event.target as HTMLElement
    let text = element.textContent!.trim()
    if (text.length >= 8 && event.key !=='Backspace') {
      event.preventDefault()
    }
  }

  joinClassroom() {
    console.log(this.access_code)
    this.classroomservice.getClassroomByAccessCode(this.access_code).subscribe({
      next: classroom => {this.classroom = classroom;
      this.teacher = this.classroom.teacher;
      }}
    )
  }

  confirmJoinClassroom(): void {
    this.classroomservice.addStudentToClassroom(this.access_code, this.classroom, this.student_id).subscribe()
  }

}
