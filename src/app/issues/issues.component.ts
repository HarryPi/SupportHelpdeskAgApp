import { Component, OnInit } from '@angular/core';
import {IssuesService} from "../services/issues.service";

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  constructor(private issueService: IssuesService) { }

  ngOnInit() {
  }

}
