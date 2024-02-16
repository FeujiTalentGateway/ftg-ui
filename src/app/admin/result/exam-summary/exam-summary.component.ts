import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamStatsModel } from 'src/app/models/exam.stats.model';
import { ExamService } from 'src/app/repository/exam.service';
import { TimeFormatPipe } from 'src/app/pips/time-format.pipe';
@Component({
  selector: 'app-exam-summary',
  templateUrl: './exam-summary.component.html',
  styleUrls: ['./exam-summary.component.css']
})
export class ExamSummaryComponent implements OnInit {
  examCode:string |undefined;
  examObject : Exam |undefined;
  examObject$ : Observable<Exam>| undefined;
  examStatObject$ : Observable<ExamStatsModel>|undefined;
  examStatObject : ExamStatsModel | undefined;
  currentTime: string;
  totalAssignedUsers: number = 0;
  completedTests:number = 0;
  color: string = 'green'; 
  strokeWidth: number = 10;
  circumference: number = Math.PI * 180; 
  offset: number = this.circumference;
  completedTestsColor: string = '#0BC279';
  remainingColor: string = '#f3752e';
  
  constructor(
    private router : Router,
    private activateRoute : ActivatedRoute,
    private examService : ExamService
    
    ){
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
    }

  ngOnInit(
  
  ){
     this.examCode = this.activateRoute.snapshot.paramMap.get('examCode') as string;
     console.log(this.examCode);
     this.examObject$ = this.examService.getExamById(this.examCode)
     this.examStatObject$ =  this.examService.getStaticExamStatsByExamCode(this.examCode)
     this.examObject$.subscribe(
      (response)=>{
        this.examObject = response;
        console.log(response);
        if (this.examObject && this.examObject.users) {
          this.totalAssignedUsers = this.examObject.users.length;
        }
      },
      (error)=>{
        console.log("exam object not available");
        
      }
     )
     this.examStatObject$.subscribe(
      (response)=>{
        console.log(response);
        this.examStatObject = response;
        this.completedTests = this.examStatObject.testsCompletedUsers;
        
      },
      (error)=>{
        console.log("exam stat object not available");
        
      }
     )
  }
  navigateToUserResult(){
    this.router.navigate(['admin/result/users-result',this.examCode])

  }
  calculatePercentage(): { completedPercentage: number, remainingPercentage: number } {
    const completedPercentage = (this.completedTests / this.totalAssignedUsers) * 100;
    const roundedCompletedPercentage = parseFloat(completedPercentage.toFixed(2));
    const remainingPercentage = 100 - completedPercentage;
    console.log(completedPercentage,remainingPercentage)
    return { completedPercentage: roundedCompletedPercentage, remainingPercentage };
  }
  

}
