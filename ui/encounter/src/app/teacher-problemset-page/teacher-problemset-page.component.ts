import { Component } from '@angular/core';
import { ProblemsetService } from '../problemset-service/problemset.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-problemset-page',
  templateUrl: './teacher-problemset-page.component.html',
  styleUrls: ['./teacher-problemset-page.component.css']
})
export class TeacherProblemsetPageComponent {

  constructor(private problemSetService: ProblemsetService, private activatedRoute: ActivatedRoute) {}

  allProblemSets: any = [];
  classroomId: number;

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.classroomId = params["id"]
    });

    this.allProblemSets = this.problemSetService.getProblemSetsByClassroomId(this.classroomId).subscribe(data => {
      this.allProblemSets = data;
    });
  }  

}
