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

/**
 * This component handles the student side of Classroom management.
 */
export class StudentClassroomsComponent implements OnInit {
  classroom: Classroom
  access_code: string
  maxlength = 8
  teacher: Teacher
  student_id: number
  valid_code: boolean
  in_class: boolean

  /**
   * The constructor for this component.
   * @param authService - the authentication service that handles the session.
   * @param userservice - the service for handling User objects
   * @param router - used for routing the user to the correct page
   * @param _snackBar - used for delivering messages to the user
   * @param studentservice - the service for for manipulating Student objects
   * @param classroomservice - the service for manipulating Classroom objects
   * @param route - the activated route for this component
   */
  constructor(private authService: AuthService, protected userservice: UserService,
              private router: Router, private _snackBar: MatSnackBar, private studentservice:StudentService,
              private classroomservice: ClassroomService, private route:ActivatedRoute){}

  /**
   * This method executes when the component is initialized.
   */
  ngOnInit() {
      if (!(this.userservice.user.role = 'student')) {
        this.router.navigate([''])
      }
      else {
        this.student_id = this.userservice.user.id
      }
  }

  /**
   * This method handles the access code input by the student.
   * @param event - the current event
   */
  setCodeInput(event: any){
    this.access_code = event.target.innerText;
  }

  /**
   * This method enforces the max length fo an access code entered.
   * @param event - the current event
   */
  enforceMaxLength(event: any) {
    let element = event.target as HTMLElement
    let text = element.textContent!.trim()
    if (text.length >= 8 && event.key !=='Backspace') {
      event.preventDefault()
    }
  }

  /**
   * This method checks if the access code entered by the student is valid.
   * @param event - the current event
   */
  checkValidCode(event: any) {
    let element = event.target as HTMLElement
    let ac = element.textContent!.trim()
    let submitButton = document.getElementById('search-for-classroom-button') as HTMLElement
    if (ac.length === 8) {
      element.classList.add('signup-code-valid')
      submitButton.classList.add("clickable")
      this.valid_code = true
    } else {
      element.classList.remove('signup-code-valid')
      submitButton.classList.remove("clickable")
      this.valid_code = false
    }
  }

  /**
   * This method finds the classroom to be joined by the student and provides a success/error message.
   */
  joinClassroom() {
    if (this.valid_code) {
      this.classroomservice.getClassroomByAccessCode(this.access_code).subscribe({
          next: classroom => {
            this.classroom = classroom;
            if (this.classroom == null) {
              this._snackBar.open('Classroom Not Found!','X', {duration: 2000})
            } else {
              this.teacher = this.classroom.teacher;
              this._snackBar.open('Classroom Found!','X', {duration: 2000})
            }
          }
        }
      )
    }
  }

  /**
   * This method adds the student to the classroom and provides the user with a confirmation message.
   */
  confirmJoinClassroom(): void {
    this.classroomservice.addStudentToClassroom(this.access_code, this.classroom, this.student_id).subscribe()
    this._snackBar.open('Enrolled Successfully!','X', {duration: 2000})
    this.router.navigate([''])
  }
}
