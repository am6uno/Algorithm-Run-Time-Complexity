import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { mockProblem1, mockProblemArray, MockProblemService } from '../../mocks/problem.service.mock';
import { AppModule } from '../app.module';
import { ProblemService } from '../problem-service/problem.service';
import { ProblemCreationComponent } from './problem-creation.component';
import { jest } from '@jest/globals';
import { mockMatSnackBar } from '../../mocks/snack.bar.mock';
import { of } from 'rxjs';
import { mockSelection } from '../../mocks/selection.mock';
import { mockMatDialog } from '../../mocks/dialog.mock';
import { MatDialog } from '@angular/material/dialog';



    describe('ProblemCreationComponent', () => {
        let component: ProblemCreationComponent;
        let fixture: ComponentFixture<ProblemCreationComponent>;
        let problemService: ProblemService;
        let router: Router;
        let _snackBar: MatSnackBar;
        let dialog: MatDialog;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [AppModule],
                declarations: [ ProblemCreationComponent ],
                providers: [
                { provide: ProblemService, useValue: MockProblemService },
                { provide: Router, Router},
                { provide: MatSnackBar, useValue: mockMatSnackBar},
                {provide: MatDialog, useValue: mockMatDialog},
                ]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProblemCreationComponent);
            problemService = TestBed.inject(ProblemService);
            router = TestBed.inject(Router);
            _snackBar = TestBed.inject(MatSnackBar);
            dialog = TestBed.inject(MatDialog);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
        
        describe('ngOnInIt', () => {
            it('should exist', () => {
                expect(component).toBeDefined();
            });

            it('should get problem with http request', () => {
                component.problemId = 1;
                component.ngOnInit();
                expect(component.sourceCode).toEqual(mockProblem1.sourceCode);
                expect(component.hints).toEqual(mockProblem1.hints);
                expect(component.overallComplexity).toEqual(mockProblem1.overallComplexity);
                expect(component.name).toEqual(mockProblem1.name);
                expect(component.totalScore).toEqual(mockProblem1.totalScore);
                expect(component.complexity).toEqual(mockProblem1.complexity);
            });
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

        describe('handleTab', () => {
            it('should insert a tab when tab key is hit and stop event propagation.', ()=> {
                let getSelectionSpy = jest.spyOn(document, 'getSelection').mockImplementation(() => (mockSelection as any))
                let createTextNodeSpy = jest.spyOn(document, 'createTextNode')
                const event = {
                    target: {
                        innerText: 'this is the before text input'
                    },
                    preventDefault: jest.fn()
                }
                component.handleTab(event)
                expect(getSelectionSpy).toHaveBeenCalled();
                expect(createTextNodeSpy).toHaveBeenCalled();
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

            it('should submit the problem after getting info from the modal', ()=> {
                component.name = "Problem 1";
                component.sourceCode = ["int x = 5;", "int z = 6;"];
                component.complexity = ["O(C)","O(C)"];
                component.overallComplexity = "O(C)";
                const problemServiceSpy = jest.spyOn(problemService, 'addProblem').mockReturnValue(of(mockProblemArray as any));
                const dialogSpy = jest.spyOn(dialog, 'open');
                component.submitProblem()
                expect(problemServiceSpy).toHaveBeenCalled();
                expect(dialogSpy).toHaveBeenCalled();
            });

            it('should submit the problem if it has a setId', ()=> {
                component.name = "Problem 1";
                component.setId = 1234;
                component.sourceCode = ["int x = 5;", "int z = 6;"];
                component.complexity = ["O(C)","O(C)"];
                component.overallComplexity = "O(C)";
                let problemServiceSpy = jest.spyOn(problemService, 'addProblem').mockReturnValue(of(mockProblemArray as any))
                component.submitProblem()
                expect(problemServiceSpy).toHaveBeenCalled();
            });

            it('should update the problem upon submission', ()=> {
                component.problemId = 1;
                component.name = "Problem 1";
                component.sourceCode = ["int x = 5;", "int z = 6;"];
                component.complexity = ["O(C)","O(C)"];
                component.overallComplexity = "O(C)";
                let problemServiceSpy = jest.spyOn(problemService, 'updateProblem').mockReturnValue(of(mockProblemArray as any))
                component.submitProblem()
                expect(problemServiceSpy).toHaveBeenCalled();
            });
        });

        describe('getTotalScore', () => {
            it('should return the number of possible points, complexity lines + 1', () => {
                component.complexity = ["O(N)", "O(N)"];
                expect(component.getTotalScore()).toEqual(3);
            });
        });

        describe('setAllToConstant', () => {
            it('should set complexities, hints and overall complexity to be constant', () => {
                const expectedComplexity = ["o(1)","o(1)"];
                const expectedHints = ["The complexity is constant","The complexity is constant"]
                component.complexity = ["O(N)", "O(N)"];
                component.hints = ["", ""];
                component.setAllToConstant();
                expect(component.complexity).toEqual(expectedComplexity);
                expect(component.hints).toEqual(expectedHints);
                expect(component.overallComplexity).toEqual("o(1)");
            });
        });

        describe('formatComplexity', () => {
            it('should return o(1)', () => {
                expect((component as any).formatComplexity(0)).toBe("o(1)");
            });

            it('should return o(n)', () => {
                expect((component as any).formatComplexity(1)).toBe("o(n)");
            });

            it('should return o(3)', () => {
                expect((component as any).formatComplexity(3)).toBe("o(n^3)");
            });
        });

        describe('parse', () => {
            it('should set overall complexity to 0(1)', () => {
                component.sourceCode = ["int x = 5;\n", "int y = 6;"];
                component.parse();
                expect(component.overallComplexity).toBe("o(1)");
            });

            it('should set overall complexity to 0(n)', () => {
                component.sourceCode = [
                    "int x = 5;\n",
                     "for (int i = 0; i < n; i++){\n",
                     "System.out.print(\"hello world\");\n",
                     "}\n"
                    ];
                component.parse();
                expect(component.overallComplexity).toBe("o(n)");
            });
        });

    });

