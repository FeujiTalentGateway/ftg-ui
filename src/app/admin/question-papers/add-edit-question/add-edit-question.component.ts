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
  };

  difficultLevelList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  questionTypes: string[] = ['single choice', 'multiple choices '];
  questionType: string = 'single choice';
  isEditForm: boolean = false;
  isFormSubmitted: boolean = false;
  selectedSubject!: number;
  questionForm!: FormGroup;
  isEditModalOpen: boolean = false;
  editingQuestion!: string;
  editableQuestionId!: number;
  operation: string = 'Add Question';
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
          console.log(value);

          this.question = value;
          this.setQuestionValueIntoQuestionForm(this.question);
          this.selectedSubject = value.subject.id;
        },
      });
    }
    console.log(this.isEditForm);
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
    console.log(question);
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
    console.log(this.questionForm.value);
    console.log(this.questionForm.value.content);
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
      console.log(typeof parseInt(this.questionForm.value.difficultyLevel));

      this.question.difficultyLevel = parseInt(
        this.questionForm.value.difficultyLevel
      );
      this.question.subject.name = '';
      if (this.isEditForm) {
        console.log(this.question.options);
        console.log(this.question);
        this.editQuestion(this.question);
      } else {
        console.log(this.question);
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
      console.log(control);
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
    console.log(this.question);
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
    console.log(questionType, this.questionType);
    this.questionType = questionType;
    this.question.questionType = this.questionType;
    this.question.rightOptions = [];
  }
  setRightOption(setRightOption: any) {
    console.log(setRightOption.value);
    let option: Option = { optionName: setRightOption.value, active: true };
    console.log(option);
    console.log(this.question.rightOptions);
    const index = this.question.rightOptions?.findIndex(
      (opt) => opt.optionName === setRightOption.value
    );
    console.log(index);

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
    console.log(this.question.rightOptions);
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
}
