import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/repository/exam.service';
import { DetailedUserResult } from 'src/app/models/detailedUserResult.model';
import { Question } from 'src/app/models/question';
import { Option } from 'src/app/models/option';

@Component({
  selector: 'app-detailed-user-result',
  templateUrl: './detailed-user-result.component.html',
  styleUrls: ['./detailed-user-result.component.css']
})
export class DetailedUserResultComponent implements OnInit {
  examCode: string | undefined;
  examObject$: Observable<Exam> | undefined;
  userId : number | undefined | null;
  examObject : Exam | undefined;
  examDuration:string | undefined;
  duration:string | undefined;
  strokeWidth: number = 10;
  questionsList: Question[] = [];
  pageSize = 5;
  isDropdownOpen: boolean[] = [];
  page = 1;
  circumference: number = Math.PI * 180;
  detailedUserResultObject : DetailedUserResult | undefined;
  detailedUserResultObject$ : Observable<DetailedUserResult> | undefined;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private examService: ExamService,
  ){}
  ngOnInit(){
    this.examCode = this.activatedRoute.snapshot.paramMap.get('examCode') as string;
    this.userId =  this.activatedRoute.snapshot.paramMap.get('userId') as number | null | undefined; 
    this.examObject$ = this.examService.getExamByCode(this.examCode);
    this.detailedUserResultObject$ = this.examService.getDetailedUserResult(this.examCode,this.userId as number);
    this.calculateProgress();
    this.examService.getUserExamResults(this.examCode, this.userId as number)
      .subscribe((questions: Question[]) => {
        this.questionsList = questions;
        
      }, error => {
        console.error('Error fetching questions:', error);
      });
  }
  
  parseDurationToSeconds(durationString: string): number {
    const durationParts = durationString.split(':');
    const hours = parseInt(durationParts[0], 10) || 0;
    const minutes = parseInt(durationParts[1], 10) || 0;
    const seconds = parseInt(durationParts[2], 10) || 0;
    const totalDurationInSeconds = (hours * 3600) + (minutes * 60) + seconds;
    return totalDurationInSeconds;
  }

  calculateProgress(): number {
    if (!this.examDuration || !this.duration) {
      return 0;
    }
    const examDurationInSeconds = this.parseDurationToSeconds(this.duration);
    const userDurationInSeconds = this.parseDurationToSeconds(this.examDuration);
    const progressPercentage = (userDurationInSeconds / examDurationInSeconds) * 100;
    return progressPercentage;
  }

  handleDetailedUserResultObject(detailedUserResult:DetailedUserResult){
    this.examDuration = detailedUserResult.examDuration
    return true
  }
  handleExamObject(exam:Exam){
    this.duration = exam.duration
    return true
  }

  getStatusButtonClass(level: number): string {
    switch (level) {
      case 1:
        return 'level-1';
      case 2:
        return 'level-2';
      case 3:
        return 'level-3';
      case 4:
        return 'level-4';
      case 5:
        return 'level-5';
      case 6:
        return 'level-6';
      case 7:
        return 'level-7';
      case 8:
        return 'level-8';
      case 9:
        return 'level-9';
      case 10:
        return 'level-10';

      default:
        return 'common-level';
    }
  }

  toggleDropdown(index: number) {
    if (!this.isDropdownOpen[index]) {
      this.isDropdownOpen = Array(this.questionsList.length).fill(false);
      this.isDropdownOpen[index] = !this.isDropdownOpen[index];
    } else {
      this.isDropdownOpen[index] = !this.isDropdownOpen[index];
    }
  }

 isRightAndSelected(option: any, question: Question): boolean {
    const isRight = this.isRightOption(option, question);
    const isSelected = this.isSelectedOption(option, question);
    return isRight && isSelected;
  }

  isSelectedButNotRight(option: any, question: Question): boolean {
    const isRight = this.isRightOption(option, question);
    const isSelected = this.isSelectedOption(option, question);
    return !isRight && isSelected;
  }

  isRightButNotSelected(option: any, question: Question): boolean {
    const isRight = this.isRightOption(option, question);
    const isSelected = this.isSelectedOption(option, question);
    return isRight && !isSelected;
  }

  private isRightOption(option: any, question: Question): boolean {
    return !!question.rightOptions?.find((opt) => opt.id === option.id);
  }

  private isSelectedOption(option: any, question: Question): boolean {
    return !!question.optionSelected?.find((opt) => opt.id === option.id);
  }
  getOptionStyle(option: any,question:Question) {
    if (question.rightOptions.some(rightOption => rightOption.id === option.id)) {
      if (question.optionSelected?.some(selectedOption => selectedOption.id === option.id)) {
        return { color: 'green' }; // Correct and selected
      } else {
        return { color: 'black' }; // Correct but not selected
      }
    } else {
      if (question.optionSelected?.some(selectedOption => selectedOption.id === option.id)) {
        return { color: 'red' }; // Incorrect and selected
      } else {
        return { color: 'black' }; // Incorrect and not selected
      }
    }
  }

  isOptionChosen(question:Question,option:Option):boolean{
    let isChosen = question.optionSelected?.some(op=>op.id === option.id) || false
    return isChosen
  }

  isOptionIsCorrectOrNot(question:Question,option:Option):boolean{
    let isCorrect = question.rightOptions.some(op =>op.id === option.id) || false;
    return isCorrect    
  }

  getIndex(selectedOption:Option,question:Question):number{
    let indexOfOption = question.options.findIndex(op=>op.id === selectedOption.id)
    return(indexOfOption+1)
  }
  getFinalResult(question:Question){

  }
}