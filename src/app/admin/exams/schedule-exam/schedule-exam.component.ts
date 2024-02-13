import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { ExamSubject } from 'src/app/models/examSubject';
import { Subject } from 'src/app/models/subject';
import { SubjectRepositoryService } from 'src/app/repository/subject-repository.service';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';

@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css'],
  providers: [DatePipe],
})
export class ScheduleExamComponent implements OnInit {
  @Output() showShowdule: EventEmitter<boolean> = new EventEmitter();

  @Input() isEditing: boolean = false;
  @Input() isRouting: boolean = false;
  @Input() exam: Exam | null = null;

  examForm!: FormGroup<any>;
  minStartDate: string = '';
  selectedExamId: any;
  subjects!:Subject[];
  ngOnInit(): void {
    this.service.goBack$.subscribe((shouldGoBack) => {
      if (shouldGoBack) {
        this.goBack();
      }
    });
    this.editExam();
    this.subjectRepo.getAllSubjects().subscribe((response) => {
      this.subjects = response;
      console.log(this.subjects);
    });
    
  }

  // Constructor to inject services and dependencies
  constructor(
    private service: ScheduleExamService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private subjectRepo: SubjectRepositoryService
  ) {
    this.initializeExamForm();
  }

  // Initialize the exam form with form controls and validators
  initializeExamForm(){
    this.examForm = this.fb.group(
      {
        id:[""],
        name: ['', [Validators.required, Validators.maxLength(255)]],
        description: ['', [Validators.required, Validators.maxLength(250)]],
        examCode: ['', [Validators.required, Validators.maxLength(50)]],
        duration: [
          '',
          [
            Validators.required,
            Validators.pattern(/^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/),
          ],
        ],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        active: [false, Validators.required],
        examSubjects: this.fb.array([] as FormGroup[]),
      },
      
      { validators: this.dateRangeValidator }
    );
    // Set the minimum start date for date inputs
    this.minStartDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  }
  // Custom validator for date range
  get examSubjectsArray() {
    return this.examForm.get('examSubjects') as FormArray;
  }
  
  onSubjectSelected(subject:Subject) {
    const selectedSubject =subject

    if (selectedSubject) {
      // Check if the subject is not already in the form array
      const existingSubject = this.examSubjectsArray.controls.find(
        (control) => control.get('subjectName')?.value === selectedSubject.name
      );

      console.log(existingSubject)
      if (!existingSubject) {
        this.examSubjectsArray.push(this.fb.group({
          examSubjectId: [""],
          subject: this.fb.group({
            id: [selectedSubject.id, Validators.required]
          })
          ,
          id:[''],
          subjectName: [selectedSubject.name, Validators.required],
          maxQuestions: [""],
          startingDifficultyLevel: [""],
          duration:[""]
        }));
      }
      console.log(this.examSubjectsArray.value)
      // Reset the subjectControl value to null after processing
      this.examForm.get('subjectControl')?.setValue(null);
    }
  }
  getExamSubjectsControls() {
    return (this.examForm.get('examSubjects') as FormArray).controls;
  }// Method to handle editing an exam
  
  
  editExam(){
    if (this.isEditing) {
      // Convert string dates to Date objects
      const startDateObj = new Date(this.exam!.startDate);
      const endDateObj = new Date(this.exam!.endDate);

      // Use DatePipe to format the date
      const formattedStartDate = this.datePipe.transform(
        startDateObj,
        'yyyy-MM-dd'
      );
      const formattedEndDate = this.datePipe.transform(
        endDateObj,
        'yyyy-MM-dd'
      );
      // Set the form values
      this.examForm.setValue({
        id:this.exam!.id,
        name: this.exam!.name,
        description: this.exam!.description,
        examCode: this.exam!.examCode,
        duration: this.exam!.duration,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        active: this.exam!.active,
        examSubjects: [],
      });

      if (this.exam!.examSubjects) {
        this.exam!.examSubjects.forEach((examSubject: ExamSubject) => {
      console.log(examSubject)
      this.examSubjectsArray.push(
        this.fb.group({
          id: examSubject.id,
          maxQuestions: examSubject.maxQuestions,
          startingDifficultyLevel: examSubject.startingDifficultyLevel,
          duration: examSubject.duration,
          subjectName:examSubject.subject.name,
          subject: {
            id:examSubject.subject.id
          }
        })
      );
    });
  }
      // Set the selectedExamId
      this.selectedExamId = this.exam!.id;
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    console.log(this.examForm.value)
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
        this.goBack();
        this.router.navigateByUrl('/admin/exams/viewExams');
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

  

  // Method to navigate back and emit event to hide the form
  goBack(): void {
    this.showShowdule.emit(false);
  }
  dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const startDateControl = group.get('startDate');
    const endDateControl = group.get('endDate');

    if (startDateControl && endDateControl) {
      const startDate = startDateControl.value;
      const endDate = endDateControl.value;

      if (startDate && endDate && startDate > endDate) {
        return { dateRange: 'End Date must be greater than Start Date' };
      }
    }

    return null;
  }
}
