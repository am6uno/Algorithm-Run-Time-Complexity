import { Component, NgZone } from '@angular/core';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplexityParserService } from '../complexity-parser/complexity-parser.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SelectSetModalComponent } from '../select-set-modal/select-set-modal.component';

@Component({
  selector: 'app-problem-creation',
  templateUrl: './problem-creation.component.html',
  styleUrls: ['./problem-creation.component.css']
})
export class ProblemCreationComponent {
  setId: number;
  sourceCode: string[] = [];
  name: string = '';
  complexity: string[] = [];
  hints: string[] = [];
  overallComplexity: string = '';
  totalScore: Number = 0;
  codeInput: string = '';
  problemId: number;

  constructor(private problemService: ProblemService,
    private router: Router, private _snackBar: MatSnackBar,
    private complexityParserService: ComplexityParserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ){ }
  ngOnInit(){
    this.route.params.subscribe(params => {
      const setIdParam = params['setId'];
      if(setIdParam) {this.setId = setIdParam;}
      const problemIdParam = params['problemId'];
      if(problemIdParam) {this.problemId = problemIdParam;}
   });

   if(this.problemId){
    this.problemService.getProblemById(this.problemId).subscribe({
      next: (problem: Problem) => {
        this.name = problem.name;
        this.sourceCode = problem.sourceCode;
        this.complexity = problem.complexity;
        this.overallComplexity = problem.overallComplexity;
        this.totalScore = problem.totalScore;
        this.hints = problem.hints
      },
      error: () => {
        this.router.navigate(['/teacher-set-problems/' + this.setId])
      }
    })
   }
  }


  getSourceCodeFromTextInput(){
    if(this.codeInput.length > 0){
      for (let line of this.codeInput.split(/[\r\n]+/)){
        this.sourceCode.push(line);
        this.complexity.push('');
        this.hints.push('');
      }
    }
    else{
      this._snackBar.open('Enter Source Code or Upload a File','X', {duration: 2000})
    }
  }

  onFileSelected(event: any){
    const file:File = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () =>{
      let fileContent = reader.result as string;
      for (const line of fileContent.split(/[\r\n]+/)){
        this.sourceCode.push(line);
        this.complexity.push('');
        this.hints.push('');
      }
    }
    reader.readAsText(file);
  }


  formComplete(){
    if(this.name && this.overallComplexity && this.sourceCode.length > 0
      && this.complexity.length > 0){
        return true;
    }
    return false;
  }

  setCodeInput(event: any){
    this.codeInput = event.target.innerText;
  }

  /*https://stackoverflow.com/questions/2237497/make-the-tab-key-insert-a-tab-character
  -in-a-contenteditable-div-and-not-blur */
  handleTab(event: any){
    this.codeInput = event.target.innerText;

    event.preventDefault();

    let sel          = document.getSelection(),
        range        = sel?.getRangeAt(0),
        tabNodeValue = '\t',
        tabNode      = document.createTextNode(tabNodeValue);
      if(range){
        range.insertNode(tabNode)
        range.setStartAfter(tabNode)
        range.setEndAfter(tabNode)
      }
  }

  submitProblem(){
    if(!this.formComplete()){
      this._snackBar.open('Form Incomplete','X', {duration: 2000})
    }
    else{
      const createdProblem: Problem = {
        setId: this.setId,
        name: this.name,
        sourceCode: this.sourceCode,
        complexity: this.complexity,
        hints: this.hints,
        overallComplexity: this.overallComplexity,
        totalScore: this.getTotalScore(),
      }

      if(this.problemId){
        this.problemService.updateProblem(this.problemId, createdProblem).subscribe({
          next: () => {
            this._snackBar.open(`Problem ${createdProblem.name} Updated`, 'X', {duration: 2000});
            this.router.navigate(['/teacher-set-problems/' + this.setId]);
          },
          error: () => this._snackBar.open('Unable to Update Problem','X', {duration: 2000})
        });
      }
      else if(this.setId) {
        this.problemService.addProblem(createdProblem, this.setId).subscribe({
          next: () => this.router.navigate(['/teacher-set-problems/' + this.setId])
        });
      }
      else {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;
        dialogConfig.width = '270px';

        const dialogRef = this.dialog.open(SelectSetModalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
          (setIds: Map<number, number>) => {
            if(setIds){
              setIds.forEach((setId: number) => {
                this.addProblemToSets(createdProblem, setId);
                this.router.navigate(['teacher-problemset-classroom/1'])
              })
            }
        });
      }
    }
  }

  addProblemToSets(problem: Problem, setId: number){
    let postedProblem = {...problem};
    postedProblem.setId = setId;
    this.problemService.addProblem(postedProblem, setId).subscribe();
  }

  getTotalScore(){
    let totalScore: number = 1;
    this.complexity.forEach(line => {
      if(line){
        totalScore++;
      }
    });
    return totalScore;
  }


/**
*   Parses the source code to autofill the complexity within the problem creation panel and find the total complexity.
**/
parse() {

  this.setAllToConstant();
  let blockList = this.complexityParserService.parse(this.sourceCode.join("\n"))
  let maxN = 0;

  blockList.forEach((block) => {

    this.complexity[block.begLine - 1] = this.formatComplexity(block.complexity)

    this.hints[block.begLine - 1] = block.complexity == 0 ? "The complexity is linear" : "The complexity is exponential"

    if (block.complexity > maxN)
      maxN = block.complexity

  })

  this.overallComplexity = this.formatComplexity(maxN)
}

/**
*   Sets all line to constant. Hints will mention linear complexiity.
**/
setAllToConstant() {
  for (let i = 0; i < this.complexity.length; i++) {
    this.complexity[i] = "o(1)";
    this.hints[i] = "The complexity is linear";
    this.overallComplexity = "o(1)";
  }
}

  /**
  *   Returns the string equivalent of a complexity
  *   @param complexity a problem.
  *   @returns The complexity.
  **/
private formatComplexity(complexity: number): string {

let output: string

switch (complexity) {
    case 0: {
      output = "o(1)"
      break;
    }
    case 1: {
      output = "o(n)"
      break;
    }
    default: {
      output = "o(n^" + complexity + ")"
      break;
    }
  }

  return output
}

}
