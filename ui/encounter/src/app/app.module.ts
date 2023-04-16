import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule}  from '@angular/material/icon'
import { RouterModule, Routes } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { ProblemSelectionComponent } from './problem-selection/problem-selection.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { ProblemCreationComponent } from './problem-creation/problem-creation.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { NgComponentOutlet } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from 'AppInit';
import { AuthService } from './auth.service';
import { AuthGuard } from 'auth';
import { StudentSolutionComponent } from './student-solution-component/student-solution.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ClassroomCreationComponent } from './classroom-creation/classroom-creation.component';



const APP_ROUTES: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login/:role', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'problem-selection', component: ProblemSelectionComponent, canActivate: [AuthGuard]},
  {path: 'problem-creation', component: ProblemCreationComponent, canActivate: [AuthGuard]},
  {path: 'classroom-creation', component: ClassroomCreationComponent, canActivate: [AuthGuard]},
  {path: 'student-solution/:id', component: StudentSolutionComponent, canActivate: [AuthGuard]},

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    ProblemSelectionComponent,
    ProblemCreationComponent,
    StudentSolutionComponent,
    ClassroomCreationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    FormsModule,
    NgComponentOutlet,
    MatSnackBarModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    KeycloakAngularModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
