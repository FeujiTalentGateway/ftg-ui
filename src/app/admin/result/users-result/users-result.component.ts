import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Exam } from 'src/app/models/exam.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/repository/exam.service';
import { Observable } from 'rxjs';
import { UsersResult } from 'src/app/models/users.result.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-result',
  templateUrl: './users-result.component.html',
  styleUrls: ['./users-result.component.css']
})

export class UsersResultComponent implements OnInit {
  examCode: string | undefined;
  examObject$: Observable<Exam> | undefined;
  userId:number | undefined | null;
  userObject$:Observable<User> | undefined;
  examObject: Exam | undefined;
  usersResult$: Observable<UsersResult[]> | undefined;
  dataSource!: MatTableDataSource<UsersResult>;
  displayedColumns: string[] = ['name', 'totalScore', 'examStartDate', 'examCompletedAt', 'examStatus', 'detailView'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService
  ) { }

  ngOnInit() {
    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode') as string;
    this.userId =  this.activatedRoute.snapshot.paramMap.get('userId') as number | null | undefined;
    this.examObject$ = this.examService.getStaticExamById();
    this.usersResult$ = this.examService.getStaticUserResults(this.examCode as string);
    this.usersResult$.subscribe(
      (response: UsersResult[]) => {
        this.dataSource = new MatTableDataSource<UsersResult>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log("Error fetching data:", error);
      },
      
    );
    this.examObject$.subscribe(
      (response)=>{
        this.examObject = response;
      },
      (error)=>{
        console.log("errorrrr");
        
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  usersResults() {
  }
  getStatusButtonClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'status-button completed';
      case 'In Progress':
        return 'status-button in-progress';
      case 'Not Started':
        return 'status-button not-started';
      default:
        return 'status-button';
    }
  }
  navigateToDetailedUserResult(){
    this.router.navigate(['admin/result/detailed-users-result',this.examCode,this.userId])
  }

}
