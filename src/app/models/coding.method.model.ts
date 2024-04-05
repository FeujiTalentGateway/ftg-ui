import { Argument } from "./coding.argument.model";

export interface Method{
    id:number,
    methodName:string,
    arguments:Argument[]
}