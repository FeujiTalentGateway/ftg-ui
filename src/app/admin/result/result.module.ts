import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultRoutingModule } from './result-routing.module';
import { ExamsPageComponent } from './exams-page/exams-page.component';
import { ExamSummaryComponent } from './exam-summary/exam-summary.component';
import { PercentageCircleComponent } from './percentage-circle/percentage-circle.component';
import { UsersResultComponent } from './users-result/users-result.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailedUserResultComponent } from './detailed-user-result/detailed-user-result.component';


@NgModule({
  declarations: [
    ExamsPageComponent,
    ExamSummaryComponent,
    PercentageCircleComponent,
    UsersResultComponent,
    DetailedUserResultComponent
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
  ]
})
export class ResultModule { }
