import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl } from '@angular/forms';
import { CodingQuestion } from 'src/app/models/coding.question.model';
import { CodingQuestionRepositoryService } from 'src/app/repository/coding-question-repository.service';
import { DataType } from 'src/app/models/coding.datatype.model';
import { TestCases } from 'src/app/models/coding.testcases.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';
@Component({
  selector: 'app-coding-question',
  templateUrl: './coding-question.component.html',
  styleUrls: ['./coding-question.component.css'],
})
export class CodingQuestionComponent implements OnInit {
  codingQuestionDetailsForm!: FormGroup;
  codingQuestionMethodDetailsForm!: FormGroup;
  codingQuestionArgumentDetailsForm!: FormGroup;
  codingQuestionConstraintsDetailsForm!: FormGroup;
  codingQuestionTestCasesDetailsForm!: FormGroup;
  codingQuestionListOfInputArgumentsDetailsForm?: FormGroup;

  selectedStepIndex: number = 0;
  selectedReturnType: string = 'primitive';
  isEditCodingQuestion: boolean = false;
  questionId: number = 0;
  showPrimitiveSection = true;
  stepControl: AbstractControl | undefined;

  dataTypes: string[] = ['primitive', 'collection'];
  dataType: string = 'primitive';
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  dataTypesFromJava!: DataType[];
  isSample!: boolean;

  constructor(
    private activatedParam: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private codeRepo: CodingQuestionRepositoryService,
    private snackbar: SnackBarService,
    private router: Router
  ) {
    this.codeRepo.getDataTypes().subscribe({
      next: (data: any) => {
        this.dataTypesFromJava = data;
      },
      error: (error: any) => {},
    });
  }
  ngOnInit(): void {
    this.isEditCodingQuestion =
      this.activatedParam.snapshot.paramMap.get('id') !== null;
    if (this.isEditCodingQuestion) {
      this.questionId = this.activatedParam.snapshot.paramMap.get(
        'id'
      ) as unknown as number;
    }

    this.codingQuestionConstraintsDetailsForm = this._formBuilder.group({
      constraints: this._formBuilder.array([this.createConstraintFormGroup()]),
    });

    this.codingQuestionTestCasesDetailsForm = this._formBuilder.group({
      testCases: this._formBuilder.array([]),
    });

    this.codingQuestionListOfInputArgumentsDetailsForm =
      this._formBuilder.group({
        inputArguments: this._formBuilder.array([
          this.createInputArgumentFormGroup(),
        ]),
      });

    this.codingQuestionArgumentDetailsForm = this.createArgumentFormGroup();

    this.codingQuestionMethodDetailsForm = this._formBuilder.group({
      methodName: [''],
      isCollectionType: [false],
      primitiveReturnType: this._formBuilder.group({
        id: [''],
      }),
      collectionReturnType: this._formBuilder.group({
        id: [''],
      }),
      methodArguments: this._formBuilder.array([]),
    });

    this.codingQuestionDetailsForm = this._formBuilder.group({
      content: [''],
      description: [''],
      difficultyLevel: [0],
      constraints: this.codingQuestionConstraintsDetailsForm.get(
        'constraints'
      ) as FormArray,
      methodDefinition: this.codingQuestionMethodDetailsForm,
      testCases: this.codingQuestionTestCasesDetailsForm.get(
        'testCases'
      ) as FormArray,
    });

    this.stepControl = new FormControl();
  }

  get constraints(): FormArray {
    return this.codingQuestionDetailsForm.get('constraints') as FormArray;
  }

  get testCases(): FormArray {
    return this.codingQuestionTestCasesDetailsForm.get(
      'testCases'
    ) as FormArray;
  }

  get methodArguments(): FormArray {
    return this.codingQuestionMethodDetailsForm.get(
      'methodArguments'
    ) as FormArray;
  }

  createInputArgumentFormGroup() {
    return this._formBuilder.group({
      methodArgumentName: [''],
      inputValue: [''],
    });
  }
  printDetails() {
    console.log(this.codingQuestionDetailsForm.value);
  }
  addConstraint() {
    const constraintsArray = this.codingQuestionConstraintsDetailsForm.get(
      'constraints'
    ) as FormArray;
    constraintsArray.push(this.createConstraintFormGroup());
  }

  removeConstraint(index: number): void {
    const constraintsArray = this.codingQuestionConstraintsDetailsForm.get(
      'constraints'
    ) as FormArray;
    constraintsArray.removeAt(index);
  }

  addArgumentDetails() {
    const argumentDetailsForm = this.createArgumentFormGroup();
    this.methodArguments.push(argumentDetailsForm);
    (
      this.codingQuestionDetailsForm.get('testCases') as FormArray
    ).controls.forEach((testCaseControl: AbstractControl, index: number) => {
      if (testCaseControl instanceof FormGroup) {
        const testCaseFormGroup = testCaseControl as FormGroup;
        let inputArgumentsFormArray = testCaseFormGroup.get(
          'inputArguments'
        ) as FormArray;
        inputArgumentsFormArray.push(this.createInputArgumentFormGroup());
      }
    });
  }

  getFormControl(controlName: string): FormControl {
    return this.codingQuestionDetailsForm.get(controlName) as FormControl;
  }

  createConstraintFormGroup(): FormGroup {
    return this._formBuilder.group({
      constraint: [''],
    });
  }

  createArgumentFormGroup(): FormGroup {
    return this._formBuilder.group({
      argumentName: [''],
      argumentDataType: ['primitive'],
      argumentPosition: [''],
      isCollection: [false],
      primitiveDataType: this._formBuilder.group({
        id: [''],
      }),
      collectionDataType: this._formBuilder.group({
        id: [''],
      }),
    });
  }

  createTestCaseFormGroup(): FormGroup {
    return this._formBuilder.group({
      isSample: [false],
      expectedResult: [''],
      explanationExample: [''],
      inputArguments: this._formBuilder.array([
        this.createInputArgumentFormGroup(),
      ]),
    });
  }

  updateIsSample(value: boolean, index: number): void {
    this.isSample = value;

    const testCasesArray = this.codingQuestionTestCasesDetailsForm.get(
      'testCases'
    ) as FormArray;
    const testCaseFormGroup = testCasesArray.at(index) as FormGroup;
    testCaseFormGroup.patchValue({ isSample: value });
  }

  removeArgumentDetails(index: number) {
    (
      this.codingQuestionDetailsForm.get('testCases') as FormArray
    ).controls.forEach((testCaseControl: AbstractControl, index1: number) => {
      if (testCaseControl instanceof FormGroup) {
        const testCaseFormGroup = testCaseControl as FormGroup;
        let inputArgumentsFormArray = testCaseFormGroup.get(
          'inputArguments'
        ) as FormArray;
        inputArgumentsFormArray.removeAt(index);
      }
    });
    this.methodArguments.removeAt(index);
  }

  get inputArguments(): FormArray {
    return this.codingQuestionDetailsForm
      .get('testCases')
      ?.get('inputArguments') as FormArray;
  }
  addTestCases() {
    const testCaseDetailsForm = this.createTestCaseFormGroup();

    const methodArgumentsArray = this.codingQuestionMethodDetailsForm.get(
      'methodArguments'
    ) as FormArray;
    const inputArgumentsArray = testCaseDetailsForm.get(
      'inputArguments'
    ) as FormArray;

    while (inputArgumentsArray.length !== 0) {
      inputArgumentsArray.removeAt(0);
    }
    methodArgumentsArray.controls.forEach(() => {
      inputArgumentsArray.push(this.createInputArgumentFormGroup());
    });
    this.testCases.push(testCaseDetailsForm);
  }

  removeTestCaseDetails(index: number) {
    this.testCases.removeAt(index);
  }
  getDataTypeOfForm(index: number, currentDataType: string): boolean {
    return (
      this.methodArguments.controls[index].value.argumentDataType ==
      currentDataType
    );
  }

  returnArgArray(testCase: any): FormArray {
    return testCase.get('inputArguments') as FormArray;
  }

  setReturnType(dataType: string) {
    const control = this.codingQuestionMethodDetailsForm;
    if (dataType !== 'primitive') {
      control.get('primitiveReturnType')?.reset();
    } else {
      control.get('nonPrimitiveType')?.reset();
    }
    if (dataType === 'collection') {
      this.codingQuestionMethodDetailsForm.patchValue({
        isCollectionType: true,
      });
    }
    this.selectedReturnType = dataType;
  }

  setDataType(dataType: string, i: number) {
    this.methodArguments.controls[i].patchValue({ argumentDataType: dataType });
    const control = this.methodArguments.controls[i] as FormGroup;
    if (dataType !== 'primitive') {
      control.get('primitiveType')?.reset();
    } else {
      control.get('nonPrimitiveType')?.reset();
    }
    if (dataType === 'collection') {
      this.methodArguments.controls[i].patchValue({ isCollection: true });
    }
  }

  setType(i: number, isCollection: boolean) {
    this.methodArguments.controls[i].patchValue({ isCollection: isCollection });
    const control = this.methodArguments.controls[i] as FormGroup;
    if (!isCollection) {
      control.get('primitiveType')?.reset();
    } else {
      control.get('nonPrimitiveType')?.reset();
    }
  }
  stepChanged(event: any) {
    this.selectedStepIndex = event.selectedIndex;
  }

  checkIstrue(testCase: any, index: number): boolean {
    return testCase.value.isSample;
  }
  saveCodingQuestion() {
    const formData = this.codingQuestionDetailsForm.value as CodingQuestion;
    formData;
    this.codeRepo.saveCodingQuestion(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.snackbar.openSnackBarSuccessMessage(
          'Coding question saved successfully',
          'close'
        );
        this.router.navigate(['/admin/questionPapers/codingQuestion']);
      },
      error: (error: any) => {
        console.log(error);
        this.snackbar.openSnackBarForError(
          'Error while saving coding question',
          'close'
        );
      },
    });
  }
}
