import { Component } from '@angular/core';
import { ProblemService } from '../problem-service/problem.service';
import { Problem } from '../problem';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-teacher-problem',
  templateUrl: './teacher-problem.component.html',
  styleUrls: ['./teacher-problem.component.css']
})
export class TeacherProblemComponent {
  setId: number;
  problems: Problem[] = [];

  constructor(
    private problemService: ProblemService, 
    private router: Router, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog) {
    this.problemService.getProblemBySetId
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setId = +params['setId'];
      this.updateProblems();
   });
  }

  handleDelete(problemId: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(ConfirmationModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.deleteProblem(problemId);
        }
      }
    );
  }

  deleteProblem(problemId: number){
    this.problemService.deleteProblem(problemId).subscribe({
      next: () => {
        this._snackBar.open('Problem deleted','X', {duration: 2000});
        this.updateProblems();
      },
      error: () => {
        this._snackBar.open('Could not delete','X', {duration: 2000});
        this.updateProblems();
      }
    });
  }

  openModal(event:any){
    event.stopPropagation();
  }

  updateProblems(){
    this.problemService.getProblemBySetId(this.setId).subscribe({
      next: (problems) => {
        this.problems = problems;
      },
      error: () => {
        this._snackBar.open('Could not fetch problems','X', {duration: 2000});
        this.router.navigate(['']);
      }
    });
  }

}
