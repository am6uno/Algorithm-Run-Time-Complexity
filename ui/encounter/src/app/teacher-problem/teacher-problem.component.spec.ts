import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProblemComponent } from './teacher-problem.component';

describe('TeacherProblemComponent', () => {
  let component: TeacherProblemComponent;
  let fixture: ComponentFixture<TeacherProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProblemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
