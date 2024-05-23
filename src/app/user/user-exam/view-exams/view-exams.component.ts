import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalExceptionHandlerService } from 'src/app/Exception_handler_service/global-exception-handler.service';
import { Exam } from 'src/app/models/exam.model';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';

@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css'],
})
export class ViewExamsComponent implements OnInit,OnDestroy{
  listOfExams :Exam[] =[]


  constructor(
    private route: Router,
    private examService: ScheduleExamService,
    private errorService : GlobalExceptionHandlerService
  ) {

  }
 
  ngOnInit(): void {
    this.getExams()
    
  }


  getExams(){
    this.examService.getExams().subscribe(
      (response)=>{
        // this.listOfExams = response.body
        this.listOfExams = this.listOfExams.concat(response.body)
      },
      (error)=>{
        console.error("error",error)
        this.errorService.httpErrorHandler(error)
      }

    )
}
formatDate(date :string){
  return new Date(date).toDateString();
}
getStatus(status: boolean){
  return  status ?"ACTIVE":'INACTIVE';
}
ngOnDestroy(): void {
  
}
}
