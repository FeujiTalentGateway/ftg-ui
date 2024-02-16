import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalExceptionHandlerService } from 'src/app/Exception_handler_service/global-exception-handler.service';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';

@Component({
  selector: 'app-exams-page',
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.css']
})
export class ExamsPageComponent {

  filterByExamName: string = '';
  totalItems = 0;
  tablerowsperpage: number = 5;
  totalPages: number = 0;

  listOfExams :Exam[] =[]
  listOfExams$ : Observable<Exam[]> |undefined


  constructor(
    private route: Router,
    private examService: ExamService,
    private errorService : GlobalExceptionHandlerService
  ) {

  }
 
  ngOnInit(): void {
    this.listOfExams$ = this.examService.getAllExamData()
    this.listOfExams$.subscribe(
      (response)=>{
        this.listOfExams = response
      },
      (error)=>{
        console.log('error');
        
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
viewResultByExamId(examCode : string){
  console.log(examCode);
  this.route.navigate(['admin/result/summary',examCode])


}
}

