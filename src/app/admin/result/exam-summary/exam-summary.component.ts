import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamStatsModel } from 'src/app/models/exam.stats.model';
import { ExamService } from 'src/app/repository/exam.service';
import { TimeFormatPipe } from 'src/app/pips/time-format.pipe';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-exam-summary',
  templateUrl: './exam-summary.component.html',
  styleUrls: ['./exam-summary.component.css']
})
export class ExamSummaryComponent implements OnInit {

  examCode: string | undefined;
  examObject: Exam | undefined;
  examObject$: Observable<Exam> | undefined;
  examStatObject$: Observable<ExamStatsModel> | undefined;
  examStatObject: ExamStatsModel | undefined;
  currentTime: string;
  totalAssignedUsers: number = 0;
  completedTests: number = 0;
  color: string = 'green';
  strokeWidth: number = 10;
  circumference: number = Math.PI * 180;
  offset: number = this.circumference;
  completedTestsColor: string = '#0BC279';
  remainingColor: string = '#f3752e';
  Highcharts: typeof Highcharts = Highcharts;
  pieChartOptions: Highcharts.Options | undefined;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private examService: ExamService
  ) {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }

  ngOnInit() {
    this.examCode = this.activateRoute.snapshot.paramMap.get('examCode') as string;
    console.log(this.examCode);
    this.examObject$ = this.examService.getExamByCode(this.examCode);
    this.examStatObject$ = this.examService.getExamStatsByExamCode(this.examCode);
    this.examStatObject$.subscribe((examStat: ExamStatsModel) => {
      this.handleExamStatObject(examStat);
      this.initializePieChart();
    });
  }

  initializePieChart() {
    this.pieChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'User Exam Status' 
      },
      credits:{
        enabled:false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}'
          },
          colors: ['rgb(0, 226, 114)', 'rgb(107, 138, 188)', 'orange']
        }
      },
    
      series: [{
        data: [
          { name: 'Completed', y: this.completedTests },
          { name: 'In Progress', y: 0 },
          { name: 'Not Started', y: this.totalAssignedUsers - this.completedTests },

        ],
        type: 'pie'
      }]
    };
  }

  handleExamStatObject(examStat: ExamStatsModel) {
    this.completedTests = examStat.testsCompletedUsers;
    return true;
  }

  handleExamObject(exam: Exam){
    this.totalAssignedUsers = exam.users.length
    return true
    }
  navigateToUserResult() {
    this.router.navigate(['admin/result/users-result', this.examCode]);
  }
}
