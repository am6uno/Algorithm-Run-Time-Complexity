import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomCreationComponent } from './classroom-creation.component';

describe('ClassroomCreationComponent', () => {
  let component: ClassroomCreationComponent;
  let fixture: ComponentFixture<ClassroomCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
