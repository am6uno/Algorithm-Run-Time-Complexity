import {Component, OnInit} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';
import { ProblemsetService } from '../problemset-service/problemset.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-student-problem-set-component',
  templateUrl: './student-problem-set.component.html',
  styleUrls: ['./student-problem-set.component.css'],
})
export class StudentProblemSetComponent implements OnInit {

  constructor(private problemsetService: ProblemsetService, private problemService: ProblemService, private activatedRoute: ActivatedRoute,
    private router : Router) {
  }
  problems: Problem[] = [];
  sets: any = [];
  classroomId: number;

  ngOnInit(): void {
    /* this method runs when the component is initialized. You could create a method in the problem service to make a get request
    to get all the problems from the getAllProblemSets method in the backend.

    In the Html you can use *ngFor on the Sets variable to create a mat expansion panel for each set.*/

    this.activatedRoute.params.subscribe(params => {
      this.classroomId = params["id"];
    });

    this.problemsetService.getProblemSetsByClassroomId(this.classroomId).subscribe(sets => {
      //FIXME: do we just need to pull data from above into sets?
      this.sets = sets;
      this.sets.forEach((set:any) => {
        this.problemsetService.getProblemSetsByClassroomId(this.classroomId).subscribe({
          next : (problemset: ProblemSet[]) => {set.problems = problemset},
          error : () => {set.problems = []}
      });
    });
   });
  }


  selectProblem(problemId: number)
  {
    //FIXME: logic to route button press here, used in html
    this.router.navigate(['student-solution/' + problemId])
  }
}
