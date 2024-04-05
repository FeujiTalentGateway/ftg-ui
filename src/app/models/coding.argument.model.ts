import { DataType } from "./coding.datatype.model";

export interface Argument{
    id:number,
    argumentName:string,
    argumentPosition:number,
    argumentDataType:DataType
}