import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {Classroom} from "../classroom";
import {ClassroomService} from "../classroom-service/classroom.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Student} from "../student";
import {StudentService} from "../student-service/student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css']
})
export class ClassroomDetailComponent implements OnChanges{
  @Input() classroom: Classroom;
  @Input() classroom_service: ClassroomService;


  message = '';
  students = true;
  student_list: Set<any>
  viewdetail = false;

  classroom_id: number




  constructor(private classroomService:ClassroomService, private _snackBar: MatSnackBar, private router: Router ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.student_list = new Set<Student>(this.classroom.enrolled_students)
    if (this.student_list.size === 0){
      this.students = false;
      this.message = 'No Students Currently Enrolled'
    } else {
      this.message = 'Student List'
    }
    this.classroom_id = this.classroom.id !== undefined ? this.classroom.id: 404;
  }

  viewProblemSet(): void {
    this.router.navigate(['teacher-problemset-classroom/' + this.classroom?.id] )
  }
  removeStudent(student: Student): void {
    if (student.id != null) {
      this.classroomService.removeStudent(this.classroom, student.id)
    }
    this.student_list.delete(student);
  }








}
