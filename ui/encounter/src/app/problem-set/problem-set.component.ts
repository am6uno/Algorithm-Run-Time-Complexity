import {Component, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: '[app-problem-set-component]',
  templateUrl: './problem-set.component.html',
  styleUrls: ['./problem-set.component.css'],
})
export class ProblemSetComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
}
