import { Argument } from "./coding.argument.model";
import { DataType } from "./coding.datatype.model";

export interface Method{
    id:number,
    methodName:string,
    methodArguments:Argument[]
    primitiveReturnType:DataType
    collectionReturnType:DataType
    isColletionType:boolean
}