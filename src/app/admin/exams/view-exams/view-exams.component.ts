import { Component, OnInit, ViewChild,Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from 'src/app/models/exam.model';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component'; 
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-view-exams',
  templateUrl: './view-exams.component.html',
  styleUrls: ['./view-exams.component.css']
})
export class ViewExamsComponent implements OnInit {


  @Output() isEditing: boolean = false;

  @Output()selectedExam: Exam | null = null;

  paperOptions = [
    { id: 1, name: 'Paper 1' },
    { id: 2, name: 'Paper 2' },
  ];

  showScheduleDialog = false;
  minStartDate: string = '';
  selectedExamId: any;

    
  ngOnInit(): void {
    this.getExams();

  }

  displayedColumns: string[] = ['SNO','name', 'description', 'examCode', 'duration', 'startDate', 'endDate', 'active', 'paper','action'];

  dataSource!: MatTableDataSource<Exam>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ScheduleExamService,
    private dialog: MatDialog
  ) {
    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openScheduleExamDialog(): void {
    this.showScheduleDialog = true;
  }

  closeScheduleDialog(): void {
    this.showScheduleDialog = false;
  }


  
  




  toggleActive(id: any, active: any): void {
    let messages = '';
  
    if (!active) {
      messages = 'Do you want to activate this exam?';
    } else if (active) {
      messages = 'Do you want to deactivate this exam?';
    }
  
    console.log(messages);
  
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirmation', message: messages + '' },
    });
      

    // Subscribe to the result of the dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Only perform the toggle operation if the user clicked "Yes"
        this.service.changeExamStatus(id);
      } else if (result === false) {
        this.getExams();

      }
    });
  }
  getExams() {
    this.service.getExams().subscribe(
      (response: HttpResponse<any>) => {
        const reversedData = response.body.reverse(); 
  
        this.dataSource = new MatTableDataSource(reversedData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching exams:', error);
      }
    );
  }
  
  
  

editExam(exam: Exam) {
  this.selectedExam=exam;
  this.isEditing=true;
  this.showScheduleDialog=true;    
  }
  

}