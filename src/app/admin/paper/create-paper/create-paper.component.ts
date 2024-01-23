import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  heading: string | undefined;

  constructor(private paperService: PaperService, private fb: FormBuilder, private route: Router, private snackBar: MatSnackBar,) {

  }
  ngOnInit(): void {
    this.getAllSubjects();
    this.getAllQuestions();
    this.getAllPapers();
  }
  showpaper: boolean = false;


  register(data: FormGroup) {
    this.savePaper();
  }


  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s']{1,32}$/)]),
    active: new FormControl('', [Validators.required]),
    questions: this.fb.array([]),
  });



  createpaper() {
    this.heading = "Create Paper";
    this.showpaper = !this.showpaper;
    this.selectedQuestions = [];
    this.registerForm.reset();
  }
  backbutton() {
    this.showpaper = false;
    this.questions = [];
    this.selectedSubject = undefined;
    this.registerForm.reset();
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

    if (this.heading === "Create Paper") {
      const paper: Paper = {
        id: 0,
        name: this.registerForm.get('name')?.value,
        active: this.registerForm.get('active')?.value,
        questions: this.selectedQuestions || []

      };
      this.paperService.savePaper(paper).subscribe(
        (response: any) => {
          this.openSnackBar(response.message, 'Close');
          this.getAllPapers();
          this.registerForm.reset();
          this.route.navigateByUrl("admin/paper");
          this.showpaper = !this.showpaper;
        },
        (error) => {
          this.openSnackBar(error.error.message, 'Close');
        }
      );
    }
    else {
      const paper: Paper = {
        id: this.editPaperId,
        name: this.registerForm.get('name')?.value,
        active: this.registerForm.get('active')?.value,
        questions: this.selectedQuestions || []

      };

      this.paperService.updatePaper(paper).subscribe(
        (response: any) => {
          console.log(response);
          this.getAllPapers();
          this.registerForm.reset();
          this.route.navigateByUrl("admin/paper");
          this.showpaper = !this.showpaper;
        },
        (error) => {
          this.openSnackBar(error.error.message, 'Close');
        }
      );
    }

  }

  getAllPapers() {
    this.paperService.getAllPapers().subscribe(
      (res) => {
        this.papers = res;
        this.totalPages = Math.ceil(this.papers.length / this.tablerowsperpage);
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


  isPrescentedOrNot(question: Question) {


    if ((this.selectedQuestions.filter(e => e.content == question.content).length > 0)) {
      return true;

    }
    return false;
  }
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  nameSearch: string = "";
  objectnumber: number = 0;

  onSubjectChange(event: any) {
    if (this.heading === "Edit Paper") {
      const selectedSubjectId = event.target.value;
      this.objectnumber = selectedSubjectId;
      this.selectedSubject = this.subjects.find(subject => subject.id == selectedSubjectId);
      this.questions = this.allQuestions.filter(question => question.subject.name == this.selectedSubject?.name).map(question => question);
      this.totalItems = Math.ceil(this.questions.length / this.itemsPerPage);
      this.currentPage = 1;
      this.selectedQuestions = this.selectedQuestions

    }

    else {

      const selectedSubjectId = event.target.value;
      this.objectnumber = selectedSubjectId;
      this.selectedSubject = this.subjects.find(subject => subject.id == selectedSubjectId);
      this.questions = this.allQuestions.filter(question => question.subject.name == this.selectedSubject?.name).map(question => question);
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


  currenttable: number = 1;
  tablerowsperpage: number = 5;
  totalPages: number = 0;
  get paginatedPapers(): any[] {
    const startIndex = (this.currenttable - 1) * this.tablerowsperpage;
    return this.papers.slice(startIndex, startIndex + this.tablerowsperpage);
  }



  nextPage(): void {
    if (this.currenttable < this.totalPages) {
      this.currenttable++;
    }
  }

  prevPage(): void {
    if (this.currenttable > 1) {
      this.currenttable--;
    }
  }

  updatePaper: Paper | undefined;
  toggleButton(paper: Paper) {
    paper.active = !paper.active;
    this.paperService.updatePaper(paper).subscribe(
      (res) => {
        this.updatePaper = res;
        this.getAllPapers();
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  editPaperId: number = 0;
  editPaper(paper: any) {
    this.heading = "Edit Paper"
    this.showpaper = !this.showpaper;
    this.registerForm.patchValue({
      name: paper?.name,
      active: paper?.active.toString(),
    });
    this.editPaperId = paper?.id;
    this.selectedQuestions = paper?.quesDto;
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'centered-snackbar',
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }


}
