import { Question } from "./question";

export interface Paper{
    
    id :number;

    name :string;

    active:boolean;

    questions:Question[];
}