import { SubjectDuration } from "./subject.duration.model";

export interface DetailedUserResult{
    fullName : string;
    examStartedAt:string;
    examCompletedAt:string;
    examDuration:string;
    subjectWiseResult:SubjectDuration[]

}