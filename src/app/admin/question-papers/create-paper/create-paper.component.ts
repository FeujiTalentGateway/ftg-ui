import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paper } from 'src/app/models/paper';
import { Question } from 'src/app/models/question';
import { Subject } from 'src/app/models/subject';
import { PaperService } from 'src/app/services/paper.service';


@Component({
  selector: 'app-create-paper',
  templateUrl: './create-paper.component.html',
  styleUrls: ['./create-paper.component.css']
})


export class CreatePaperComponent implements OnInit {

  allQuestions: any[] = [];
  questions: Question[] = [];
  subjects: Subject[] = [];
  selectedSubject: Subject | undefined;
  paperResponse: Paper | undefined;
  paper: Paper | undefined;
  selectedQuestions: Question[] = [];


  constructor(private paperService: PaperService, private fb: FormBuilder,private route: Router) {

  }
  ngOnInit(): void {
    this.getAllSubjects();
    this.getAllQuestions();
  }


  register(data: FormGroup) {
    console.log('Inside register component: register()');
    this.savePaper();
  }


  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s']{1,32}$/)]),
    active: new FormControl('', [Validators.required]),
    questions: this.fb.array([]),
  });




  onSubjectChange(event: any) {

    const selectedSubjectId = event.target.value;
    this.selectedSubject = this.subjects.find(subject => subject.id == selectedSubjectId);
    this.questions = this.allQuestions.filter(question => question.subjectDTO.name == this.selectedSubject?.name).map(question => question);
  }
  getAllQuestions() {
    this.paperService.getAllQuestions().subscribe(
      (questions) => {
        this.allQuestions = questions;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }
  getAllSubjects() {
    this.paperService.getAllSubjects().subscribe(
      (res) => {
        this.subjects = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }


  savePaper() {


    const paper: Paper = {
      name: this.registerForm.get('name')?.value,
      active: this.registerForm.get('active')?.value,
      questions: this.selectedQuestions|| []

    };
    this.paperService.savePaper(paper).subscribe(
      (res)=>{
        console.log(res);
        this.route.navigateByUrl('/login')
      }
    )

  }
  onCheckboxChange(question: Question): void {
    const questionId = question.id;

    if (this.selectedQuestions.some(selectedQuestion => selectedQuestion.id === questionId)) {
      this.selectedQuestions = this.selectedQuestions.filter(
        selectedQuestion => selectedQuestion.id !== questionId
      );
    } else {
      this.selectedQuestions.push(question);
    }
  }









}
