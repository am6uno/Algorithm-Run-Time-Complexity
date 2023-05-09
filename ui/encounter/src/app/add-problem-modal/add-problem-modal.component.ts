import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';
import CryptoJS from 'crypto-js';

/**
 * This is a modal for the teacher to add Problems. 
 */
@Component({
  selector: 'app-add-problem-modal',
  templateUrl: './add-problem-modal.component.html',
  styleUrls: ['./add-problem-modal.component.css']
})

/**
 * The main problem modal component.
 */
export class AddProblemModalComponent implements OnInit {
  currentProblems: Problem[] = [];
  currentProblemMap: Map<string, Problem> = new Map<string, Problem>();
  allProblems: Problem[] = [];
  problemCandidates: Problem[] = [];
  problemsToAdd: Map<number, Problem> = new Map<number, Problem>();

  /**
   * This is the constructor for the component. It contains info for a dialog box, a problemService, and data pulled from MAT_DIALOG
   * @param dialog - the dialog box
   * @param problemService - the problemService for retrieving Problems
   * @param data - the data being returned from MAT_DIALOG_DATA
   */
  constructor(public dialog: MatDialogRef<AddProblemModalComponent>, private problemService: ProblemService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  /**
   * This is the onInit method for this component. It grabs the data for the currentProblems list, creates a ProblemMap,
   * and grabs data for receivedProblems.
   */
  ngOnInit() {
    this.currentProblems = this.data.currentProblems;
    this.createProblemMap();
    this.problemService.getAllProblems().subscribe(recievedProblems => {
      this.allProblems = recievedProblems;
      this.getProblemCandidates(this.allProblems);
    });
  }

  /**
   * Creates a hash map for Problems.
   */
  createProblemMap(){
    this.currentProblems.forEach( (problem: Problem) => {
      const problemContentHash = this.getProblemHash(problem);  
      this.currentProblemMap.set(problemContentHash, problem);
    })
  }

  /**
   * This method takes a list of Problems and if it doesn't have a hash associated with it, adds it to the list.
   * @param allProblems - the list of problems to be checked.
   */
  getProblemCandidates(allProblems: Problem[]){
    this.problemCandidates = [];
    allProblems.forEach((problem: Problem) => {
      const problemContentHash = this.getProblemHash(problem);
      if (!this.currentProblemMap.has(problemContentHash)){
        this.problemCandidates.push(problem);
      }
    })
  }

  /**
   * This method updates a candidate problem. If its id has been passed, delete it. Otherwise, add it to the map.
   * @param problem - the problem being checked
   * @param event - the event to be stopped so other objects aren't changed.
   */
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

  /**
   * This method returns the data from a given problem in the map.
   * @param problem - the problem data being retrieved
   * @returns a string of the problem's content
   */
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

  /**
   * Creates a dialog that shows the problem has been added
   */
  add(){
    this.dialog.close(this.problemsToAdd)
  }

  /**
   * Closes the dialog box.
   */
  close(){
    this.dialog.close()
  }

}
