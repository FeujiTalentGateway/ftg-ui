import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ExamServiceForLogic } from 'src/app/services/exam-service-for-logic.service';

@Component({
  selector: 'app-exam-instructions',
  templateUrl: './exam-instructions.component.html',
  styleUrls: ['./exam-instructions.component.css'],
})
export class ExamInstructionsComponent implements OnInit {
  examCode: string | null = null;
  examDetails: Exam | any;
  examDetails1$: Observable<any> | undefined;
  examDetailObject$: Observable<any> | undefined;
  isReaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private examService: ExamServiceForLogic,
    private examRepo: ExamService,
    private sharedDataService: SharedDataService
  ) {}
  ngOnInit(): void {
    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode');
    this.examDetailObject$ = this.examRepo.getExamByCode(
      this.examCode as string
    );


    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode');
    this.examDetails = this.examService.checkExamAvailableForUserOrNot(
      this.examCode as string
    );
  }
  startExam() {
    this.toggleFullscreen();
    this.route.navigate(['/exam/exam/exam/', this.examCode]);
  }
  getTotalSubjects(examDetails: Exam): number {
    let totalSubjects = examDetails.examSubjects.length;

    return totalSubjects;
  }

  toggleFullscreen() {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
      // Request fullscreen
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  updateExamTime() {
    const newData = { exam_time: 'nothing' };
    this.sharedDataService.updateExamTime(newData);
  }
  updateIsreaded() {
    this.isReaded = !this.isReaded;
  }
}
