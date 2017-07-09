import {Component, OnInit} from '@angular/core';
import {AdalService} from "ng2-adal/core";
import {SecretService} from "./services/secret.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.adalService.handleWindowCallback();
    this.adalService.getUser();
  }

  constructor(private adalService: AdalService, private secretService: SecretService, private router: Router) {
    this.adalService.init(this.secretService.adalConfig);
  }
}
