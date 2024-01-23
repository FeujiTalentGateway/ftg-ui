import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from 'src/app/models/exam.model';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css'],
  providers: [DatePipe]
})
export class ScheduleExamComponent implements OnInit {

  // @ViewChild('form') form!: NgForm;

  paperOptions = [
    { id: 1, name: 'Paper 1' },
    { id: 2, name: 'Paper 2' },
  ];

  showScheduleDialog = false;
  examForm: FormGroup<any>;
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
    private dialog: MatDialog,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.examForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
  
      description: ['', [
        Validators.required,
        Validators.maxLength(500),
      ]],
  
      examCode: ['', [
        Validators.required,
        Validators.maxLength(50),
      ]],
  
      duration: ['', [
        Validators.required,
        Validators.pattern(/^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/),
      ]],
  
      startDate: ['', Validators.required],
  
      endDate: ['', Validators.required],
  
      active: [false, Validators.required],
  
      paperDTO: this.fb.group({
        id: [null, Validators.required],
      }),
    }, { validators: this.dateRangeValidator });
  
    this.minStartDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  }

  dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const startDateControl = group.get('startDate');
    const endDateControl = group.get('endDate');

    if (startDateControl && endDateControl) {
      const startDate = startDateControl.value;
      const endDate = endDateControl.value;

      if (startDate && endDate && startDate > endDate) {
        return { 'dateRange': 'End Date must be greater than Start Date' };
      }
    }

    return null;
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

  onSubmit() {
    if (this.examForm.valid) {
      const formData = this.examForm.value;
  
      if (this.selectedExamId) {
        // Update existing exam
        this.service.updateExam(this.selectedExamId, formData)
      } else {
        // Schedule a new exam
        this.service.scheduleExam(formData)
      }
    } else {
      console.log('Form is invalid');
    }
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
        this.service.changeStatus(id, active);
      } else if (result === false) {
        this.getExams();

      }
    });
  }
  
  getExams(){
    this.service.getExam().subscribe(
      (exams: Exam[]) => {
        this.dataSource = new MatTableDataSource(exams);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching exams:', error);
      }
    );
  }
  
  

  
  
  
  formatDate(date: Date): string {
    const isoString = date.toISOString();
    return isoString.substring(0, isoString.indexOf('T'));
  }
  

// Inside your ScheduleExamComponent class
editExam(row: Exam): void {
  const { id } = row;
  const { name, description, examCode, duration, startDate, endDate, active, paperDTO} = row;

  // Convert string dates to Date objects
  const startDateObj = new Date(startDate);
  console.log(startDateObj);
  
  const endDateObj = new Date(endDate);

  this.examForm.setValue({
    name,
    description,
    examCode,
    duration,
    startDate: startDateObj,
    endDate: endDateObj,
    active,
    paperDTO: {
      id : paperDTO.name,
    },
  });

  this.showScheduleDialog = true;
  this.selectedExamId = id;
}


setActive(isActive: boolean): void {
  this.examForm.get('active')!.setValue(isActive);
}
  

}
