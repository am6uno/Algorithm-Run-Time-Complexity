import { Component } from '@angular/core';
import { ProblemService } from '../problem-service/problem.service';
import { Problem } from '../problem';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar,) {
    this.problemService.getProblemBySetId
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setId = +params['setId'];
      console.log(+params['setId'])
      this.problemService.getProblemBySetId(this.setId).subscribe({
        next: (problems) => {
          this.problems = problems;
          console.log(this.problems)
        },
        error: () => {
          this._snackBar.open('Could not fetch problems','X', {duration: 2000});
          this.router.navigate(['']);
        }
      });
   });
  }
}
