import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamStartResponse } from 'src/app/models/examStartresponce.model';
import { ExamSubject } from 'src/app/models/examSubject';
import { Option } from 'src/app/models/option';
import { Paper } from 'src/app/models/paper';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/repository/exam.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RefreshDialogComponent } from 'src/app/utils/refresh-dialog/refresh-dialog.component';
import { ConfirmDialogforuserComponent } from 'src/app/utils/confirm-dialogforuser/confirm-dialogforuser.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  @Input() paper: Paper = { id: 0, name: '', active: false, questions: [] };
  @Input() exam: Exam = {
    id: 0,
    name: '',
    description: '',
    examCode: '',
    duration: '',
    startDate: '',
    endDate: '',
    active: false,
    created_at_ts: '',
    examSubjects: [],
    users: [],
  };
  currentQuestionIndex = 0;
  currentQuestion: Question | undefined;
  listOfQuestion: Question[] = [];
  currentSubject: ExamSubject | undefined;
  question$: Observable<Question> | undefined;
  startExam$: Observable<any> | undefined;
  attemptedQuestions: number = 1;
  indexPositionOfTheExam: number = 0;
  totalSubjects: number = 0;
  indexPositionOfSubject: number = 0;
  examAttemptID: number | undefined;
  startExam: any;
  startExamResponse: ExamStartResponse | undefined;
  isLoading: boolean = false;
  indexPositionOfSubject$: Observable<number> | undefined;
  nextSubjectLoading: boolean = false;
  updateSubjectIndex$: Observable<number> | undefined;

  ngOnInit(): void {
    console.log(this.exam, '==========');
    this.currentSubject = this.exam.examSubjects[this.indexPositionOfTheExam];
    console.log(this.currentSubject);
    this.indexPositionOfSubject$ = this.sharedData.indexPositionOfSubject$;
    this.totalSubjects = this.exam.examSubjects.length;
    // this.startExam$ = this.ExamRepo.startExam(
    //   this.exam.examCode,
    //   this.currentSubject.startingDifficultyLevel,
    //   this.currentSubject.subject.id
    // ).pipe(take(1));
    // console.log(this.totalSubjects);
    // console.log(this.startExam);

    this.isLoading = true;
    this.ExamRepo.startExam(
      this.exam.examCode,
      this.currentSubject.startingDifficultyLevel,
      this.currentSubject.subject.id
    )
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.nextSubjectLoading = true;
          console.log(response, '=================');
          response.question['optionSelected'] = [];
          this.currentQuestion = response.question
          this.examAttemptID = response.attemptId;
          this.sharedData.updateExamAttempt(this.examAttemptID as number);
          console.log(this.currentQuestion);
          console.log(this.examAttemptID);
          this.isLoading = false;
          this.listOfQuestion.push(response.question);
        },
        (error) => {
          console.log(error);
        }
      );

    this.sharedData.updateExamAttempt(this.examAttemptID as number);
    this.sharedData.updateSubjects(this.exam.examSubjects);
    this.indexPositionOfSubject$.subscribe((response) => {
      if (response != null) {
        console.log(response);
        this.currentSubject = this.exam.examSubjects[response];
        this.indexPositionOfSubject = response;
        console.log(this.currentSubject);
        this.updateQuestions();
      }
    });
    this.updateSubjectIndex();
    window.onbeforeunload = () => {
      return 'Your custom message here';
    };
  }
  updateQuestions() {
    console.log('updating the questions');

    if (this.indexPositionOfSubject != 0) {
      this.saveOption(false, true);
      this.currentSubject = this.exam.examSubjects[this.indexPositionOfSubject];
      this.changeSubjectAndGetFirstQuestion();
    }
  }
  constructor(
    private authRepo: AuthService,
    private ExamRepo: ExamService,
    private sharedData: SharedDataService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  assignRightOption(userOptionSelected: Option) {
    console.log(userOptionSelected, '----------');
    console.log(this.currentQuestion?.optionSelected);
    const index = this.currentQuestion?.optionSelected?.findIndex(
      (opt) => opt.id == userOptionSelected.id
    );
    console.log(this.currentQuestion);

    console.log(index);
    if (index != -1 && typeof index == 'number') {
      this.currentQuestion?.optionSelected?.splice(index, 1);
    } else {
      if (this.currentQuestion?.questionType == 'single choice') {
        this.currentQuestion.optionSelected = [];
        this.currentQuestion.optionSelected?.push(userOptionSelected);
        console.log(this.currentQuestion.optionSelected);
      } else {
        this.currentQuestion?.optionSelected?.push(userOptionSelected);
        console.log(this.currentQuestion, userOptionSelected);
      }
    }
    console.log(this.currentQuestion?.optionSelected);
  }

  /**
   *
   * @param isSkipped  is fot checking wether the is user is skipping this question or not
   * @param isLast     is for giving the this is last question or not fot the backend to store the end time of the subject
   * @param isUpdating is for to update the question not to skip the getting next question
   * @method saveOption for saving the Option based on above conditions
   */

  saveOption(
    isSkipped: boolean = false,
    isLast: boolean = false,
    isUpdating: boolean = false
  ) {
    console.log(isSkipped, isLast, isUpdating);

    console.log(isSkipped);
    let currentQuestionData = {
      questionId: this.currentQuestion?.id,
      selectedOptions: this.getSelectedOptions(),
      isLast: isLast,
      endDate: new Date().toISOString().slice(0, 23),
      attemptId: this.examAttemptID,
      isUpdating: isUpdating,
      isSkipped: isSkipped,
    };
    console.log(currentQuestionData);
    if (this.currentQuestionIndex == this.listOfQuestion.length - 1) {
      this.question$ = this.ExamRepo.submitQuestion(currentQuestionData);
      this.question$.subscribe((response) => {
        if (response != null) {
          this.currentQuestion = response;
          this.currentQuestion.optionSelected = [];
          console.log(response, '=================');
          this.listOfQuestion.push(response);
        }
        this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
      });
    } else if (this.currentQuestionIndex < this.listOfQuestion.length - 1) {
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
      console.log('updating the question with options');
      currentQuestionData.isUpdating = true;
      console.log(currentQuestionData);
      this.currentQuestionIndex++;
      this.question$ = this.ExamRepo.submitQuestion(currentQuestionData);
      this.question$.subscribe((response) => {
        if (response != null) {
          this.currentQuestion = response;
          this.currentQuestion.optionSelected = [];
          console.log(response, '=================');
          this.listOfQuestion.push(response);
        }
        this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
      });
    } else {
      console.log(currentQuestionData);

      this.question$ = this.ExamRepo.submitQuestion(currentQuestionData);
      this.question$.subscribe((response) => {
        if (response != null) {
          this.currentQuestion = response;
          this.currentQuestion.optionSelected = [];
          console.log(response, '=================');
          this.listOfQuestion.push(response);
          this.currentQuestionIndex++;
        }
      });
      console.log(this.listOfQuestion);
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
    }
  }
  updateTime() {
    const newData = {
      exam_time: this.currentSubject?.duration,
      examCode: this.exam.examCode,
    };
    this.sharedData.updateExamTime(newData);
  }

  updateSubjectIndex() {
    this.sharedData.updateSubjectIndex(this.indexPositionOfSubject);
  }

  getSelectedOptions(): [] {
    let optionArray = [];
    optionArray = this.currentQuestion?.optionSelected?.map(
      (opt) => opt.id
    ) as [];
    console.log(optionArray);
    return optionArray;
  }

  changeSubjectAndGetFirstQuestion() {
    this.nextSubjectLoading = false;
    console.log(this.currentSubject);
    let data = {
      examCode: this.exam.examCode,
      difficultyLevel: this.currentSubject?.startingDifficultyLevel,
      startDate: new Date().toISOString().slice(0, 23),
      subjectId: this.currentSubject?.subject.id,
      attemptId: this.examAttemptID,
    };
    console.log(data);
    this.ExamRepo.changeSubjectAndGetFirstQuestion(data).subscribe(
      (response) => {
        this.nextSubjectLoading = true;
        this.updateTime();
        this.currentQuestion = response;
        this.listOfQuestion = [];
        this.listOfQuestion.push(this.currentQuestion);
        this.currentQuestionIndex = 0;
        console.log(this.currentQuestion);
        console.log(response, '------------------');
        this.currentQuestion.optionSelected = [];
      }
    );
  }
  /**
   *
   * @param option this is option we are checking wether this is selected ot not
   * @returns  it will return the true are false
   * @method isOptionsSelected() will check the this option selected or not in the current question options selected
   */
  isOptionsSelected(option: Option): boolean {
    let options = this.currentQuestion?.optionSelected as Option[]; // Assuming optionSelected is an array of Option objects
    if (options === undefined) {
      return false;
    }
    const isPresent = options.some((item) => item.id === option.id);
    return isPresent;
  }
  checkLastQuestionOrNot(): boolean {
    if (
      this.currentQuestionIndex ==
      (this.currentSubject?.maxQuestions as number) - 1
    ) {
      return true;
    }
    return false;
  }

  getSubjectName() {
    return this.exam.examSubjects[this.indexPositionOfSubject].subject.name;
  }

  changeSubject() {
    let messages = 'sure are you want to change the Subject ';
    let title = 'Confirmation';
    const dialogRef = this.dialog.open(ConfirmDialogforuserComponent, {
      data: { title: title, message: messages + '', note: '' },
    });
    console.log('ok');

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result, '000000000000');
        this.saveOption(false, true);
        this.indexPositionOfSubject++;
        this.updateSubjectIndex();
      } else {
        console.log('okkkkkkkkkkk');
      }
    });
  }
  nextQuestion() {
    console.log('ok');
    if (this.currentQuestionIndex < this.listOfQuestion.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
      console.log("change the question not new");
      
    } else {
      this.saveOption(true)
      console.log('getting the new question with same defiluclty level ');
    }
  }
  isOptionSelected(option: Option): boolean {
    let options = this.currentQuestion?.optionSelected?.[0];
    if (options != undefined && options.id == option.id) {
      return true;
    }
    return false;
  }
}
