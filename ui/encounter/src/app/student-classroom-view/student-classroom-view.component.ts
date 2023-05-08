import {Component, OnInit} from '@angular/core';
import {StudentService} from "../student-service/student.service";
import {StudentClassroomsComponent} from "../student-classrooms/student-classrooms.component";
import {AuthService} from "../auth.service";
import {UserService} from "../user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClassroomService} from "../classroom-service/classroom.service";
import {Classroom} from "../classroom";
import {Student} from "../student";

@Component({
  selector: 'app-student-classroom-view',
  templateUrl: './student-classroom-view.component.html',
  styleUrls: ['./student-classroom-view.component.css']
})
export class StudentClassroomViewComponent implements OnInit{
  student: Student
  enrolledClassrooms : Classroom[]
  message: string

  constructor(private authService: AuthService, protected userservice: UserService,
              private router: Router, private _snackBar: MatSnackBar, private studentservice: StudentService,
              private classroomservice: ClassroomService, private route: ActivatedRoute) {}

  ngOnInit() {
    if(this.authService.getLoggedUser()){
      this.studentservice.getEnrollment(this.userservice.user.id).subscribe(
        classrooms => {
          this.enrolledClassrooms = classrooms
          // console.log(classrooms)
          if (this.enrolledClassrooms.length === 0){
            this.message = "You are not currently enrolled in any classrooms."
          } else {
            this.message = "You are currently enrolled in: "
          }
        }
      )
      this.studentservice.getStudent(this.userservice.user.id).subscribe(
        student => {
          this.student = student as Student
        }
      )
    }
    // this.studentservice.getEnrollment()
  }


}
