import { Constraint } from "./coding.constraint.model";

export interface CodingQuestion{
    id:number,
    content:string;
    description:string;
    constraints:Constraint[]


}