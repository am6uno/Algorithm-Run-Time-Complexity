import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProblemsetPageComponent } from './teacher-problemset-page.component';

describe('TeacherProblemsetPageComponent', () => {
  let component: TeacherProblemsetPageComponent;
  let fixture: ComponentFixture<TeacherProblemsetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProblemsetPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherProblemsetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
