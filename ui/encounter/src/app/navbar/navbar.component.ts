import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private userService: UserService) {}
  firstName: string = '';
  lastName: string = '';

  logout() {
    this.userService.user = undefined;
    this.userService.userDetails = undefined;
    this.authService.logout();
  }

  isTeacher(): boolean{
    return this.userService.user?.role == 'teacher' ? true : false;
  }

  userExists(): boolean{
    this.firstName = this.userService?.user?.first_name;
    this.lastName = this.userService?.user?.last_name;
    return this.userService.user ? true : false;
  }

}
