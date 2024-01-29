import { Paper } from "./paper";


export interface Exam {
    id:Number;
    name: string;
    description: string;
    examCode: string;
    duration: string;
    startDate: string;
    endDate: string;
    active: boolean;
    paperDTO: Paper;
    
  }
  