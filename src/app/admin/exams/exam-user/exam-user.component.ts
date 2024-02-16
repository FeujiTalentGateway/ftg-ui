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
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { User } from 'src/app/models/user.model';
import { AuthRepositoryService } from 'src/app/repository/auth-repository.service';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';

@Component({
  selector: 'app-exam-user',
  templateUrl: './exam-user.component.html',
  styleUrls: ['./exam-user.component.css'],
})
export class ExamUserComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  dataSource = new MatTableDataSource(this.users);
  examFormDetails!: Exam;
  dataSourceWithSerial: any[] = [];
  displayedColumns: string[] = [
    'select',
    'serialNumber',
    'name',
    'userName',
    'emailId',
  ];
  userSubscription: Subscription = new Subscription();
  selection = new SelectionModel<User>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private authRepo: AuthRepositoryService,
    private scheduleExamService: ScheduleExamService,
    public dialogRef: MatDialogRef<ExamUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  ngOnInit(): void {
    this.getUsers();
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

  getUsers() {
    this.userSubscription = this.authRepo.getUserByRoleName('USER').subscribe({
      next: (users: User[]) => {
        // Handle the array of users
        this.users = users.map((user, index) => ({
          ...user,
          serialNumber: index + 1,
        }));
        // Initialize MatTableDataSource with the data
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.updateSelectionList();
      },
      error: (error) => {
        // Handle error if needed
        console.error('Error fetching users:', error);
      },
    });
  }

  ScheduleExamWithUsers() {
    this.examFormDetails.users = this.selection.selected;
    this.dialogRef.close({ examDataWithUsers: this.examFormDetails });
  }

  updateSelectionList() {
    this.users.forEach((user) => {
      if (
        this.examFormDetails.users.find(
          (selectedUser) => selectedUser.userId === user.userId
        )
      ) {
        this.selection.select(user);
      }
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
