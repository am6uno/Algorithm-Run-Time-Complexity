import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProblemsetService } from '../problemset-service/problemset.service';
import { ProblemSet } from '../problemset';

@Component({
  selector: 'app-select-set-modal',
  templateUrl: './select-set-modal.component.html',
  styleUrls: ['./select-set-modal.component.css']
})
export class SelectSetModalComponent implements OnInit {
  constructor(public dialog: MatDialogRef<SelectSetModalComponent>, private problemsetService: ProblemsetService) {}
  sets: ProblemSet[] = [];
  selectedSetId: number | undefined;

  ngOnInit(): void {
    // TODO: switch to get sets from all the teachers classrooms.
    this.problemsetService.getAllProblemSets().subscribe({
      next: (sets: ProblemSet[]) => {
        this.sets = sets;
      },
      error: () => {
        console.log("no sets found");
        this.sets = []
      }
    });
  }

  selectSet(setId: any){
    this.selectedSetId != setId ? this.selectedSetId = setId : this.selectedSetId = undefined;
    console.log(this.selectedSetId)
  }

  add(){
    this.dialog.close(this.selectedSetId);
  }

  close(){
    this.dialog.close();
  }

}
