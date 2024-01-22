import { Question } from "./question";

export interface Paper{
    

    name:string;

    active:boolean;

    questions:Question[];
}