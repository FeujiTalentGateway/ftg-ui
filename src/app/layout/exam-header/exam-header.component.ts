import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-exam-header',
  templateUrl: './exam-header.component.html',
  styleUrls: ['./exam-header.component.css'],
})
export class ExamHeaderComponent {
  sharedData: any;
  
  constructor(private sharedService: SharedDataService) {}

  ngOnInit() {
    this.sharedService.examTime$.subscribe((data) => {
      this.sharedData = data;
      if (this.sharedData != null){
        console.log(this.sharedData.exam_time);
        
      }
    });

  }
  
}
// *ngIf="date$ | async as data; else loading"