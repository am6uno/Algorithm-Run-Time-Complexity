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
  sourceCode: string[] = [];
  name: string = '';
  complexity: string[] = [];
  hints: string[] = [];
  answer: string = '';
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
    if(this.name && this.answer && this.sourceCode.length > 0  
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
        name: this.name,
        sourceCode: this.sourceCode,
        complexity: this.complexity,
        totalScore: this.getTotalScore(),
        currentScore: 0,
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

  forloopSimpleExample: string = `
  for (int x = 0; x < 10; i++) {
    int x = 5;
  }

  for (int x = 0; x < 10; i++) {
    int x = 5;
  }
  `;

  forloopExample: string = `
  for (int x = 0; x < 10; i++) {
    int x = 5;
  }

  int y = 5;

  while (true) {
    int x = 5;
  }

  if (true){

  }

  do {
    //something
  } while (i <= 10);
  `;

  forloopExample2: string = `
  for (int x = 0; x < 10; i++) {
    for (int y = 0; y < 10; y++) {
        for (int z = 0; z < 10; z++) {
          if (true){
            something }
        }
    }
  }

  
  for (int x = 0; x < 10; i++) {
    for (int y = 0; y < 10; y++) {
        for (int z = 0; z < 10; z++) {
          if (true){
            something }
        }
    }
  }
  
  `;


parser() {
  this.complexityParserService.parse(this.forloopExample)
}

setAllToConstant() {
  this.complexity.forEach ((line) => line = "o(1)")
  this.hints.forEach ((line) => line = "The complexity is linear")
}

}
