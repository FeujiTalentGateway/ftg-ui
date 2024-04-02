import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paper } from 'src/app/models/paper';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/repository/exam.service';
import { Observable } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Exam } from 'src/app/models/exam.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  examCode: string | null = null;
  paper: Paper | null = null;
  currentQuestion: Question | undefined;
  QuestionNumber: Number = 0;
  questionsList: Question[] = [];
  examAttemptId: number | undefined;
  questions$: Observable<Paper> | undefined;
  Exam$: Observable<Exam> | undefined;
  examObjet: Exam | undefined;
  examDuration: string | undefined;
  questions: Paper = { id: 0, name: '', active: false, questions: [] };

  constructor(
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode');
    this.Exam$ = this.examService.getExamByCode(this.examCode as string);
    this.Exam$.subscribe(
      (response) => {
        this.examObjet = response;
        this.examDuration = response.duration;
        const newData = {
          exam_time: this.examDuration,
          examCode: this.examCode,
        };
        this.sharedDataService.updateExamTime(newData);
      },
      (error) => {}
    );
  }
}
