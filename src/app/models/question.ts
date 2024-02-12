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
  optionSelected?: number;
}

export interface ResultTimeQuestion {
  id: number;
  content: string;
  options: Option[];
  selected_option_id?: number;
  correct_option_id?: number;
}
