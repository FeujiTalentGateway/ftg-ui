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
  papers: Paper[] = [];


  constructor(private paperService: PaperService, private fb: FormBuilder, private route: Router) {

  }
  ngOnInit(): void {
    this.getAllSubjects();
    this.getAllQuestions();
    this.getAllPapers();
  }


  register(data: FormGroup) {
    // console.log('Inside register component: register()');
    this.savePaper();
  }


  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s']{1,32}$/)]),
    active: new FormControl('', [Validators.required]),
    questions: this.fb.array([]),
  });




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
      questions: this.selectedQuestions || []

    };
    this.paperService.savePaper(paper).subscribe(
      (response: string) => {
        console.log('Response:', response);
        this.getAllSubjects();
        this.getAllQuestions();
        this.getAllPapers();
      },
      (error) => {
        console.error('Error:', error);
      }
    )

  }

  getAllPapers() {
    this.paperService.getAllPapers().subscribe(
      (res) => {
        this.papers = res;
        console.log(res);
      },
      (error) => {
        console.error(error);
      }
    );

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



  currentPage = 1;
  itemsPerPage = 5; 
  totalItems = 0;
  nameSearch:string="";
  objectnumber:number=0;

  onSubjectChange(event: any) {
    if(event===this.objectnumber){
      console.log(event);


    }

    else{

    const selectedSubjectId = event.target.value;
      this.objectnumber=selectedSubjectId;
    this.selectedSubject = this.subjects.find(subject => subject.id == selectedSubjectId);
    this.questions = this.allQuestions.filter(question => question.subjectDTO.name == this.selectedSubject?.name).map(question => question);
    this.totalItems = Math.ceil(this.questions.length / this.itemsPerPage);
    this.currentPage = 1;
    }
    
  }


  changePage(page: number) {
    if (page < 1 || page > this.totalItems) {
      return;
    }
    this.currentPage = page;
  }
  getImageListSlice() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.questions.slice(startIndex, endIndex);
  }




}
