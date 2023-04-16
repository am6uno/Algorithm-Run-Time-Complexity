import { Component } from '@angular/core';
import { ProblemsetService } from '../problemset-service/problemset.service';
import { ActivatedRoute } from '@angular/router';
import { ProblemSet } from '../problemset';

@Component({
  selector: 'app-teacher-problemset-page',
  templateUrl: './teacher-problemset-page.component.html',
  styleUrls: ['./teacher-problemset-page.component.css']
})
export class TeacherProblemsetPageComponent {

  constructor(private problemSetService: ProblemsetService, private activatedRoute: ActivatedRoute) {}

  allProblemSets: ProblemSet[] = [];
  classroomId: number;
  selectedProblemset: ProblemSet;
  newProblemSet = {
    name: "",
    classroomId: 0,
    problemList: [],
    type: "Practice",
    showDate: "",
    dueDate: "",
    visibility: "Based on due date"
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.classroomId = params["id"]
    });

    this.problemSetService.getProblemSetsByClassroomId(this.classroomId).subscribe(data => {
      this.allProblemSets = data;
    });

    this.selectedProblemset = this.newProblemSet;
  }  

  selectProblemSet(problemset: ProblemSet) {
    this.selectedProblemset = problemset;
  }

  createProblemSet() {
    this.problemSetService.addProblemSet(this.selectedProblemset);
  }

}
