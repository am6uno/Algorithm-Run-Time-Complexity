import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Classroom} from "../classroom";
import {ClassroomService} from "../classroom-service/classroom.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Student} from "../student";
import {StudentService} from "../student-service/student.service";

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css']
})
export class ClassroomDetailComponent implements OnChanges{
  @Input() classroom: Classroom;

  message = '';
  students = true;
  student_list: Student[]


  constructor(private classroomService:ClassroomService, private _snackBar: MatSnackBar ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.student_list = this.classroom.enrolled_students
    console.log(this.student_list);
    if (this.student_list.length === 0){
      this.students = false;
      this.message = 'No Students Currently Enrolled'
    }

  }




}
