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
export class TeacherProblemComponent {
  setId: number;
  set: ProblemSet;
  problems: Problem[] = [];
  detailedProblemList: any[] = []

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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setId = +params['setId'];
      this.problemsetService.getProblemSetById(this.setId).subscribe((set: ProblemSet) => {
        this.set = set;
      })
      this.updateProblemList();
   });

  }

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

  openOptionMenu(event:Event){
    event.stopPropagation();
  }

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

  addSolutionsInfo(problemId: number, detailedProblemInfo: any): any{
    this.solutionService.getSolutionByProblemId(problemId).subscribe({
      next: (solutions) => {
        this.analyzeSolutions(solutions, detailedProblemInfo);
      }
    });
  }

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

  createProblem(){
    this.router.navigate(['problem-creation/' + this.setId]);
  }

  updateProblem(problemId: any){
    this.router.navigate(['problem-creation/' + this.setId + '/' + problemId]);
  }

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
