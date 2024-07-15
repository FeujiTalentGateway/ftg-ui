// src/app/models/coding-question.model.ts

export interface PrimitiveDataType {
    id: number;
    commonDataType?: string;
    pythonDataType: string;
    javaDataType: string;
    isCollection: boolean;
  }
  
  export interface CollectionDataType {
    id: number;
    commonDataType?: string;
    pythonDataType: string;
    javaDataType: string;
    isCollection: boolean;
  }
  
  export interface MethodArgument {
    id: number;
    argumentName: string;
    argumentPosition: number;
    isCollection: boolean;
    primitiveDataType: PrimitiveDataType;
    collectionDataType: CollectionDataType;
  }
  
  export interface InputArgument {
    id: number;
    inputValue: string;
    methodArgument: MethodArgument;
    methodArgumentName: string;
  }
  
  export interface TestCase {
    id: number;
    expectedResult: string;
    explanationExample: string;
    isSample: boolean;
    inputArguments: InputArgument[];
  }
  
  export interface MethodDefinition {
    id: number;
    methodName: string;
    isCollectionType: boolean;
    primitiveReturnType: PrimitiveDataType;
    collectionReturnType: CollectionDataType | null;
    methodArguments: MethodArgument[];
  }
  
  export interface Constraint {
    id: number;
    constraint: string;
  }
  
  export interface CodingQuestion {
    id: number;
    content: string;
    description: string;
    difficultLevel: number;
    constraints: Constraint[];
    testCases: TestCase[];
    methodDefinition: MethodDefinition;
  }
  