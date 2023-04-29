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
  selectedSets: Map<number, number> = new Map<number, number>();

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
