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
    private router : Router
  ) {
    this.codeRepo.getDataTypes().subscribe({
      next: (data: any) => {
        this.dataTypesFromJava = data;
        
      },
      error: (error: any) => {
      },
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

  /**
   * Creates a form group for an input argument.
   *
   * @returns {FormGroup} The form group for the input argument.
   */
  createInputArgumentFormGroup() {
    return this._formBuilder.group({
      methodArgumentName: [''],
      inputValue: [''],
    });
  }
  /**
   * Adds a new constraint to the coding question.
   *
   * This method adds a new constraint to the coding question by pushing a new form group
   * to the 'constraints' form array in the 'codingQuestionConstraintsDetailsForm'.
   * The new form group is created using the 'createConstraintFormGroup' method.
   *
   * @returns {void}
   */
  addConstraint() {
    const constraintsArray = this.codingQuestionConstraintsDetailsForm.get(
      'constraints'
    ) as FormArray;
    constraintsArray.push(this.createConstraintFormGroup());
  }
  /**
   * Removes a constraint from the coding question.
   *
   * This method removes a constraint from the coding question by removing the form group
   * at the specified index from the 'constraints' form array in the 'codingQuestionConstraintsDetailsForm'.
   *
   * @param {number} index - The index of the constraint to be removed.
   * @returns {void}
   */
  removeConstraint(index: number): void {
    const constraintsArray = this.codingQuestionConstraintsDetailsForm.get(
      'constraints'
    ) as FormArray;
    constraintsArray.removeAt(index);
  }
  /**
   * Adds a new argument to the coding question.
   *
   * This method adds a new argument to the coding question by pushing a new form group
   * to the 'methodArguments' form array in the 'codingQuestionMethodDetailsForm'.
   * The new form group is created using the 'createArgumentFormGroup' method.
   *
   * It also adds a new input argument to each test case by pushing a new form group
   * to the 'inputArguments' form array in each test case form group.
   * The new form group is created using the 'createInputArgumentFormGroup' method.
   *
   * @returns {void}
   */
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
  /**
   * Retrieves the form control with the specified control name from the codingQuestionDetailsForm.
   *
   * @param {string} controlName - The name of the form control to retrieve.
   * @returns {FormControl} The form control with the specified control name.
   */
  getFormControl(controlName: string): FormControl {
    return this.codingQuestionDetailsForm.get(controlName) as FormControl;
  }

  /**
   * Creates a form group for a constraint.
   *
   * This method creates a form group for a constraint by using the '_formBuilder.group' method.
   * The form group contains a single form control named 'constraint' with an initial value of an empty string.
   *
   * @returns {FormGroup} The form group for the constraint.
   */
  createConstraintFormGroup(): FormGroup {
    return this._formBuilder.group({
      constraint: [''],
    });
  }
  /**
   * Creates a form group for an argument.
   *
   * This method creates a form group for an argument by using the '_formBuilder.group' method.
   * The form group contains form controls for the argument name, data type, position,
   * whether it is a collection, primitive data type, collection data type, and input value.
   * The initial values for the form controls are as follows:
   * - argumentName: ''
   * - argumentDataType: 'primitive'
   * - argumentPosition: ''
   * - isCollection: false
   * - primitiveDataType: { id: '' }
   * - collectionDataType: { id: '' }
   *
   * @returns {FormGroup} The form group for the argument.
   */
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
  /**
   * Creates a form group for a test case.
   *
   * @returns {FormGroup} The form group for the test case.
   */
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
  /**
   * Updates the value of the isSample property for a specific test case.
   *
   * @param value - The new value for the isSample property.
   * @param index - The index of the test case in the testCases array.
   * @returns void
   */
  updateIsSample(value: boolean, index: number): void {
    this.isSample = value;

    const testCasesArray = this.codingQuestionTestCasesDetailsForm.get(
      'testCases'
    ) as FormArray;
    const testCaseFormGroup = testCasesArray.at(index) as FormGroup;
    testCaseFormGroup.patchValue({ isSample: value });
  }
  /**
   * Removes an argument detail from the coding question.
   *
   * @param index - The index of the argument detail to be removed.
   * @returns void
   */
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
  /**
   * Adds a new test case to the coding question.
   *
   * This method creates a new test case form group using the 'createTestCaseFormGroup' method.
   * It then retrieves the method arguments form array from the codingQuestionMethodDetailsForm and the input arguments form array from the newly created test case form group.
   * It clears the input arguments form array by removing all existing elements.
   * It then iterates over the method arguments form array and adds a new input argument form group to the input arguments form array for each method argument.
   * Finally, it pushes the newly created test case form group to the testCases form array.
   */
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
  /**
   * Removes a test case from the list of test cases.
   *
   * @param index - The index of the test case to be removed.
   */
  removeTestCaseDetails(index: number) {
    this.testCases.removeAt(index);
  }
  /**
   * Returns a boolean value indicating whether the argument data type at the specified index matches the current data type.
   *
   * @param index - The index of the argument in the method arguments array.
   * @param currentDataType - The current data type to compare against.
   * @returns A boolean value indicating whether the argument data type matches the current data type.
   */
  getDataTypeOfForm(index: number, currentDataType: string): boolean {
    return (
      this.methodArguments.controls[index].value.argumentDataType ==
      currentDataType
    );
  }
  /**
   * Returns the input arguments of a test case as a FormArray.
   *
   * @param testCase - The test case from which to retrieve the input arguments.
   * @returns The input arguments of the test case as a FormArray.
   */
  returnArgArray(testCase: any): FormArray {
    return testCase.get('inputArguments') as FormArray;
  }
  /**
   * Sets the return type of the coding question method.
   *
   * @param dataType - The data type of the return value. Can be 'primitive' or 'collection'.
   * @returns void
   */
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
  /**
   * Sets the data type for a method argument.
   *
   * @param dataType - The data type to set for the argument.
   * @param i - The index of the argument in the method arguments array.
   * @returns void
   */
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
  /**
   * Sets the type of the argument at the specified index.
   *
   * @param i - The index of the argument.
   * @param isCollection - A boolean indicating whether the argument is a collection type.
   *
   * @returns void
   */
  setType(i: number, isCollection: boolean) {
    this.methodArguments.controls[i].patchValue({ isCollection: isCollection });
    const control = this.methodArguments.controls[i] as FormGroup;
    if (!isCollection) {
      control.get('primitiveType')?.reset();
    } else {
      control.get('nonPrimitiveType')?.reset();
    }
  }

  /**
   * Prints the details of the coding question form.
   *
   * This method logs the value of the codingQuestionDetailsForm to the console.
   *
   * @returns void
   */
  printDetails() {
  }
  /**
   * Handles the event when the step is changed in the coding question component.
   *
   * @param event - The event object containing the selected index of the step.
   * @returns void
   */
  stepChanged(event: any) {
    this.selectedStepIndex = event.selectedIndex;
  }
  /**
   * Checks if the given testCase is true or not.
   *
   * @param testCase - The testCase to be checked.
   * @param index - The index of the testCase.
   * @returns True if the testCase is true, false otherwise.
   */
  checkIstrue(testCase: any, index: number): boolean {
    return testCase.value.isSample;
  }
  saveCodingQuestion() {

    const formData = this.codingQuestionDetailsForm.value as CodingQuestion;
    (formData);
    this.codeRepo.saveCodingQuestion(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.snackbar.openSnackBarSuccessMessage('Coding question saved successfully', 'close')
        this.router.navigate(['/admin/questionPapers/codingQuestion'])

      },
      error: (error: any) => {
        console.log(error);
        this.snackbar.openSnackBarForError('Error while saving coding question', 'close')
      },
    });
  }
}
