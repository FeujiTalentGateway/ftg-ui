import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { CodingQuestions } from 'src/app/models/codingquestions.model';
import { Exam } from 'src/app/models/exam.model';
import { ExamSubject } from 'src/app/models/examSubject';
import { AuthRepositoryService } from 'src/app/repository/auth-repository.service';
import { ExamService } from 'src/app/repository/exam.service';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';

@Component({
  selector: 'app-select-coding-questions',
  templateUrl: './coding-questions.component.html',
  styleUrls: ['./coding-questions.component.css']
})

export class CodingQuestionsComponent implements OnInit, AfterViewInit {
  questions: CodingQuestions[] = [];
  dataSource = new MatTableDataSource(this.questions);
  examFormDetails!: Exam;
  dataSourceWithSerial: any[] = [];
  subjectName="Coding Questions";
  codingQuestionObject!:ExamSubject | undefined;
  displayedColumns: string[] = [
    'select',
    'questionId',
    'name',
    'description'
  ];
  userSubscription: Subscription = new Subscription();
  selection = new SelectionModel<CodingQuestions>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private authRepo: AuthRepositoryService,
    private scheduleExamService: ScheduleExamService,
    private examService:ExamService,
    public dialogRef: MatDialogRef<CodingQuestionsComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  ngOnInit(): void {
    this.getCodingQuestions();
    this.examFormDetails = this.dialogData.examData;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCodingQuestions() {
    this.examService.getCodingQuestions().subscribe({
      next: (questions: CodingQuestions[]) => {
        // Handle the array of users
        this.questions = questions
        // Initialize MatTableDataSource with the data
        this.dataSource = new MatTableDataSource(this.questions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.updateSelectionList();
      },
      error: (error) => {
        // Handle error if needed
        console.error('Error fetching questions:', error);
      },
    });
  }
  openErrorToaster(message: string) {
  const config = new MatSnackBarConfig();
  config.verticalPosition = 'top';
  config.horizontalPosition = 'center';
  config.duration = 3000; // Duration in milliseconds
  this.snackBar.open(message, 'Close', config);
  }

  ScheduleExamWithCoding() {
    if(this.dialogData.maxQuestions!=this.selection.selected.length){
        this.openErrorToaster(`Max Questions are ${this.dialogData.maxQuestions} and Selected Questions are ${this.selection.selected.length} Both Does not match`)
    }
    else{
      this.setCodingquestionsToExamForm()
      this.dialogRef.close({ examDataWithQuestions: this.examFormDetails });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  updateSelectionList() {
    this.codingQuestionObject =this.examFormDetails.examSubjects.find((subject:any)=>subject.subjectName.toLowerCase()===this.subjectName.toLowerCase());
    this.questions.forEach((question) => {
      if (
        this.codingQuestionObject?.codingQuestions.find(codingquestion=>codingquestion.id==question.id)
      ) {
        this.selection.select(question);
      }
    });
  }

 
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  CloseModel(){
    this.dialogRef.close()
  }

  setCodingquestionsToExamForm(){
    this.codingQuestionObject =this.examFormDetails.examSubjects.find((subject:any)=>subject.subjectName.toLowerCase()===this.subjectName.toLowerCase());
      if(this.codingQuestionObject){
        this.codingQuestionObject.codingQuestions=this.selection.selected.map((question:CodingQuestions)=>{
          const {content ,description, ...id}=question;
          return id
        });
      }
  }
}

