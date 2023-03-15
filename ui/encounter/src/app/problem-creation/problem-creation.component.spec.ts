import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemCreationComponent } from './problem-creation.component';

describe('ProblemCreationComponent', () => {
  let component: ProblemCreationComponent;
  let fixture: ComponentFixture<ProblemCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
