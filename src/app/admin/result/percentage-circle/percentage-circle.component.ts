import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-percentage-circle',
  templateUrl: './percentage-circle.component.html',
  styleUrls: ['./percentage-circle.component.css']
})
export class PercentageCircleComponent implements OnInit {
  @Input() percentage: number = 0;
  @Input() totalAssignedUsers: number = 0;
  circumference: number = Math.PI * 180; 
  offset: number = this.circumference;

  constructor() { }

  ngOnInit(): void {
  }

}
