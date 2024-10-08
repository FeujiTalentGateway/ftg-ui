import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CodingQuestionsDTO } from 'src/app/models/codingQuestionDTO.model';
import { CodingQuestions } from 'src/app/models/codingquestions.model';
import { Exam } from 'src/app/models/exam.model';
import { ExamSubject } from 'src/app/models/examSubject';
import { Subject } from 'src/app/models/subject';
import { User } from 'src/app/models/user.model';
import { ExamService } from 'src/app/repository/exam.service';
import { ScheduleExamRepositoryService } from 'src/app/repository/schedule-exam-repository.service';
import { SubjectRepositoryService } from 'src/app/repository/subject-repository.service';
import { ScheduleExamService } from 'src/app/services/schedule-exam.service';
import { CodingQuestionsComponent } from '../coding-questions/coding-questions.component';
import { ExamUserComponent } from '../exam-user/exam-user.component';

@Component({
  selector: 'app-schedule-exam',
  templateUrl: './schedule-exam.component.html',
  styleUrls: ['./schedule-exam.component.css'],
  providers: [DatePipe],
})
export class ScheduleExamComponent implements OnInit {
  exam: Exam | null = null;
  CodingSubjectName: string = 'Coding Questions';
  codingQuestionObject!: ExamSubject | undefined;
  dialogRef: any;
  isEditing: boolean = false;
  editableExamId!: number;
  examForm!: FormGroup<any>;
  minStartDate: string = '';
  selectedExamId: any;
  subjects!: Subject[];
  updatedUsers!: User[];
  updatedQuestions!: CodingQuestions[];
  selectedSubjectIds!: number[];
  codingQuestionsArray: CodingQuestionsDTO[] = [];
  maxQuestionsArray: number[] = Array.from(
    { length: 50 },
    (_, index) => index + 1
  );
  difficultyLevelArray: number[] = Array.from(
    { length: 10 },
    (_, index) => index + 1
  );

  constructor(
    private service: ScheduleExamService,
    private examService: ExamService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private examRepo: ScheduleExamRepositoryService,
    private matDialog: MatDialog,
    private subjectRepo: SubjectRepositoryService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.initializeExamForm();
  }
  ngOnInit(): void {
    this.isEditing = this.activatedRoute.snapshot.paramMap.get('id') !== null;
    if (this.isEditing) {
      this.editableExamId = Number(
        this.activatedRoute.snapshot.paramMap.get('id')
      );
      this.examRepo.getExamById(this.editableExamId).subscribe({
        next: (exam) => {
          this.exam = exam;
          this.editExam();
        },
      });
    }
    this.subjectRepo.getAllSubjects().subscribe((response) => {
      this.subjects = response;
    });
    this.examForm
      .get('examSubjects')
      ?.valueChanges.subscribe((value) => console.log(value));
  }

  // Constructor to inject services and dependencies

  // Initialize the exam form with form controls and validators
  initializeExamForm() {
    this.examForm = this.fb.group(
      {
        id: [0],
        name: ['', [Validators.required, Validators.maxLength(255)]],
        description: ['', [Validators.required, Validators.maxLength(250)]],
        examCode: ['', [Validators.required, Validators.maxLength(50)]],
        duration: [
          '01:00:00',
          [
            Validators.required,
            Validators.pattern(/^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/),
          ],
        ],
        hours: ['00', Validators.required],
        minutes: ['00', Validators.required],
        seconds: ['00', Validators.required],
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
  // Trigger error message
  openErrorToaster(message: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 3000; // Duration in milliseconds
    this.snackBar.open(message, 'Close', config);
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
              maxQuestions: ['', Validators.required],
              startingDifficultyLevel: ['', Validators.required],
            })
          );
        }
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
    // Convert string dates to Date objects
    const startDateObj = new Date(this.exam!.startDate);
    const endDateObj = new Date(this.exam!.endDate);

    // Use DatePipe to format the date
    const formattedStartDate = this.datePipe.transform(
      startDateObj,
      'yyyy-MM-dd'
    );
    const formattedEndDate = this.datePipe.transform(endDateObj, 'yyyy-MM-dd');
    let [hours, minutes, seconds] = this.exam!.duration.split(':');
    // Set the form values
    this.examForm.setValue({
      id: this.exam!.id,
      name: this.exam!.name,
      description: this.exam!.description,
      examCode: this.exam!.examCode,
      duration: this.exam!.duration,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      active: this.exam!.active,
      examSubjects: [],
      users: [],
    });
    this.updatedUsers = this.exam!.users;
    this.setUsersToExamForm(this.exam?.users as User[]);
    this.exam!.examSubjects.forEach((examSubject: ExamSubject) => {
      if (
        examSubject.subject.name?.toLowerCase() ==
        this.CodingSubjectName.toLowerCase()
      ) {
        this.codingQuestionsArray = examSubject.codingQuestions;
      }
    });

    if (this.exam!.examSubjects) {
      this.exam!.examSubjects.forEach((examSubject: ExamSubject) => {
        this.examSubjectsArray.push(
          this.fb.group({
            id: examSubject.id,
            maxQuestions: examSubject.maxQuestions,
            startingDifficultyLevel: examSubject.startingDifficultyLevel,
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
    this.selectedSubjectIds = this.exam?.examSubjects.map(
      (exam) => exam.subject.id
    ) as number[];

    this.setcodingQuestionsToExamForm(this.codingQuestionsArray);
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
    this.setUsersToExamForm(this.updatedUsers);
    this.openAddUserModel();
    event.preventDefault();
  }
  onSubmit(): void {
    if (this.selectedExamId) {
      const examSubjects = this.examForm.get('examSubjects')?.value;
      // Iterate over the array and find the subject with name "Coding questions"
      const codingQuestionsSubject = examSubjects.find(
        (subject: any) =>
          subject.subjectName.toLowerCase() === 'coding questions'.toLowerCase()
      );
      if (codingQuestionsSubject) {
        if (!codingQuestionsSubject.codingQuestions) {
          codingQuestionsSubject.codingQuestions =
            this.codingQuestionObject?.codingQuestions;
        } else {
          this.service.updateExam(this.examForm.value);
        }
        let codingQuestions = codingQuestionsSubject.codingQuestions;
        console.log(codingQuestions);
        if (codingQuestionsSubject.maxQuestions != codingQuestions?.length) {
          var message = `Max Coding Questions are ${
            codingQuestionsSubject.maxQuestions
          } and Selected Coding Questions are ${
            codingQuestions?.length ? codingQuestions?.length : 0
          }`;
          this.openErrorToaster(message);
        } else {
          this.service.updateExam(this.examForm.value);
        }
        // Subject with name "Coding questions" found
      } else {
        // Subject with name "Coding questions" not found
        console.log('Subject "Coding questions" not found.');
        this.service.updateExam(this.examForm.value);
      }
    } else {
      this.codingQuestionObject = this.examSubjectsArray.value.find(
        (subject: any) =>
          subject.subjectName.toLowerCase() ===
          this.CodingSubjectName.toLowerCase()
      );
      if (this.codingQuestionObject) {
        const { boolValue, errorMessage } = this.checkCodingQuestions();
        if (boolValue) {
          this.service.scheduleExam(this.examForm.value);
        } else {
          this.openErrorToaster(errorMessage);
        }
      } else {
        this.service.scheduleExam(this.examForm.value);
      }
    }
  }

  formatDate(date: Date): string {
    const isoString = date.toISOString();
    return isoString.substring(0, isoString.indexOf('T'));
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
  mapSubDurationToDuration() {
    let hours = this.examForm.get('hours')?.value;
    let minutes = this.examForm.get('minutes')?.value;
    let seconds = this.examForm.get('seconds')?.value;
    let combinedDuration = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    this.examForm.get('duration')?.setValue(combinedDuration);
    // this.updateExamDuration();
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
    });
  }

  isValid(): boolean {
    if (this.selectedSubjectIds) {
      return this.selectedSubjectIds.length > 0;
    } else {
      return false;
    }
  }

  hoursArray: string[] = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  minutesArray: string[] = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  secondsArray: string[] = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  AddCodingQuestions(event: Event) {
    var maxQuestions = this.getMaxCodingQuestions();
    this.setcodingQuestionsToExamForm(this.codingQuestionsArray);
    this.openCodingQuestionsModel(maxQuestions);
    event.preventDefault();
  }

  getMaxCodingQuestions(): number {
    this.codingQuestionObject = this.examSubjectsArray.value.find(
      (subject: any) =>
        subject.subjectName.toLowerCase() ===
        this.CodingSubjectName.toLowerCase()
    );
    return this.codingQuestionObject
      ? this.codingQuestionObject.maxQuestions
      : 0;
  }

  openCodingQuestionsModel(questions: number) {
    let dialogConfig: MatDialogConfig = {
      width: '100%',
      height: '100%',
      disableClose: true,
    };
    dialogConfig.data = {
      examData: this.examForm.value,
      maxQuestions: questions,
    };
    this.dialogRef = this.matDialog.open(
      CodingQuestionsComponent,
      dialogConfig
    );
  }

  checkCodingQuestions() {
    var maxCodingQuestions = this.getMaxCodingQuestions();
    var selectedCodingQuestions =
      this.codingQuestionObject?.codingQuestions?.length;
    var message = `Max Coding Questions are ${maxCodingQuestions} and Selected Coding Questions are ${selectedCodingQuestions}`;
    return {
      boolValue: maxCodingQuestions == selectedCodingQuestions,
      errorMessage: message,
    };
  }

  setcodingQuestionsToExamForm(codingquestions: CodingQuestionsDTO[]) {
    this.examForm.get('examSubjects')?.value.forEach((subject: any) => {
      if (
        subject.subjectName.toLowerCase() ==
        this.CodingSubjectName.toLowerCase()
      ) {
        subject.codingQuestions = codingquestions;
        this.codingQuestionObject = subject;
      }
    });
  }
}
