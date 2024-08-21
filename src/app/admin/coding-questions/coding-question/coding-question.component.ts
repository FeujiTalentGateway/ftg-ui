import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataType } from 'src/app/models/coding.datatype.model';
import { CodingQuestion } from 'src/app/models/coding.question.model';
import { CodingQuestionRepositoryService } from 'src/app/repository/coding-question-repository.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { validIdentifierValidator } from 'src/app/validators/validIdentifierValidator';
@Component({
  selector: 'app-coding-question',
  templateUrl: './coding-question.component.html',
  styleUrls: ['./coding-question.component.css'],
})
export class CodingQuestionComponent implements OnInit {
  codingQuestionDetailsForm!: FormGroup;
  codingQuestionBasicDetailsForm!: FormGroup;
  codingQuestionMethodDetailsForm!: FormGroup;
  codingQuestionArgumentDetailsForm!: FormGroup;
  codingQuestionConstraintsDetailsForm!: FormGroup;
  codingQuestionTestCasesDetailsForm!: FormGroup;
  codingQuestionListOfInputArgumentsDetailsForm?: FormGroup;
  codingQuestionRawFormValues!: any;

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

    this.codingQuestionArgumentDetailsForm = this.createArgumentFormGroup();

    this.codingQuestionMethodDetailsForm = this._formBuilder.group({
      methodName: ['', [Validators.required, validIdentifierValidator()]],
      isCollectionType: [false],
      primitiveReturnType: this._formBuilder.group({
        id: ['', Validators.required],
      }),
      collectionReturnType: this._formBuilder.group({
        id: [''],
      }),
      methodArguments: this._formBuilder.array([]),
    });

    this.codingQuestionDetailsForm = this._formBuilder.group({
      content: ['', Validators.required],
      description: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      constraints: this.codingQuestionConstraintsDetailsForm.get(
        'constraints'
      ) as FormArray,
      methodDefinition: this.codingQuestionMethodDetailsForm,
      testCases: this.codingQuestionTestCasesDetailsForm.get(
        'testCases'
      ) as FormArray,
    });

    this.codingQuestionBasicDetailsForm = this._formBuilder.group({
      content: ['', Validators.required],
      description: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      constraints: this.codingQuestionConstraintsDetailsForm.get(
        'constraints'
      ) as FormArray,
    });

    this.stepControl = new FormControl();
  }

  get constraints(): FormArray {
    return this.codingQuestionBasicDetailsForm.get('constraints') as FormArray;
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

  createInputArgumentFormGroup(methodArgumentName: string) {
    return this._formBuilder.group({
      methodArgumentName: [
        { value: methodArgumentName, disabled: true },
        Validators.required,
      ], // Set methodArgumentName dynamically
      inputValue: ['', Validators.required],
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
      }
    });
    this.updateArgumentPositions();
  }

  createConstraintFormGroup(): FormGroup {
    return this._formBuilder.group({
      constraint: ['', Validators.required],
    });
  }

  createArgumentFormGroup(): FormGroup {
    return this._formBuilder.group({
      argumentName: ['', [Validators.required, validIdentifierValidator()]],
      argumentDataType: [''],
      argumentPosition: [{ value: '', disabled: true }],
      isCollection: [false],
      primitiveDataType: this._formBuilder.group({
        id: ['', Validators.required],
      }),
      collectionDataType: this._formBuilder.group({
        id: [''],
      }),
    });
  }

  createTestCaseFormGroup(): FormGroup {
    return this._formBuilder.group({
      isSample: [false],
      expectedResult: ['', Validators.required],
      explanationExample: ['', Validators.required],
      inputArguments: this._formBuilder.array([]),
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
    this.updateArgumentPositions();
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
    methodArgumentsArray.controls.forEach((control) => {
      const methodArgumentName = control.get('argumentName')?.value; // Get methodArgumentName from methodArgumentsArray
      inputArgumentsArray.push(
        this.createInputArgumentFormGroup(methodArgumentName)
      );
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
    this.codingQuestionMethodDetailsForm
      .get('collectionReturnType')
      ?.get('id')
      ?.clearValidators();
    if (dataType !== 'primitive') {
      control.get('primitiveReturnType')?.reset();
    } else {
      control.get('nonPrimitiveType')?.reset();
    }
    if (dataType === 'collection') {
      this.codingQuestionMethodDetailsForm.patchValue({
        isCollectionType: true,
      });
      this.codingQuestionMethodDetailsForm
        .get('collectionReturnType')
        ?.get('id')
        ?.setValidators(Validators.required);
    }
    this.selectedReturnType = dataType;
  }

  setDataType(dataType: string, i: number) {
    this.methodArguments.controls[i].patchValue({ argumentDataType: dataType });
    this.methodArguments.controls[i]
      ?.get('collectionDataType')
      ?.get('id')
      ?.clearValidators();
    const control = this.methodArguments.controls[i] as FormGroup;
    if (dataType !== 'primitive') {
      control.get('primitiveType')?.reset();
    } else {
      control.get('nonPrimitiveType')?.reset();
    }
    if (dataType === 'collection') {
      this.methodArguments.controls[i].patchValue({ isCollection: true });
      this.methodArguments.controls[i]
        ?.get('collectionDataType')
        ?.get('id')
        ?.setValidators(Validators.required);
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
    console.log(this.selectedStepIndex);
    let previousIndex = event.previouslySelectedIndex;
    if (previousIndex == 0 && this.selectedStepIndex == 1) {
      this.setCodingQuestionBasicDetailsToMainForm();
    }
    if (previousIndex == 1 && this.selectedStepIndex == 0) {
      this.setCodingQuestionBasicDetailsFromMainForm();
    }
    if (this.selectedStepIndex == 2) {
      this.onTestCasesStepEnter();
    }
    if (this.selectedStepIndex === 3) {
      console.log(this.selectedStepIndex);
      this.codingQuestionRawFormValues =
        this.codingQuestionDetailsForm.getRawValue();
      console.log(this.codingQuestionRawFormValues);
    }
  }

  checkIstrue(testCase: any, index: number): boolean {
    return testCase.value.isSample;
  }
  saveCodingQuestion() {
    const formData =
      this.codingQuestionDetailsForm.getRawValue() as CodingQuestion;
    this.codeRepo.saveCodingQuestion(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.snackbar.openSnackBarSuccessMessage(
          'Coding question saved successfully',
          'close'
        );
        this.router.navigate(['/admin/codingquestion/action']);
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

  setCodingQuestionBasicDetailsFromMainForm() {
    const detailsFormValues = this.codingQuestionDetailsForm.value;

    // Update codingQuestionBasicDetailsForm with these values
    this.codingQuestionBasicDetailsForm.patchValue({
      content: detailsFormValues.content,
      description: detailsFormValues.description,
      difficultyLevel: detailsFormValues.difficultyLevel,
      constraints: detailsFormValues.constraints,
    });
  }

  setCodingQuestionBasicDetailsToMainForm() {
    const basicFormValues = this.codingQuestionBasicDetailsForm.value;

    // Update codingQuestionDetailsForm with these values
    this.codingQuestionDetailsForm.patchValue({
      content: basicFormValues.content,
      description: basicFormValues.description,
      difficultyLevel: basicFormValues.difficultyLevel,
      constraints: basicFormValues.constraints,
    });
  }

  updateArgumentPositions() {
    this.methodArguments.controls.forEach((argument, index) => {
      argument.get('argumentPosition')?.setValue(index + 1);
    });
  }

  onTestCasesStepEnter() {
    const methodArguments = this.methodArguments.controls.map(
      (control) => control.get('argumentName')?.value
    );

    // Loop through each test case
    this.testCases.controls.forEach((testCase) => {
      const inputArgumentsArray = testCase.get('inputArguments') as FormArray;
      const existingInputArguments = inputArgumentsArray.controls.map(
        (control) => control.get('methodArgumentName')?.value
      );

      // Check if all method arguments are present in the inputArguments array
      methodArguments.forEach((argumentName) => {
        if (!existingInputArguments.includes(argumentName)) {
          // Add missing method argument to the inputArguments array of the test case
          inputArgumentsArray.push(
            this.createInputArgumentFormGroup(argumentName)
          );
        }
      });
    });
  }

  getCommonDataTypeById(id: number): string | undefined {
    if (id === null || id === undefined) {
      return 'Unknown'; // Fallback for null or undefined
    }
    const dataType = this.dataTypesFromJava?.find((dt) => dt.id == id);
    return dataType ? dataType.commonDataType : 'Empty';
  }
}
