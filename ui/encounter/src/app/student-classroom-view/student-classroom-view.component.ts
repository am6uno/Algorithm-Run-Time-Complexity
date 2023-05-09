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

/**
 * This component handles the student view for Classrooms.
 */
export class StudentClassroomViewComponent implements OnInit{
  student: any
  enrolledClassrooms : Classroom[]
  message: string
  
  /**
   * The constructor for this component.
   * @param authService - the authentication service for the session
   * @param userservice - the service for manipulating User objects
   * @param router - used to route the user to the right web page
   * @param _snackBar - used to deliver messages to the user 
   * @param studentservice - the service for manipulating Student objects
   * @param classroomservice - the service for manipulating Classroom objects
   * @param route - the Activated Route for this component
   */
  constructor(private authService: AuthService, protected userservice: UserService,
              private router: Router, private _snackBar: MatSnackBar, private studentservice: StudentService,
              private classroomservice: ClassroomService, private route: ActivatedRoute) {}

  /**
   * This method executes when the component is initialized.
   */
  ngOnInit() {
    this.studentservice.getStudent(this.userservice.user.id).subscribe(
      student => {
        this.student = student as Student
      }
    )

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
    // this.studentservice.getEnrollment()
  }

  /**
   * This method routes the student to the problem based on the problem id passed.
   * @param id - the id of the problem to be routed to
   */
  viewProblemSet(id: any): void {
    this.router.navigate(['student-problem-set/' + id] )
  }
}