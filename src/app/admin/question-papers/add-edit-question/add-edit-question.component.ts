import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Option } from 'src/app/models/option';
import { Question } from 'src/app/models/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-edit-question',
  templateUrl: './add-edit-question.component.html',
  styleUrls: ['./add-edit-question.component.css'],
})
export class AddEditQuestionComponent implements OnInit {
  question: Question = {
    id: 0,
    content: '',
    active: true,
    difficultyLevel: 0,
    questionType: 'single choice',
    subject: { id: 0, name: '', active: true },
    rightOptions: [],
    options: [],
    optionSelected: [],
    isCodeSnippet: false,
    codeSnippet: '',
  };

  difficultLevelList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  questionTypes: string[] = ['single choice', 'multiple choices'];
  questionType: string = 'single choice';
  isEditForm: boolean = false;
  isFormSubmitted: boolean = false;
  selectedSubject!: number;
  questionForm!: FormGroup;
  isEditModalOpen: boolean = false;
  editingQuestion!: string;
  editableQuestionId!: number;
  operation: string = 'Add Question';
  selectedSubjectName: string = '';

  constructor(
    private service: QuestionsService,
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.formSubmitSucceed$.subscribe({
      next: (result) => {
        this.resetForm();
      },
    });
    this.isEditForm = this.activatedRoute.snapshot.paramMap.get('id') !== null;
    const subjectQueryParam =
      this.activatedRoute.snapshot.queryParamMap.get('subject');
    this.selectedSubject = subjectQueryParam !== null ? +subjectQueryParam : 0; // Use a default value (e.g., 0) if subjectQueryParam is null
    this.initialiseQuestionForm();
    if (this.isEditForm) {
      this.operation = 'Edit Question';
      let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.service.getQuestionById(id).subscribe({
        next: (value) => {
          this.question = value;
          this.setQuestionValueIntoQuestionForm(this.question);
          this.selectedSubject = value.subject.id;
          this.selectedSubjectName = this.question.subject.name as string;
        },
      });
    }
  }

  //get subjects
  get subjects() {
    return this.subjectService.getSubjects();
  }

  //question form

  initialiseQuestionForm() {
    this.questionForm = new FormGroup({
      content: new FormControl(null, Validators.required),
      optionNames: new FormArray([
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required),
      ]),
      // rightOptionName: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      difficultyLevel: new FormControl(0, Validators.required),
    });
  }

  //set value to update question
  setQuestionValueIntoQuestionForm(question: any = {}) {
    if (question.options.length !== 2) {
      for (let i = 2; i < question.options.length; i++) {
        this.addAdditionalOption();
      }
    }
    this.questionForm.patchValue({
      content: question.content,
      optionNames: question.options.map((option: Option) => option.optionName),
      subject: question.subject.id,
      difficultyLevel: question.difficultyLevel,
    });
    this.questionType = question.questionType;
  }

  get OptionsArray() {
    return this.questionForm.get('optionNames') as FormArray;
  }

  onSubmit() {
    this.isFormSubmitted = false;
    if (this.questionForm.valid && this.question.rightOptions?.length != 0) {
      this.question.content = this.questionForm.value.content;
      this.question.options = this.questionForm.value.optionNames.map(
        (optionName: string) => ({ optionName, id: 0, active: true })
      );

      // this.question.rightOption = {
      //   optionName: this.questionForm.value.rightOptionName,
      //   id: 0,
      //   active: true,
      // };
      // this.question.rightOption  =

      this.question.subject.id = this.questionForm.value.subject;

      this.question.difficultyLevel = parseInt(
        this.questionForm.value.difficultyLevel
      );
      this.question.subject.name = '';
      if (this.isEditForm) {
        this.editQuestion(this.question);
      } else {
        this.service.addQuestion(this.question);
      }
    } else {
      alert();
    }
  }

  resetForm() {
    this.initialiseQuestionForm();
    this.markFormControlsAsUntouched();
  }
  markFormControlsAsUntouched() {
    Object.values(this.questionForm.controls).forEach((control) => {
      control.markAsUntouched();
    });
  }
  addAdditionalOption() {
    this.OptionsArray.push(new FormControl(null, Validators.required));
  }
  removeOption(id: number) {
    this.OptionsArray.removeAt(id);
  }
  editQuestion(quesion: Question) {
    this.editableQuestionId = quesion.id;
    this.openEditModal();
    this.editingQuestion = 'Are you sure you want to edit this question';
  }
  editQuestionAfterConfirmation() {
    this.service.editQuestion(this.question);
    this.closeEditModal();
  }
  openEditModal() {
    this.isEditModalOpen = true;
  }
  closeEditModal() {
    this.isEditModalOpen = false;
  }

  setQuestionType(questionType: string) {
    this.questionType = questionType;
    this.question.questionType = this.questionType;
    this.question.rightOptions = [];
  }
  setRightOption(setRightOption: any) {
    let option: Option = { optionName: setRightOption.value, active: true };
    const index = this.question.rightOptions?.findIndex(
      (opt) => opt.optionName === setRightOption.value
    );

    if (index != -1 && typeof index === 'number') {
      this.question.rightOptions?.splice(index, 1);
    } else {
      if (this.questionType == 'single choice') {
        this.question.rightOptions = [];
        this.question.rightOptions?.push(option);
      } else {
        this.question.rightOptions?.push(option);
      }
    }
  }
  getRightOrnot(option: any): Boolean {
    const index = this.question.rightOptions?.findIndex(
      (opt) => opt.optionName === option.value
    );
    if (index != -1) {
      return true;
    }
    return false;
  }
  setQuestionIsSnippetOrNot(isSnippet: boolean) {
    this.question.isCodeSnippet = isSnippet;
  }
  setSubject(subject: any) {
    this.selectedSubjectName = (
      this.subjects.find((item) => item.id == subject.target.value)
        ?.name as string
    ).toLowerCase();
  }
  onCodeChanged(code: any) {
    this.question.codeSnippet = code;
  }
}
