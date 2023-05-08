import {Component, EventEmitter, Input, NgZone, OnChanges, Output, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {ClassroomCreationComponent} from "../classroom-creation/classroom-creation.component";
import {Classroom} from "../classroom";
import {ClassroomService} from "../classroom-service/classroom.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Student} from "../student";
import {StudentService} from "../student-service/student.service";
import {Router} from "@angular/router";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {ClassroomModalComponent} from "../classroom-modal/classroom-modal.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-classroom-detail',
  templateUrl: './classroom-detail.component.html',
  styleUrls: ['./classroom-detail.component.css']
})
export class ClassroomDetailComponent implements OnChanges{
  @Input() classroom: Classroom;
  @Input() classroom_service: ClassroomService;
  @Input() access_code: string;
  @Input() index: any

  @Output() removeChild = new EventEmitter<number>();


  message = '';
  students = true;
  student_list: Set<any>
  classroom_id: number
  window: Window





  constructor(private classroomService:ClassroomService, private _snackBar: MatSnackBar, private router: Router,
              private zone: NgZone, private dialog: MatDialog, private parent: ClassroomCreationComponent ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.classroom)
    this.student_list = new Set<Student>(this.classroom.enrolled_students)
    if (this.student_list.size === 0){
      this.students = false;
      this.message = 'No Students Currently Enrolled'
    } else {
      this.message = 'Student List'
    }
    this.classroom_id = this.classroom.id !== undefined ? this.classroom.id: 404;
    this.window = window || {}
    this.window.getSelection = this.window.getSelection || (() => null)
  }

  viewProblemSet(): void {
    this.router.navigate(['teacher-problemset-classroom/' + this.classroom?.id] )
  }

  selectAccessCode(event: MouseEvent){
    const span = event.target as HTMLSpanElement;
    const range = document.createRange();
    range.selectNodeContents(span);
    // @ts-ignore
    this.window.getSelection().removeAllRanges();
    // @ts-ignore
    this.window.getSelection().addRange(range);

    try {
      const successful = document.execCommand('copy');
      const message = successful ? 'Copied to clipboard' : 'Unable to copy';
      this._snackBar.open('Copied to Clipboard','X', {duration: 2000})
    } catch (error) {
      console.log('Error copying to clipboard: ', error);
    }
  }
  removeStudent(student: Student): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: "Remove Student",
      message: `Remove ${student.first_name} ${student.last_name}? They can still rejoin using the access code.`,
      acceptText: "Remove"
    }
    this.zone.run(() => {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if(data) {
            console.log(this.classroom_id)
            if (student.id != null) {
              this.classroomService.removeStudent(this.classroom, student.id)
              this.student_list.delete(student);
            }
          }
        }
      );
    });
  }

  newAccessCode(){
    this.classroom_service.getClassroomById(this.classroom_id).subscribe(
      classroom => {
        let updated_classroom = classroom
        const new_code = this.parent.generateAccessCode()
        updated_classroom.accessCode = new_code
        this.classroom_service.updateClassroom(updated_classroom)
      }
    )
  }

  deleteClassroom(classroom: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: "Delete " + this.classroom.name,
      message: "WARNING: This is irreversible. Consider removing all students and regenerating access code to preserve your problem sets.",
      acceptText: "Delete"
    }
    this.zone.run(() => {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        data => {
          if(data) {
            console.log(this.classroom_id)
            this.classroomService.deleteClassroom(this.classroom_id)
            this.removeChild.emit(this.index);
          }
        }
      );
    });
  }








}
