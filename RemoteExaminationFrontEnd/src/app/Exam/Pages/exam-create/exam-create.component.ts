import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.scss']
})
export class ExamCreateComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
