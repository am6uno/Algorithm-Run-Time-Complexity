import { Component } from '@angular/core';
import { ProblemsetService } from '../problemset-service/problemset.service';
import { ActivatedRoute } from '@angular/router';
import { ProblemSet } from '../problemset';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-problemset-page',
  templateUrl: './teacher-problemset-page.component.html',
  styleUrls: ['./teacher-problemset-page.component.css']
})
export class TeacherProblemsetPageComponent {

  constructor(private problemSetService: ProblemsetService, private activatedRoute: ActivatedRoute, 
    private datePipe: DatePipe, private _snackBar: MatSnackBar, private router: Router) {}

  allProblemSets: ProblemSet[] = [];
  classroomId: number;
  selectedProblemset: ProblemSet | null = null;      // The problemSet that is currently selected
  problemsetForm: ProblemSet;                        // The problemSet in the form
  currentDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
  

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.classroomId = params["id"]
    });

    this.problemSetService.getProblemSetsByClassroomId(this.classroomId).subscribe(data => {
      this.allProblemSets = data;
    });

    this.problemsetForm = this.getEmptyProblemSet();
  }  

  selectProblemSet(problemset: ProblemSet) {

    // Check if the same problemset is being selected, if so, unselect it.
    if (problemset === this.selectedProblemset) {
      this.unSelectProblemSet();
      return;
    }

    this.selectedProblemset = problemset;
    this.problemsetForm = this.selectedProblemset;
  }

  unSelectProblemSet() {
    this.selectedProblemset = null;
    this.problemsetForm = this.getEmptyProblemSet();
  }

  createProblemSet() {
    // If name is empty and blank, reject the request. We only need to check for name
    // as everything else in the form is already filled out
    if (this.problemsetForm.name.length > 0 && this.problemsetForm.name !== "") {
      this.problemSetService.addProblemSet(this.problemsetForm).subscribe(data => {
        this.addToAllProblemSetsList(data);
      });
      
      this.problemsetForm = this.getEmptyProblemSet();
    }

    else {
      this._snackBar.open('Set cannot have empty name.','X', {duration: 2000})
    }
  }

  deleteProblemSet() {
    if (this.selectedProblemset && this.selectedProblemset.id !== undefined) {
      this.removefromAllProblemSetsList(this.selectedProblemset);
      this.problemSetService.deleteProblemSet(this.selectedProblemset.id).subscribe();

      // Set the selectProblemset and problemsetForm to none
      this.selectedProblemset = null;
      this.problemsetForm = this.getEmptyProblemSet();
    }
  }

  updateProblemSet() {
    // If name is empty and blank, reject the request. We only need to check for name
    // as everything else in the form is already filled out
    if (this.problemsetForm.name.length > 0 && this.problemsetForm.name !== "") {
      if (this.selectedProblemset && this.selectedProblemset.id !== undefined) {
        this.problemSetService.updateProblemSet(this.problemsetForm, this.selectedProblemset.id).subscribe();
      }
    }
    else {
      this._snackBar.open('Set cannot have empty name.','X', {duration: 2000})
    }
  }

  viewProblemSet() {
    this.router.navigate(['teacher-set-problems/' + this.selectedProblemset?.id])
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

  getBorderColor(problemset: ProblemSet): String {
    if (problemset === this.selectedProblemset) {
      return "#ff8864";
    }
    return "#bd8c7d";
  }

  getEmptyProblemSet(): ProblemSet {
    return {
      name: "",
      classroomId: this.classroomId,
      problemList: [],
      type: "Practice",
      showDate: this.currentDate === null ? "" : this.currentDate,
      dueDate: this.currentDate === null ? "" : this.currentDate,
      visibility: "Based on due date"
    }
  }
}
