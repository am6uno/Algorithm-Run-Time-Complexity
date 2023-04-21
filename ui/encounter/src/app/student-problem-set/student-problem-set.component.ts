import {Component, OnInit} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';
import { ProblemsetService } from '../problemset-service/problemset.service';
import { ActivatedRoute } from '@angular/router';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-student-problem-set-component',
  templateUrl: './student-problem-set.component.html',
  styleUrls: ['./student-problem-set.component.css'],
})
export class StudentProblemSetComponent implements OnInit {
  problems: Problem[] = [];
  sets: any = [];
  classroomId: number;

  constructor(private problemsetService: ProblemsetService, private problemService: ProblemService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    /* this method runs when the component is initialized. You could create a method in the problem service to make a get request
    to get all the problems from the getAllProblemSets method in the backend.

    In the Html you can use *ngFor on the Sets variable to create a mat expansion panel for each set.*/

    //FIXME: Alex has branch with problem service request to get all problem sets for a given teacher. Use that
    this.activatedRoute.params.subscribe(params => {
      this.classroomId = params["id"];
    });

    this.problemSetService.getProblemSetsByClassroomId(this.classroomId).subscribe(data => {
      this.sets = sets;
      this.sets.forEach((set:any) => {
        ProblemService.getProblemSetsByClassroomId({
          next(): (problems: Problem[]) => {set.problems = this.problems},
          error(): () => {set.problems = []}
        });
      });
    });

    //My version of the above logic, keeping for any future need

    //Populating array of arrays of problems
    //for (let i = 0; i < Sets.length; i++)
    //{
    //  Problems[i] = this.problemService.getProblemBySetId(Sets[i].)
    //}

  }

  selectProblem(problem: Problem){

  }
}
