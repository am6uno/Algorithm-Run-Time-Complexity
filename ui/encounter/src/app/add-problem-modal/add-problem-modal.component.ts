import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';

@Component({
  selector: 'app-add-problem-modal',
  templateUrl: './add-problem-modal.component.html',
  styleUrls: ['./add-problem-modal.component.css']
})
export class AddProblemModalComponent implements OnInit {
  currentProblems: Problem[] = [];
  currentProblemMap: Map<number, Problem> = new Map<number, Problem>();
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
      if(problem.id){
        this.currentProblemMap.set(problem.id, problem);
      }
    })
  }

  getProblemCandidates(allProblems: Problem[]){
    this.problemCandidates = [];
    allProblems.forEach((problem: Problem) => {
      if (problem.id && !this.currentProblemMap.has(problem.id)){
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

  add(){
    console.log(this.problemsToAdd);
    this.dialog.close(this.problemsToAdd)
  }

  close(){
    this.dialog.close()
  }

}
