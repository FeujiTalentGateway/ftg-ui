import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    console.log(this.paper);
    console.log(this.exam, '==========');
    this.currentSubject = this.exam.examSubjects[this.indexPositionOfTheExam];
    console.log(this.currentSubject);
    this.indexPositionOfSubject$ = this.sharedData.indexPositionOfSubject$;
    this.totalSubjects = this.exam.examSubjects.length;
    this.startExam$ = this.ExamRepo.startExam(
      this.exam.examCode,
      this.currentSubject.startingDifficultyLevel,
      this.currentSubject.subject.id
    ).pipe(take(1));
    console.log(this.totalSubjects);
    console.log(this.startExam);

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
          this.currentQuestion = response.question;
          this.examAttemptID = response.attemptId;
          this.sharedData.updateExamAttempt(this.examAttemptID as number);

          console.log(this.currentQuestion);
          console.log(this.examAttemptID);
          this.isLoading = false;
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
  }
  updateQuestions() {
    console.log('updating the questions');
  }
  constructor(
    private authRepo: AuthService,
    private ExamRepo: ExamService,
    private sharedData: SharedDataService,
    private router: Router
  ) {
    this.currentQuestion = this.paper?.questions[0];
  }
  nextQuestion() {
    if (this.currentQuestionIndex < this.paper.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.paper.questions[this.currentQuestionIndex];
    }
  }
  optionSelected(option: Option) {
    console.log(option);
    console.log(this.currentQuestion);
  }
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

  saveOption() {
    let currentQuestionData = {
      questionId: this.currentQuestion?.id,
      selectedOptions: this.getSelectedOptions(),
      isLast: this.checkThisQuestionLastOrNot(),
      endDate: this.checkThisQuestionLastOrNotForDate(),
      attemptId: this.examAttemptID,
    };
    console.log(currentQuestionData);

    this.question$ = this.ExamRepo.submitQuestion(currentQuestionData);
    this.attemptedQuestions += 1;
    this.checkQuestionsAvailableOrNot();
    this.question$.subscribe((response) => {
      if (response != null) {
        this.currentQuestion = response;
        this.currentQuestion.optionSelected = [];
        console.log(response, '=================');
      }
    });
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.paper.questions[this.currentQuestionIndex];
    }
  }
  checkQuestionsAvailableOrNot() {
    if (this.currentSubject?.maxQuestions != undefined) {
      if (this.attemptedQuestions > this.currentSubject?.maxQuestions) {
        if (this.indexPositionOfSubject < this.totalSubjects) {
          this.indexPositionOfSubject += 1;
          this.currentSubject =
            this.exam.examSubjects[this.indexPositionOfSubject];
          console.log(this.currentSubject);
          this.updateTime();
          this.updateSubjectIndex();
          this.changeSubjectAndGetFirstQuestion();
          this.attemptedQuestions = 1;
        }
      }
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
    const subjectIndex = {
      subjectIndexPosition: this.indexPositionOfSubject,
    };
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
  checkThisQuestionLastOrNot(): boolean {
    if (this.currentSubject?.maxQuestions != undefined) {
      if (this.attemptedQuestions == this.currentSubject?.maxQuestions) {
        return true;
      }
    }
    return false;
  }
  checkThisQuestionLastOrNotForDate(): any {
    if (this.currentSubject?.maxQuestions != undefined) {
      if (this.attemptedQuestions == this.currentSubject?.maxQuestions) {
        return new Date().toISOString().slice(0, 23);
      }
    }
    return null;
  }

  assignQuestion(exam: ExamStartResponse) {
    console.log(exam);
    this.currentQuestion = exam.question;
  }
  changeSubjectAndGetFirstQuestion() {
    this.nextSubjectLoading = false;
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

        this.currentQuestion = response;
        console.log(this.currentQuestion);
        console.log(response, '------------------');
        this.currentQuestion.optionSelected = [];
      }
    );
  }
  checkLastAndSubjectAndFinalQuestionOrNot(): boolean {
    if (this.currentSubject?.maxQuestions != undefined) {
      if (
        this.attemptedQuestions == this.currentSubject?.maxQuestions &&
        this.indexPositionOfSubject + 1 == this.exam.examSubjects.length
      ) {
        return true;
      }
    }
    return false;
  }

  saveAndSubmit() {
    let currentQuestionData = {
      questionId: this.currentQuestion?.id,
      selectedOptions: this.getSelectedOptions(),
      isLast: this.checkThisQuestionLastOrNot(),
      endDate: this.checkThisQuestionLastOrNotForDate(),
      attemptId: this.examAttemptID,
    };
    this.question$ = this.ExamRepo.submitQuestion(currentQuestionData);
    this.question$.subscribe((response) => {
      if (response != null) {
        this.currentQuestion = response;
        this.currentQuestion.optionSelected = [];
        console.log(response, '=================');
      }
    });
    this.ExamRepo.submitExam(this.examAttemptID as number).subscribe(
      (response) => {
        this.router.navigateByUrl('/user/home');
      },
      (error) => {
        console.log(error);
        this.router.navigateByUrl('/user/home');
      }
    );
  }
}
