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
      categories: [ 'Sept 23', 'Oct 23', 'Nov 23','Dec 23', 'Jan 24', 'Feb 24', 'Mar 24', 'April 24'], 
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
      data: [10, 100, 150, 130, 110 , 400, 450, 600],
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
        { name: 'OOPS', y: 5 },
        { name: 'Python', y: 2 },
        { name: 'Coding', y: 5 },
      ],
      type: 'pie'
    }]
  };
}
