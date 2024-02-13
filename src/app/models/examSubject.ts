import { Subject } from "./subject";


export interface ExamSubject {
  id: Number;
  duration: string;
  maxQuestions: number;
  subject: Subject;
  startingDifficultyLevel:number
}
  