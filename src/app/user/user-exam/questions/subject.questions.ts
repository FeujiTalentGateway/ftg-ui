import { Question } from "src/app/models/question";

export interface ExamSubject {
}
export interface SubjectQuestions {
    subjectId: number;
    subjectName: string;
    questions: Question[];
    reamingTime: number;
    isVisited: boolean;
}   