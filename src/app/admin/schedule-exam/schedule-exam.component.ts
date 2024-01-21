import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from 'src/app/models/exam.model';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../util-component/confirmation-dialog.component';
import { getLocaleDateFormat } from '@angular/common';



@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css']
})
export class ScheduleExamComponent implements OnInit {

  // @ViewChild('form') form!: NgForm;

  paperOptions = [
    { id: 1, name: 'Paper 1' },
    { id: 2, name: 'Paper 2' },
  ];

  showScheduleDialog = false;
  examForm: FormGroup<any>;

    
  ngOnInit(): void {
    this.service.getExam().subscribe(
      (exams: Exam[]) => {
        console.log(exams);
        
        this.dataSource = new MatTableDataSource(exams);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching exams:', error);
      }
    );

  }

  displayedColumns: string[] = ['SNO','name', 'description', 'examCode', 'duration', 'startDate', 'endDate', 'active', 'paper','action'];

  dataSource!: MatTableDataSource<Exam>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ScheduleExamService,
    private dialog: MatDialog,private fb: FormBuilder
  ) {
    this.examForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(/^[a-zA-Z\s']{1,32}$/),
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
    }, { validators: this.dateRangeValidator.bind(this) });

  }

  // Form group for schedule exam
  // examForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(255),
  //     Validators.pattern(/^[a-zA-Z\s']{1,32}$/),
  //   ]),
  
  //   description: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(500),
  //   ]),
  
  //   examCode: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(50),
  //   ]),
  
  //   duration: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(/^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/),
  //   ]),
  
  //   startDate: new FormControl('', Validators.required),
  
  //   endDate: new FormControl('', Validators.required),
  
  //   active: new FormControl(false, Validators.required),
  
  //   paper: new FormGroup({
  //     id: new FormControl(null, Validators.required),
  //   }),
  // }, { validators: this.dateRangeValidator.bind(this) });
  
  

  dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const startDateControl = group.get('startDate');
    const endDateControl = group.get('endDate');
  
    if (startDateControl && endDateControl) {
      const startDate = startDateControl.value;
      const endDate = endDateControl.value;
  
      // Get the current date
      const currentDate = this.getCurrentDate();
  
      // Check if the start date is less than the current date
        // if (startDate && endDate && endDate < currentDate && startDate < currentDate) {
        //   return { 'dateRange': 'Start Date must be greater than or equal to the current Date' };
        // }
  
      // Check if the start date is greater than the end date
      if (startDate && endDate && startDate > endDate) {
        return { 'dateRange': 'End Date must be greater than Start Date' };
      }
    }
  
    return null;
  }
  

  getCurrentDate(): Date {
    console.log(new Date());
    
    return new Date();
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
      this.service.scheduleExam(formData);
      console.log('Form submitted:', formData);
      
    } else {
      console.log('Form is invalid');
    }
  }

  
  // Add functions for button actions
  viewExam(row: Exam): void {
    // Implement logic for viewing exam details
    console.log('Viewing exam:', row);
  }



  toggleActive(id: any, active: any): void {

    let messages = '';
  
    if (active === 0) {
      messages = 'Do you want to activate this exam?';
    } else if (active === 1) {
      messages = 'Do you want to deactivate this exam?';
    }
  
    console.log(messages);
    
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirmation', message: messages+'' },
    });
    
  
    // Subscribe to the result of the dialog
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.changeStatus(id, active);

      }
    });
  }

  // Inside your ScheduleExamComponent class
  setFormValues(exam: Exam): void {
    this.examForm.patchValue({
      name: exam.name,
      description: exam.description,
      examCode: exam.examCode,
      duration: exam.duration,
      startDate: new Date(exam.startDate), 
      endDate: new Date(exam.endDate),  
      active: exam.active,
      paperDTO: {
        id : exam.paper, 
      },
    });
  }
  
  formatDate(date: Date): string {
    const isoString = date.toISOString();
    return isoString.substring(0, isoString.indexOf('T'));
  }
  

// Inside your ScheduleExamComponent class
editExam(row: Exam): void {
  this.setFormValues(row);
  this.showScheduleDialog = true;
}

setActive(isActive: boolean): void {
  this.examForm.get('active')!.setValue(isActive);
}



  

}
