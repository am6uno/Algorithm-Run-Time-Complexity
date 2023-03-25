import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';
import { Solution } from '../solution';
import { SolutionService } from '../solution-service/solution.service';

@Component({
  selector: 'app-student-solution',
  templateUrl: './student-solution.component.html',
  styleUrls: ['./student-solution.component.css']
})
export class StudentSolutionComponent implements OnInit{
  constructor(
    private problemService: ProblemService,
    private router: Router, private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private solutionService: SolutionService
  ) {}
  private sub: any;
  problem: Problem;
  studentId: number;
  problemId: number = 0;
  complexityAnswer: string[];
  overallComplexity: "";
  score: 0;

  isLoading = true;

  ngOnInit(): void {
    this.problemService

    this.sub = this.route.params.subscribe(params => {
      this.problemId = +params['id']; 
      this.problemService.getProblemById(this.problemId).subscribe({
        next: (problem) => {
          this.problem = problem;
          this.complexityAnswer = new Array(problem.complexity.length).fill('');
          this.isLoading = false;
        },
        error: () => {
          this._snackBar.open('Could not fetch problem','X', {duration: 2000});
          this.router.navigate(['problem-selection']);
        }
      });
   });
    
  }

  submitProblem(){
    const studentSolution: Solution = {
      studentId: 1,
      problemId: this.problemId,
      complexityAnswer: this.complexityAnswer,
      overallComplexity: this.overallComplexity,
      score: this.calculateScore(),
    }
    this.solutionService.addSolution(studentSolution).subscribe({
      error: () => {
        this._snackBar.open('Could not submit solution','X', {duration: 2000});
      }
    });
  }

  calculateScore(): number{
    let score = 0;
    for(let i = 0; i < this.problem.complexity.length; i++){
      if(this.problem.complexity[i] === this.complexityAnswer[i]){
        score++
      }
    }

    if(this.problem.overallComplexity == this.overallComplexity){
      score++;
    }
    return score;
  }
  
}
