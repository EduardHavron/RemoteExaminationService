import {Component, HostListener, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
isPC = new BehaviorSubject(true);
  constructor() {
  }

  ngOnInit() {
    this.checkIfPhone();
  }

  checkIfPhone() {
    if (window.innerWidth > window.innerHeight) { // it's totally not fine, but i doesn't have enough time for good solution
      this.isPC.next(true);
    } else {
      this.isPC.next(false);
    }
  }

  @HostListener('window:resize', ['$event.target'])
  public onResize(target) {
    this.checkIfPhone();
  }
}
