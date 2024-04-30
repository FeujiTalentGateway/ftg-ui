import { CodingQuestionResult } from "./codingresult.model";
import { SubjectDuration } from "./subject.duration.model";

export interface DetailedUserResult{
    fullName : string;
    examStartedAt:string;
    examCompletedAt:string;
    examDuration:string;
    totalMarks:number;
    marksObtain:number;
    subjectWiseResult:SubjectDuration[]
    codingQuestionResults:CodingQuestionResult[];

}