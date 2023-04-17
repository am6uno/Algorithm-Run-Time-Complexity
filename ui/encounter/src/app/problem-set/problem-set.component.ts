import {Component, OnInit} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-problem-set-component',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.css'],
})
export class ProblemSetComponent implements OnInit {
  Problems: Problem[] = [];
  Sets: any = [];

  constructor(private problemService: ProblemService) {
  }

  ngOnInit(): void {
    /* this method runs when the component is initialized. You could create a method in the problem service to make a get request 
    to get all the problems from the getAllProblemSets method in the backend.
    
    In the Html you can use *ngFor on the Sets variable to create a mat expansion panel for each set.*/
  }
}