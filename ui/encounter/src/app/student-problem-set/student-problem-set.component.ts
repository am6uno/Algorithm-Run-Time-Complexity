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
 * This component contains the Student problemset page. It displays sets of problems visible to a given student and routes them
 * to the appropriate problem page when accessed.
 */
@Component({
  selector: 'app-student-problem-set-component',
  templateUrl: './student-problem-set.component.html',
  styleUrls: ['./student-problem-set.component.css'],
})

/**
 * The main component class.
 */
export class StudentProblemSetComponent implements OnInit {
  
  /**
    * The constructor for the component. Contains data for the constructor, which generates a list for problems, a list for sets,
    * a classroom id, and the date for use with visibility settings.
    * @param problemsetService - the problemsetservice associated with this class
    * @param problemService - the problemService associated with this class
    * @param activatedRoute - the activatedRoute associated with this class
    * @param router - the router used with this class to navigate to Problems
    * @param datePipe - the DatePipe used to retrieve the current date, used for set visibility 
    */
  constructor(private problemsetService: ProblemsetService, private problemService: ProblemService, private activatedRoute: ActivatedRoute,
    private router : Router, private datePipe: DatePipe) {
  }
  problems: Problem[] = [];
  sets: any = [];
  classroomId: number;
  currentDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');

  /**
   * This method runs when the component is initialized. It retrieves the classroom id from the backend as well as all of the 
   * problem sets associated with a classroom. Then it retrieves all of the problems in a separate list for each given problemset
   * for use in the html.
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.classroomId = params["classroomId"];
    });

    this.problemsetService.getProblemSetsByClassroomId(this.classroomId).subscribe(sets => {
      this.sets = sets;
      this.sets.forEach((set:any) => {
        this.problemService.getProblemBySetId(set.id).subscribe({
          next : (problems: Problem[]) => {set.problems = problems},
          error : () => {set.problems = []}
      });
    });
   });
  }

  /**
   * Routes to the appropriate problem page by problem id.
   * @param problemId - the id of the problem to be routed to.
   */
  selectProblem(problemId: number)
  {
    this.router.navigate(['student-solution/' + problemId])
  }
}
