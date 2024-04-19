import { Constraint } from "./coding.constraint.model";
import { Method } from "./coding.method.model";
import { TestCases } from "./coding.testcases.model";

export interface CodingQuestion{
    id:number,
    content:string;
    description:string;
    difficultyLevel:number;
    constraints:Constraint[]
    methodDefinition: Method
    testCases:TestCases[]


}