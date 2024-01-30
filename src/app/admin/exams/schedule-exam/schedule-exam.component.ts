import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PaperService } from 'src/app/services/paper.service';
import { Paper } from 'src/app/models/paper';

@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css'],
  providers: [DatePipe]
})
export class ScheduleExamComponent implements OnInit {

   // EventEmitter to emit a boolean value to indicate if the schedule should be shown
  @Output() showShowdule:EventEmitter<boolean>=new EventEmitter();

  // Input properties to receive data from the parent component
  @Input() isEditing: boolean = false;
  @Input() isRouting : boolean = false;
  @Input() exam: Exam | null = null;
  
  // Array to store paper options
  paperOptions: Paper[]=[];

  // Form group to manage the exam form
  examForm: FormGroup<any>;

  // Minimum start date for date inputs
  minStartDate: string = '';

  // Selected exam ID
  selectedExamId: any;


  // Lifecycle hook called after the component is initialized
  ngOnInit(): void {


    this.service.goBack$.subscribe((shouldGoBack) => {
      if (shouldGoBack) {
        this.goBack();
      }
    });

    // If editing, populate the form with exam data
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

    this.paperService.getAllPapers().subscribe(
      (response) =>{
        this.paperOptions= response.filter( paper => paper.active)
        console.log(this.paperOptions);
        
      }
    )
  }

  // Constructor to inject services and dependencies
  constructor(
    private service: ScheduleExamService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router:Router,
    private paperService: PaperService
  ) {
    // Initialize the exam form with form controls and validators
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
  
    // Set the minimum start date for date inputs
    this.minStartDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  }


  // Custom validator for date range
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
  

  // Method to handle form submission
  onSubmit(): void { 
    if (this.examForm.valid) {
      const formData = this.examForm.value;

      // Set the selectedExamId in formData
      formData.id = this.selectedExamId;
  
      if (this.selectedExamId) {
        // Update existing exam
        this.service.updateExam(formData);
        // this.goBack();
      } else {
        // Schedule a new exam
        this.service.scheduleExam(formData);
        // this.goBack();
      }
    } else {
      console.log('Form is invalid');
    }
  }
  

 
  // Method to format a date as a string
  formatDate(date: Date): string {
    const isoString = date.toISOString();
    return isoString.substring(0, isoString.indexOf('T'));
  }


  // Method to handle editing an exam
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
 
  // Method to navigate back and emit event to hide the form
  goBack(): void {
    this.showShowdule.emit(false);
    
  }
}