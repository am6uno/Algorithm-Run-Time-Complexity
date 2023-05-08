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
export class SelectSetModalComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<SelectSetModalComponent>, 
    private problemsetService: ProblemsetService, 
    private userService: UserService, 
    private classroomService: ClassroomService
  ) {}

  sets: ProblemSet[] = [];
  selectedSets: Map<number, number> = new Map<number, number>();

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

  selectSet(set: ProblemSet){
    if(set.id){
      const setId = set.id;
      this.selectedSets.has(setId) ? this.selectedSets.delete(setId) : this.selectedSets.set(setId, setId);
    }
  }

  isSelected(set: ProblemSet){
    return set.id && this.selectedSets.has(set.id) ? true : false;
  }

  add(){
    this.dialog.close(this.selectedSets);
  }

  close(){
    this.dialog.close();
  }

}
