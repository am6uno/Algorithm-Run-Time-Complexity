 import { NgModule } from '@angular/core';
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
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { ProblemSelectionComponent } from './problem-selection/problem-selection.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { ProblemCreationComponent } from './problem-creation/problem-creation.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { NgComponentOutlet } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentSolutionComponent } from './student-solution-component/student-solution.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';




const APP_ROUTES: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: TeacherLoginComponent},
  {path: 'problem-selection', component: ProblemSelectionComponent},
  {path: 'problem-creation', component: ProblemCreationComponent},
  {path: 'student-solution/:id', component: StudentSolutionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    TeacherLoginComponent,
    ProblemSelectionComponent,
    ProblemCreationComponent,
    StudentSolutionComponent,
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
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
