import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MockProblemService } from '../../mocks/problem.service.mock';
import { ProblemService } from '../problem-service/problem.service';
import { ProblemCreationComponent } from './problem-creation.component';

describe('ProblemCreationComponent', () => {

    describe('HeroComponent', () => {
        let component: ProblemCreationComponent;
        let fixture: ComponentFixture<ProblemCreationComponent>;
        let problemService: ProblemService;
        let router: Router;
        let _snackBar: MatSnackBar;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ ProblemCreationComponent ],
                providers: [
                { provide: ProblemService, useValue: MockProblemService },
                { provide: Router, Router},
                { provide: MatSnackBar, MatSnackBar}
                ]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProblemCreationComponent);
            problemService = TestBed.inject(ProblemService);
            router = TestBed.inject(Router);
            _snackBar = TestBed.inject(MatSnackBar);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should exist', () => {
            expect(component).toBeDefined();
        });

        describe('getSourceCodeFromTextInput', () => {
            it('should set teh values for sourceCode, complexity, hints when codeInput is longer than 0', ()=> {
                component.codeInput = "int x = 5;\nint z = 6;";
                component.getSourceCodeFromTextInput();
                expect(component.sourceCode).toEqual(["int x = 5;", "int z = 6;"]);
                expect(component.complexity.length).toEqual(2);
                expect(component.hints.length).toEqual(2);
            });
        });

    });
});
