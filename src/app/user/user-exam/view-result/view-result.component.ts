import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResultTimeQuestion } from 'src/app/models/question';
import { ViewResult } from 'src/app/models/view-result';
import { ExamService } from 'src/app/repository/exam.service';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css'],
})
export class ViewResultComponent {
  examCode?: string;
  examAttemptId?: string;
  result$: Observable<ViewResult> | undefined;
  result: ViewResult | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.examCode = params.get('examCode') as string;
      this.examAttemptId = params.get('examAttemptId') as string;
      this.result$ = this.examService.getResult(
        this.examAttemptId,
        this.examCode
      );
      this.result$.subscribe(
        (response) => {
          this.result = response;
        },
        (error) => {
        }
      );
    });
  }
  getTheMassage(question: ResultTimeQuestion): string {
    if (question.correct_option_id == question.selected_option_id) {
      return 'Correct Option';
    }
    if (question.selected_option_id) {
      return 'Wrong Option';
    }
    return 'Not Attempted';
  }
}
