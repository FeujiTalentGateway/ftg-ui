import { Question } from "./question";

export interface ExamStartResponse{

    message : string;
    question : Question;
    attemptId : number;
}