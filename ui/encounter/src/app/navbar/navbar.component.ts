import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

/**
 * This component handles the navbar for the app.
 */
export class NavbarComponent {
  /**
   * The constructor for the component.
   * @param authService - the authentication service for this session
   * @param userService - the userService for this user
   */
  constructor(private authService: AuthService, private userService: UserService) {}
  firstName: string = '';
  lastName: string = '';

  /**
   * This method logs the user out of the session.
   */
  logout() {
    this.userService.user = undefined;
    this.userService.userDetails = undefined;
    this.authService.logout();
  }

  /**
   * This method returns if the user is a teacher based on their role.
   * @returns true if the user is a teacher, false if not
   */
  isTeacher(): boolean{
    return this.userService.user?.role == 'teacher' ? true : false;
  }
  
  /**
   * This method checks if a user exists via userService
   * @returns true if the user exists, false if not.
   */
  userExists(): boolean{
    this.firstName = this.userService?.user?.first_name;
    this.lastName = this.userService?.user?.last_name;
    return this.userService.user ? true : false;
  }

  isStudent(): boolean{
    return this.userService?.user?.role == 'student'? true : false;
  }

}
