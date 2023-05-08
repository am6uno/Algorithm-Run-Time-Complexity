import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';
import { Solution } from '../solution';
import { SolutionService } from '../solution-service/solution.service';
import { ComplexityParserService } from '../complexity-parser/complexity-parser.service';
import { Block } from '../complexity-parser/block';

@Component({
  selector: 'app-student-solution',
  templateUrl: './student-solution.component.html',
  styleUrls: ['./student-solution.component.css']
})
export class StudentSolutionComponent implements OnInit{
  constructor(
    private problemService: ProblemService,
    private router: Router, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private solutionService: SolutionService,
    private complexityParserService: ComplexityParserService
  ) {}
  classroomId: number;
  showResults: boolean = false;
  problem: Problem;
  studentId: number;
  problemId: number = 0;
  complexityAnswer: string[];
  overallComplexity: string = "";
  score: number = 0;
  blockList: Block[];
  blockColors: string[] = ["#feffb7", "#d0ffb7", "#b7fff8", "#b8b7ff", "#ffb7f5", "#ffb7bd"]

  isLoading = true;

  ngOnInit(): void {
    this.problemService

    this.route.params.subscribe(params => {
      this.problemId = params['problemId'];
      this.classroomId = params['classroomId'];
      this.problemService.getProblemById(this.problemId).subscribe({
        next: (problem) => {
          this.problem = problem;
          this.complexityAnswer = new Array(problem.complexity.length).fill('');
          this.isLoading = false;
          this.blockList = this.complexityParserService.parse(this.problem.sourceCode.join("\n"))
        },
        error: () => {
          this._snackBar.open('Could not fetch problem','X', {duration: 2000});
          this.router.navigate(['problem-selection']);
        }
      });
   });

  }

  submitSolution(){
    this.score = this.calculateScore();
    const studentSolution: Solution = {
      studentId: 1,
      problemId: this.problemId,
      complexityAnswer: this.complexityAnswer,
      overallComplexity: this.overallComplexity,
      score: this.score,
    }
    this.solutionService.addSolution(studentSolution).subscribe({
      next: () =>{
        this.showResults = true;
      },
      error: () => {
        this._snackBar.open('Could not submit solution','X', {duration: 2000});
      }
    });
  }

  calculateScore(): number{
    let score = 0;
    for(let i = 0; i < this.problem.complexity.length; i++){
      if(this.lineComplexityCorrect(i)){
        score++
      }
    }

    if(this.overallComplexityCorrect()){
      score++;
    }
    return score;
  }

  overallComplexityCorrect(){
    return this.problem.overallComplexity?.toLowerCase() == this.overallComplexity?.toLowerCase() ? true : false;
  }

  lineComplexityCorrect(index: number){
    return this.problem.complexity[index].toLowerCase() === this.complexityAnswer[index].toLowerCase() ? true : false;
  }

  getLineColor(lineNum: number): string {

    // Start from line 1
    lineNum++;

    // Set the background colors of the smaller blocks first
    this.blockList.sort((a, b) => b.begLine - a.begLine)

    // Check if the line number is in a block
    for (let i = 0; i < this.blockList.length; i++) {
      if (lineNum >= this.blockList[i].begLine && lineNum <= this.blockList[i].endLine) {
        return this.blockColors[this.blockList[i].depth % this.blockColors.length]
      }
    }

    // If line isn't in block, return white
    return "white"
  }
}
