import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalExceptionHandlerService } from 'src/app/Exception_handler_service/global-exception-handler.service';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-exams-page',
  templateUrl: './exams-page.component.html',
  styleUrls: ['./exams-page.component.css']
})
export class ExamsPageComponent {

  filterQuery: string = '';
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
  this.route.navigate(['admin/result/summary',examCode])


}
applyFilter() {
  this.listOfExams$ = this.examService.getAllExamData().pipe(
    map(exams => exams.filter(exam =>
      exam.name.toLowerCase().includes(this.filterQuery.toLowerCase()) ||
      exam.startDate.includes(this.filterQuery) ||
      exam.endDate.includes(this.filterQuery) ||
      this.getStatus(exam.active).toLowerCase().includes(this.filterQuery.toLowerCase())
    ))
  );
}




}

