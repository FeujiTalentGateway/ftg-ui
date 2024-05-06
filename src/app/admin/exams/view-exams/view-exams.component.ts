import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from 'src/app/models/exam.model';
import { ScheduleExamRepositoryService } from 'src/app/repository/schedule-exam-repository.service';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';
import { ViewExamDetailComponent } from '../view-exam-detail/view-exam-detail.component';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css'],
})
export class ViewExamsComponent implements OnInit, AfterViewInit {
  // Flag to control the display of the schedule dialog
  showScheduleDialog = false;
  dialogRef: any;
  // Minimum start date for date inputs
  minStartDate: string = '';

  // Selected exam ID
  selectedExamId: any;

  // Lifecycle hook called after the component is initialized
  ngOnInit(): void {
    this.getExams();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Table columns
  displayedColumns: string[] = [
    'SNO',
    'name',
    'examCode',
    'duration',
    'startDate',
    'endDate',
    'active',
    'action',
  ];

  // Data source for MatTable
  dataSource!: MatTableDataSource<Exam>;

  // ViewChild decorators to get reference to MatPaginator and MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Constructor to inject services and dependencies
  constructor(
    private service: ScheduleExamService,
    private dialog: MatDialog,
    private repoService: ScheduleExamRepositoryService,
    private matDialog: MatDialog
  ) {}

  // Method to filter data based on user input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Method to open the schedule exam dialog
  openScheduleExamDialog(): void {
    this.showScheduleDialog = true;
  }

  // Method to close the schedule exam dialog
  closeScheduleDialog(): void {
    this.showScheduleDialog = false;
  }

  // Method to toggle the active status of an exam
  toggleActive(exam: Exam): void {
    let messages = '';
    let active = exam.active;
    let id = exam.id;
    if (!active) {
      messages = 'Do you want to activate this exam?';
    } else if (active) {
      messages = 'Do you want to deactivate this exam?';
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirmation', message: messages + '' },
    });

    // Subscribe to the result of the dialog
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Only perform the toggle operation if the user clicked "Yes"
        this.service.changeExamStatus(id);
        this.getExams();
      } else if (result === false) {
        this.repoService.getExams().subscribe(
          (response: HttpResponse<any>) => {
            if (response.status === 200) {
              const reversedData = response.body.reverse();
              this.dataSource = new MatTableDataSource(reversedData);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            } else {
              console.error('Unexpected response status:', response.status);
            }
          },
          (error: any) => {
            console.error('Error fetching exams:', error);
          }
        );
      }
    });
  }

  // Method to fetch exams from the service
  getExams() {
    // this.ngAfterViewInit();
    this.service.exams$.subscribe(
      (exams) => {

        const reversedData = exams.slice().reverse(); // Create a copy of the array before reversing
        this.dataSource = new MatTableDataSource(reversedData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching exams:', error);
      }
    );
  }

  openViewExamDetailsModal(selectedExam: Exam) {
    let dialogConfig: MatDialogConfig = {
      width: '100%',
      height: '100%',
      disableClose: true,
      // other MatDialogConfig properties can go here
    };
    dialogConfig.data = {
      selectedExam: selectedExam,
    };
    this.dialogRef = this.matDialog.open(ViewExamDetailComponent, dialogConfig);
  }

  getStatusButtonClass(status: boolean): string {
    return status ? 'status-button active' : 'status-button in-active';
  }
}
