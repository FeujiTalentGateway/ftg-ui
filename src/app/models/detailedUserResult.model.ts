import { SubjectDuration } from "./subject.duration.model";

export interface DetailedUserResult{
    fullName : string;
    examStartedAt:string;
    examCompletedAt:string;
    totalTimeTakenForExam:string;
    subjectDuration:SubjectDuration[]

}