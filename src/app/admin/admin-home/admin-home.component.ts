import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})

// https://www.npmjs.com/package/highcharts-angular Please refer this to customize the charts

export class AdminHomeComponent {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    title: {
      text: 'User count'
    },
    xAxis: {
      categories: ['Jan 23', 'Feb 23', 'Mar 23', 'Apr 23', 'May 23', 'Jun 23', 'Jul 23', 'Aug 23'], 
      title: {
        text: 'Time' 
      }
    },
    yAxis: {
      title: {
        text: 'Users'
      }
    },
    series: [{
      data: [10, 200, 500, 300, 60, 500, 700, 1000],
      type: 'line'
    }]
  };
  pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Subjects' 
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}' // Display name and value for each part
        }
      }
    },
    series: [{
      data: [
        { name: 'Angular', y: 3 },
        { name: 'Java', y: 7 },
        { name: 'OOPS', y: 10 },
        { name: 'Python', y: 2 },
        { name: 'Aptitude', y: 5 },
      ],
      type: 'pie'
    }]
  };
}
