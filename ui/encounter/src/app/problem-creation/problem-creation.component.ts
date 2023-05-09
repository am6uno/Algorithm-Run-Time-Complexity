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

/**
 * This component handles problem creation by teachers.
 */
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

  /**
   * The constructor for the component
   * @param problemService - the problemService used to access problem methods 
   * @param router - used for routing to the correct page
   * @param _snackBar - used to send the user messages
   * @param complexityParserService - used for parsing algorithmic complexity
   * @param route - the route being used
   * @param dialog - the dialog box to deliver messages
   */
  constructor(private problemService: ProblemService,
    private router: Router, private _snackBar: MatSnackBar,
    private complexityParserService: ComplexityParserService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ){ }

  /**
   * This code is ran when the component is initialized. 
   */
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

  /**
   * Obtains a problem (in the form of code) via a text box
   */
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

  /**
   * Allows the user to upload code via a file upload box.
   * @param event - the current event
   */
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


  /**
   * This method checks if a form is complete
   * @returns true if the orm is complete, false if not
   */
  formComplete(){
    if(this.name && this.overallComplexity && this.sourceCode.length > 0
      && this.complexity.length > 0){
        return true;
    }
    return false;
  }

  /**
   * This method sets the code input to the text inside the event's textbox
   * @param event - the current event
   */
  setCodeInput(event: any){
    this.codeInput = event.target.innerText;
  }

  /*https://stackoverflow.com/questions/2237497/make-the-tab-key-insert-a-tab-character
  -in-a-contenteditable-div-and-not-blur */
  /**
   * This method handles indentation in a text-uploaded problem
   * @param event - the current event
   */
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

  /**
   * This method submits a problem to the backend if its information is valid.
   */
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
        this.problemService.addProblem(createdProblem).subscribe({
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

  /**
   * This method adds a probem to a set.
   * @param problem - the problem being added
   * @param setId - the set the problem is being added to
   */
  addProblemToSets(problem: Problem, setId: number){
    let postedProblem = {...problem};
    postedProblem.setId = setId;
    this.problemService.addProblem(postedProblem).subscribe();
  }

  /**
   * This method returns the total score for a problem based on the number of lines.
   * @returns the total score for a problem.
   */
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
*   This method parses the source code to autofill the complexity within the problem creation panel and find the total complexity.
**/
parse() {

  this.setAllToConstant();
  let blockList = this.complexityParserService.parse(this.sourceCode.join("\n"))
  let maxN = 0;

  blockList.forEach((block) => {

    this.complexity[block.begLine - 1] = this.formatComplexity(block.complexity)

    // Set the hint
    switch (block.complexity) {
      case 1: {
        this.hints[block.begLine - 1] = "The complexity is linear"
        break;
      }
      case 2: {
        this.hints[block.begLine - 1] = "The complexity is quadratic"
        break;
      }
      case 3: {
        this.hints[block.begLine - 1] = "The complexity is cubic"
        break;
      }
      default: {
        this.hints[block.begLine - 1] = "The complexity is polynomial"
        break;
      }
    }

    if (block.complexity > maxN)
      maxN = block.complexity

  })

  this.overallComplexity = this.formatComplexity(maxN)
}

/**
*   This method sets all line to constant. Hints will mention constant complexiity.
**/
setAllToConstant() {
  for (let i = 0; i < this.complexity.length; i++) {
    this.complexity[i] = "o(1)";
    this.hints[i] = "The complexity is constant";
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
    case -1: {
      output = "o(log n)"
      break;
    }
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
