import { Component } from '@angular/core';
import { ProblemsetService } from '../problemset-service/problemset.service';
import { ActivatedRoute } from '@angular/router';
import { ProblemSet } from '../problemset';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-teacher-problemset-page',
  templateUrl: './teacher-problemset-page.component.html',
  styleUrls: ['./teacher-problemset-page.component.css']
})
export class TeacherProblemsetPageComponent {

  constructor(private problemSetService: ProblemsetService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe) {}

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
  currentDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.classroomId = params["id"]
    });

    this.problemSetService.getProblemSetsByClassroomId(this.classroomId).subscribe(data => {
      this.allProblemSets = data;
    });

    // Set the classroom ID
    this.newProblemSet.classroomId = this.classroomId;

    // Set the currentDate
    if (this.currentDate !== null) {
      this.newProblemSet.showDate = this.currentDate;
      this.newProblemSet.dueDate = this.currentDate;
    }

    this.selectedProblemset = this.newProblemSet;
  }  

  selectProblemSet(problemset: ProblemSet) {
    this.selectedProblemset = problemset;
    console.log(this.selectedProblemset);
  }

  createProblemSet() {
    this.problemSetService.addProblemSet(this.selectedProblemset).subscribe(data => {
      this.addToAllProblemSetsList(data);
    });
  
    console.log(this.allProblemSets);
  }

  deleteProblemSet() {
    if (this.selectedProblemset.id !== undefined) {
      this.removefromAllProblemSetsList(this.selectedProblemset);
      this.problemSetService.deleteProblemSet(this.selectedProblemset.id).subscribe();

      // Set the selectProblemset to none
      this.selectedProblemset = this.newProblemSet;
    }
  }

  addToAllProblemSetsList(problemSet: ProblemSet) {
    this.allProblemSets.push({
      id: problemSet.id,
      name: problemSet.name,
      classroomId: problemSet.classroomId,
      problemList: problemSet.problemList,
      type: problemSet.type,
      showDate: problemSet.showDate,
      dueDate: problemSet.dueDate,
      visibility: problemSet.visibility
    });
  }

  removefromAllProblemSetsList(problemSetToRemove: ProblemSet) {
    this.allProblemSets = this.allProblemSets.filter((problemset) => problemset.id != problemSetToRemove.id);
  }
}
