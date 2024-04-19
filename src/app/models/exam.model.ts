import { CodingQuestions } from "./codingquestions.model";
import { ExamSubject } from "./examSubject";
import { User } from "./user.model";


export interface Exam {
    id:Number;
    name: string;
    description: string;
    examCode: string;
    duration: string;
    startDate: string;
    endDate: string;
    active: boolean;
    created_at_ts: string;
    examSubjects:ExamSubject[]
    users: User[]
  }
  