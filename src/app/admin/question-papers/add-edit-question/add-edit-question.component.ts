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
    difficultyLevel: '',
    subject: { id: 0, name: '', active: true },
    rightOption: { id: 0, optionName: '', active: true },
    options: [],
  };
  difficultLevelList: string[] = ['EASY', 'MEDIUM', 'HARD'];
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
      rightOptionName: new FormControl(null, Validators.required),
      subject: new FormControl(null, Validators.required),
      difficultyLevel: new FormControl('EASY', Validators.required),
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
      rightOptionName: question.rightOption.optionName,
      subject: question.subject.id,
      difficultyLevel: question.difficultyLevel,
    });
  }

  get OptionsArray() {
    return this.questionForm.get('optionNames') as FormArray;
  }

  onSubmit() {
    console.log(this.questionForm);
    console.log(this.questionForm.value.content);
    this.isFormSubmitted = true;
    if (this.questionForm.valid) {
      this.question.content = this.questionForm.value.content;
      this.question.options = this.questionForm.value.optionNames.map(
        (optionName: string) => ({ optionName, id: 0, active: true })
      );

      this.question.rightOption = {
        optionName: this.questionForm.value.rightOptionName,
        id: 0,
        active: true,
      };

      this.question.subject.id = this.questionForm.value.subject;
      this.question.difficultyLevel = this.questionForm.value.difficultyLevel;
      this.question.subject.name = '';
      if (this.isEditForm) {
        console.log(this.question.options);
        console.log(this.question);
        this.editQuestion(this.question);
        this.initialiseQuestionForm();
      } else {
        console.log(this.question);
        this.service.addQuestion(this.question);
        this.initialiseQuestionForm();
        this.markFormControlsAsUntouched();
      }
    }
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
}
