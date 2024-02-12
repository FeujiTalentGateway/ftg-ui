import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-submitted',
  templateUrl: './exam-submitted.component.html',
  styleUrls: ['./exam-submitted.component.css'],
})
export class ExamSubmittedComponent implements OnInit {
  examCode?:string
  examAttemptId?:string

  constructor(private router: Router, private activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.examCode = params.get('examCode')as string;
      this.examAttemptId = params.get('examAttemptId')as string;
      console.log(this.examCode, this.examAttemptId)


    });
  }

  viewResult() {
      let url  = `/user/exam/view-result/${this.examCode}/${this.examAttemptId}`
      this.router.navigateByUrl(url);
  }
}
