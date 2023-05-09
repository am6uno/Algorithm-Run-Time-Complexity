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

/**
 * This component handles the Teacher-side problem set page.
 */
export class TeacherProblemsetPageComponent {

  /**
   * The constructor for the component.
   * @param problemSetService - the service for manipulating problem sets
   * @param activatedRoute - the current route
   * @param datePipe - the DatePipe for visibility settings
   * @param _snackBar - used for delivering messages to the user
   * @param router - used for routing to the correct web page
   */
  constructor(private problemSetService: ProblemsetService, private activatedRoute: ActivatedRoute, 
    private datePipe: DatePipe, private _snackBar: MatSnackBar, private router: Router) {}

  allProblemSets: ProblemSet[] = [];
  classroomId: number;
  selectedProblemset: ProblemSet | null = null;      // The problemSet that is currently selected
  problemsetForm: ProblemSet;                        // The problemSet in the form
  currentDate = this.datePipe.transform(Date(), 'yyyy-MM-dd');
  
  /**
   * This method executes when the component is initialized.
   */
  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.classroomId = params["id"]
    });

    this.problemSetService.getProblemSetsByClassroomId(this.classroomId).subscribe(data => {
      this.allProblemSets = data;
    });

    this.problemsetForm = this.getEmptyProblemSet();
  }  

  /**
   * This method is used when a user is clicking on a set to select it
   * @param problemset - the problemSet being selected
   * @returns Nothing, there's just a return statement
   */
  selectProblemSet(problemset: ProblemSet) {

    // Check if the same problemset is being selected, if so, unselect it.
    if (problemset === this.selectedProblemset) {
      this.unSelectProblemSet();
      return;
    }

    this.selectedProblemset = problemset;
    this.problemsetForm = this.selectedProblemset;
  }

  /**
   * This method handles unselecting a problem set. If a user clicks a selected set, it is no longer the selected set.
   */
  unSelectProblemSet() {
    this.selectedProblemset = null;
    this.problemsetForm = this.getEmptyProblemSet();
  }

  /**
   * This method handles problem set creation for teachers in the frontend.
   */
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

  /**
   * This method handles problem set deletion from the frontend.
   */
  deleteProblemSet() {
    if (this.selectedProblemset && this.selectedProblemset.id !== undefined) {
      this.removefromAllProblemSetsList(this.selectedProblemset);
      this.problemSetService.deleteProblemSet(this.selectedProblemset.id).subscribe();

      // Set the selectProblemset and problemsetForm to none
      this.selectedProblemset = null;
      this.problemsetForm = this.getEmptyProblemSet();
    }
  }
  
  /**
   * This method handles problem set updating from the front end. 
   */
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
  
  /**
   * This method navigates the user to the selected problemset.
   */
  viewProblemSet() {
    this.router.navigate(['teacher-set-problems/' + this.selectedProblemset?.id])
  }

  /**
   * This method adds the problemset to the list of all problem sets.
   * @param problemSet - the problem set to be added.
   */
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

  /**
   * This method removes the passed set from the list of all problem sets.
   * @param problemSetToRemove - the set to be removed.
   */
  removefromAllProblemSetsList(problemSetToRemove: ProblemSet) {
    this.allProblemSets = this.allProblemSets.filter((problemset) => problemset.id != problemSetToRemove.id);
  }

  /**
   * This method handles what the color of the border should be for the set. They are different when selected/unselected.
   * @param problemset - the problem set to check the color of
   * @returns a hex code for the corresponding color.
   */
  getBorderColor(problemset: ProblemSet): String {
    if (problemset === this.selectedProblemset) {
      return "#ff8864";
    }
    return "#bd8c7d";
  }

  /**
   * This method returns an empty problem set.
   * @returns an empty problem set.
   */
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
