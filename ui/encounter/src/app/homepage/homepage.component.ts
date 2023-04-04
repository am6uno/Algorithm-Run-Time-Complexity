import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(private authService: AuthService, private userService: UserService, private router: Router){}
  loggedIn: boolean = false;

  ngOnInit(): void {
    if(this.authService.getLoggedUser()){
      this.loggedIn = true;
      if(this.userService.user){
        this.userService.user.role == 'teacher' ? this.router.navigate(['problem-creation']) : this.router.navigate(['problem-selection']);
      }
      const userDetails: any = this.authService.getLoggedUser();
      this.userService.getStudentByEmail(userDetails.email).subscribe({
        next: student => {
          if(student){
            this.userService.updateUser(userDetails, 'student');
            this.router.navigate(['problem-selection']);
          }
        }
      });
      this.userService.getTeacherByEmail(userDetails.email).subscribe({
        next: teacher => {
          if(teacher){
            this.userService.updateUser(userDetails, 'teacher');
            this.router.navigate(['problem-creation']);
          }
        }
      });
    }
  }
}
