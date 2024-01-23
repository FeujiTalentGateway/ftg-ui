import { Paper } from "./paper.model";

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
  