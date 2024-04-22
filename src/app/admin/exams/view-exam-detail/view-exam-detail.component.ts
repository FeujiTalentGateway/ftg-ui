import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from 'src/app/models/exam.model';
import { ExamSubject } from 'src/app/models/examSubject';

@Component({
  selector: 'app-view-exam-detail',
  templateUrl: './view-exam-detail.component.html',
  styleUrls: ['./view-exam-detail.component.css'],
})
export class ViewExamDetailComponent implements OnInit, AfterViewInit {
  selectedExam!: Exam;
  displayedColumns: string[] = [
    'SNO',
    'name',
    'difficultyLevel',
    'duration',
    'maxQuestions',
  ];
  showUserList = false;

  dataSource!: MatTableDataSource<ExamSubject>; // ViewChild decorators to get reference to MatPaginator and MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    this.selectedExam = this.dialogData.selectedExam;
    this.dataSource = new MatTableDataSource(this.selectedExam.examSubjects);
    console.log(this.selectedExam);
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
  toggleUserList() {
    this.showUserList = !this.showUserList;
  }
}
