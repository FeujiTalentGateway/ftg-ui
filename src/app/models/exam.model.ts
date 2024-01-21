import { Paper } from "./paper.model";

export interface Exam {
    name: string;
    description: string;
    examCode: string;
    duration: string;
    startDate: string;
    endDate: string;
    active: boolean;
    paper: Paper;
    
  }
  