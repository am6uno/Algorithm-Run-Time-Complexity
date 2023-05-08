import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassroomViewComponent } from './student-classroom-view.component';

describe('StudentClassroomViewComponent', () => {
  let component: StudentClassroomViewComponent;
  let fixture: ComponentFixture<StudentClassroomViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentClassroomViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentClassroomViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
