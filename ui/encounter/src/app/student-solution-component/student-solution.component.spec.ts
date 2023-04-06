import { ComponentFixture, TestBed } from '@angular/core/testing';
import {expect, jest, test} from '@jest/globals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { mockMatSnackBar } from '../../mocks/snack.bar.mock';
import { mockProblemArray, MockProblemService } from '../../mocks/problem.service.mock';
import { AppModule } from '../app.module';
import { ProblemService } from '../problem-service/problem.service';
import { StudentSolutionComponent } from './student-solution.component';

describe('StudentSolutionComponent', () => {
  let component: StudentSolutionComponent;
  let fixture: ComponentFixture<StudentSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ StudentSolutionComponent ],
      providers: [
        { provide: ProblemService, useValue: MockProblemService },
        { provide: Router, Router},
        { provide: MatSnackBar, useValue: mockMatSnackBar}
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test.skip('should create', () => {
    expect(component).toBeTruthy();
  });
});
