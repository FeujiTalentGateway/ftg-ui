import { Component, OnInit } from '@angular/core';
// import * as Chart from 'chart.js';
import { ChartOptions } from 'chart.js';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-result-chart',
  templateUrl: './result-chart.component.html',
  styleUrls: ['./result-chart.component.css']
})



export class ResultChartComponent implements OnInit {
  chart: any;

  ngOnInit(): void {
    
  }
}
