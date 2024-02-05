import { Component, Input, OnInit } from '@angular/core';
import { Option } from 'src/app/models/option';
import { OptionAttempt } from 'src/app/models/option.attempt';
import { Paper } from 'src/app/models/paper';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/repository/exam.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  @Input() paper: Paper = { id: 0, name: '', active: false, questions: [] };
  // @Input() paper: Question[] = [];
  // @Input() examAttemptId: number | undefined;
  currentQuestionIndex = 0;
  currentQuestion: Question | undefined;
  listOfQuestion: Question[] = [];
  ngOnInit(): void {
    this.currentQuestion = this.paper?.questions[0];
    console.log(this.paper);

    console.log(this.currentQuestion);
  }
  constructor(private authRepo: AuthService , private ExamRepo:ExamService) {
    this.currentQuestion = this.paper?.questions[0];
  }
  nextQuestion() {
    if (this.currentQuestionIndex < this.paper.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }
  optionSelected(option: Option) {
    console.log(option);
    console.log(this.currentQuestion);
  }
  assignRightOption(
    currentQuestion: Question,
    optionSelected: Option,
    questionIndexPosition: number
  ) {
    this.paper.questions[questionIndexPosition].optionSelected =
      optionSelected.id;
  }
  saveOption() {
    this.currentQuestion = this.paper.questions[this.currentQuestionIndex];
    console.log(this.currentQuestion);
    if (this.currentQuestion.optionSelected == null) {
      this.authRepo.openSnackBar('Please select the Option Fist', 'close');
    } else {
      console.log(this.currentQuestion.id);
      console.log(this.currentQuestion.optionSelected);
      console.log(this.paper.exam_attempt_id);
      let optionAttempt: OptionAttempt = {
        question_id_i: this.currentQuestion.id,
        option_selected_id: this.currentQuestion.optionSelected,
        attempt_id_i: this.paper.exam_attempt_id as number,
      };
      console.log(optionAttempt);
      
      this.ExamRepo.saveOption(optionAttempt).subscribe(
        (response)=>{

        },
        (error)=>{
          console.log(error);
          
        }
      )
    }
  }
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
}
