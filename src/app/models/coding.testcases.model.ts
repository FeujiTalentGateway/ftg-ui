import { InputArguments } from "./coding.inputs.model"

export interface TestCases{
    id:number,
    expectedResult:string,
    isSample:boolean,
    explanationExample:string
    inputArguments:InputArguments[]
}