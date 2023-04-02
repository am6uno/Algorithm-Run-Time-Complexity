import { Component } from '@angular/core';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComplexityParserService } from '../complexity-parser/complexity-parser.service';

@Component({
  selector: 'app-problem-creation',
  templateUrl: './problem-creation.component.html',
  styleUrls: ['./problem-creation.component.css']
})
export class ProblemCreationComponent {
  setId: number = 1;
  sourceCode: string[] = [];
  name: string = '';
  complexity: string[] = [];
  hints: string[] = [];
  overallComplexity: string = '';
  totalScore: Number = 0;
  codeInput: string = '';

  constructor(private problemService: ProblemService, private router: Router, private _snackBar: MatSnackBar, private complexityParserService: ComplexityParserService){ }

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
      this.problemService.addProblem(createdProblem).subscribe();
      this.router.navigate(['']);
    }    
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

setAllToConstant() {
  for (let i = 0; i < this.complexity.length; i++) {
    this.complexity[i] = "o(1)";
    this.hints[i] = "The complexity is linear";
    this.overallComplexity = "o(1)";
  }
}

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
