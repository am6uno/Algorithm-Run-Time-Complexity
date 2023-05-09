import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProblemsetService } from '../problemset-service/problemset.service';
import { ProblemSet } from '../problemset';
import { UserService } from '../user.service';
import { Classroom } from '../classroom';
import { ClassroomService } from '../classroom-service/classroom.service';

@Component({
  selector: 'app-select-set-modal',
  templateUrl: './select-set-modal.component.html',
  styleUrls: ['./select-set-modal.component.css']
})

/**
 * This component handles the set selection modal.
 */
export class SelectSetModalComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<SelectSetModalComponent>, 
    private problemsetService: ProblemsetService, 
    private userService: UserService, 
    private classroomService: ClassroomService
  ) {}

  sets: ProblemSet[] = [];
  selectedSets: Map<number, number> = new Map<number, number>();

  /**
   * This is the code that's ran when the component is initialized.
   */
  ngOnInit(): void {
    this.classroomService.getClassroomsByTeacherEmail(this.userService.user.teacherEmail).subscribe({
      next: (classrooms: Classroom[]) => {
        classrooms.forEach((classroom: Classroom) => {
          this.problemsetService.getProblemSetsByClassroomId(classroom.id as any).subscribe({
            next: (sets: ProblemSet[]) => {
              this.sets = this.sets.concat(sets);
            }
          });
        });
      },
      error: () => {
        this.sets = []
      }
    })


   
  }

  /**
   * This method handles set selection.
   * @param set - the problem set being selected.
   */
  selectSet(set: ProblemSet){
    if(set.id){
      const setId = set.id;
      this.selectedSets.has(setId) ? this.selectedSets.delete(setId) : this.selectedSets.set(setId, setId);
    }
  }

  /**
   * This method returns a boolean if the set is selected or not.
   * @param set - the set being looked at
   * @returns true if the set is being selected, false if not.
   */
  isSelected(set: ProblemSet){
    return set.id && this.selectedSets.has(set.id) ? true : false;
  }

  /**
   * Adds a set.
   */
  add(){
    this.dialog.close(this.selectedSets);
  }

  /**
   * Closes the dialog box.
   */
  close(){
    this.dialog.close();
  }
}
