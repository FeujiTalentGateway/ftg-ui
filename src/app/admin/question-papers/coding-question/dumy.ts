// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { AbstractControl, FormControl } from '@angular/forms';
// import { CodingQuestion } from 'src/app/models/coding.question.model';
// import { Method } from 'src/app/models/coding.method.model';
// import { Argument } from 'src/app/models/coding.argument.model';
// import { Constraint } from 'src/app/models/coding.constraint.model';
// @Component({
//   selector: 'app-coding-question',
//   templateUrl: './coding-question.component.html',
//   styleUrls: ['./coding-question.component.css'],
// })
// export class CodingQuestionComponent implements OnInit {


//   codingQuestionDetailsForm!: FormGroup;
//   codingQuestionMethodDetailsForm!: FormGroup;
//   codingQuestionTestCaseDetailsForm!: FormGroup;
//   codingQuestionArgumentDetailsForm!: FormGroup;
//   codingQuestionInputArgumentDetailsForm!: FormGroup;
//   codingQuestionConstraintsDetailsForm!:FormGroup

//   isEditCodingQuestion: boolean = false;
//   questionId: number = 0;
//   isOptional = false;
//   stepControl: AbstractControl | undefined;


//   dataTypes: string[] = ['primitive', 'collection'];
//   dataType: string = 'primitive';
//   primitiveTypes: string[] = ['int', 'boolean', 'string'];
//   nonPrimitiveTypes: string[] = ['list', 'set', 'hashmap'];
//   numbers: number[] = [1, 2, 3, 4, 5];


//   constructor(
//     private activatedParam: ActivatedRoute,
//     private _formBuilder: FormBuilder
//   ) {
// }
//   ngOnInit(): void {
//     this.isEditCodingQuestion = this.activatedParam.snapshot.paramMap.get('id') !== null;
//     if (this.isEditCodingQuestion) {
//       this.questionId = this.activatedParam.snapshot.paramMap.get(
//         'id'
//       ) as unknown as number;
//       console.log(this.questionId);
//     }

//     this.codingQuestionConstraintsDetailsForm = this._formBuilder.group({
//       constraints: this._formBuilder.array([
//         this.createConstraintFormGroup()
//       ]),
//     });


//     this.codingQuestionInputArgumentDetailsForm = this._formBuilder.group({
//       inputArguments: this._formBuilder.array([
//         this.createInputArgumentsFormGroup()
//       ]),
//     });
//     this.codingQuestionArgumentDetailsForm = this.createArgumentFormGroup();

//     this.codingQuestionMethodDetailsForm = this._formBuilder.group({
//       methodName: [''],
//       returnType: [''],
//       listOfArguments: this._formBuilder.array([]),
//     });


    
//     this.codingQuestionTestCaseDetailsForm = this._formBuilder.group({
//       listOfTestCases: this._formBuilder.array([
//         this.createTestCaseFormGroup()
//       ]),
//     });


    


//     this.codingQuestionDetailsForm = this._formBuilder.group({
//       content: [''],
//       description: [''],
//       difficultyLevel: [''],
//       constraints: this.codingQuestionConstraintsDetailsForm.get('constraints')as FormArray,
//       method: this.codingQuestionMethodDetailsForm,
//       listOfTestCases: this.codingQuestionTestCaseDetailsForm.get(
//         'listOfTestCases'
//       ) as FormArray,
//     });

    

//     this.stepControl = new FormControl();
//   }


//   get constraints(): FormArray {
//     return this.codingQuestionDetailsForm.get('constraints') as FormArray;
//   }


//   get listOfArguments(): FormArray {
//     return this.codingQuestionMethodDetailsForm.get(
//       'listOfArguments'
//     ) as FormArray;
//   }


//   get listOfTestCases(): FormArray {
//     return this.codingQuestionDetailsForm.get('listOfTestCases') as FormArray;
//   }


//   get inputArguments(): FormArray {
//     console.log(this.codingQuestionInputArgumentDetailsForm.get('inputArguments'));
    
//     return this.codingQuestionInputArgumentDetailsForm.get('inputArguments') as FormArray;
//   }

//   addConstraint() {
//     const constraintsArray = this.codingQuestionConstraintsDetailsForm.get('constraints') as FormArray;
//     constraintsArray.push(this.createConstraintFormGroup());
//   }

//   removeConstraint(index: number): void {
//     const constraintsArray = this.codingQuestionConstraintsDetailsForm.get('constraints') as FormArray;
//     constraintsArray.removeAt(index);
//   }



//   addArgumentDetails() {
//     const argumentDetailsForm = this.createArgumentFormGroup();
//     this.listOfArguments.push(argumentDetailsForm);
//   }


//   addArgument(): void {
//     const argumentArray = this.codingQuestionMethodDetailsForm.get(
//       'listOfArguments'
//     ) as FormArray;
//     argumentArray.push(this.createArgumentFormGroup());
//   }

  
//   addTestCases() {
//     const testCaseDetailsForm = this.createTestCaseFormGroup();
//     const inputArgumentsArray = (testCaseDetailsForm.get('inputArguments') as FormArray);
//     if (inputArgumentsArray) {
//       inputArgumentsArray.push(this.createInputArgumentsFormGroup());
//     }
//     this.listOfTestCases.push(testCaseDetailsForm);
//   }

//  // Add this method to handle the casting of abstract control
// get inputArgumentsControls(): AbstractControl[] {
//   const testCaseForm = this.codingQuestionTestCaseDetailsForm.get('listOfTestCases') as FormArray;
//   return (testCaseForm.controls || []) as AbstractControl[];
// }
// onInputArgumentPositionChange(inputArg: AbstractControl) {
//   inputArg.valueChanges.subscribe((newValue) => {
//     console.log('New value for argument position:', newValue);
//     // Perform any actions based on the new value here
//   });
// }
// // Add this method to safely access form controls
// getFormControl(controlName: string): FormControl {
//   return this.codingQuestionDetailsForm.get(controlName) as FormControl;
// }
//   addCodingQuestionDetaials() {
//     console.log(this.codingQuestionMethodDetailsForm.value);
//     console.log(this.codingQuestionDetailsForm.value as CodingQuestion);
//     console.log(this.codingQuestionDetailsForm.value);    
//   }

//   createConstraintFormGroup(): FormGroup {
//     return this._formBuilder.group({
//       constraint: [''],
//     });
//   }


//   createArgumentFormGroup(): FormGroup {
//     return this._formBuilder.group({
//       argumentName: [''],
//       argumentDataType: ['primitive'],
//       argumentPosition: [''],
//       isCollection: [false],
//       newArgDataType: [''],
//       collectionDataType: [''],
//       inputValue: [''],
//     });
//   }


//   createTestCaseFormGroup(): FormGroup {
//     return this._formBuilder.group({
//       expectedResult: [''],
//       exampleExplaination: [''],
//       isSample: [true],
//       inputArguments: this._formBuilder.array([this.createInputArgumentsFormGroup()])
//     });
//   }


//   createInputArgumentsFormGroup(): FormGroup {
//     return this._formBuilder.group({
//       inputValue: [''],
//       argumentPosition: [''],
//     });
//   }


//   removeArgumentDetails(index: number) {
//     this.listOfArguments.removeAt(index);
//   }
  
  
//   removeTestCaseDetails(index: number) {
//     this.listOfTestCases.removeAt(index);
//   }
 



//   getDataTypeOfForm(index: number, currentDataType: string): boolean {
//     return (
//       this.listOfArguments.controls[index].value.argumentDataType ==
//       currentDataType
//     );
//   }

//   setDataType(dataType: string, i: number) {
//     this.listOfArguments.controls[i].patchValue({ argumentDataType: dataType });
//     const control = this.listOfArguments.controls[i] as FormGroup;
//     if (dataType !== 'primitive') {
//       control.get('primitiveType')?.reset();
//     } else {
//       control.get('nonPrimitiveType')?.reset();
//     }
//     if (dataType === 'collection') {
//       this.listOfArguments.controls[i].patchValue({ isCollection: true });
//     }
//   }


//   setType(i: number, isCollection: boolean) {
//     this.listOfArguments.controls[i].patchValue({ isCollection: isCollection });
//     const control = this.listOfArguments.controls[i] as FormGroup;
//     if (!isCollection) {
//       control.get('primitiveType')?.reset();
//     } else {
//       control.get('nonPrimitiveType')?.reset();
//     }
//   }


//   checkIsPrimitiveOrNot(index: number): boolean {
//     console.log(this.listOfArguments.controls[index].value);
//     return this.listOfArguments.controls[index].value.isCollection;
//   }
//   printDetails(){
//     console.log(this.codingQuestionInputArgumentDetailsForm.value);
//     console.log(this.codingQuestionTestCaseDetailsForm.value);
    
    
//   }


// updateInputArguments(testCaseIndex: number, inputIndex: number, inputValue: string, argumentPosition: string) {
//     const testCase = this.listOfTestCases.at(testCaseIndex) as FormGroup;
//     const inputArgumentsArray = testCase.get('inputArguments') as FormArray;

//     // Update the specific input argument at inputIndex
//     const inputArgument = inputArgumentsArray.at(inputIndex) as FormGroup;
//     inputArgument.patchValue({
//         inputValue: inputValue,
//         argumentPosition: argumentPosition,
//     });
// }
// getTestCaseInputArguments(testCase: AbstractControl): AbstractControl[] {
//     return (testCase.get('inputArguments') as FormArray).controls;
// }

// }













//  // additionalFields!: FormArray;
//  // argumentsList: Argument[] = [];


 
  
// //  assignPossition(i: number) {
// //   console.log('working', i);
// // }

 
//    // addArguments() {
//   //   this.argumentsList = this.additionalFields.value.map((field: any) => ({
//   //     argumentName: field.argumentName,
//   //     argumentDataType:
//   //       field.dataType === 'primitive'
//   //         ? field.primitiveType
//   //         : field.nonPrimitiveType,
//   //   }));

//   //   this.newMethod.arguments = this.argumentsList;
//   //   console.log(this.newMethod);
//   //   console.log(this.newCodingQuestion);
//   // }

  

//   // addInputArguments() {}

//   // addFields() {
//   //   const newField = this._formBuilder.group({
//   //     dataType: ['primitive'],
//   //     primitiveType: [''],
//   //     nonPrimitiveType: [''],
//   //     argumentName: ['', Validators.required],
//   //   });

//   //   this.additionalFields.push(newField);
//   // }