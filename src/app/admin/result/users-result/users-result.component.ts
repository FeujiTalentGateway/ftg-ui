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

/**
 * Component for displaying the results of users in an exam.
 */
@Component({
  selector: 'app-users-result',
  templateUrl: './users-result.component.html',
  styleUrls: ['./users-result.component.css']
})
export class UsersResultComponent implements OnInit {
  examCode: string | undefined;
  examObject$: Observable<Exam> | undefined;
  userId: number | undefined | null;
  userObject$: Observable<User> | undefined;
  examObject: Exam | undefined;
  usersResult$: Observable<UsersResult[]> | undefined;
  dataSource!: MatTableDataSource<UsersResult>;
  displayedColumns: string[] = ['fullName', 'totalScore', 'outCome','examStartDate', 'examCompletedAt', 'examStatus', 'detailView'];  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService
  ) { }

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode') as string;
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId') as number | null | undefined;
    this.examObject$ = this.examService.getExamByCode(this.examCode);
    this.usersResult$ = this.examService.getUserResults(this.examCode as string);
    this.usersResult$.subscribe(
      (response: UsersResult[]) => {
        this.dataSource = new MatTableDataSource<UsersResult>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        // Update displayedColumns based on the presence of coding questions
        if (this.hasCodingQuestions(response)) {
          this.displayedColumns.splice(2, 0, 'noOfCodingQuestions');
          this.displayedColumns.splice(3, 0, 'codingQuestion');
        }
      },
      (error) => {
        console.error('Error fetching user results:', error);
      },
    );
    this.examObject$.subscribe(
      (response) => {
        this.examObject = response;
      },
      (error) => {
        console.error('Error fetching exam details:', error);
      }
    );
  }

  /**
   * Applies a filter to the table data based on the user input.
   * @param event The input event.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Determines if there are any coding questions present in the user results.
   * @returns True if any user result has coding questions, false otherwise.
   */
  hasCodingQuestions(results: UsersResult[]): boolean {
    return results.some(userResult => userResult.noOfCodingQuestions > 0);
  }

  /**
   * Returns the CSS class for the status button based on the status.
   * @param status The status of the user's exam.
   * @returns The CSS class for the status button.
   */
  getStatusButtonClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'status-button completed';
      case 'In Progress':
        return 'status-button in-progress';
      case 'Not started':
        return 'status-button not-started';
      default:
        return 'status-button';
    }
  }

  getExamOutcome(status: string): string {
    switch (status) {
      case 'Pass':
        return 'status-button-outcome pass';
      case '-':
        return 'status-button-outcome no-outcome';
      case 'Fail':
        return 'status-button-outcome fail';
      default:
        return 'status-button-outcome';
    }
  }

  /**
   * Navigates to the detailed user result page.
   * @param userId The ID of the user.
   */
  navigateToDetailedUserResult(userId: any) {
    this.router.navigate(['admin/result/detailed-user-result', this.examCode, userId]);
  }

  /**
   * Returns whether the status is 'Completed'.
   * @param status The status of the user's exam.
   * @returns True if the status is 'Completed', false otherwise.
   */
  getStatus(status: string): boolean {
    switch (status) {
      case 'Completed':
        return true;
      default:
        return false;
    }
  }
}
