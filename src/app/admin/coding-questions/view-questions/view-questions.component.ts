// src/app/components/view-questions/view-questions.component.ts

import { Component, OnInit } from '@angular/core';
import { CodingQuestionService } from 'src/app/services/coding-question.service';
import { CodingQuestion } from 'src/app/models/coding-question.model';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  isExpanded: boolean[] = [];
  codingQuestionData: CodingQuestion[] = [];
  selectedLevel: number = 0;
  questionsList: CodingQuestion[] = [];
  questionsLength: number = 0;
  searchQuery: string = '';
  rows: number = 5;
  options: number[] = [0, 5, 15, 20];
  page: number = 1;
  pageSize: number = 5;

  constructor(private codingQuestionService: CodingQuestionService) {}

  ngOnInit(): void {
    this.getAllQuestions();
  }

  toggle(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  getAllQuestions(): void {
    this.codingQuestionService.getAllQuestions().subscribe({
      next: (response: CodingQuestion[]) => {
        this.codingQuestionData = response;
        this.questionsLength = 10;
        this.isExpanded = new Array(this.codingQuestionData.length).fill(false);
      },
      error: (err: string) => {
        console.error('Error retrieving questions:', err);
      },
    });
  }
  handleFiltering(): void {
    if (this.selectedLevel !== 0 && this.searchQuery) {
      // this.getFilteredQuestionsBasedOnDifficultyLevelWithSearchQuery();
    } else if (this.selectedLevel !== 0) {
      // this.getFilteredQuestionsBasedOnDifficultyLevel();
    } else if (this.searchQuery) {
      // this.getFilteredQuestionsBasedOnSearchQuery();
    } else {
      // this.getAllQuestionsBasedOnSubjectId();
    }
  }
  handleSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    console.log(this.searchQuery);
    this.handleFiltering();
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    // this.getQuestionsBasedOnPageSize();
  }
}
