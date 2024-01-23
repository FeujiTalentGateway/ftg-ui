import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question';
import { Subject } from 'src/app/models/subject';
import { QuestionRepository } from 'src/app/repository/question-repository.service';
import { SubjectRepositoryService } from 'src/app/repository/subject-repository.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css'],
})
export class AllQuestionsComponent implements OnInit {
  // questions:{id:number,question:string,options:string[],correctAnswer:string}[]=[]
  isDeleteModalOpen: boolean = false;
  delitingQuestion: string = '';
  delitableQuestionId: number = 0;
  addExtraStyle: boolean = false;
  pageSize = 4;
  pageNumber = 0;
  totalQuestion: any;
  rows = 4;
  first = 0;
  options = [0, 5, 15, 20];
  searchQuestion = '';
  subjects: Subject[] = [];
  questions: Question[] = [];
  selectedSubject!: number;
  searchQuery: string = '';
  subjectsSubscription: Subscription = new Subscription();
  quesitonSubscirption: Subscription = new Subscription();

  // paginator!:Paginator
  constructor(
    private service: QuestionsService,
    private questionRepository: QuestionRepository,
    private subjectRepository: SubjectRepositoryService
  ) {}
  ngOnInit(): void {
    this.service.questionChanged$.subscribe(() => {
      console.log('refreshing');
      this.getQuesitonsBySubject();
    });
    // Subscribe to getSubjects and store the result in the subjects variable
    this.subjectsSubscription = this.subjectRepository
      .getAllSubjects()
      .subscribe(
        (subjects: Subject[]) => {
          this.subjects = subjects;
          // Initialize selectedSubject with the first subject
          if (subjects.length > 0) {
            this.selectedSubject = subjects[0].id;
            this.getQuesitonsBySubject();
          }
        },
        (error) => {
          // Handle error if needed
          console.error('Error fetching subjects:', error);
        }
      );
  }

  getQuesitonsBySubject() {
    this.quesitonSubscirption = this.questionRepository
      .getQuestionsBySubject(this.selectedSubject)
      .subscribe(
        (questions: Question[]) => {
          this.questions = questions;
          // Initialize selectedSubject with the first subject
        },
        (error) => {
          // Handle error if needed
          console.error('Error fetching questions:', error);
        }
      );
  }

  get paginatedQuestions() {
    const startIndex = this.pageNumber * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredQuestions.slice(startIndex, endIndex);
  }

  get filteredQuestions() {
    return this.questions.filter((question) =>
      question.content.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Handling page change event from mat-paginator
  onPageChange(event: any) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  deleteQuestion(id: any) {
    this.delitableQuestionId = id;
    this.openDeleteModal();
    this.delitingQuestion = 'Are you sure you want to delete this question';
  }
  deleteQuestionAfterConfirmation() {
    this.service.deleteQuestion(this.delitableQuestionId);
    this.closeDeleteModal();
  }
  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }
  onDivClick() {
    this.addExtraStyle = !this.addExtraStyle;
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.subjectsSubscription.unsubscribe();
    this.quesitonSubscirption.unsubscribe();
  }
}
