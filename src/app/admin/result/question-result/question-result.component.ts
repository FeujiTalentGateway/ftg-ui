import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExamSubject } from 'src/app/models/examSubject';
import { Option } from 'src/app/models/option';
import { Question } from 'src/app/models/question';
import { Subject } from 'src/app/models/subject';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.css'],
})
export class QuestionResultComponent implements OnInit,OnChanges{
  
  @Input() listOfQuestion:Question[] =[]
  @Input() examSubjects : ExamSubject[]=[]
  isExpanded: boolean[] = [];
  isExpandedCount:boolean = false;
  subjectList :Subject[] = []
  filteredListOfQuestion : Question[]=[]
  
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];


  ngOnChanges(changes: SimpleChanges): void {
    this.isExpanded = new Array(this.listOfQuestion.length).fill(false);
    this.filteredListOfQuestion = this.listOfQuestion
    console.log(this.isExpanded);
    console.log(this.examSubjects);
    this.subjectList = this.examSubjects.map(es =>es.subject)   
    console.log(this.subjectList);
    
    
  }


  ngOnInit(): void {
       

  }

  toggle(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }
  // getIcon(option: any,question:Question) {
  //   if (question.rightOptions.some(rightOption => rightOption.id === option.id)) {
  //     return question.optionSelected?.some(selectedOption => selectedOption.id === option.id) ? true : false;
  //   } else {
  //     return question.optionSelected?.some(selectedOption => selectedOption.id === option.id) ? true : false;
  //   }
  // }
  getIcon(option: any, question: any): string |null {
    // Check if the option is selected
    const isSelected = question.optionSelected?.some((selectedOption: { id: any; }) => selectedOption.id === option.id);
  
    // Check if the option is correct
    const isCorrect = question.rightOptions?.some((rightOption: { id: any; }) => rightOption.id === option.id);
  
    if (isSelected) {
      // If the option is selected
      if (isCorrect) {
        // If the option is correct
        return 'correct';
      } else {
        // If the option is incorrect
        return 'wrong';
      }
    } else {
      return null; // If the option is not selected
    }
  }
  

  getOptionStyle(option: any, question: any): string {
    const isSelected = question.optionSelected?.some((selectedOption: { id: any; }) => selectedOption.id === option.id);
    const isCorrect = question.rightOptions.some((rightOption: { id: any; }) => rightOption.id === option.id);
  
    if (isCorrect) {
      if (isSelected) {
        return 'correct-selected'; // Correct and selected
      } else {
        return 'correct'; // Correct but not selected
      }
    } else {
      if (isSelected) {
        return 'incorrect-selected'; // Incorrect and selected
      } else {
        return 'incorrect'; // Incorrect but not selected
      }
    }
  }
  expandAll(){
    console.log(this.isExpanded);
    this.isExpandedCount = !this.isExpandedCount
    
    this.isExpanded = this.isExpanded.fill(this.isExpandedCount);

    console.log(this.isExpanded);
  }
  getSelectedOption(question:any,option:any){
    const isSelected = question.optionSelected?.some((selectedOption: { id: any; }) => selectedOption.id === option.id)
    return isSelected
  }

  getAllQuestionsBasedOnSubject(event:any){
    console.log(event.value);
    
    if(event.value == 'all'){
      this.filteredListOfQuestion = this.listOfQuestion
    }
   else{
    this.filteredListOfQuestion = this.listOfQuestion
    this.filteredListOfQuestion = this.listOfQuestion.filter(q=>q.subject.name === event.value)
   }
  }
}
