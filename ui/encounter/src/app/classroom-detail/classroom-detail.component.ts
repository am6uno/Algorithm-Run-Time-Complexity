import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Classroom} from "../classroom";
import {ClassroomService} from "../classroom-service/classroom.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Student} from "../student";
import {StudentService} from "../student-service/student.service";
import {Router} from "@angular/router";

/**
 * This component is for handling changes to Classrooms and provides messages to the user.
 */
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

  /**
   * The constructor for the component. It is passed data for the classRoom service, the snackbar, and the router.
   * @param classroomService - this service is used to remove students
   * @param _snackBar - used for providing messages to the user
   * @param router - used for routing to the correct classroom
   */
  constructor(private classroomService:ClassroomService, private _snackBar: MatSnackBar, private router: Router ) {
  }

  /**
   * When changes are made to the classroom, notify the user if there are or aren't students in the classroom still.
   * @param changes - required for ngOnChanges method
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.student_list = new Set<Student>(this.classroom.enrolled_students)
    if (this.student_list.size === 0){
      this.students = false;
      this.message = 'No Students Currently Enrolled'
    } else {
      this.message = 'Found students'
    }
    this.classroom_id = this.classroom.id !== undefined ? this.classroom.id: 404;
  }

  /**
   * Navigates to the teacher's problemsets for a classroom
   */
  viewProblemSet(): void {
    this.router.navigate(['teacher-problemset-classroom/' + this.classroom?.id] )
  }

  /**
   * Removes a student from student_list
   * @param student - the student to be removed
   */
  removeStudent(student: Student): void {
    if (student.id != null) {
      this.classroomService.removeStudent(this.classroom, student.id)
    }
    this.student_list.delete(student);
  }
  
  /**
   * Toggles view of the page
   */
  toggleView(): void {
    this.viewdetail = !this.viewdetail;
  }
}
