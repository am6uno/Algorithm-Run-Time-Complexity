import {Component, OnInit} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { Problem } from '../problem';
import { ProblemService } from '../problem-service/problem.service';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-student-problem-set-component',
  templateUrl: './student-problem-set.component.html',
  styleUrls: ['./student-problem-set.component.css'],
})
export class StudentProblemSetComponent implements OnInit {
  Problems: Problem[] = [];
  Sets: any = [];

  constructor(private problemSetService: ProblemSetService, private activatedRoute: ActivatedRoute) {
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
      this.Sets = data;
    });


  }
}
