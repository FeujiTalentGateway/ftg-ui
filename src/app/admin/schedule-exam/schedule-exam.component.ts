import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from 'src/app/models/exam.model';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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

  displayedColumns: string[] = ['name', 'description', 'examCode', 'duration', 'startDate', 'endDate', 'active', 'paper'];

  dataSource!: MatTableDataSource<Exam>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ScheduleExamService,
  ) {

  }

  // Form group for schedule exam
  examForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
      Validators.pattern(/^[a-zA-Z\s']{1,32}$/),
    ]),

    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]),

    examCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),

    duration: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/),
    ]),

    startDate: new FormControl('', Validators.required),

    endDate: new FormControl('', Validators.required),

    active: new FormControl(false, Validators.required),

    paperDTO: new FormGroup({
      id: new FormControl(null, Validators.required),
    }),
  });
  

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
  



  ngOnInit(): void {
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

}
