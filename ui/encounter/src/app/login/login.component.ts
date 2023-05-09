import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Teacher } from '../teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student';
import {Classroom} from "../classroom";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * This component handles user login.
 */
export class LoginComponent implements OnInit {

  /**
   * The constructor for the component, contains information for the authentication service, userservice, router, and routes.
   * @param authService - The authentication service for the session
   * @param userService - the userService for handling roles
   * @param router - routes the user to the correct page
   * @param route - the route being used
   */
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  teacherExists: boolean = false;
  studentExists: boolean = false;
  role: string = 'student';

  /**
   * This code is ran when the component is initialized. 
   */
  ngOnInit(): void {
    if(this.userService.user){
      this.userService.user.role == 'teacher' ? this.router.navigate(['problem-creation']) : this.router.navigate(['problem-selection']);
    }
    this.route.params.subscribe(params => {
      this.role = params['role'];
      if(this.role !== 'student' && this.role !== 'teacher'){
        this.router.navigate(['']);
      }
    });

    if(this.authService.getLoggedUser()){
      const userDetails: any = this.authService.getLoggedUser();
      if(this.role == 'teacher'){
        this.handleTeacherLogin(userDetails);
      }
      else
      {
        this.handleStudentLogin(userDetails)
      }
    }
  }

  /**
   * This method handles the student side of logging in.
   * @param userDetails - information about the user currently in the session
   */
  handleStudentLogin(userDetails: any){
    userDetails.classroomCode = this.userService.userDetails.classroomCode
    this.userService.getStudentByEmail(userDetails.email).subscribe({
      next: student => {
        if(!student){
          this.addStudent(userDetails);
        }
        this.userService.updateUser(student, 'student')
        this.router.navigate(['problem-selection']);
      },
      error: () => {
        this.addStudent(userDetails);
        this.router.navigate(['problem-selection']);
      }
    });
  }

  /**
   * This method hanles the teacher side of logging in.
   * @param userDetails - information about the user currently in the session.
   */
  handleTeacherLogin(userDetails: any){
    this.userService.getTeacherByEmail(userDetails.email).subscribe({
      next: teacher => {
        if(!teacher){
          this.addTeacher(userDetails);
        }
        this.userService.updateUser(teacher, 'teacher')
        this.router.navigate(['problem-creation']);
      },
      error: () => {
        this.addTeacher(userDetails);
        this.router.navigate(['problem-creation']);
      }
    });

  }

  /**
   * Registers a teacher based on the information they enter
   * @param userDetails - the entered information
   */
  addTeacher(userDetails: any){
    let teacher: Teacher = {
      first_name: userDetails.given_name,
      last_name: userDetails.family_name,
      teacherEmail: userDetails.email,
      // password_hash: "placeholder"
    }
    this.userService.addTeacher(teacher).subscribe({
      next: () => {
        this.router.navigate(['./']);
      },
      error: () => {
        console.log("Unable to add teacher");
        this.router.navigate(['']);
      }
    })
  }

  /**
   * Registers a student based on the information they enter
   * @param userDetails - the entered information
   */
  addStudent(userDetails: any){
    console.log("classroomCode: %s",userDetails.classroomCode);
    let student: Student = {
      first_name: userDetails.given_name,
      last_name: userDetails.family_name,
      email: userDetails.email,
      enrolled_classes: new Set<Classroom>(),
      // enrolled_classes: [],
      password_hash: "placeholder"
    }
    this.userService.addStudent(student).subscribe({
      next: () => {
        this.router.navigate(['./']);
      },
      error: () => {
        console.log("Unable to add student");
        this.router.navigate(['']);
      }
    })
  }
}
