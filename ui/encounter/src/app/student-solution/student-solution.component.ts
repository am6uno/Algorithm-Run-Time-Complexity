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

/**
 * This component handles student solutions.
 */
export class StudentSolutionComponent implements OnInit{

  /**
   * The constructor for the component.
   * @param problemService - the problem service for manipulating problems
   * @param router - for routing to the correct page
   * @param route - the route
   * @param _snackBar - for delivering messages to users
   * @param solutionService - the solution service for manipulating solutions
   * @param complexityParserService - used for problem parsing
   */
  constructor(
    private problemService: ProblemService,
    private router: Router, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private solutionService: SolutionService,
    private complexityParserService: ComplexityParserService
  ) {}

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

  /**
   * This method executes when the component is initialized.
   */
  ngOnInit(): void {
    this.problemService

    this.route.params.subscribe(params => {
      this.problemId = +params['id'];
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

  /**
   * This method submits a solution to the solution service and either shows the results or presents the user with an error message.
   */
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

  /**
   * This method calculates the score for a given problem
   * @returns the score obtained on the problem
   */
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

  /**
   * This method determines if the Student got the correct answer for overall complexity.
   * @returns true if the answer is correct, false if not
   */
  overallComplexityCorrect(){
    return this.problem.overallComplexity?.toLowerCase() == this.overallComplexity?.toLowerCase() ? true : false;
  }

  /**
   * This method determines if a student got the complexity for an individual line correct.
   * @param index - the index of the line being analyzed
   * @returns true if correct, false if incorrect 
   */
  lineComplexityCorrect(index: number){
    return this.problem.complexity[index].toLowerCase() === this.complexityAnswer[index].toLowerCase() ? true : false;
  }

  /**
   * This method determines the background color for a line in a solution - useful for nesting problems, etc.
   * @param lineNum - the line number to be analyzed
   * @returns the color the line should be
   */
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
