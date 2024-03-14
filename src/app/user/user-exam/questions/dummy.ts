// selectSubject(event: any) {
//     let remainingTime = this.getRemainingTime();
//     let subjectId = this.currentSubject?.subject.id;
//     let subjectIsExits = this.listOfQuestionEachSubject.some(
//       (item) => item.subjectId == subjectId
//     );


//     if (subjectIsExits) {
//       this.listOfQuestionEachSubject.map((item) => {
//         if (item.subjectId == subjectId) {
//           item.reamingTime = remainingTime;
//           this.updateTimeForSubject(remainingTime, subjectId);
//         }
//         return item;
//       });
//     }

//     let index = this.exam.examSubjects.findIndex(
//       (subject) => subject.subject.id == event.value
//     );
//     this.indexPositionOfSubject = index;
//     this.currentSubject = this.exam.examSubjects[this.indexPositionOfSubject];
//     this.currentQuestionIndex = 0;
//     this.changeSubjectWithIndexPosition(index);
//   }

//   ngOnDestroy(): void {
//     window.onbeforeunload = () => {};
//   }
//   changeSubjectWithIndexPosition(index: number) {
//     this.saveOption(false, true);
//     console.log(this.currentSubject, 'currentSubject');
//     let subjectIsExits = this.listOfQuestionEachSubject.some(
//       (item) => item.subjectId == this.currentSubject?.subject.id
//     );
//     console.log('is subject exits or not', subjectIsExits);
//     if (subjectIsExits) {
//       console.log(
//         this.listOfQuestionEachSubject,
//         'this.listOfQuestionEachSubject'
//       );

//       console.log(this.currentSubject?.subject.name, 'name of the subject');

//       let questions = this.listOfQuestionEachSubject.find(
//         (item) => item.subjectName === this.currentSubject?.subject.name
//       );
//       console.log(questions, 'this.listOfQuestion');
//       this.listOfQuestion = [];
//       this.listOfQuestion = questions?.questions as Question[];
//       console.log(this.listOfQuestion, 'this.listOfQuestion after filtering');

//       this.currentQuestion = this.listOfQuestion[this.currentQuestionIndex];

//       // let duration = this.listOfQuestionEachSubject.find(
//       //   (item) => item.subjectId == this.currentSubject?.subject.id
//       // )?.reamingTime as number;
//       // this.currentQuestion = this.listOfQuestion[0];
//       // this.currentQuestionIndex = 0;
//       // let timeData = { exam_time: duration, examCode: this.exam.examCode };
//       // this.sharedData.updateExamTime(timeData);
//     } else {
//       let data = {
//         examCode: this.exam.examCode,
//         difficultyLevel: this.currentSubject?.startingDifficultyLevel || 0,
//         startDate: new Date().toISOString().slice(0, 23),
//         subjectId: this.currentSubject?.subject.id || 0,
//         attemptId: this.examAttemptID || '',
//       };
//       console.log(data, 'data');
//       this.listOfQuestionEachSubject.push({
//         subjectId: this.currentSubject?.subject.id || 0,
//         subjectName: this.currentSubject?.subject.name || '',
//         questions: [],
//         reamingTime: this.getRemainingTime(),
//         isVisited: true,
//       });

//       this.ExamRepo.changeSubjectAndGetFirstQuestion(data).subscribe(
//         (response) => {
//           this.currentQuestion = response;
//           this.listOfQuestion = [];
//           this.listOfQuestion.push(this.currentQuestion);
//           this.currentQuestionIndex = 0;
//           this.currentQuestion.optionSelected = [];
//           this.updateTime();
//         }
//       );
//     }
//   }
//   updateEachQuestion() {
//     this.listOfQuestionEachSubject.map((item) => {
//       if (item.subjectId == this.currentSubject?.subject.id) {
//         item.questions = this.listOfQuestion;
//       }
//       return item;
//     });
//     console.log(
//       this.listOfQuestionEachSubject,
//       'this.listOfQuestionEachSubject'
//     );
//   }
//   updateTimeForSubject(time : number, subjectId : number){
//     let timeData = { exam_time: time, examCode: this.exam.examCode };
//       this.sharedData.updateExamTime(timeData);
//       console.error('timeData', timeData);

//   }
