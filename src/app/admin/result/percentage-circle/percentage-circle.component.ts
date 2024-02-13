import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-percentage-circle',
  templateUrl: './percentage-circle.component.html',
  styleUrls: ['./percentage-circle.component.css']
})
export class PercentageCircleComponent implements OnInit {
  @Input() percentage: number = 20;
  @Input() color: string = '#4caf50'; // Change color as desired
  @Input() strokeWidth: number = 10;

  circumference: number = Math.PI * 180; // Circumference for radius 90 (180 is diameter)
  offset: number = this.circumference;

  constructor() { }

  ngOnInit(): void {
    this.updateProgress();
  }

  private updateProgress(): void {
    const progress = this.percentage / 100;
    this.offset = this.circumference * (1 - progress);
  }
  setPercentage(percentage: number): void {
    this.percentage = percentage;
    this.updateProgress(); // Update progress when percentage changes
  }
}

