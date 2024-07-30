import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SubjectQuestionCount } from 'src/app/models/subject-question-count.model';
import { ChartDataRepositoryService } from 'src/app/repository/chart-data-repository.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements AfterViewInit {
  Highcharts: typeof Highcharts = Highcharts;
  private subjectQuestionCount: SubjectQuestionCount[] | undefined;

  constructor(private chartDataRepo: ChartDataRepositoryService) {}

  ngAfterViewInit(): void {
    this.chartDataRepo.questionCountBySubject().subscribe(
      (data: SubjectQuestionCount[]) => {
        console.log(data);
        this.subjectQuestionCount = data;
        this.updatePieChart(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePieChart(data: SubjectQuestionCount[]): void {
    const pieData = data.map(item => ({
      name: item.subject,
      y: item.questionCount
    }));

    this.pieChartOptions.series = [
      {
        name: 'Subjects',
        data: pieData,
        type: 'pie',
      },
    ];

    Highcharts.chart('pieChartContainer', this.pieChartOptions);
  }

  chartOptions: Highcharts.Options = {
    title: {
      text: 'User count',
    },
    xAxis: {
      categories: [
        'Jan 23',
        'Feb 23',
        'Mar 23',
        'Apr 23',
        'May 23',
        'Jun 23',
        'Jul 23',
        'Aug 23',
      ],
      title: {
        text: 'Time',
      },
    },
    yAxis: {
      title: {
        text: 'Users',
      },
    },
    series: [
      {
        data: [10, 200, 500, 300, 60, 500, 700, 1000],
        type: 'line',
      },
    ],
  };

  pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'QUESTION BANK',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}',
        },
      },
    },
    series: [
      {
        name: 'Subjects',
        data: [],
        type: 'pie',
      },
    ],
  };
}
