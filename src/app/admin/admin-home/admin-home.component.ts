import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ExamUserStats } from 'src/app/models/ExamUserStats.model';
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
  private examUserStats: ExamUserStats[] | undefined;

  constructor(private chartDataRepo: ChartDataRepositoryService) {}

  ngAfterViewInit(): void {
    this.chartDataRepo.questionCountBySubject().subscribe(
      (data: SubjectQuestionCount[]) => {
        this.subjectQuestionCount = data;
        this.updatePieChart(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.chartDataRepo.getExamUserStats().subscribe(
      (data: ExamUserStats[]) => {
        this.examUserStats = data;
        this.updateBarChart(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateBarChart(data: ExamUserStats[]): void {
    const categories = data.map(item => item.examName);
    const totalUsers = data.map(item => item.totalUsers);
    const completedUsers = data.map(item => item.completedUsers);

    this.barChartOptions.xAxis = {
      categories: categories,
      title: {
        text: 'Name of the Exam',
      },
      labels: {
        style: {
          fontSize: '18px', // Increase the font size slightly
          fontWeight: 'bold', // Make the font bold
          fontFamily: "'Roboto', sans-serif",
          color: '#000000', // Set the color to black
        },
      },
    };

    this.barChartOptions.yAxis = {
      min: 0,
      title: {
        text: 'Number of Users',
        align: 'middle',
      },
      labels: {
        format: '{value}', 
        style: {
          fontSize: '12px',
        },
      },
    };

    this.barChartOptions.series = [
      {
        name: 'Total Users',
        data: totalUsers,
        type: 'column',
        color: '#3498db'
      },
      {
        name: 'Completed Users',
        data: completedUsers,
        type: 'column',
        color: '#2ecc71'
      },
    ];

    Highcharts.chart('barChartContainer', this.barChartOptions);
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

  pieChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '',
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
    series: [],
  };

  barChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Exams',
      },
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Users',
        align: 'high',
      },
      labels: {
        format: '{value}',
        style: {
          fontSize: '12px',
        },
      },
    },
    series: [],
  };
}
