import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { ExamSubject } from 'src/app/models/examSubject';
import { Subject } from 'src/app/models/subject';
import { User } from 'src/app/models/user.model';
import { SubjectRepositoryService } from 'src/app/repository/subject-repository.service';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';
import { ExamUserComponent } from '../exam-user/exam-user.component';

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
  dialogRef: any;
  examForm!: FormGroup<any>;
  minStartDate: string = '';
  selectedExamId: any;
  subjects!: Subject[];
  updatedUsers!: User[];
  selectedSubjectIds!: number[];
  difficultyLevelArray: number[] = Array.from(
    { length: 10 },
    (_, index) => index + 1
  );
  ngOnInit(): void {
    this.service.goBack$.subscribe((shouldGoBack) => {
      if (shouldGoBack) {
        this.goBack();
      }
    });
    this.editExam();
    this.subjectRepo.getAllSubjects().subscribe((response) => {
      this.subjects = response;
    });
  }

  // Constructor to inject services and dependencies
  constructor(
    private service: ScheduleExamService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
    private matDialog: MatDialog,
    private subjectRepo: SubjectRepositoryService
  ) {
    this.initializeExamForm();
  }

  // Initialize the exam form with form controls and validators
  initializeExamForm() {
    this.examForm = this.fb.group(
      {
        id: [0],
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
        users: this.fb.array([] as FormGroup[]),
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
  get examUsersArray() {
    return this.examForm.get('users') as FormArray;
  }
  onSubjectSelected() {
    this.selectedSubjectIds.forEach((selectedSubjectId) => {
      let selectedSubject = this.subjects.find(
        (subject) => subject.id == selectedSubjectId
      );
      if (selectedSubject) {
        // Check if the subject is not already in the form array
        const existingSubject = this.examSubjectsArray.controls.find(
          (control) =>
            control.get('subjectName')?.value === selectedSubject?.name
        );

        if (!existingSubject) {
          this.examSubjectsArray.push(
            this.fb.group({
              subject: this.fb.group({
                id: [selectedSubject.id, Validators.required],
              }),
              id: [0],
              subjectName: [selectedSubject.name, Validators.required],
              maxQuestions: [''],
              startingDifficultyLevel: [''],
              duration: [''],
            })
          );
        }
        console.log(this.examSubjectsArray.value);
        // Reset the subjectControl value to null after processing
        this.examForm.get('subjectControl')?.setValue(null);
      }
    });
  }
  getExamSubjectsControls() {
    return (this.examForm.get('examSubjects') as FormArray).controls;
  }

  setUsersToExamForm(users: User[]) {
    if (users) {
      users.forEach((user) => {
        const existingUser = this.examUsersArray.controls.find(
          (control) => control.get('userId')?.value === user?.userId
        );
        if (!existingUser) {
          const userFormGroup = this.fb.group({
            userId: user.userId,
          });

          this.examUsersArray.push(userFormGroup);
        }
      });
    }
  }

  editExam() {
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
        id: this.exam!.id,
        name: this.exam!.name,
        description: this.exam!.description,
        examCode: this.exam!.examCode,
        duration: this.exam!.duration,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        active: this.exam!.active,
        examSubjects: [],
        users: [],
      });
      this.updatedUsers = this.exam!.users;
      this.setUsersToExamForm(this.exam?.users as User[]);
      console.log(this.examForm.value);
      if (this.exam!.examSubjects) {
        this.exam!.examSubjects.forEach((examSubject: ExamSubject) => {
          this.examSubjectsArray.push(
            this.fb.group({
              id: examSubject.id,
              maxQuestions: examSubject.maxQuestions,
              startingDifficultyLevel: examSubject.startingDifficultyLevel,
              duration: examSubject.duration,
              subjectName: examSubject.subject.name,
              subject: {
                id: examSubject.subject.id,
              },
            })
          );
        });
      }
      // Set the selectedExamId
      this.selectedExamId = this.exam!.id;
    }
    this.selectedSubjectIds = this.exam?.examSubjects.map(
      (exam) => exam.subject.id
    ) as number[];
  }

  removeExamSubject(index: number) {
    let removabableSubject = this.examSubjectsArray.at(index).value;
    this.examSubjectsArray.removeAt(index);
    this.removeSubjectIdFromSelectedSubjectIds(removabableSubject.subject.id);
  }
  removeSubjectIdFromSelectedSubjectIds(subjectId: number) {
    const indexToRemove = this.selectedSubjectIds.indexOf(subjectId);

    if (indexToRemove !== -1) {
      // Create a new array without modifying the original array
      this.selectedSubjectIds = this.selectedSubjectIds.filter(
        (id) => id !== subjectId
      );
    }
  }

  addUsers(event: Event) {
    console.log(this.examForm.value);
    this.setUsersToExamForm(this.updatedUsers);
    this.openAddUserModel();
    event.preventDefault();
  }
  onSubmit(): void {
    if (this.selectedExamId) {
      this.service.updateExam(this.examForm.value);
      // this.goBack();
    } else {
      this.service.scheduleExam(this.examForm.value);
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
  updateExamDuration() {
    let durationList = this.examSubjectsArray.controls
      .map((control) => control.get('duration')?.value)
      .filter((duration) => duration !== '');
    let totalDurationInMilliSeconds = this.calculateTotalDuration(durationList);
    let totalDuration = this.formatMillisecondsToTimeString(
      totalDurationInMilliSeconds
    );
    this.examForm.get('duration')?.setValue(totalDuration);
  }
  calculateTotalDuration(durationsList: string[]): number {
    return durationsList.reduce((totalMilliseconds, duration) => {
      const milliseconds = this.parseTimeStringToMilliseconds(duration);
      return totalMilliseconds + milliseconds;
    }, 0);
  }

  parseTimeStringToMilliseconds(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600000 + minutes * 60000 + seconds * 1000;
  }

  formatMillisecondsToTimeString(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(2, '0')}`;
  }

  openAddUserModel() {
    let dialogConfig: MatDialogConfig = {
      width: '100%',
      height: '100%',
      disableClose: true,
      // other MatDialogConfig properties can go here
    };
    dialogConfig.data = {
      examData: this.examForm.value,
    };
    this.dialogRef = this.matDialog.open(ExamUserComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.updatedUsers = result.examDataWithUsers.users;
      this.setUsersToExamForm(this.updatedUsers);
      console.log(this.examForm.value);
      console.log(this.updatedUsers);
    });
  }
}
