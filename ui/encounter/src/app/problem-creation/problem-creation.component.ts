import { Component } from '@angular/core';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';
import { Router } from '@angular/router';

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

  constructor(private problemService: ProblemService, private router: Router){ }

  getSourceCodeFromTextInput(input: any){
    for (const line of (input as string).split(/[\r\n]+/)){
      this.sourceCode.push(line);
      this.complexity.push('');
      this.hints.push('');
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

  submitProblem(){
    if(!this.formComplete()){
      // TODO: add snackbar
    }
    else{
      const createdProblem: Problem = {
        name: this.name,
        sourceCode: this.sourceCode,
        complexity: this.complexity,
        totalScore: 4,
        currentScore: 0,
      }
      this.problemService.addProblem(createdProblem).subscribe(() =>{console.log("success")});
      this.router.navigate(['']);
    }    
  }

}
