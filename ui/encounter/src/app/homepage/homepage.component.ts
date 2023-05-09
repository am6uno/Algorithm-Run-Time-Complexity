import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

/**
 * This component provides a homepage for the user.
 */
export class HomepageComponent implements OnInit {

  /**
   * The constructor for this component, contains data for the authservice, userservice, router, and snackbar.
   * @param authService - used for authenticating a user session
   * @param userService  - used to determine a user's role and route them to the correct side of the app.
   * @param router - used to route the correct page
   * @param _snackBar - used to provide messages to the user
   */
  constructor(private authService: AuthService, protected userService: UserService, private router: Router, private _snackBar: MatSnackBar){}
  checkingIsTeacher: boolean = true;
  checkingIsStudent: boolean = true;
  loggedIn: boolean = false;
  role: string = "student";
  classroomCode: string;

  /**
   * This code is ran when the component is initialized
   */
  ngOnInit(): void {
    if(this.authService.getUserDetails()){
      this.loggedIn = true;
      if(this.userService.user){
        this.userService.user.role == 'teacher' ? this.router.navigate(['classroom-creation']) : this.router.navigate(['student-classroom-view']);
      }
      const userDetails: any = this.authService.getUserDetails();
      this.userService.userDetails = userDetails;
      this.userService.getStudentByEmail(userDetails.email).subscribe({
        next: student => {
          if(student){
            this.userService.updateUser(student, 'student');
            this.router.navigate(['student-classroom-view']);
          }
        }
      });
      this.userService.getTeacherByEmail(userDetails.email).subscribe({
        next: teacher => {
          if(teacher){
            this.userService.updateUser(teacher, 'teacher');
            this.router.navigate(['classroom-creation']);
          }
        }
      });
    }
  }

  /**
   * When the user creates their account, this method routes the user to the proper side based on their role.
   */
  createAccountRedirect(){
    // if (this.role == 'teacher' || this.role == 'student' && this.classroomCode){
    //   this.userService.userDetails.classroomCode = this.classroomCode;
    //   this.router.navigate(['login/' + this.role])
    // }
    // else {
    //   this._snackBar.open('Enter a classroom code','X', {duration: 2000})
    // }
    if (this.role == 'teacher' || this.role == 'student' && this.classroomCode){
      this.userService.userDetails.classroomCode = this.classroomCode;
      if (this.role =='student'){

      }
      this.router.navigate(['login/' + this.role])
    }
    else {
      this._snackBar.open('Enter a classroom code','X', {duration: 2000})
    }
  }
}
