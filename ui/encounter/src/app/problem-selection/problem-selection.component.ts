import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../problem-service/problem.service';
import { Problem } from '../problem';

@Component({
  selector: 'app-problem-selection',
  templateUrl: './problem-selection.component.html',
  styleUrls: ['./problem-selection.component.css']
})
export class ProblemSelectionComponent implements OnInit {

  constructor(private problemService: ProblemService) {}

  allProblems: any;
  selectedProblems: any;

  ngOnInit(){
    this.allProblems = this.problemService.getAllProblems().subscribe(data => {
      this.allProblems = data;
      this.selectedProblems = this.allProblems;
    });
  }  

  
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

  matchesSearch(searchText: string, problem: Problem){
    if(problem.name.toLowerCase() == searchText.toLowerCase() || problem.name.toLowerCase().includes(searchText.toLowerCase())){
        return true;
    }
    else{
      return false;
    }
  }

}
