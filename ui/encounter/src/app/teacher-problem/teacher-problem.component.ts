import { Component, NgZone } from '@angular/core';
import { ProblemService } from '../problem-service/problem.service';
import { Problem } from '../problem';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProblemModalComponent } from '../add-problem-modal/add-problem-modal.component';
import { SolutionService } from '../solution-service/solution.service';
import { Solution } from '../solution';
import { ProblemSet } from '../problemset';
import { ProblemsetService } from '../problemset-service/problemset.service';


@Component({
  selector: 'app-teacher-problem',
  templateUrl: './teacher-problem.component.html',
  styleUrls: ['./teacher-problem.component.css']
})

/**
 * This is the component that handles Problem objects from the Teacher side.
 */
export class TeacherProblemComponent {
  setId: number;
  set: ProblemSet;
  problems: Problem[] = [];
  detailedProblemList: any[] = []

  /**
   * This is the constructor for the component.
   * @param problemService - the service for manipulating problems
   * @param solutionService - the service for manipulating solutions
   * @param problemsetService - the service for manipulating problem sets
   * @param router - used for routing to the correct page
   * @param route - the current route
   * @param _snackBar - used to deliver messages to the user
   * @param dialog - a dialog box
   * @param zone - an NGZone object 
   */
  constructor(
    private problemService: ProblemService,
    private solutionService: SolutionService,
    private problemsetService: ProblemsetService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private zone: NgZone
    ) {
  }

  /**
   * This method executes when the component is initialized.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setId = +params['setId'];
      this.problemsetService.getProblemSetById(this.setId).subscribe((set: ProblemSet) => {
        this.set = set;
      })
      this.updateProblemList();
   });

  }

  /**
   * This method handles the frontend for a Teacher deleting a Problem
   * @param problemId - the id of the problem to be deleted
   */
  handleDelete(problemId: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: "Delete Confirmation",
      message: "Are you sure you want to delete the problem?",
      acceptText: "Delete"
    }

    this.zone.run(() => {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if(data) {
            this.deleteProblem(problemId);
          }
        }
      );
    });
  }

  /**
   * This method deletes a problem from a problem list
   * @param problemId - the id of the problem to be deleted
   */
  deleteProblem(problemId: number){
    this.problemService.deleteProblem(problemId).subscribe({
      next: () => {
        this._snackBar.open('Problem deleted','X', {duration: 2000});
        this.updateProblemList();
      },
      error: () => {
        this._snackBar.open('Could not delete','X', {duration: 2000});
        this.updateProblemList();
      }
    });
  }

  /**
   * This method opens the option menu.
   * @param event - the current event
   */
  openOptionMenu(event:Event){
    event.stopPropagation();
  }

  /**
   * This method updates the problem list.
   */
  updateProblemList(){
    this.problemService.getProblemBySetId(this.setId).subscribe({
      next: (problems) => {
        this.problems = problems;
        this.generateDetailedProblemList();
      },
      error: () => {
        this._snackBar.open('Could not fetch problems','X', {duration: 2000});
        this.router.navigate(['']);
      }
    });
  }

  /**
   * This method generates the existing problem list but with more details.
   */
  generateDetailedProblemList(){
    this.detailedProblemList = [];
    this.problems.forEach((problem: Problem) => {
      let detailedProblemInfo: any = problem;
      if (problem.id){
        this.addSolutionsInfo(problem.id, detailedProblemInfo);
      }
      this.detailedProblemList.push(detailedProblemInfo)
    })
  }

  /**
   * This method adds solution information to a problem.
   * @param problemId - the id of the problem object to add information to.
   * @param detailedProblemInfo - the detailed data retrieved from the method above.
   */
  addSolutionsInfo(problemId: number, detailedProblemInfo: any): any{
    this.solutionService.getSolutionByProblemId(problemId).subscribe({
      next: (solutions) => {
        this.analyzeSolutions(solutions, detailedProblemInfo);
      }
    });
  }

  /**
   * This method analyzes the solutions to a problem and generates high, low, and average scores for a problem.
   * @param solutions - the solutions being submitted
   * @param detailedProblemInfo - the detailed information for a problem 
   */
  analyzeSolutions(solutions: Solution[], detailedProblemInfo: any){
    let scoreSum = 0;
    let highScore: any;
    let lowScore: any;
    solutions.length > 0 ? lowScore = solutions[0].score : undefined;
    solutions.length > 0 ? highScore = solutions[0].score : undefined;

    solutions.forEach((solution: Solution) => {
      scoreSum += solution.score;
      if(lowScore && solution.score < lowScore){
        lowScore = solution.score
      }
      if(highScore && solution.score > highScore){
        highScore = solution.score
      }
    });

    const avg = solutions.length > 0 ? scoreSum/solutions.length : 0;

    detailedProblemInfo.avg = avg;
    detailedProblemInfo.highScore = highScore;
    detailedProblemInfo.lowScore = lowScore;
    detailedProblemInfo.submissions = solutions.length;
  }

  /**
   * This method adds problems to the Problem modal.
   */
  addProblemsModalOpen(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      currentProblems: this.problems
    }
    this.zone.run(() => {
      const dialogRef = this.dialog.open(AddProblemModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if(data) {
            this.addProblems(data)
          }
        }
      );
    });
  }

  /**
   * This method routes a teacher to the problem creation page.
   */
  createProblem(){
    this.router.navigate(['problem-creation/' + this.setId]);
  }

  /**
   * This method navigates the teacher to the page to update a problem.
   * @param problemId - the id of the problem object to be updated
   */
  updateProblem(problemId: any){
    this.router.navigate(['problem-creation/' + this.setId + '/' + problemId]);
  }

  /**
   * This method adds the passed problems via the problem service
   * @param problems - the map associated with a number and a Problem
   */
  addProblems(problems: Map<number, Problem>){
    problems.forEach(problem => {
      problem.id = undefined;
      problem.setId = this.setId;
      this.problemService.addProblem(problem).subscribe(() => {
        this.updateProblemList();
      });
    })
  }
}