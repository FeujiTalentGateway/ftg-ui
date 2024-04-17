import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormControl } from '@angular/forms';
import { CodingQuestion } from 'src/app/models/coding.question.model';
import { CodingQuestionRepositoryService } from 'src/app/repository/coding-question-repository.service';
import { DataType } from 'src/app/models/coding.datatype.model';
@Component({
  selector: 'app-coding-question',
  templateUrl: './coding-question.component.html',
  styleUrls: ['./coding-question.component.css'],
})
export class CodingQuestionComponent implements OnInit {


  codingQuestionDetailsForm!: FormGroup;
  codingQuestionMethodDetailsForm!: FormGroup;
  codingQuestionArgumentDetailsForm!: FormGroup;
  codingQuestionConstraintsDetailsForm!:FormGroup
  codingQuestionTestCasesDetailsForm!:FormGroup
  codingQuestionListOfInputArgumentsDetailsForm?:FormGroup

  selectedReturnType:string = "primitive";
  isEditCodingQuestion: boolean = false;
  questionId: number = 0;
  isOptional = false;
  stepControl: AbstractControl | undefined;


  dataTypes: string[] = ['primitive', 'collection'];
  dataType: string = 'primitive';
  numbers: number[] = [1, 2, 3, 4, 5];
  dataTypesFromJava!:DataType[]


  constructor(
    private activatedParam: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private codeRepo:CodingQuestionRepositoryService
  ) 
  {this.codeRepo.getDataTypes().subscribe({
    next:(data:any)=>{
      this.dataTypesFromJava=data;
      console.log(data);
      
    },
    error:(error:any)=>{
      console.log(error);
    }
  })}
  ngOnInit(): void {

    this.isEditCodingQuestion = this.activatedParam.snapshot.paramMap.get('id') !== null;
    if (this.isEditCodingQuestion) {
      this.questionId = this.activatedParam.snapshot.paramMap.get(
        'id'
      ) as unknown as number;
      console.log(this.questionId);
    }



    this.codingQuestionConstraintsDetailsForm = this._formBuilder.group({
      constraints: this._formBuilder.array([
        this.createConstraintFormGroup()
      ]),
    });



    this.codingQuestionTestCasesDetailsForm = this._formBuilder.group({
      testCases: this._formBuilder.array([
        this.createTestCaseFormGroup()
      ]),
    });

    this.codingQuestionListOfInputArgumentsDetailsForm = this._formBuilder.group({
      inputArguments: this._formBuilder.array([
        this.createInputArgumentFormGroup()
      ]),
    });


  
    this.codingQuestionArgumentDetailsForm = this.createArgumentFormGroup();



    this.codingQuestionMethodDetailsForm = this._formBuilder.group({
      methodName: [''],
      isReturnTypeCollection: [false],
      primitiveReturnType: this._formBuilder.group({
        id: ['']}),
      collectionReturnType: this._formBuilder.group({
        id: ['']}),
      methodArguments: this._formBuilder.array([]),

    });

    this.codingQuestionDetailsForm = this._formBuilder.group({
      content: [''],
      description: [''],
      difficultyLevel: [''],
      constraints: this.codingQuestionConstraintsDetailsForm.get('constraints')as FormArray,
      methodDefination: this.codingQuestionMethodDetailsForm,
      testCases:this.codingQuestionTestCasesDetailsForm.get('testCases') as FormArray
    });

    

    this.stepControl = new FormControl();
  }


  get constraints(): FormArray {
    return this.codingQuestionDetailsForm.get('constraints') as FormArray;
  }

  get testCases(): FormArray {
    return this.codingQuestionTestCasesDetailsForm.get('testCases') as FormArray;
  }


  get methodArguments(): FormArray {
    return this.codingQuestionMethodDetailsForm.get(
      'methodArguments'
    ) as FormArray;
  }
    createInputArgumentFormGroup(){
    return this._formBuilder.group({
      argumentPosition: [''],
      inputValue:['']
  })
}


  addConstraint() {
    const constraintsArray = this.codingQuestionConstraintsDetailsForm.get('constraints') as FormArray;
    constraintsArray.push(this.createConstraintFormGroup());
  }

  removeConstraint(index: number): void {
    const constraintsArray = this.codingQuestionConstraintsDetailsForm.get('constraints') as FormArray;
    constraintsArray.removeAt(index);
  }



  addArgumentDetails() {
    const argumentDetailsForm = this.createArgumentFormGroup();
    this.methodArguments.push(argumentDetailsForm);
  }

  

getFormControl(controlName: string): FormControl {
  return this.codingQuestionDetailsForm.get(controlName) as FormControl;
}


  addCodingQuestionDetaials() {
    console.log(this.codingQuestionMethodDetailsForm.value);
    console.log(this.codingQuestionDetailsForm.value as CodingQuestion);
    console.log(this.codingQuestionDetailsForm.value);    
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
        id: ['']}),
      collectionDataType: this._formBuilder.group({
        id: ['']}),
      inputValue: ['']
    });
  }

  createTestCaseFormGroup():FormGroup{
    return  this._formBuilder.group({
      expectedResult:[''],
      explanationExample:[''],
      inputArguments:this._formBuilder.array([
        this.createInputArgumentFormGroup()
      ])
    })
  }





  removeArgumentDetails(index: number) {
    this.methodArguments.removeAt(index);
  }
  
  
  get inputArguments(): FormArray {
    return this.codingQuestionDetailsForm.get('testCases')?.get('inputArguments') as FormArray;
  }
 
  addTestCases() {
    const testCaseDetailsForm = this.createTestCaseFormGroup();
  
    const methodArgumentsArray = this.codingQuestionMethodDetailsForm.get('methodArguments') as FormArray;
    const inputArgumentsArray = (testCaseDetailsForm.get('inputArguments') as FormArray);
  
    // Clear existing inputArguments if any
    while (inputArgumentsArray.length !== 0) {
      inputArgumentsArray.removeAt(0);
    }
    
    // Create inputArgument form groups based on methodArguments
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


  returnArgArray(testCase:any):FormArray{
    return testCase.get('inputArguments') as FormArray;
  }

  setReturnType(dataType: string) {
    // console.log(this.methodArguments.controls);
    
    const control = this.codingQuestionMethodDetailsForm
    if (dataType !== 'primitive') {
      control.get('primitiveReturnType')?.reset();
    } else {
      control.get('nonPrimitiveType')?.reset();
    }
    if (dataType === 'collection') {
      this.codingQuestionMethodDetailsForm.patchValue({ isReturnTypeCollection: true });
    }
    this.selectedReturnType=dataType
  }


  setDataType(dataType: string, i: number) {
    console.log(this.methodArguments.controls);
    
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

  setReturnDataType(dataType: string){

    const control = this.methodArguments.controls[1] as FormGroup;
    // if (dataType !== 'primitive') {
    //   control.get('primitiveType')?.reset();
    // } else {
    //   control.get('nonPrimitiveType')?.reset();
    // }
    // if (dataType === 'collection') {
    //   this.methodArguments.controls[1].patchValue({ isCollection: true });
    // }
     console.log(dataType);
     
    this.dataType = dataType;

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


  checkIsPrimitiveOrNot(index: number): boolean {
    console.log(this.methodArguments.controls[index].value);
    return this.methodArguments.controls[index].value.isCollection;
  }

  printDetails(testCase: any = ""){
    // console.log(this.codingQuestionDetailsForm.value);
    console.log(testCase);
    
    
  } 
  getArrayFromTestCase(tt:any):FormArray{
    return tt.controls.inputArguments as FormArray;
  }

}
