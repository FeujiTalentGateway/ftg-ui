import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamStartResponse } from 'src/app/models/examStartresponce.model';
import { ExamSubject } from 'src/app/models/examSubject';
import { Option } from 'src/app/models/option';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/repository/exam.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { take } from 'rxjs';
import { SubjectQuestions } from './subject.questions';
import { QuestionNavigationComponent } from '../question-navigation/question-navigation.component';
 
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  @ViewChild('childComponentRef') childComponent!: QuestionNavigationComponent;
 
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
  indexPositionOfTheExam: number = 0;
  indexPositionOfSubject: number = 0;
  examAttemptID: number | undefined;
  startExam: any;
  startExamResponse: ExamStartResponse | undefined;
  isLoading: boolean = false;
  indexPositionOfSubject$: Observable<number> | undefined;
  nextSubjectLoading: boolean = false;
  updateSubjectIndex$: Observable<number> | undefined;
  lastQuestionOfExam$: Observable<any> | undefined;
  listOfQuestionEachSubject: SubjectQuestions[] = [];
  subjectStatus$: Observable<any> | undefined;
  arrow: boolean = false;
  questionNavigation: boolean = false;
 
  ngOnInit(): void {
    this.currentSubject = this.exam.examSubjects[this.indexPositionOfTheExam];
    this.indexPositionOfSubject$ = this.sharedData.indexPositionOfSubject$;
    this.isLoading = true;
    this.ExamRepo.startExam(
      this.exam.examCode,
      this.currentSubject.startingDifficultyLevel,
      this.currentSubject.subject.id
    ).subscribe(
      (response) => {
        this.nextSubjectLoading = true;
        response.question['optionSelected'] = [];
        response.question['isMarkedForReview'] = false;
        this.currentQuestion = response.question;
 
        this.examAttemptID = response.attemptId;
        this.sharedData.updateExamAttempt(this.examAttemptID as number);
        this.isLoading = false;
        this.listOfQuestion.push(response.question);
        this.exam.examSubjects[this.indexPositionOfTheExam].isTimeUp = false;
        this.updateExamTimeConfirmation();
 
        this.listOfQuestionEachSubject.push({
          subjectId: this.currentSubject?.subject.id ?? 0,
          subjectName: this.currentSubject?.subject.name ?? '',
          questions: this.listOfQuestion,
          reamingTime: this.getRemainingTime(),
          isVisited: true,
        });
       
      },
      (error) => {}
    );
    this.sharedData.updateExamAttempt(this.examAttemptID as number);
    this.sharedData.updateSubjects(this.exam.examSubjects);
    this.indexPositionOfSubject$.subscribe((response) => {
      if (response != null) {
        this.currentSubject = this.exam.examSubjects[response];
        this.indexPositionOfSubject = response;
        // this.updateQuestions();
      }
    });
    this.updateSubjectIndex();
    window.onbeforeunload = () => {
      return 'Your custom message here';
    };
    this.lastQuestionOfExam$ = this.sharedData.updateLastQuestion$;
    this.lastQuestionOfExam$.subscribe((response) => {
      if (response != null) {
        this.saveOption(false, true, true);
      }
    });
    this.subjectStatus$ = this.sharedData.subjectStatus$;
    this.subjectStatus$.subscribe((response) => {
      if (response != null) {
        let id = response.id;
        this.exam.examSubjects.map((item) => {
          if (item.id == id) {
            item.isTimeUp = true;
          }
          return item;
        });
        this.saveOption(false, true);
        this.updateNextSubject();
      }
    });
    



  }
  constructor(
    private ExamRepo: ExamService,
    private sharedData: SharedDataService
  ) {}
 
  /**
   * @method updateQuestions() this method is for updating the questions
   * @description this method is for updating the questions
   */
  updateQuestions() {
    if (this.indexPositionOfSubject != 0) {
      this.currentSubject = this.exam.examSubjects[this.indexPositionOfSubject];
      this.changeSubjectAndGetFirstQuestion();
    }
  }
  /**
   *
   * @param userOptionSelected this is the option selected by the user
   * @method assignRightOption() this method is for assigning the right option to the current question
   */
 
  assignRightOption(userOptionSelected: Option) {
    const index = this.currentQuestion?.optionSelected?.findIndex(
      (opt) => opt.id == userOptionSelected.id
    );
 
    if (index != -1 && typeof index == 'number') {
      this.currentQuestion?.optionSelected?.splice(index, 1);
    } else if (this.currentQuestion?.questionType == 'single choice') {
      this.currentQuestion.optionSelected = [];
      this.currentQuestion.optionSelected?.push(userOptionSelected);
    } else {
      this.currentQuestion?.optionSelected?.push(userOptionSelected);
    }
  }
 
  /**
   *
   * @param isSkipped  is fot checking wether the is user is skipping this question or not
   * @param isLast    is for giving the this is last question or not fot the backend to store the end time of the subject
   * @param isUpdating  is for to update the question not to skip the getting next question
   * @returns   it will return the current question data
   * @method getCurrentQuestionData() this method is for getting the current question data
   */
  getCurrentQuestionData(
    isSkipped: boolean = false,
    isLast: boolean = false,
    isUpdating: boolean = false
  ): any {
    let currentQuestionData = {
      questionId: this.currentQuestion?.id,
      selectedOptions: this.getSelectedOptions(),
      isLast: isLast,
      attemptId: this.examAttemptID,
      isUpdating: isUpdating,
      isSkipped: isSkipped,
      isMarkedForReview: this.currentQuestion?.isMarkedForReview,
    };
    return currentQuestionData;
  }
 
  /**
   *
   * @param isSkipped   is fot checking wether the is user is skipping this question or not
   * @param isLast    is for giving the this is last question or not fot the backend to store the end time of the subject
   * @param isUpdating    is for to update the question not to skip the getting next question
   * @`method saveOption` this method is for saving the option based on the above conditions
   */
 
  saveOption(
    isSkipped: boolean = false,
    isLast: boolean = false,
    isUpdating: boolean = false
  ) {
    let currentQuestionData = this.getCurrentQuestionData(
      isSkipped,
      isLast,
      isUpdating
    );
    if (isSkipped) {
      currentQuestionData.isMarkedForReview=false;
      this.skipTheCurrentQuestionAndGetNewQuestion(currentQuestionData);
    } else if (this.currentQuestionIndex < this.listOfQuestion.length - 1) {
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
      currentQuestionData.isUpdating = true;
      this.updateOption(currentQuestionData);
      this.currentQuestionIndex++;
    } else if (isUpdating) {
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
      this.updateOption(currentQuestionData);
 
    } else {
      this.saveOptionAndGetNewQuestion(currentQuestionData);
    }
  }
 
  /**
   *
   * @param currentQuestionData this is the current question data
   * @returns  it will return the new question
   * @method saveOptionAndGetNewQuestion() this method is for saving the option and getting the new question
   */
 
  saveOptionAndGetNewQuestion(currentQuestionData: any) {
    currentQuestionData.isMarkedForReview=false;
    this.question$ = this.ExamRepo.submitQuestion(currentQuestionData);
    this.question$.subscribe((response) => {
      if (response != null) {
        this.currentQuestion = response;
        this.currentQuestion.optionSelected = [];
        this.currentQuestion.isMarkedForReview = false;
        this.listOfQuestion.push(response);
        this.currentQuestionIndex++;
      }
    });
  }
  /**
   *
   * @param currentQuestionData this is the current question data
   * @returns  it will return the updated question
   * @method updateOption() this method is for updating the option
   */
  updateOption(currentQuestionData: any) {
    currentQuestionData.isMarkedForReview=false;
    this.question$ = this.ExamRepo.submitQuestion(currentQuestionData);
    this.question$.subscribe((response) => {
      if (response != null) {
        this.currentQuestion = response;
        this.currentQuestion.optionSelected = [];
        this.listOfQuestion.push(response);
      }
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
    });
  }
 
  /**
   *
   * @param currentQuestionData this is the current question data
   * @returns  it will return the new question
   * @method skipTheCurrentQuestionAndGetNewQuestion() this method is for skipping the current question and getting the new question
   */
 
  async skipTheCurrentQuestionAndGetNewQuestion(currentQuestionData: any) {
    currentQuestionData.isMarkedForReview=false;
    this.question$ = this.ExamRepo.submitQuestion(currentQuestionData);
    this.question$.subscribe((response) => {
      if (response != null) {
        this.currentQuestion = response;
        this.currentQuestion.optionSelected = [];
        this.currentQuestion.isMarkedForReview = false;
        this.listOfQuestion.push(response);
      }
      this.currentQuestionIndex++;
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
    });
  }
 
  /**
   *  @method updateSubjectIndex() this method is for updating the subject index
   */
 
  updateSubjectIndex() {
    this.sharedData.updateSubjectIndex(this.indexPositionOfSubject);
  }
 
  /**
   * @returns it will return the selected options
   * @method getSelectedOptions() this method is for getting the selected options
   */
  getSelectedOptions(): [] {
    let optionArray = [];
    optionArray = this.currentQuestion?.optionSelected?.map(
      (opt) => opt.id
    ) as [];
    if (optionArray === undefined) {
      return [];
    }
    return optionArray;
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
 
  /**
 
   * @returns it will return the true or false
  * @method checkLastQuestionOrNot() this method is for checking the last question or not
   */
 
  checkLastQuestionOrNot(): boolean {
    if (
      this.currentQuestionIndex ==
      (this.currentSubject?.maxQuestions as number) - 1
    ) {
      return true;
    }
    return false;
  }
 
  getSubjectName(): string | undefined {
    return this.currentSubject?.subject.name;
  }
 
  /**
   *
   * @param option this is the option we are checking wether this is selected or not
   * @returns it will return the true or false
   * @method isOptionSelected() this method is for checking the option is selected or not
   */
 
  isOptionSelected(option: Option): boolean {
    let options = this.currentQuestion?.optionSelected?.[0];
    if (options != undefined && options.id == option.id) {
      return true;
    }
    return false;
  }
 
  /**
   *
   * @returns it will return the true or false
   * @method checkLastSubjectOrNot() this method is for checking the last subject or not
   * @description this method is for checking the last subject or not
   *
   */
 
  checkLastSubjectOrNot(): any {
    if (this.indexPositionOfSubject + 1 == this.exam.examSubjects.length) {
      return false;
    }
    return true;
  }
 
  /**
   * @returns it will return the remaining time`
   * @method getRemainingTime() this method is for getting the remaining time
   */
 
  getRemainingTime(): number {
    let remainingTime = 0;
    remainingTime = this.sharedData.getRemainingTime();
    return remainingTime;
  }
 
 
 
 
 
  /**
   * @method changeSubject() this method is for changing the subject
   * @param indexPositionOfSubject
   */
 
  changeSubject(indexPositionOfSubject: any) {
 
    this.saveOption(false, false, true);
    this.updatingTheCurrentSubjectAndQuestions();
    let subject = this.exam.examSubjects[indexPositionOfSubject.value];
    this.sharedData.updateSubjectIndex(indexPositionOfSubject.value);
    this.currentSubject = subject;
    let subjectIsExits = this.checkSubjectIsExitsOrNot(this.currentSubject);
 
    if (!subjectIsExits) {
      this.listOfQuestion = [];
      this.currentQuestionIndex = 0;
      this.currentSubject = subject;
      this.changeSubjectWithIndexPositionAndGetQuestion();
    } else {
      this.currentQuestionIndex = 0;
      this.currentSubject = subject;
      this.ExamRepo.getListOFAttemptedQuestions(
        this.examAttemptID as number,
        subject.subject.id
      ).subscribe((response: any) => {
        this.listOfQuestion = response;
        this.childComponent.previousQuestion(this.currentQuestionIndex);
 
      });
 
      this.listOfQuestion = this.listOfQuestionEachSubject.find(
        (item) => item.subjectId === subject.subject.id
      )?.questions as Question[];
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
    }
  }
 
  /**
   * @method updatingTheCurrentSubjectAndQuestions() this method is for updating the current subject and questions
   * @description this method is for updating the current subject and questions
   */
 
  updatingTheCurrentSubjectAndQuestions() {
    this.listOfQuestionEachSubject.map((item) => {
      if (item.subjectId === this.currentSubject?.subject.id) {
        item.reamingTime = this.getRemainingTime();
        item.questions = this.listOfQuestion;
      }
      return item;
    });
  }
 
  /**
   * @method checkSubjectIsExitsOrNot() this method is for checking the subject is exits or not
   * @param subject this is the subject we are checking wether this is exits or not
   * @returns it will return the true or false
   * @description this method is for checking the subject is exits or not
   */
 
  checkSubjectIsExitsOrNot(subject: any): boolean {
    let subjectIsExits = this.listOfQuestionEachSubject.some(
      (item) => item.subjectId === subject.subject.id
    );
    return subjectIsExits;
  }
 
  /**
   *  @method changeSubjectWithIndexPositionAndGetQuestion() this method is for changing the subject with index position and getting the question
   * @description this method is for changing the subject with index position and getting the question
   */
 
  changeSubjectWithIndexPositionAndGetQuestion() {
    let data = {
      examCode: this.exam.examCode,
      difficultyLevel: this.currentSubject?.startingDifficultyLevel ?? 0,
      startDate: new Date().toISOString().slice(0, 23),
      subjectId: this.currentSubject?.subject.id ?? 0,
      attemptId: this.examAttemptID ?? '',
    };
    this.sharedData.updateRemainingTime(this.currentSubject?.duration);
    this.listOfQuestionEachSubject.push({
      subjectId: this.currentSubject?.subject.id ?? 0,
      subjectName: this.currentSubject?.subject.name ?? '',
      questions: [],
      reamingTime: this.getRemainingTime(),
      isVisited: true,
    });
    this.ExamRepo.changeSubjectAndGetFirstQuestion(data).subscribe(
      (response) => {
        this.nextSubjectLoading = true;
        this.currentQuestion = response;
        this.listOfQuestion = [];
        this.listOfQuestion.push(this.currentQuestion);
        this.currentQuestionIndex = 0;
        this.currentQuestion.optionSelected = [];
      }
    );
  }
 
  /**
   * @method updateExamTimeConfirmation() this method is for updating the exam time confirmation
   * @description this method is for updating the exam time confirmation
   */
 
  updateExamTimeConfirmation() {
    this.exam.examSubjects.map((item) => {
      item.isTimeUp = false;
      return item;
    });
  }
 
  /**
   * @method updateNextSubject() this method is for updating the next subject
   * @description this method is for updating the next subject
   */
 
  updateNextSubject() {
    let examSubjectsList = this.exam.examSubjects;
    let isSubjectAvailable = examSubjectsList.some(
      (item) => item.isTimeUp == false
    );
    if (isSubjectAvailable) {
      let nextSubject = examSubjectsList.find((item) => item.isTimeUp == false);
      let indexPositionOfSubject = examSubjectsList.findIndex(
        (item) => item.id == nextSubject?.id
      );
      this.sharedData.updateSubjectIndex(indexPositionOfSubject);
 
      if (nextSubject != undefined) {
        this.currentSubject = nextSubject;
        let subjectIsExits = this.checkSubjectIsExitsOrNot(this.currentSubject);
        if (!subjectIsExits) {
          this.listOfQuestion = [];
          this.currentQuestionIndex = 0;
          this.changeSubjectWithIndexPositionAndGetQuestion();
        } else {
          this.currentQuestionIndex = 0;
          this.listOfQuestion = this.listOfQuestionEachSubject.find(
            (item) => item.subjectId === nextSubject?.subject.id
          )?.questions as Question[];
          this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
        }
      }
    } else {
      this.sharedData.callSubmitExam(true);
    }
  }
 
  ngOnDestroy(): void {
    if (this.question$) {
      this.question$.subscribe().unsubscribe();
    }
    if (this.startExam$) {
      this.startExam$.subscribe().unsubscribe();
    }
    if (this.indexPositionOfSubject$) {
      this.indexPositionOfSubject$.subscribe().unsubscribe();
    }
    if (this.updateSubjectIndex$) {
      this.updateSubjectIndex$.subscribe().unsubscribe();
    }
    if (this.lastQuestionOfExam$) {
      this.lastQuestionOfExam$.subscribe().unsubscribe();
    }
    if (this.subjectStatus$) {
      this.subjectStatus$.subscribe().unsubscribe();
    }
  }
 
  setMarkedForReview() {
    if (this.currentQuestion?.isMarkedForReview !== undefined) {
      this.currentQuestion.isMarkedForReview =
        !this.currentQuestion.isMarkedForReview;
    }
  }
 
  updateOptionSelected(
    isSkipped: boolean = false,
    isLast: boolean = false,
    isUpdating: boolean = false
  ) {
    let currentQuestionData = this.getCurrentQuestionData(
      isSkipped,
      isLast,
      isUpdating
    );
    this.updateOption(currentQuestionData);
  }
  checkOptionSelectedOrNot(): any {
    if (this.currentQuestion?.optionSelected?.length != 0) {
      return true;
    }
    return false;
  }
 
  getTestForMarkButton(): any {
    if (!this.currentQuestion?.isMarkedForReview) {
      return 'Mark for Review';
    }
    return 'Unmark';
  }
 
  handleQuestionChange(num: number) {
    this.currentQuestionIndex = num - 1;
    this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
  }
  toggleArrow() {
    this.arrow = !this.arrow;
    this.questionNavigation = !this.questionNavigation;
  }
 
  /**
   * @method submitExam() this method is for submitting the exam
   * @returns it will return the confirmation dialog
   * @description this method is for submitting the exam
   */
 
  async nextQuestion() {
    if (this.currentQuestionIndex < this.listOfQuestion.length - 1) {
      this.updateOptionSelected(false, false, true);
      this.currentQuestionIndex++;
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
      this.childComponent.nextQuestions(this.currentQuestionIndex);
    } else if (this.currentQuestion?.optionSelected?.length != 0) {
      this.saveOption();
      this.childComponent.nextQuestion(this.currentQuestionIndex);
    } else {
      await this.saveOption(true, false, false);
      this.childComponent.nextQuestion(this.currentQuestionIndex);
    }
  }
  /**
   *  @method previousQuestion() this method is for getting the previous question
   */
 
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.updateOptionSelected(false, false, true);
      this.currentQuestionIndex--;
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
      this.childComponent.previousQuestion(this.currentQuestionIndex);
    }
  }
 
 
 
 
  /**
   *  @method changeSubjectAndGetFirstQuestion() this method is for changing the subject and getting the first question
   */
  changeSubjectAndGetFirstQuestion() {
    this.nextSubjectLoading = false;
 
    let checkAlreadyVisited = this.listOfQuestionEachSubject.some(
      (item) => item.subjectId == this.currentSubject?.subject.id
    );
    if (checkAlreadyVisited) {
      this.listOfQuestion = this.listOfQuestionEachSubject.find(
        (item) => item.subjectId == this.currentSubject?.subject.id
      )?.questions as Question[];
 
      this.currentQuestionIndex = 0;
      this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];
      this.nextSubjectLoading = true;
    } else {
      this.listOfQuestionEachSubject.push({
        subjectId: this.currentSubject?.subject.id ?? 0,
        subjectName: this.currentSubject?.subject.name ?? '',
        questions: this.listOfQuestion,
        reamingTime: this.getRemainingTime(),
        isVisited: true,
      });
 
      let data = {
        examCode: this.exam.examCode,
        difficultyLevel: this.currentSubject?.startingDifficultyLevel ?? 0,
        startDate: new Date().toISOString().slice(0, 23),
        subjectId: this.currentSubject?.subject.id ?? 0,
        attemptId: this.examAttemptID ?? '',
      };
      this.ExamRepo.changeSubjectAndGetFirstQuestion(data).subscribe(
        (response) => {
          this.nextSubjectLoading = true;
          this.currentQuestion = response;
          this.currentQuestion.isMarkedForReview = false;
          this.listOfQuestion = [];
          this.listOfQuestion.push(this.currentQuestion);
          this.currentQuestionIndex = 0;
          this.currentQuestion.optionSelected = [];
        }
      );
    }
  }
}
 