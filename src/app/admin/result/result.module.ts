import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultRoutingModule } from './result-routing.module';
import { ExamsPageComponent } from './exams-page/exams-page.component';
import { ExamSummaryComponent } from './exam-summary/exam-summary.component';
import { UsersResultComponent } from './users-result/users-result.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailedUserResultComponent } from './detailed-user-result/detailed-user-result.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { QuestionResultComponent } from './question-result/question-result.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    ExamsPageComponent,
    ExamSummaryComponent,
    UsersResultComponent,
    DetailedUserResultComponent,
    QuestionResultComponent
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    SharedModuleModule,
    FormsModule,
    HighchartsChartModule,
    MatSelectModule
    
  ],
  providers: [
    DatePipe // Add DatePipe to the providers array
  ]
})
export class ResultModule { }
