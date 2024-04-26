import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamStartResponse } from 'src/app/models/examStartresponce.model';
import { ExamSubject } from 'src/app/models/examSubject';
import { Option } from 'src/app/models/option';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/repository/exam.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SubjectQuestions } from './subject.questions';
import { QuestionNavigationComponent } from '../question-navigation/question-navigation.component';
import { CodingQuestions } from 'src/app/models/codingquestions.model';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { TestCaseResultService } from 'src/app/services/test-case-result.service';
import { CodingQuestion } from 'src/app/models/coding.question.model';
 
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  @ViewChild(CodeEditorComponent) codeEditorComponent!: CodeEditorComponent;
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
    users: []
  };
  alredyVisited:boolean=false
  codingSubjectName="Coding Questions"
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
  currentCodingQuestionIndex:number=0;
  codingQuestions:CodingQuestion[]=[]
  userCodingLogic:string[] = [];
  codingLanguages:string[] = []
  ngOnInit(): void {
    this.currentSubject = this.exam.examSubjects[this.indexPositionOfTheExam];
    this.indexPositionOfSubject$ = this.sharedData.indexPositionOfSubject$;
    this.isLoading = true;
    const codingQuestionId=this.getIndexOfCodingQuestion()
    this.ExamRepo.startExam(
      this.exam.examCode,
      this.currentSubject.startingDifficultyLevel,
      this.currentSubject.subject.id,
      codingQuestionId
      
    ).subscribe(
      (response) => {
        this.nextSubjectLoading = true;
        response.question['optionSelected'] = [];
        response.question['isMarkedForReview'] = false;
        this.currentQuestion = response.question;
        this.codingQuestions=response.examCodingQuestionDTO
        console.log("line 83");
        
        console.log(this.codingQuestions);
        
        this.ExamRepo.getExamCodingQuestions().subscribe((questions=>{
          this.codingQuestions=questions.examCodingQuestionDTO
        }))
        console.log(response.examCodingQuestionDTO)
        console.log(this.currentQuestion, 'this.currentQuestion');
 
        this.examAttemptID = response.attemptId;
        this.sharedData.updateExamAttempt(this.examAttemptID as number);
        this.isLoading = false;
        this.listOfQuestion.push(response.question);
        this.exam.examSubjects[this.indexPositionOfTheExam].isTimeUp = false;
        this.updateExamTimeConfirmation();
        console.log(this.exam.examSubjects, 'this.exam.examSubjects');
 
        this.listOfQuestionEachSubject.push({
          subjectId: this.currentSubject?.subject.id ?? 0,
          subjectName: this.currentSubject?.subject.name ?? '',
          questions: this.listOfQuestion,
          reamingTime: this.getRemainingTime(),
          isVisited: true,
        });
        console.log(
          this.listOfQuestionEachSubject,
          'this.listOfQuestionEachSubject'
        );
      },
      (error) => {}
    );
    this.sharedData.updateExamAttempt(this.examAttemptID as number);
    this.sharedData.updateSubjects(this.exam.examSubjects);
    this.indexPositionOfSubject$.subscribe((response) => {
      if (response != null) {
        this.currentSubject = this.exam.examSubjects[response];
        this.indexPositionOfSubject = response;
        this.updateQuestions();
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
        console.log(response, 'response');
        let id = response.id;
        console.log(id, 'id');
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
    private sharedData: SharedDataService,
    private testResultService:TestCaseResultService
    
  ) {}
 

  getIndexOfCodingQuestion(){
    var object=this.exam.examSubjects.find((subj:any)=> subj.subject.name.toLowerCase() == this.codingSubjectName.toLowerCase())
    return object?.subject?.id
  }
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
    console.log(currentQuestionData, 'currentQuestionData');
 
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
 
  skipTheCurrentQuestionAndGetNewQuestion(currentQuestionData: any) {
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
    console.log(optionArray, 'optionArray');
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
        console.log(response, 'response');
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
    console.log(isSubjectAvailable, 'isSubjectAvailable');
    if (isSubjectAvailable) {
      let nextSubject = examSubjectsList.find((item) => item.isTimeUp == false);
      let indexPositionOfSubject = examSubjectsList.findIndex(
        (item) => item.id == nextSubject?.id
      );
      console.log(indexPositionOfSubject, 'indexPositionOfSubject');
      this.sharedData.updateSubjectIndex(indexPositionOfSubject);
 
      console.log(nextSubject, 'nextSubject');
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
      console.log(this.currentQuestion);
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
    console.log('i am in changeSubjectAndGetFirstQuestion');
 
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

  runCode() {
    const codeValue = this.codeEditorComponent.code;  
    const requestPayload = {
      codingQuestionId: this.currentCodingQuestionIndex+1,
      responseCodeSnippet: codeValue
    };
  
    this.testResultService.executeCode(requestPayload);
  }
  
  
  submitCode(){
    const codeValue = this.codeEditorComponent.code;
    console.log(codeValue);
  }

  previousCodingQuestion(){
    
    this.saveQuestion(this.codeEditorComponent.code,this.currentCodingQuestionIndex)
    this.setUsedWrittenCodetoEditor(this.currentCodingQuestionIndex-1)
    
    if (this.currentCodingQuestionIndex > 0) {
      this.currentCodingQuestionIndex--;
    }
    if(this.userCodingLogic.length==this.codingQuestions.length){
      this.alredyVisited=true
    }
    this.changeCodingLanguage(this.currentCodingQuestionIndex)
  }

  nextCodingQuestion(){
    console.log(this.codeEditorComponent.code)
      this.saveQuestion(this.codeEditorComponent.code,this.currentCodingQuestionIndex)
      
      if (this.currentCodingQuestionIndex < this.codingQuestions.length - 1) {
        this.currentCodingQuestionIndex++;
        if(this.userCodingLogic[this.currentCodingQuestionIndex]==null){
            // this.codeEditorComponent.ngAfterViewInit()
        }
        else{
          this.setUsedWrittenCodetoEditor(this.currentCodingQuestionIndex)
          this.changeCodingLanguage(this.currentCodingQuestionIndex+1)
        }

      }
     
    
    
  }
  saveQuestion(code: string,index:number) {
    if(this.userCodingLogic[index]!=null){
      this.userCodingLogic.splice(index,1)
    }
    this.codingLanguages.splice(index,0,this.codeEditorComponent.selectedLanguage)
    this.userCodingLogic.splice(index,0,code)
    console.log(this.userCodingLogic)
  }

  setUsedWrittenCodetoEditor(index:number){
   
    console.log(this.userCodingLogic)
    this.codeEditorComponent.aceEditor!.session.setValue(this.userCodingLogic[index])
    this.changeCodingLanguage(index)
    
  }
  changeCodingLanguage(index:number){
    var javaSubject="java";
    var pythonSubject="python"
    if(this.codingLanguages[index].toLowerCase() ==javaSubject.toLowerCase()){
      this.codeEditorComponent.aceEditor!.session.setMode('ace/mode/java');
      this.codeEditorComponent.selectedLanguage=javaSubject
    }
    else{
      this.codeEditorComponent.aceEditor!.session.setMode('ace/mode/python');
      this.codeEditorComponent.selectedLanguage=pythonSubject
    }
  }
}
 