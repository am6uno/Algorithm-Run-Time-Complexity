import {Component, OnInit} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Problem } from '../problem';
import {ProblemSet} from '../problemset'
import { ProblemService } from '../problem-service/problem.service';
import { ProblemsetService } from '../problemset-service/problemset.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
    private router : Router, private datePipe: DatePipe) {
  }
  problems: Problem[] = [];
  sets: any = [];
  classroomId: number;
  currentDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');

  ngOnInit(): void {
    /* this method runs when the component is initialized. You could create a method in the problem service to make a get request
    to get all the problems from the getAllProblemSets method in the backend.

    In the Html you can use *ngFor on the Sets variable to create a mat expansion panel for each set.*/

    this.activatedRoute.params.subscribe(params => {
      this.classroomId = params["classroomId"];
    });

    this.problemsetService.getProblemSetsByClassroomId(this.classroomId).subscribe(sets => {
      //FIXME: do we just need to pull data from above into sets?
      this.sets = sets;
      this.sets.forEach((set:any) => {
        this.problemService.getProblemBySetId(set.id).subscribe({
          next : (problems: Problem[]) => {set.problems = problems},
          error : () => {set.problems = []}
      });
    });
   });
  }

  selectProblem(problemId: number)
  {
    this.router.navigate(['student-solution/' + problemId])
  }
}
