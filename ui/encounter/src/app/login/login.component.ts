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
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  teacherExists: boolean = false;
  studentExists: boolean = false;
  role: string = 'student';

  ngOnInit(): void {
    if(this.userService.user){
      this.userService.user.role == 'teacher' ? this.router.navigate(['classroom-creation']) : this.router.navigate(['student-problem-set/1']);
    }
    this.route.params.subscribe(params => {
      this.role = params['role'];
      if(this.role !== 'student' && this.role !== 'teacher'){
        this.router.navigate(['']);
      }
    });

    if(this.authService.getUserDetails()){
      const userDetails: any = this.authService.getUserDetails();
      if(this.role == 'teacher'){
        this.handleTeacherLogin(userDetails);
      }
      else
      {
        this.handleStudentLogin(userDetails)
      }
    }
  }

  handleStudentLogin(userDetails: any){
    userDetails.classroomCode = this.userService.userDetails.classroomCode
    this.userService.getStudentByEmail(userDetails.email).subscribe({
      next: student => {
        if(!student){
          this.addStudent(userDetails);
        }
        else{
          this.userService.updateUser(student, 'student')
          this.router.navigate(['student-problem-set/1']);
        }
      },
      error: () => {
        this.addStudent(userDetails);
        this.router.navigate(['student-problem-set/1']);
      }
    });
  }

  handleTeacherLogin(userDetails: any){
    this.userService.getTeacherByEmail(userDetails.email).subscribe({
      next: teacher => {
        if(!teacher){
          this.addTeacher(userDetails);
        }
        else{
          this.userService.updateUser(teacher, 'teacher')
          this.router.navigate(['classroom-creation']);
        }
      },
      error: () => {
        this.addTeacher(userDetails);
        this.router.navigate(['classroom-creation']);
      }
    });

  }

  addTeacher(userDetails: any){
    let teacher: Teacher = {
      first_name: userDetails.given_name,
      last_name: userDetails.family_name,
      teacherEmail: userDetails.email,
      // password_hash: "placeholder"
    }
    this.userService.addTeacher(teacher).subscribe({
      next: () => {
        this.updateFrontendTeacherAndRedirect(teacher);
      },
      error: () => {
        this.router.navigate(['']);
      }
    })
  }

  addStudent(userDetails: any){
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
        this.updateFrontendStudentAndRedirect(student);
      },
      error: () => {
        this.router.navigate(['']);
      }
    })
  }

  updateFrontendStudentAndRedirect(student: Student){
    this.userService.getStudentByEmail(student.email).subscribe({
      next: (receivedStudent: Student) => {
        if(!receivedStudent){
          this.authService.logout();
        }
        this.userService.updateUser(receivedStudent, 'student')
        this.router.navigate(['student-problem-set/1']);
      },
      error: () => {
        this.authService.logout();
      }
    })
  }

  updateFrontendTeacherAndRedirect(teacher: Teacher){
    this.userService.getTeacherByEmail(teacher.teacherEmail).subscribe({
      next: (receivedTeacher: Teacher) => {
        if(!receivedTeacher){
          this.authService.logout();
        }
        this.userService.updateUser(receivedTeacher, 'teacher')
        this.router.navigate(['classroom-creation']);
      },
      error: () => {
        this.authService.logout();
      }
    })
  }

}
