import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';
import { ExamSubject } from 'src/app/models/examSubject';
import { Option } from 'src/app/models/option';
import { OptionAttempt } from 'src/app/models/option.attempt';
import { Paper } from 'src/app/models/paper';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/repository/exam.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Observable } from 'rxjs';

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

  indexPositionOfSubject$: Observable<number> | undefined;

  ngOnInit(): void {
    console.log(this.paper);
    console.log(this.exam, '==========');
    this.currentSubject = this.exam.examSubjects[this.indexPositionOfTheExam];
    console.log(this.currentSubject);
    this.indexPositionOfSubject$ = this.sharedData.indexPositionOfSubject$;
    this.totalSubjects = this.exam.examSubjects.length;
    this.startExam$ = this.ExamRepo.startStaticExam(
      this.exam.examCode,
      this.currentSubject.startingDifficultyLevel,
      this.currentSubject.id
    );
    console.log(this.totalSubjects);

    // this.question$ = this.ExamRepo.getStaticQuestionByExamCodeAndSubjectId(
    //   '',
    //   2
    // );
    this.startExam$.subscribe(
      (response) => {
        console.log(response, '=================');
        response.question['optionSelected'] = [];
        this.currentQuestion = response.question;
        this.examAttemptID = response.attemptId;
        console.log(this.currentQuestion);
        console.log(this.examAttemptID);
      },
      (error) => {}
    );

    this.sharedData.updateExamAttempt(this.paper?.exam_attempt_id as number);
    this.sharedData.updateSubjects(this.exam.examSubjects);

    // this.question$.subscribe(
    //   (response) => {
    //     this.currentQuestion = response;
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
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
    private sharedData: SharedDataService
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
    // this.currentQuestion?.optionSelected?.push(userOptionSelected)
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
    console.log(this.currentQuestion);
    let date = new Date();

    console.log(date);
    let currentQuestionData = {
      questionId: this.currentQuestion?.id,
      selectedOptions: this.getSelectedOptions(),
      is_last: this.checkThisQuestionLastOrNot(),
      end_date: this.checkThisQuestionLastOrNotForDate(),
      attempt_id: this.examAttemptID,
    };
    console.log(currentQuestionData);

    this.question$ = this.ExamRepo.submitStaticQuestion(this.currentQuestion);
    this.attemptedQuestions += 1;
    this.checkQuestionsAvailableOrNot();
    this.question$.subscribe((response) => {
      this.currentQuestion = response;
      this.currentQuestion.optionSelected = [];
    });

    // this.currentQuestion = this.paper.questions[this.currentQuestionIndex];
    // console.log(this.currentQuestion);

    // if (this.currentQuestion.optionSelected == null) {
    //   // this.authRepo.openSnackBar('Please select the Option First', 'close');
    // } else {
    //   console.log(this.currentQuestion.id);
    //   console.log(this.currentQuestion.optionSelected);
    //   console.log(this.paper.exam_attempt_id);

    //   // let optionAttempt: OptionAttempt = {
    //   //   question_id_i: this.currentQuestion.id,
    //   //   option_selected_id: this.currentQuestion.optionSelected,
    //   //   attempt_id_i: this.paper.exam_attempt_id as number,
    //   // };
    //   // console.log(optionAttempt);

    //   // this.ExamRepo.saveOption(optionAttempt).subscribe(
    //   //   (response) => {},
    //   //   (error) => {
    //   //     console.log(error);
    //   //   }
    //   // );
    //   if (this.currentQuestionIndex < this.paper.questions.length - 1) {
    //     this.currentQuestionIndex++;
    //   }
    //   this.currentQuestion = this.paper.questions[this.currentQuestionIndex];
    // }
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
}
