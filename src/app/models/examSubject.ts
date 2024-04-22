import { CodingQuestionsDTO } from './codingQuestionDTO.model';
import { Subject } from './subject';

export interface ExamSubject {
  id: Number;
  duration: string;
  maxQuestions: number;
  startingDifficultyLevel: number;
  subject: Subject;
  codingQuestions: CodingQuestionsDTO[];
  isTimeUp: boolean;
}
