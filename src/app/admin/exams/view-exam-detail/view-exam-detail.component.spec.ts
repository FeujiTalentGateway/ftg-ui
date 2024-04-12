// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ViewExamDetailComponent } from './view-exam-detail.component';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardModule } from '@angular/material/card';
// import { MatTableModule } from '@angular/material/table';

// describe('ViewExamDetailComponent', () => {
//   let component: ViewExamDetailComponent;
//   let fixture: ComponentFixture<ViewExamDetailComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports:[HttpClientTestingModule,MatIconModule,MatCardModule,MatTableModule],

//       declarations: [ViewExamDetailComponent],
//       providers: [
//         { 
//           provide: MAT_DIALOG_DATA, 
//           useValue: { 
//             selectedExam: { 
//                 name: 'Mock Exam', 
//                 description: 'Mock Description',
//                 examCode: '123456',
//                 duration: 90,
//                 startDate: new Date(),
//                 endDate: new Date(),
//                 active: true,
//                 users: [ { userName: 'User 1' }, { userName: 'User 2' } ], // Mock users data
//                 examSubjects: [
//                   { name: 'Subject 1', difficultyLevel: 'Easy', duration: 60, maxQuestions: 20 },
//                   { name: 'Subject 2', difficultyLevel: 'Medium', duration: 90, maxQuestions: 30 }
//                 ]
//               } 
//           } 
//         }
//       ],
//     });
//     fixture = TestBed.createComponent(ViewExamDetailComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

