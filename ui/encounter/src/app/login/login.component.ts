import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Teacher } from '../teacher';
import { ActivatedRoute, Router } from '@angular/router';

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

 updateUser(userDetails: any, role: string){
  this.userService.user = {
    firstName: userDetails.given_name,
    lastName: userDetails.family_name,
    email: userDetails.email,
    role: role,
  }
 }

  handleStudentLogin(userDetails: any){
    console.log('student login');
    this.router.navigate(['problem-selection'])
  }

  handleTeacherLogin(userDetails: any){
    this.userService.getTeacherByEmail(userDetails.email).subscribe({
      next: () => {
        this.updateUser(userDetails, 'teacher');
        this.router.navigate(['problem-creation']);
      },
      error: () => {
        this.addTeacher(userDetails);
        this.updateUser(userDetails, 'teacher');
        this.router.navigate(['problem-creation']);
      }
    });
    
  }

  addTeacher(userDetails: any){
    console.log(userDetails);
    let teacher: Teacher = {
      first_name: userDetails.given_name,
      last_name: userDetails.family_name,
      teacherEmail: userDetails.email,
      password_hash: "placeholder"
    }
    this.userService.addTeacher(teacher).subscribe({
      error: () => {
        console.log("Unable to add teacher");
        this.router.navigate(['']);
      }
    })
  }

}
