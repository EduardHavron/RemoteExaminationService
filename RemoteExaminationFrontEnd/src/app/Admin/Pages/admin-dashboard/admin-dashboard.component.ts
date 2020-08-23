import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
isPhone: boolean;
  constructor() {
  }

  ngOnInit() {
    this.checkIfPhone();
  }

  checkIfPhone() {
    if (window.innerWidth < window.innerHeight) {
      this.isPhone = true;
    }
  }
}
