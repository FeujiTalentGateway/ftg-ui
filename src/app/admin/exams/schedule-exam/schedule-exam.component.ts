import { Component, OnInit, Input } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css'],
  providers: [DatePipe]
})
export class ScheduleExamComponent implements OnInit {

  @Input() isEditing: boolean = false;
  @Input() exam: Exam | null = null;

  paperOptions = [
    { id: 1, name: 'Paper 1' },
    { id: 2, name: 'Paper 2' },
  ];

  examForm: FormGroup<any>;
  minStartDate: string = '';
  selectedExamId: any;
  // datePipe: any;

  // constructor(
  //   private service: ScheduleExamService,
  //   private dialog: MatDialog,
  //   private fb: FormBuilder,
  //   private datePipe: DatePipe  // Initialize datePipe in the constructor
  // ) {
  //   this.examForm = this.fb.group({
  //     // ... (your form controls)
  //   }, { validators: this.dateRangeValidator });

  //   this.minStartDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  // }

  ngOnInit(): void {
    console.log('Exam Data:', this.exam);
    console.log('Is Editing:', this.isEditing);

    if (this.isEditing) {
      // Convert string dates to Date objects
      const startDateObj = new Date(this.exam!.startDate);
      const endDateObj = new Date(this.exam!.endDate);

      // Use DatePipe to format the date
      const formattedStartDate = this.datePipe.transform(startDateObj, 'yyyy-MM-dd');
      const formattedEndDate = this.datePipe.transform(endDateObj, 'yyyy-MM-dd');

      // Set the form values
      this.examForm.setValue({
        name: this.exam!.name,
        description: this.exam!.description,
        examCode: this.exam!.examCode,
        duration: this.exam!.duration,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        active: this.exam!.active,
        paperDTO: {
          id: this.exam!.paperDTO.id,
        },
      });

      // Set the selectedExamId
      this.selectedExamId = this.exam!.id;
    }
  }

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
  


  onSubmit() {
    if (this.examForm.valid) {
      const formData = this.examForm.value;
  
      // Set the selectedExamId in formData
      formData.id = this.selectedExamId;
  
      if (this.selectedExamId) {
        // Update existing exam
        this.service.updateExam(formData);
      } else {
        // Schedule a new exam
        this.service.scheduleExam(formData);
        console.log(formData);
      }
    } else {
      console.log('Form is invalid');
    }
  }

 
  
  formatDate(date: Date): string {
    const isoString = date.toISOString();
    return isoString.substring(0, isoString.indexOf('T'));
  }


  editExam(exam: Exam): void {

    // Convert string dates to Date objects
    const startDateObj = new Date(exam.startDate);
    const endDateObj = new Date(exam.endDate);
  
    // Use DatePipe to format the date
    const formattedStartDate = this.datePipe.transform(startDateObj, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(endDateObj, 'yyyy-MM-dd');
  
    // Set the form values
    this.examForm.setValue({
      name: exam.name,
      description: exam.description,
      examCode: exam.examCode,
      duration: exam.duration,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      active: exam.active,
      paperDTO: {
        id: exam.paperDTO.id,
      },
    });
  
    // Set the selectedExamId
    this.selectedExamId = exam.id;
  }

}