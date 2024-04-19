import { DataType } from "./coding.datatype.model";

export interface Argument{
    id:number
    argumentName:string
    argumentPosition:number
    isCollection:boolean
    collectionName:DataType
    primitiveName:DataType
    // argumentDataType:DataType
    primitiveDataType:number
    dataTypes:DataType[]

}