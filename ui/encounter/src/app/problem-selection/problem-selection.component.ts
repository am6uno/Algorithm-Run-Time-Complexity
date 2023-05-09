import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problem-service/problem.service';
import { Problem } from '../problem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problem-selection',
  templateUrl: './problem-selection.component.html',
  styleUrls: ['./problem-selection.component.css']
})

/**
 * This component handles problem selection.
 */
export class ProblemSelectionComponent implements OnInit {

  /**
   * @param problemService The problemService is used to get problems from the backend.
   */
  constructor(private problemService: ProblemService, private router: Router) {}

  allProblems: any = [];
  selectedProblems: any = [];

  /**
   * On initialization the list of all problems are retrevied from the backend via the problemService.
   * allProblems and selectedProblems are set to the problem array from the backend.
   */
  ngOnInit(){
    this.allProblems = this.problemService.getAllProblems().subscribe(data => {
      this.allProblems = data;
      this.selectedProblems = this.allProblems;
    });
  }  

  /**
   * Sets selectedProblems to a filter list of problems based on the search text.
   * @param searchText The search text used to search for problems.
   */
  searchProblems(searchText: string){
    if(!searchText){
      this.selectedProblems = this.allProblems
    }
    else{
      this.selectedProblems = [];
      this.allProblems.forEach((problem :Problem) => {
        if(this.matchesSearch(searchText, problem)){
          this.selectedProblems.push(problem);
        }
      });
    }
  }

  /**
   * Checks whether a problem matches a search.
   * @param searchText text used to search for problems.
   * @param problem a problem that is checked to see if it matches the search.
   * @returns True if the problem name matches the search or False if the problem name does not match the search.
   */
  matchesSearch(searchText: string, problem: Problem){
    if(problem.name.toLowerCase() == searchText.toLowerCase() || problem.name.toLowerCase().includes(searchText.toLowerCase())){
        return true;
    }
    else{
      return false;
    }
  }

  /**
   * This method navigates to a problem based on problemId.
   * @param problemId - the id of the problem to be navigated to.
   */
  selectProblem(problemId: number){
    this.router.navigate(['student-solution/' + problemId])
  }
}
