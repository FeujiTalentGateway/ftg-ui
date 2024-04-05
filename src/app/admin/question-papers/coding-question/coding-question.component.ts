import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormControl } from '@angular/forms';
@Component({
  selector: 'app-coding-question',
  templateUrl: './coding-question.component.html',
  styleUrls: ['./coding-question.component.css']
})
export class CodingQuestionComponent implements OnInit{

  isEditCodingQuestion : boolean = false
  questionId : number = 0
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isOptional = false;
  stepControl: AbstractControl | undefined;
  constructor(private activatedParam:ActivatedRoute,private _formBuilder: FormBuilder){
    
  }
  ngOnInit(): void {
    this.isEditCodingQuestion = this.activatedParam.snapshot.paramMap.get('id') !== null;
    if(this.isEditCodingQuestion){
        this.questionId = this.activatedParam.snapshot.paramMap.get('id') as  unknown as number;
        console.log(this.questionId);
        
    }
    this.firstFormGroup = this._formBuilder.group({
    });
    this.secondFormGroup = this._formBuilder.group({
      
    });
    this.stepControl = new FormControl();

  }
 

}
