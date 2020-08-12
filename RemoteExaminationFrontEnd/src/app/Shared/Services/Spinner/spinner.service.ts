import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
isLoading: BehaviorSubject<boolean>;
  constructor() { }


  updateProgress(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }
}
