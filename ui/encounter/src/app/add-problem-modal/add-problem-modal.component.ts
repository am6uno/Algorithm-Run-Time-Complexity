import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-problem-modal',
  templateUrl: './add-problem-modal.component.html',
  styleUrls: ['./add-problem-modal.component.css']
})
export class AddProblemModalComponent implements OnInit {
  currentProblems: Problem[] = [];
  currentProblemMap: Map<string, Problem> = new Map<string, Problem>();
  allProblems: Problem[] = [];
  problemCandidates: Problem[] = [];
  problemsToAdd: Map<number, Problem> = new Map<number, Problem>();
  constructor(public dialog: MatDialogRef<AddProblemModalComponent>, private problemService: ProblemService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.currentProblems = this.data.currentProblems;
    this.createProblemMap();
    this.problemService.getAllProblems().subscribe(recievedProblems => {
      this.allProblems = recievedProblems;
      this.getProblemCandidates(this.allProblems);
    });
  }

  createProblemMap(){
    this.currentProblems.forEach( (problem: Problem) => {
      const problemContentHash = this.getProblemHash(problem);  
      this.currentProblemMap.set(problemContentHash, problem);
    })
  }

  getProblemCandidates(allProblems: Problem[]){
    this.problemCandidates = [];
    allProblems.forEach((problem: Problem) => {
      const problemContentHash = this.getProblemHash(problem);
      if (!this.currentProblemMap.has(problemContentHash)){
        this.problemCandidates.push(problem);
      }
    })
  }

  updateCandidateProblem(problem: Problem, event: Event){
    event.stopPropagation();
    if(problem.id){
      if (this.problemsToAdd.has(problem.id)){
        this.problemsToAdd.delete(problem.id);
      }
      else {
        this.problemsToAdd.set(problem.id, problem)
      }
    }
  }

  getProblemHash(problem: Problem){
    let problemContent = {
      sourceCode: problem.sourceCode,
      complexity: problem.complexity,
      hints: problem.hints,
      overallComplexity: problem.overallComplexity,
      totalScore: problem.totalScore
    }
    return CryptoJS.SHA256(JSON.stringify(problemContent)).toString();
  }

  add(){
    this.dialog.close(this.problemsToAdd)
  }

  close(){
    this.dialog.close()
  }

}
