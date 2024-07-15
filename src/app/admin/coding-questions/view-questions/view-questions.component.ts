// src/app/components/view-questions/view-questions.component.ts

import { Component, OnInit } from '@angular/core';
import { CodingQuestionService } from 'src/app/services/coding-question.service';
import { CodingQuestion } from 'src/app/models/coding-question.model';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  isExpanded: boolean[] = [];
  codingQuestionData: CodingQuestion[] = [];

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
        this.isExpanded = new Array(this.codingQuestionData.length).fill(false);
      },
      error: (err: string) => {
        console.error('Error retrieving questions:', err);
      }
    });
  }
}
