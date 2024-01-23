import { Option } from './option';
import { Subject } from './subject';
 
export interface Question {
  id: number;
  content: string;
  active: boolean;
  difficultyLevel: string;
  subject: Subject;
  rightOption: Option;
  options: Option[];
}