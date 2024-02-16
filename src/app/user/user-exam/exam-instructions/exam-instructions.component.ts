import { HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';
import { ExamServiceForLogic } from 'src/app/services/ExamServiceForLogic';
import { SharedDataService } from 'src/app/services/shared-data.service';
import 'ldrs/ring'

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
    this.examDetailObject$.subscribe((response) => {
      console.log(response);

      this.examDetails = response;
    });

    //  on production

    // this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode');
    // this.examDetails = this.examService.checkExamPresentOrNot(
    //   this.examCode as string
    // );
    // this.examDetailsob$ = this.examRepo.checkExamByCode(this.examCode as string)
    // this.examRepo.checkExamByCode(this.examCode as string).subscribe(
    //   (response) => {
    //     this.examDetails = response;
    //     console.log(this.examDetails);

    //   },
    //   (error) => {
    //     console.error('not found');
    //   }
    // );
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

  timeFormat(time: string) {}
}
