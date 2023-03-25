import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { mockProblemArray, MockProblemService } from '../../mocks/problem.service.mock';
import { AppModule } from '../app.module';
import { ProblemService } from '../problem-service/problem.service';
import { ProblemCreationComponent } from './problem-creation.component';
import { jest } from '@jest/globals';
import { mockMatSnackBar } from '../../mocks/snack.bar.mock';
import { of } from 'rxjs';



    describe('ProblemCreationComponent', () => {
        let component: ProblemCreationComponent;
        let fixture: ComponentFixture<ProblemCreationComponent>;
        let problemService: ProblemService;
        let router: Router;
        let _snackBar: MatSnackBar;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [AppModule],
                declarations: [ ProblemCreationComponent ],
                providers: [
                { provide: ProblemService, useValue: MockProblemService },
                { provide: Router, Router},
                { provide: MatSnackBar, useValue: mockMatSnackBar}
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
            it('should set the values for sourceCode, complexity, hints when codeInput is longer than 0', ()=> {
                component.codeInput = "int x = 5;\nint z = 6;";
                component.getSourceCodeFromTextInput();
                expect(component.sourceCode).toEqual(["int x = 5;", "int z = 6;"]);
                expect(component.complexity.length).toEqual(2);
                expect(component.hints.length).toEqual(2);
            });
            it('should open the snackbar to let users to input source code', ()=> {
                let snackBarOpenSpy = jest.spyOn(_snackBar, 'open')
                component.getSourceCodeFromTextInput();
                expect(snackBarOpenSpy).toHaveBeenCalled();
            });
        });

        describe('formComplete', () => {
            it('should return true because the required values have been set', ()=> {
                component.name = "Problem 1";
                component.sourceCode = ["int x = 5;", "int z = 6;"];
                component.complexity = ["O(C)","O(C)"];
                component.overallComplexity = "O(C)";
                expect(component.formComplete()).toBeTrue;
            });
            it('should return false because the required values have not been set', ()=> {
                expect(component.formComplete()).toBeFalse;
            });
        });

        describe('setCodeInput', () => {
            it('should set code Input', ()=> {
                const mockEvent = {
                    target: {innerText: "input"}
                };
                component.setCodeInput(mockEvent);
                expect(component.codeInput).toEqual("input");
            });
        });

        describe('submitProblem', () => {
            it('should not submit problem', ()=> {
                let snackBarOpenSpy = jest.spyOn(_snackBar, 'open')
                component.submitProblem()
                expect(snackBarOpenSpy).toHaveBeenCalled();
            });
            it('should submit the problem', ()=> {
                component.name = "Problem 1";
                component.sourceCode = ["int x = 5;", "int z = 6;"];
                component.complexity = ["O(C)","O(C)"];
                component.overallComplexity = "O(C)";
                let problemServiceSpy = jest.spyOn(problemService, 'addProblem').mockReturnValue(of(mockProblemArray as any))
                component.submitProblem()
                expect(problemServiceSpy).toHaveBeenCalled();
            });
        });

        describe('getTotalScore', () => {
            it('should calculate the total score', () => {
                component.complexity = ["O(N)", "O(N)"];
                expect(component.getTotalScore()).toEqual(3);
            });
        });

    });

