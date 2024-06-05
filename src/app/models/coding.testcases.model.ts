import { InputArguments } from "./coding.inputs.model"
import { TestCaseInput } from "./testcaseinput.model";

export interface TestCases{
    id:number,
    expectedResult:string,
    isSample:boolean,
    explanationExample:string,
    input: TestCaseInput;
    output: string;
    inputArguments:InputArguments[]
}