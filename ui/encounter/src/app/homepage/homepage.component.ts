import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(private authService: AuthService){}
  loggedIn: boolean = false;

  ngOnInit(): void {
    if(this.authService.getLoggedUser()){
      this.loggedIn = true;
    }
  }
}
