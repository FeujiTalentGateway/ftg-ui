import { ExamSubject } from "./examSubject";


export interface Exam {
    id:Number;
    name: string;
    description: string;
    examCode: string;
    duration: string;
    startDate: string;
    endDate: string;
    active: boolean;
    created_at_ts:string;
    examSubjects:ExamSubject[]
  }
  