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
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { ProblemCreationComponent } from './problem-creation/problem-creation.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { NgComponentOutlet } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from './AppInit';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth';
import { StudentSolutionComponent } from './student-solution/student-solution.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ClassroomCreationComponent } from './classroom-creation/classroom-creation.component';
import { ClassroomDetailComponent } from './classroom-detail/classroom-detail.component';
import {MatSelectModule} from '@angular/material/select';
import { TeacherProblemComponent } from './teacher-problem/teacher-problem.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddProblemModalComponent } from './add-problem-modal/add-problem-modal.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import { TeacherProblemsetPageComponent } from './teacher-problemset-page/teacher-problemset-page.component';
import { DatePipe } from '@angular/common';
import { SelectSetModalComponent } from './select-set-modal/select-set-modal.component';
import {StudentClassroomsComponent} from "./student-classrooms/student-classrooms.component";
import { StudentProblemSetComponent } from './student-problem-set/student-problem-set.component';
import { StudentClassroomViewComponent } from './student-classroom-view/student-classroom-view.component';



const APP_ROUTES: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login/:role', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'problem-creation', component: ProblemCreationComponent, canActivate: [AuthGuard], data: {role: 'teacher'}},
  {path: 'classroom-creation', component: ClassroomCreationComponent, canActivate: [AuthGuard], data: {role: 'teacher'}},
  {path: 'student-solution/:classroomId/:problemId', component: StudentSolutionComponent, canActivate: [AuthGuard], data: {role: 'student'}},
  {path: 'teacher-problemset-classroom/:id', component: TeacherProblemsetPageComponent, canActivate: [AuthGuard], data: {role: 'teacher'}},
  {path: 'problem-creation/:setId', component: ProblemCreationComponent, canActivate: [AuthGuard], data: {role: 'teacher'}},
  {path: 'problem-creation/:setId/:problemId', component: ProblemCreationComponent, canActivate: [AuthGuard], data: {role: 'teacher'}},
  {path: 'student-solution/:id', component: StudentSolutionComponent, canActivate: [AuthGuard], data: {role: 'student'}},
  {path: 'student-problem-set/:classroomId', component: StudentProblemSetComponent, canActivate: [AuthGuard], data: {role: 'student'}},
  {path: 'teacher-set-problems/:setId', component: TeacherProblemComponent, canActivate: [AuthGuard], data: {role: 'teacher'}},
  {path: 'student-classroom-view', component:StudentClassroomViewComponent, canActivate: [AuthGuard], data: {role: 'student'}},
  {path: 'student-signup', component: StudentClassroomsComponent, canActivate: [AuthGuard], data: {role: 'student'}},

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    ProblemCreationComponent,
    StudentSolutionComponent,
    ClassroomCreationComponent,
    ClassroomDetailComponent,
    TeacherProblemsetPageComponent,
    TeacherProblemComponent,
    ConfirmationModalComponent,
    AddProblemModalComponent,
    SelectSetModalComponent,
    StudentClassroomsComponent,
    StudentProblemSetComponent,
    SelectSetModalComponent,
    StudentClassroomViewComponent
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
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSelectModule
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    AuthService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationModalComponent, AddProblemModalComponent]
})
export class AppModule { }
